import { useMutation } from "@tanstack/react-query";
import { FormLoginType } from "./Login.typings";
import { apiLogin } from "./Login.services";

export const useMutationLogin = () => {
  const mutation = useMutation(
    async (form: FormLoginType) => {
      const response = await apiLogin(form);
      if (!response?.data) {
        throw new Error("error!");
      }
      return response.data;
    },
    {
      onSuccess(data, variables, context) {
        console.log("data here", data);
      },
      onError(error, variables, context) {
        console.log("error??");
      },
    }
  );
  return mutation;
};
