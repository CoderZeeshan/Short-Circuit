import { rank } from "../ranking/scoring.js";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// -----------------------------------------------------------------
// Fallback text - one per priority, written from real curated data.
// Used if Gemini fails, times out, or the key/quota is unavailable.
// Update these manually if the underlying videoData.js changes
// significantly (e.g. new cheapest platform).
// -----------------------------------------------------------------
const FALLBACKS = {
  cost: "Luma's Ray3.14 Draft mode is the lowest-cost option in this comparison at ₹11.95 per 10 seconds, well below every other platform. If keeping cost down is your priority, it's the clear pick.",
  quality: "Veo 3.1 Lite has the strongest supplied quality score at 9.1/10 in this comparison. It costs more than the cheapest options, but the higher quality score makes it the better choice when output quality matters most.",
  balanced: "Luma's Ray3.14 Draft mode gives the best balance of cost and quality in this comparison, combining a very low ₹11.95/10-sec cost with a solid 8.6/10 quality score.",
  overall: "Across this comparison, Luma's Ray3.14 Draft mode is the cheapest option by a wide margin, while Veo 3.1 Lite leads on supplied quality score. Neither option dominates on both dimensions, so the right choice depends on whether cost or quality matters more to you."
};

// -----------------------------------------------------------------
// Adapter: reshapes Person B's rank() output for the prompt layer.
// Cost/Quality/Balanced -> { priority, recommended, comparison }
// Overall                -> { priority, comparison, facts }  (no `recommended`)
// -----------------------------------------------------------------
function buildRecommendationInput(videoData, priority) {
  const sorted = rank(videoData, priority);

  const toCleanObject = (o) => ({
    platformName: o.platformName,
    option: o.option,
    modelName: o.modelName,
    costPer10SecINR: o.costPer10SecINR,
    qualityScore: o.qualityScore,
    balancedScore: o.balancedScore ?? null,
    outputResolution: o.outputResolution,
    outputSeconds: o.outputSeconds
  });

  if (priority === "overall") {
    const cheapestRaw = rank(videoData, "cost")[0];
    const highestQualityRaw = rank(videoData, "quality")[0];

    const cheapest = toCleanObject(cheapestRaw);
    const highestQuality = toCleanObject(highestQualityRaw);

    const isSameOption =
      cheapestRaw.platformName === highestQualityRaw.platformName &&
      cheapestRaw.option === highestQualityRaw.option;

    return {
      priority,
      comparison: sorted.map(toCleanObject),
      facts: { cheapest, highestQuality, isSameOption }
    };
  }

  const recommendedRaw = sorted[0];
  const recommended = toCleanObject(recommendedRaw);
  const comparison = sorted.filter(o => o !== recommendedRaw).map(toCleanObject);

  return { priority, recommended, comparison };
}

// -----------------------------------------------------------------
// Pure prompt builder - no network call, fully testable in isolation.
// -----------------------------------------------------------------
function buildPrompt(input) {
  const { priority } = input;

  if (priority === "overall") {
    const { comparison, facts } = input;
    const relationship = facts.isSameOption
      ? "SAME option - this option is both cheapest AND highest quality, making it an undeniable overall pick."
      : "DIFFERENT options - there is no single option that dominates on both dimensions.";

    return `You are the recommendation assistant for an AI generation marketplace.

The following facts have already been determined by our deterministic system. Do not verify, recalculate, or second-guess them - treat them as given.

Cheapest option: ${facts.cheapest.platformName} (${facts.cheapest.modelName}) at ${facts.cheapest.costPer10SecINR} INR / 10 sec
Highest supplied quality option: ${facts.highestQuality.platformName} (${facts.highestQuality.modelName}) at ${facts.highestQuality.qualityScore}/10

These are the ${relationship}

Full comparison data (for additional context only):
${JSON.stringify(comparison)}

Write a concise 2-3 sentence synthesis using ONLY the facts above and the comparison data supplied. Rules:
- Use the cheapest/highest-quality facts exactly as given - do not scan the comparison data yourself to find a "cheapest" or "best quality" option; that determination is already made for you.
- If the two facts describe the SAME option, you may declare that option the clear overall winner, since the data itself establishes it.
- If they describe DIFFERENT options, do NOT declare a single overall winner. Instead, explain the trade-off between the cheapest option and the highest-quality option, and note that the right choice depends on what the user values most.
- Use INR / 10 sec for pricing. Use Quality /10 for quality.
- Never mention speed.
- Never invent features, prices, scores, or benchmark claims not present in the supplied facts or comparison data.
- Plain, confident language. No unnecessary marketing language.`;
  }

  const { recommended, comparison } = input;

  return `You are the recommendation assistant for an AI generation marketplace.

The ranking and calculations below have already been performed by our deterministic scoring system. DO NOT recalculate, invent, or change any ranking, price, quality score, or balanced score.

User priority: ${priority}

Recommended option:
${JSON.stringify(recommended)}

Other options for context:
${JSON.stringify(comparison)}

Write a concise recommendation in 2-3 sentences.

Rules:
- Recommend the option already identified as best for the user's priority.
- Use INR / 10 sec for video pricing.
- Mention the model/platform name.
- Explain the main reason using the supplied cost and/or quality data.
- ${priority === "balanced" ? "Explain the cost-quality trade-off." : "Mention the relevant supplied metric clearly."}
- Never mention speed.
- Never invent features, prices, scores, or benchmark claims.
- Do not say the score is official unless the supplied data explicitly says so.
- Plain, confident language. No unnecessary marketing language.`;
}

// -----------------------------------------------------------------
// Network call - isolated so this is the only part that can fail.
// -----------------------------------------------------------------
async function callGemini(prompt, apiKey) {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Gemini response was empty or malformed");
  }

  return text.trim();
}

// -----------------------------------------------------------------
// Main entry point - this is what RecommendationCard.jsx calls.
//
// Usage inside a component:
//   import { generateRecommendation } from "../../services/recommendation";
//   const result = await generateRecommendation(
//     videoData,
//     priority,
//     import.meta.env.VITE_GEMINI_API_KEY
//   );
//   // result = { priority, recommendationText }
//
// Never throws - always resolves, so the UI never breaks even if
// Gemini is completely unreachable.
// -----------------------------------------------------------------
export async function generateRecommendation(videoData, priority, apiKey) {
  const input = buildRecommendationInput(videoData, priority);
  const prompt = buildPrompt(input);

  try {
    const key = apiKey || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : null);
    if (!key) {
      throw new Error("No API key provided");
    }
    const recommendationText = await callGemini(prompt, key);
    return { priority, recommendationText };
  } catch (err) {
    return { priority, recommendationText: FALLBACKS[priority] };
  }
}

// Exported for testing/debugging only - RecommendationCard.jsx should
// only ever need generateRecommendation() above.
export { buildRecommendationInput, buildPrompt, FALLBACKS };
