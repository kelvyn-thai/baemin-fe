export type CartItemType = {
  id: string;
  quantity: number;
  extraItem: string[];
  note?: string;
  totalPrice?: number;
};

export type CartType = {
  items: CartItemType[];
  categoryId: string;
  merchantId: string;
  userId: string;
};
