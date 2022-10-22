import { SortBtn } from "components/core/Button";
import includes from "lodash/includes";
import Dropdown from "components/core/Dropdown";
import DropdownSelectBox, {
  IOption,
} from "components/core/Dropdown/Dropdown.SelectBox";
import CoreInput from "components/core/Input";
import { CustomerRoute } from "components/core/PrivateRoute";
import ScrollView from "components/core/ScrollView";
import trim from "lodash/trim";
import orderBy from "lodash/orderBy";
import toLower from "lodash/toLower";
import { useQueryMerchantList } from "pages/merchant/components/MerchantList/MerchantList.hook";
import OrderHistoryItem, {
  OrderType,
  useQueryAllOrders,
  useQueryStatusList,
} from "pages/order/components/Order";
import React from "react";
import { options } from "./DashboardOrder.constants";
import { useDashboardOrder } from "./DashboardOrder.zustand";
import "./DashboardOrder.styles.scss";

const DashboardOrder: React.FC = () => {
  const { data: merchants = [] } = useQueryMerchantList();
  const { data: status = {} } = useQueryStatusList();
  const { data: orders = [] } = useQueryAllOrders();
  const {
    direction,
    actionSetDirection,

    actionSetMerchant,
    merchants: merchantsSelected,

    option,
    actionSetOption,

    status: statusSelected,
    actionSetStatus,

    customer,
    actionSetCustomer,
  } = useDashboardOrder();
  const subFilter = React.useMemo(() => {
    switch (option) {
      case "Customer":
        return (
          <CoreInput
            type="input"
            containerClassName="find-by-customer"
            optionProps={
              {
                value: customer,
                onChange: (e) => actionSetCustomer(e.target.value),
                placeholder: "Type customer name / address...",
              } as React.InputHTMLAttributes<HTMLInputElement>
            }
          />
        );
      case "Created Time":
      case "Updated Time":
        return (
          <SortBtn direction={direction} setDirection={actionSetDirection} />
        );
      case "Merchant":
        return (
          <DropdownSelectBox
            options={merchants.map((m) => ({ value: m.id }))}
            selected={merchantsSelected}
            setSelected={(selected: IOption[]) => actionSetMerchant(selected)}
          />
        );
      case "Status":
        return (
          <DropdownSelectBox
            options={Object.values(status).map((value) => ({ value }))}
            selected={statusSelected}
            setSelected={(selected: IOption[]) => actionSetStatus(selected)}
          />
        );
      default:
        return null;
    }
  }, [
    option,
    direction,
    merchants,
    merchantsSelected,
    options,
    status,
    statusSelected,
    customer,
  ]);
  const ordersFiltered = React.useMemo(() => {
    switch (option) {
      case "Created Time":
        return orderBy(orders, (i) => i.createdTime, direction);
      case "Updated Time":
        return orderBy(orders, (i) => i.updatedTime, direction);
      case "Merchant": {
        const merchantListSelected = merchantsSelected.map((m) => m.value);
        return orders.filter((o) =>
          merchantListSelected.includes(o.merchantId)
        );
      }
      case "Status": {
        const statusListSelected = statusSelected.map((s) => s.value);
        return orders.filter((o) => statusListSelected.includes(o.status));
      }
      case "Customer": {
        const keySearch = trim(toLower(customer));
        if (!keySearch) {
          return orders;
        }
        return orders.filter((o) => {
          const customerName = toLower(o.customerName);
          const customerAddress = toLower(o.customerAddress);
          const isExisted =
            includes(keySearch, customerName) ||
            includes(keySearch, customerAddress);
          return isExisted;
        });
      }
      default:
        return orders;
    }
  }, [orders, option, direction, merchantsSelected, statusSelected, customer]);
  return (
    <div>
      <div className="grid gap-2 block-conditions p-2">
        <Dropdown
          options={options}
          onSelectOption={actionSetOption}
          defaultSelected={option}
        />
        {subFilter}
      </div>
      <ScrollView
        data={ordersFiltered}
        renderItem={(order: OrderType) => (
          <OrderHistoryItem order={order} key={order.id} />
        )}
      />
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="admin">
    <DashboardOrder />
  </CustomerRoute>
));
