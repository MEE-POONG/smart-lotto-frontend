import { Enterprise } from "./enterprise";
import { Order } from "./order";
import { User } from "./user";

export type Customer = {
  customer_id: number;
  customer_name: string;
  customer_code: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_address: string | null;

  // Bank Information
  bank_name: string | null;
  bank_account_no: string | null;
  bank_account_type: string | null;

  enterprise_id: number;
  last_modified_by: number | null;

  // Relations (optional)
  enterprise?: Enterprise;
  orders?: Order[];
  lastModifiedBy?: User;
};

// You might also want a type for creating/updating customers
export type CustomerInput = Omit<
  Customer,
  "customer_id" | "enterprise" | "orders" | "lastModifiedBy"
> & {
  customer_id?: number; // Optional for updates
};
