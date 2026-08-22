import ImageModelCard from "./ImageModelCard";

function ImageResults({
    models,
    selectedCategory
}) {
    const recommendedModels = selectedCategory
        ? models.filter((model) =>
            model.useCases.includes(selectedCategory)
        )
        : models;

    return (
        <section className="image-results">

            <div className="image-results-header">
                <span>RECOMMENDED MODELS</span>

                <p>
                    {selectedCategory
                        ? "Models selected for your use case"
                        : "Explore image generation models"}
                </p>
            </div>

            <div className="image-results-grid">

                {recommendedModels.length > 0 ? (
                    recommendedModels.map((model) => (
                        <ImageModelCard
                            key={model.platformName}
                            model={model}
                        />
                    ))
                ) : (
                    <p className="no-image-results">
                        No verified models are available
                        for this use case yet.
                    </p>
                )}

            </div>

        </section>
    );
}

export default ImageResults;