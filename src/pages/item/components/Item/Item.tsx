import { useModalStore } from "components/core/Modal";
import React from "react";
import { ItemFormattedType } from "./Item.typings";
import ItemDetails from "./Item.ItemDetails";

interface IProps {
  data: ItemFormattedType;
}

const Item: React.FC<IProps> = ({ data }) => {
  const { imgURL, name, priceFormatted } = data;
  const { actionOpenModal } = useModalStore();
  const handleChooseItem = React.useCallback(() => {
    actionOpenModal({ content: <ItemDetails data={data} /> });
  }, [data, actionOpenModal]);
  return (
    <button onClick={handleChooseItem} type="button" className="">
      <div className="border-solid border-[1px] rounded h-36 flex items-end justify-center mb-1 pb-2">
        <img src={imgURL} alt={name} className="h-[90%]" />
      </div>
      <div className="text-primary-dark text-left">{name}</div>
      <div className="text-primary-dark font-light text-left">
        {priceFormatted}
      </div>
    </button>
  );
};

export default React.memo(Item);
