export interface Restaurant {
  id: number;
  name: string;
  description: string;
  is_opened: boolean;
}

export interface CreateRestaurantDTO {
  name: string;
  description: string;
  is_opened?: boolean;
}

export interface UpdateRestaurantDTO {
  name?: string;
  description?: string;
  is_opened?: boolean;
}

export interface Order {
  id: number;
  customer_id: number;
  restaurant_id: number;
  item_amount: number;
  order_time: Date;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
}
