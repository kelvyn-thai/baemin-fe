export type MenuItem = {
  key: string;
  label: string;
  onClickMenuItem?: (item: MenuItem) => any;
  icon?: React.ReactElement | React.ReactNode | any;
};

export type MenuProps = {
  items: MenuItem[];
  type: "horizontal" | "vertical";
  defaultItemKey?: string;
};
