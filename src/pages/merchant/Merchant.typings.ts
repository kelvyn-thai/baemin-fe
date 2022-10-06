export type Merchant = {
  id: string;
  name: string;
  address: string;
  phone: string;
  categoryId: string;
};

export type MerchantResponse = {
  data: Merchant[];
};
