import { useMutation } from "@tanstack/react-query";
import { FormLoginType } from "./Login.typings";
import { apiLogin } from "./Login.services";

export const useMutationLogin = () => {
  const mutation = useMutation(async (form: FormLoginType) => {
    const response = await apiLogin(form);
    if (!response?.data) {
      throw new Error("error!");
    }
    return response.data;
  });
  return mutation;
};
