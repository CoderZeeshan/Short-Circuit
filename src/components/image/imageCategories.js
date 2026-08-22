function ImageCategorySelector({
    categories,
    selectedCategory,
    onCategorySelect
}) {
    return (
        <section className="image-category-selector">
            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className={
                        selectedCategory === category.id
                            ? "category-card selected"
                            : "category-card"
                    }
                    onClick={() =>
                        onCategorySelect(category.id)
                    }
                >
                    <h3>{category.title}</h3>

                    <p>{category.description}</p>
                </button>
            ))}
        </section>
    );
}

export default ImageCategorySelector;