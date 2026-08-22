function normalizeOption(platform, option) {
    // If pricing information is missing, we cannot calculate cost.
    if (
        !Number.isFinite(platform.pricePerMonthINR) ||
        !Number.isFinite(platform.creditsIncluded) ||
        !Number.isFinite(option.creditsPerGeneration) ||
        !Number.isFinite(option.outputSeconds) ||
        option.outputSeconds <= 0
    ) {
        return {
            ...option,
            platformName: platform.platformName,
            
            qualityScore: platform.qualityScore ?? null,
            costPer10SecINR: null
        };
    }

    const costPerCreditINR =
        platform.pricePerMonthINR / platform.creditsIncluded;

    const costPerGenerationINR =
        costPerCreditINR * option.creditsPerGeneration;

    const costPerSecondINR =
        costPerGenerationINR / option.outputSeconds;

    const costPer10SecINR =
        costPerSecondINR * 10;

    return {
        ...option,
        platformName: platform.platformName,
        
        qualityScore: platform.qualityScore ?? null,
        costPer10SecINR: Number(costPer10SecINR.toFixed(2))
    };
}


function getAllOptions(videoData) {
    const options = [];

    for (const platform of videoData) {
        for (const option of platform.generationOptions) {
            options.push(
                normalizeOption(platform, option)
            );
        }
    }

    return options;
}


function rank(videoData, priority) {
    const options = getAllOptions(videoData);

    // -------------------------
    // COST
    // -------------------------
    if (priority === "cost") {
        return options.sort((a, b) => {

            // Options with unknown cost go to the bottom.
            if (a.costPer10SecINR === null) return 1;
            if (b.costPer10SecINR === null) return -1;

            return a.costPer10SecINR - b.costPer10SecINR;
        });
    }


    // -------------------------
    // QUALITY
    // -------------------------
    if (priority === "quality") {
        return options.sort((a, b) => {

            // Options without quality go to the bottom.
            if (a.qualityScore === null) return 1;
            if (b.qualityScore === null) return -1;

            return b.qualityScore - a.qualityScore;
        });
    }


    // -------------------------
    // BALANCED
    // -------------------------
    if (priority === "balanced") {

        // Only use options where both cost and quality
        // are actually available.
        const comparableOptions = options.filter(
            option =>
                option.costPer10SecINR !== null &&
                option.qualityScore !== null
        );

        if (comparableOptions.length === 0) {
            return options;
        }

        // Cheapest option gets a cost score of 100.
        const cheapestCost = Math.min(
            ...comparableOptions.map(
                option => option.costPer10SecINR
            )
        );

        const scoredOptions = comparableOptions.map(option => {

            // Lower cost = better.
            const costScore =
                (cheapestCost / option.costPer10SecINR) * 100;

            // Quality is 0-10, convert to 0-100.
            const qualityScore100 =
                option.qualityScore * 10;

            // 60% cost + 40% quality.
            const balancedScore =
                (costScore * 0.60) +
                (qualityScore100 * 0.40);

            return {
                ...option,
                costScore: Number(costScore.toFixed(2)),
                qualityScore100: Number(
                    qualityScore100.toFixed(2)
                ),
                balancedScore: Number(
                    balancedScore.toFixed(2)
                )
            };
        });

        // Put options with missing data at the bottom.
        const unavailableOptions = options.filter(
            option =>
                option.costPer10SecINR === null ||
                option.qualityScore === null
        );

        return [
            ...scoredOptions.sort(
                (a, b) =>
                    b.balancedScore - a.balancedScore
            ),
            ...unavailableOptions
        ];
    }


    // -------------------------
    // OVERALL
    // -------------------------
    if (priority === "overall") {
        return options;
    }


    // Unknown priority:
    // return the complete normalized data.
    return options;
}


module.exports = {
    normalizeOption,
    getAllOptions,
    rank
};