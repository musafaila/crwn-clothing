import CategoryItem from "../category-item/category-item.component";
import "./category.styles.scss";

const Category = ({categories}) => {
  return (
    <div className="categories-container">
      {categories.map((category_item) => {
        return (
          <CategoryItem key={category_item.id} category_item={category_item} />
        );
      })}
    </div>
  );
};

export default Category;
