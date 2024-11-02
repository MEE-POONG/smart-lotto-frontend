import { Enterprise } from "./enterprise";
import { User } from "./user";

export type ChangeLog = {
    log_id: number;
    entity_name: string;
    action: string;
    entity_id: number;
    user_id: number | null;
    before_data: unknown | null;
    after_data: unknown | null;
    change_time: Date;
    enterprise_id: number;
    last_modified_by: number | null;
    
    // Relations (optional)
    enterprise?: Enterprise;
    lastModifiedBy?: User;
}; 