import React from "react";
import { Link } from "react-router-dom";
import { MerchantType } from "./Merchant.typings";

const Merchant = React.memo(
  ({
    id,
    imgURL,
    name,
    description,
    stars,
    reviews,
    distance,
    categoryId,
  }: MerchantType) => (
    <Link
      key={id}
      className="merchant grid gap-3 items-center"
      to={`/items?merchantId=${id}&categoryId=${categoryId}`}
    >
      <div>
        <img src={imgURL} alt={name} className="w-24 h-24" />
      </div>
      <div>
        <div className="text-base font-medium text-primary-dark">{name}</div>
        <div className="text-sm text-primary-gray mb-1">{description}</div>
        <div className="text-sm text-primary-gray flex items-center">
          <div className="text-yellow-400">
            <i className="fa-solid fa-star" />
          </div>
          <div className="text-primary-dark mx-1">{stars}</div>
          <div className="text-xs">({reviews})</div>
          <div className="text-primary-dark mx-1 pb-1">.</div>
          <div>{distance}</div>
        </div>
      </div>
    </Link>
  )
);

export default React.memo(Merchant);
