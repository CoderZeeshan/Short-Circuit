export const promptLabs = [
  {
    id: "sky-kingdom",
    title: "Sky Kingdom Arrival",
    basicPrompt: "A person riding a dragon flies toward a beautiful golden city in the sky.",
    optimizedPrompt: `TRUE MOUNTED POV, photoreal cinematic fantasy. A rider flies on a horned dragon toward a vast golden temple city above the clouds. Keep the rider's gloved hands, leather reins, and the dragon's neck, head, and horns visible in the foreground throughout the shot. The camera stays fixed to the rider's POV with no cuts, no external angles, and no third-person shots.

The dragon rapidly descends through clouds toward a waterfall valley, banks through falling water, glides over a river toward a golden bridge, passes beneath the bridge arch, then climbs through a cloud layer and reveals the glowing city beyond.

Maintain realistic dragon movement, physically consistent mounted POV, natural camera sway caused by the rider and dragon, detailed scales, realistic clouds, waterfalls, atmospheric depth, and cinematic golden lighting.`,
    jsonPrompt: {
      subject: "rider mounted on a horned dragon",
      viewpoint: "fixed rider-mounted POV",
      environment: "golden fantasy city above clouds",
      action: "dragon flies through waterfalls, bridges and clouds toward the city",
      camera: "mounted first-person POV with natural rider movement",
      style: "photorealistic cinematic fantasy",
      continuity: "no cuts, no external camera, dragon remains beneath rider",
      lighting: "warm golden sunlight with atmospheric cloud depth",
      motion: "fast descent, waterfall bank, glide, bridge pass and final climb"
    },
    improvements: [
      { label: "POV", explanation: "The optimized prompt explicitly locks the camera to the rider's perspective instead of leaving the viewpoint ambiguous." },
      { label: "Continuity", explanation: "It clearly tells the model that the dragon must remain beneath the rider and prevents unwanted third-person or detached camera shots." },
      { label: "Motion", explanation: "The sequence gives the model specific actions and transitions instead of simply saying that the dragon flies toward the city." },
      { label: "Environment", explanation: "The city, waterfalls, clouds, bridge and atmospheric details create a much more specific visual world." }
    ]
  },
  {
    id: "underwater-manta",
    title: "Underwater Manta",
    basicPrompt: "A manta ray swims through an underwater cave and comes out into the ocean.",
    optimizedPrompt: `Cinematic realistic underwater scene. A large manta ray glides smoothly through a clear turquoise underwater cave with rocky walls, a sandy rippled floor and suspended particles. The manta stays centered above the seafloor as it moves toward a bright arched cave opening.

The ray gently banks through the illuminated chamber, rises toward the opening, then passes through the cave entrance into a wide luminous seascape. Maintain realistic manta movement, natural water currents, detailed rock textures, soft caustic light, atmospheric depth and smooth cinematic camera movement.`,
    jsonPrompt: {
      subject: "large manta ray",
      environment: "turquoise underwater cave with rocky walls and sandy floor",
      action: "glides through cave, banks, rises and exits into open water",
      camera: "smooth cinematic tracking and reveal shots",
      style: "realistic cinematic underwater",
      lighting: "turquoise water with natural sun shafts and caustics",
      atmosphere: "suspended particles and natural water currents",
      motion: "slow continuous glide with gentle banking and rising"
    },
    improvements: [
      { label: "Subject", explanation: "The optimized prompt defines the manta's size and movement rather than using only a generic animal description." },
      { label: "Environment", explanation: "Specific cave geometry, sand, water color and the bright opening give the model a clear spatial environment." },
      { label: "Motion", explanation: "The manta's movement is broken into a continuous sequence of gliding, banking, rising and exiting." },
      { label: "Lighting", explanation: "Natural turquoise light, sun shafts and caustics give the model specific lighting instructions." }
    ]
  }
];
