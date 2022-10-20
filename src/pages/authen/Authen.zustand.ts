import { UserType } from "pages/user";
import { createPersistStore } from "zustand-store";

interface AuthenState {
  isLoggedIn: boolean;
  userInfo: UserType;
}

interface AuthenActions {
  actionLoggedIn: (user: UserType) => any;
  actionLogout: () => any;
}

const initialState: AuthenState = {
  isLoggedIn: false,
  userInfo: {
    id: "-1",
    username: "",
    password: "",
    role: "guest",
    name: "",
  },
};

export const [useAuthenStore] = createPersistStore<AuthenState & AuthenActions>(
  (set) => ({
    ...initialState,
    actionLoggedIn: (user) => set({ userInfo: user, isLoggedIn: true }),
    actionLogout: () => set({ ...initialState }),
  }),
  "useAuthenStore"
);
