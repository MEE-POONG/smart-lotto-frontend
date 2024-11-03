import { Enterprise } from "./enterprise";
import { ItemType } from "./itemType";
import { User } from "./user";

export type Lottery = {
  lottery_id: number;
  lottery_name: string;
  draw_date: Date;
  image_url: string;
  status?: string;
  enterprise_id?: number;
  last_modified_by?: number | null;
  userUser_id?: number | null;

  // Relations (optional)
  enterprise?: Enterprise;
  itemTypes?: ItemType[];
  lastModifiedBy?: User;
  User?: User;
};

export type LotteryInput = Omit<
  Lottery,
  "lottery_id" | "enterprise" | "itemTypes" | "lastModifiedBy" | "User"
> & {
    lottery_id?: number; // Optional for updates
};
