import "./categories.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const Categories = (props) => {//props passed down from App.js
  const {list: categories} = props; //destructuring needs the exact name of the property passed
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} categoryy={category} />
      ))}
    </div>
  );
};

export default Categories;
