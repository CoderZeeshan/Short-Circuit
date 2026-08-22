import React from 'react';

function ImageCategorySelector({ categories, selectedCategory, onCategorySelect }) {
  return (
    <section className="image-category-selector">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            type="button"
            className={`category-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => onCategorySelect(isSelected ? null : category.id)}
            title={category.description}
          >
            {category.title}
          </button>
        );
      })}
    </section>
  );
}

export default ImageCategorySelector;
