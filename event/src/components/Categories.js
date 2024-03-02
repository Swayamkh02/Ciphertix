const Categories = ({ onSelect }) => {
    const categories = []; 
    const handleCategorySelect = (category) => {
      onSelect(category); 
    };
    return (
      <div className="categories">
        {/* Render category buttons or dropdown based on your design */}
        {categories.map((category) => (
          <button key={category.id} onClick={() => handleCategorySelect(category)}>
            {category.name}
          </button>
        ))}
      </div>
    );
  };
export default Categories;  