import "../home/home.css"
export const Category = (props) => {
const {id, categoryName, handleGetList}= props;
  return (
    <div
      className="select-category center-item"
      onClick={() => {
        handleGetList(id);
      }}
    >
      {categoryName}
    </div>
  );
};
