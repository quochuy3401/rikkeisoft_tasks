import "../category/category.css";
export const Category = (props) => {
  const { id, index, categoryName, handleGetList, onActiveCategoryChange } =
    props;
  const { activeCategory, setActiveCategory } = onActiveCategoryChange;
  const handleClick = () => {
    setActiveCategory(index);
    handleGetList(id);
  };
  return (
    <div
      className={
        (index === activeCategory ? "active " : "") +
        "select-category center-item"
      }
      onClick={() => {
        handleClick();
      }}
    >
      {categoryName}
    </div>
  );
};
