function ImageModelCard({ model }) {
    return (
        <article className="image-model-card">

            {/* Main visual */}
            <div className="image-model-preview">
                <img
                    src={model.imageUrl}
                    alt={`${model.platformName} example`}
                    loading="lazy"
                />
            </div>

            {/* Model information */}
            <div className="image-model-content">

                <h3>{model.platformName}</h3>

                <p className="image-model-description">
                    {model.description}
                </p>

                {/* Strengths */}
                <div className="image-model-strengths">
                    {model.strengths.map((strength) => (
                        <span key={strength}>
                            {strength}
                        </span>
                    ))}
                </div>

                {/* Use cases */}
                <div className="image-model-use-cases">
                    {model.useCases.map((useCase) => (
                        <span key={useCase}>
                            {useCase}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    className="image-model-button"
                >
                    Explore Model →
                </button>

            </div>

        </article>
    );
}

export default ImageModelCard;