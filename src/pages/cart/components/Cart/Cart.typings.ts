export type CartItemType = {
  id: string;
  quantity: number;
  extraItems: string[];
  note?: string;
  totalPrice?: number;
};

export type CartType = {
  items: CartItemType[];
  categoryId: string;
  merchantId: string;
};
