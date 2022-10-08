import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "pages/category/components/Category";
import { apiGetCategories } from "./CategoryList.services";

export const useQueryCategories: () => UseQueryResult<
  Category[],
  unknown
> = () => {
  const query = useQuery({
    queryFn: async () => {
      const res = await apiGetCategories();
      return res.data;
    },
    queryKey: ["categories"],
  });
  return query;
};
