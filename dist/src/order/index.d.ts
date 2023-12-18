import { Order } from "./types";
export * from "./DutchOrder";
export * from "./types";
export * from "./validation";
/**
 * Parses a given serialized order
 * @return Parsed order object
 */
export declare function parseOrder(order: string): Order;
