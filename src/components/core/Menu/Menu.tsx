import React from "react";
import { MenuProps } from "./Menu.typings";
import "./Menu.style.scss";

const MenuCore: React.FC<MenuProps & React.HTMLAttributes<HTMLDivElement>> = ({
  items,
  defaultItemKey = "",
  type,
  className,
}) => {
  const [defaultItem, setDefaultItem] = React.useState(
    defaultItemKey || items[0]?.key || ""
  );
  return (
    <div
      className={`menu-container bg-primary-light  flex ${
        type === "vertical" ? "flex-col" : "flex-row"
      } ${className && className}`}
    >
      {items.map((item) => {
        const { key, label, onClickMenuItem, icon } = item;
        const selected = defaultItem === key;
        return (
          <div
            key={key}
            className={`menu-item grid items-center gap-3 px-5 border-b-[0.5px] ${
              selected && "menu-item-selected"
            }`}
            style={{
              gridTemplateColumns: `min-content 1fr`,
            }}
          >
            {icon || <i className="fa-regular fa-address-book" />}
            <span
              onClick={() => {
                setDefaultItem(item.key);
                if (typeof onClickMenuItem === "function") {
                  onClickMenuItem(item);
                }
              }}
              className="menu-item-label cursor-pointer h-10 leading-10 truncate"
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(MenuCore);
