export type UserType = {
  id: string;
  username: string;
  password: string;
  role: "customer" | "admin" | "guest" | "merchant" | "driver";
  name: string;
};
