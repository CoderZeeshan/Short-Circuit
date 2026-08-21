function normalize(platform) {
    const costPerCredit =
        platform.pricePerMonth / platform.creditsIncluded;

    const costPerGeneration =
        costPerCredit * platform.creditsPerGeneration;

    const costPerUnit =
        costPerGeneration / platform.outputSeconds;

    return {
        ...platform,
        costPerUnit: Number(costPerUnit.toFixed(2))
    };
}


function rank(platforms, preset) {

    const normalized = platforms.map(normalize);

    if (preset === "cheapest") {
        return normalized.sort(
            (a, b) => a.costPerUnit - b.costPerUnit
        );
    }

    if (preset === "best_quality") {
        return normalized.sort(
            (a, b) => b.quality - a.quality
        );
    }

    if (preset === "fastest") {
        return normalized.sort(
            (a, b) => b.speed - a.speed
        );
    }

    if (preset === "balanced") {
        return normalized
            .map((platform) => ({
                ...platform,

                balancedScore: Number(
                    (
                        (10 - platform.costPerUnit) * 0.4 +
                        platform.quality * 0.3 +
                        platform.speed * 0.3
                    ).toFixed(3)
                )
            }))
            .sort((a, b) => b.balancedScore - a.balancedScore);
    }

    return normalized;
}


module.exports = {
    normalize,
    rank
};