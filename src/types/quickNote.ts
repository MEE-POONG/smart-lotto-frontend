import { Enterprise } from "./enterprise";
import { Order } from "./order";
import { User } from "./user";

export type QuickNote = {
    note_id: number;
    note_description: string;
    order_id: number;
    created_at: Date;
    updated_at: Date;
    enterprise_id: number;
    last_modified_by: number | null;
    
    // Relations (optional)
    order?: Order;
    enterprise?: Enterprise;
    lastModifiedBy?: User;
}; 