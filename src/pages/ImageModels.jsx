import { useState } from "react";

import imageData from "../data/imageData";
import imageCategories from "../data/imageCategories";

import ImageCategorySelector from "../components/image/ImageCategorySelector";
import ImageResults from "../components/image/ImageResults";

function ImageModels() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <main className="image-models-page">

            {/* Page heading */}
            <header className="image-page-header">
                <span>IMAGE MODEL FINDER</span>

                <h1>
                    Find the right image model
                </h1>

                <p>
                    Choose what you're creating and
                    explore models suited to your needs.
                </p>
            </header>

            {/* Category selection */}
            <ImageCategorySelector
                categories={imageCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />

            {/* Recommended models */}
            <ImageResults
                models={imageData}
                selectedCategory={selectedCategory}
            />

        </main>
    );
}

export default ImageModels;