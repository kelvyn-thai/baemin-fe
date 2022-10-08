import Loading from "components/core/Loading";
import React from "react";
import { Link } from "react-router-dom";
import { useQueryCategories } from "./CategoryList.hook";

const CategoryList: React.FC = () => {
  const { isLoading, data: categories = [] } = useQueryCategories();
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center">
      {isLoading && <Loading />}
      {categories.map(({ id, name, imgURL }) => (
        <Link key={id} className="" to={`/merchant?categoryId=${id}`}>
          <div>
            <img className="w-24 h-24" src={imgURL} alt={name} />
          </div>
          <div className="text-center">{name}</div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
