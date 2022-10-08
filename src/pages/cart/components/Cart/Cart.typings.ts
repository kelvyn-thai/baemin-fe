export type CartItemType = {
  id: string;
  quantity: number;
  extraItems: string[];
  note?: string;
};

export type CartType = {
  items: CartItemType[];
  categoryId: string;
  merchantId: string;
};
