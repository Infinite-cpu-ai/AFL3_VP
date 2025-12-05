export interface Customer {
  id: number;
  name: string;
  phone: string;
}

export interface CreateCustomerDTO {
  name: string;
  phone: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  phone?: string;
}

export interface Order {
  id: number;
  customer_id: number;
  restaurant_id: number;
  item_amount: number;
  order_time: Date;
}
