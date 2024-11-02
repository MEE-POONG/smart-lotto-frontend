import { Enterprise, User } from ".";
import { ItemType } from "./itemType";
import { Order } from "./order";

export type OrderItem = {
    order_item_id: number;
    order_id: number;
    number_value: string;
    item_type_id: number;
    quantity: number;
    price: number;
    enterprise_id: number;
    last_modified_by: number | null;
    
    // Relations (optional)
    order?: Order;
    item_type?: ItemType;
    enterprise?: Enterprise;
    lastModifiedBy?: User;
}; 

export type CreateOrderItemType = {
    order_id: number;
    number_value: string;
    item_type_id: number;
    quantity: number;
    price: number;
    enterprise_id: number;
    last_modified_by?: number;
}