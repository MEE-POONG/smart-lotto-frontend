import { Enterprise, OrderItem, QuickNote, User } from ".";
import { Customer } from "./customer";

export type Order = {
  order_id: number;
  customer_id: number;
  total_price: number;
  gain_price: number;
  order_date: Date;
  order_status: string;
  payment_status: string;
  pay_slip_image: string | null;
  enterprise_id: number;
  last_modified_by: number | null;

  // Relations (optional)
  customer?: Customer;
  enterprise?: Enterprise;
  order_items?: OrderItem[];
  quick_notes?: QuickNote[];
  lastModifiedBy?: User;
};

export type CreateOrderType = {
  customer_id: number;
  total_price: number;
  order_status: string;
  payment_status: string;
  pay_slip_image?: string;
  enterprise_id: number;
};
