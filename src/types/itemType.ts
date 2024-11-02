import { Enterprise } from "./enterprise";
import { Lottery } from "./lottery";
import { OrderItem } from "./orderItem";
import { User } from "./user";

export type ItemType = {
    item_type_id: number;
    type_name: string;
    enterprise_id: number;
    last_modified_by: number | null;
    lotteryLottery_id: number | null;
    
    // Relations (optional)
    order_items?: OrderItem[];
    enterprise?: Enterprise;
    lastModifiedBy?: User;
    Lottery?: Lottery;
}; 