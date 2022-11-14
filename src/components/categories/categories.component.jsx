import React from "react";

import "./categories.styles.scss"

const CategoryItem = ({category}) => {
  const { title } = category;
  return (
    <div className="category-container">
      <div className="background-image" />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
