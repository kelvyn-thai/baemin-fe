import IndexedDb from "database/IndexedDB";
import { OrderType } from "./Order.typings";

export const TABLE_NAME = "order";

export const DB_NAME = `baemin-${TABLE_NAME}`;

export const initDatabase = async () => {
  let indexedDB = new IndexedDb(DB_NAME);
  const objectStore = [TABLE_NAME];
  indexedDB = await indexedDB.createObjectStore(objectStore);
  return indexedDB;
};

export const createOrder = async (order: OrderType) => {
  const dbInstance = await initDatabase();
  const stored = await dbInstance.addRecord(TABLE_NAME, order);
  return stored;
};

export const researchOrder = async (orderId: number) => {
  const dbInstance = await initDatabase();
  const order = await dbInstance.getRecord(TABLE_NAME, orderId);
  return order;
};

export const getAllOrders: () => Promise<OrderType[]> = async () => {
  const dbInstance = await initDatabase();
  const orders = await dbInstance.getAllRecord(TABLE_NAME);
  return orders || [];
};

export const updateOrder = async (order: OrderType) => {
  const dbInstance = await initDatabase();
  const updated = await dbInstance.updateByKey(TABLE_NAME, {
    ...order,
  });
  return updated;
};

export const deleteOrder = async (orderId: number) => {
  const dbInstance = await initDatabase();
  const removed = await dbInstance.deleteRecord(TABLE_NAME, orderId);
  return removed;
};

export const clearAllOrder = async () => {
  const dbInstance = await initDatabase();
  return dbInstance.clearTable(TABLE_NAME);
};
