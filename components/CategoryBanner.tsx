import React from 'react';

interface CategoryBannerProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap py-2 px-4 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};