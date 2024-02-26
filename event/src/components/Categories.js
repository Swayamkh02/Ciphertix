const Categories = ({ onSelect }) => {
    // Replace with your blockchain interaction logic to fetch categories
    const categories = []; // Placeholder array
  
    const handleCategorySelect = (category) => {
      onSelect(category); // Placeholder function
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