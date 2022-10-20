import Button from "components/core/Button";
import CoreInput from "components/core/Input";
import trim from "lodash/trim";
import { useAuthenStore } from "pages/authen/Authen.zustand";
import { UserType } from "pages/user";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutationLogin } from "./Login.hook";

const LoginPage = () => {
  const navigate = useNavigate();
  const { actionLoggedIn } = useAuthenStore();
  const mutationLogin = useMutationLogin();
  const { isLoading: isSubmittingForm, isError, reset } = mutationLogin;
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });
  const onChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isError) {
        reset();
      }
      setState({ ...state, [event.target.name]: event.target.value });
    },
    [state, setState, reset, isError]
  );
  const isFormValid = React.useMemo(
    () => Object.values(state).every((i) => trim(i).length > 0),
    [state]
  );

  const onLogin = React.useCallback(async () => {
    if (!isFormValid) {
      return;
    }
    const user: UserType = await mutationLogin.mutateAsync(state);
    actionLoggedIn(user);
    navigate("/");
  }, [state, isFormValid]);

  return (
    <div className="p-5">
      <img
        className="mb-5 w-[100%] aspect-video"
        src="assets/images/banner.webp"
        alt="banner-baemin"
      />
      <CoreInput
        label="User name"
        isRequired
        optionProps={
          {
            value: state.username,
            name: "username",
            onChange: onChangeInput,
          } as React.InputHTMLAttributes<HTMLInputElement>
        }
      />
      <CoreInput
        label="Password"
        type="password"
        optionProps={
          {
            value: state.password,
            name: "password",
            onChange: onChangeInput,
            onKeyDown: (e) => e.key === "Enter" && onLogin(),
          } as React.InputHTMLAttributes<HTMLInputElement>
        }
        isRequired
      />
      {isError && (
        <div className="text-red-500">
          <i className="fa-solid fa-triangle-exclamation text-base mr-2" />
          Login fail!
        </div>
      )}
      <Button
        title={`Login${isSubmittingForm ? "..." : ""}`}
        className="w-[100%] mt-5"
        onClick={onLogin}
        isDisabled={!isFormValid || isSubmittingForm}
      />
    </div>
  );
};

export default React.memo(LoginPage);
