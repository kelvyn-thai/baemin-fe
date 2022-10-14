export type ExtraItemType = {
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
  extraItem: {
    [key: string]: ExtraItemType;
  };
};

export type ItemFormattedType = {
  priceFormatted: string;
} & ItemType;
