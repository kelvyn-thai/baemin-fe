export type Category = {
  id: string;
  name: string;
  imgURL: string;
  merchant: string[];
};

export type CategoryResponse = {
  data: Category[];
};
