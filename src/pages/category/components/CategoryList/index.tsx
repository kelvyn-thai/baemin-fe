import Loading from "components/core/Loading";
import { useQueryCategories } from "pages/category/Category.hook";
import React from "react";
import { Link } from "react-router-dom";

const CategoryList: React.FC = () => {
  const { isLoading, data: categories = [] } = useQueryCategories();
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center">
      {isLoading && <Loading />}
      {categories.map(({ id, name, imgURL }) => (
        <Link key={id} className="" to={`/merchant/${id}`}>
          <div>
            <img src={imgURL} alt={name} />
          </div>
          <div className="text-center">{name}</div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
