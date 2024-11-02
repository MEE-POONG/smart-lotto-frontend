import { ItemType, OrderItem, User } from ".";
import { ChangeLog } from "./changeLog";
import { Lottery } from "./lottery";
import { QuickNote } from "./quickNote";
import { Customer } from "./customer";
import { Order } from "./order";

export type Enterprise = {
    enterprise_id: number;
    enterprise_name: string;
    
    // Relations (optional)
    customers?: Customer[];
    orders?: Order[];
    item_types?: ItemType[];
    orderItem?: OrderItem[];
    quickNote?: QuickNote[];
    changeLog?: ChangeLog[];
    user?: User[];
    Lottery?: Lottery[];
}; 