export type ExtraItemsType = {
  id: string;
  name: string;
  items: { id: string; price: number; name: string; isSelected?: boolean }[];
  isRequired: boolean;
};

export type ItemType = {
  id: string;
  name: string;
  price: number;
  merchantId: string;
  categoryId: string;
  imgURL: string;
  extraItems: {
    [key: string]: ExtraItemsType;
  };
};

export type ItemFormattedType = {
  priceFormatted: string;
} & ItemType;
