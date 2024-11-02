import { ChangeLog } from "./changeLog";
import { Customer } from "./customer";
import { Enterprise } from "./enterprise";
import { ItemType } from "./itemType";
import { Lottery } from "./lottery";
import { Order } from "./order";
import { OrderItem } from "./orderItem";
import { QuickNote } from "./quickNote";

export type User = {
    user_id: number;
    user_name: string;
    user_email: string;
    password: string;
    refresh_token: string | null;
    enterprise_id: number | null;
    createdAt: Date;
    updatedAt: Date;
    
    // Relations (optional)
    enterprise?: Enterprise;
    customers?: Customer[];
    orders?: Order[];
    orderItems?: OrderItem[];
    itemTypes?: ItemType[];
    quickNotes?: QuickNote[];
    changeLogs?: ChangeLog[];
    lotteries?: Lottery[];
};
