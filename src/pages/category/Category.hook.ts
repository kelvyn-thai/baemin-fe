import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "./Category.typings";
import { apiGetCategories } from "./Category.services";

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
