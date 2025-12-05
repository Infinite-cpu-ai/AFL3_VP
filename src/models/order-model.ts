export interface Order {
  id: number;
  customer_id: number;
  restaurant_id: number;
  item_amount: number;
  order_time: Date;
}

export interface CreateOrderDTO {
  customer_id: number;
  restaurant_id: number;
  item_amount: number;
}

export interface OrderWithDetails extends Order {
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  restaurant: {
    id: number;
    name: string;
    description: string;
    is_opened: boolean;
  };
}

export interface OrderTimeInfo extends OrderWithDetails {
  orderTime: Date;  // When the order was placed
  estimatedArrivalTime?: Date;  // ETA calculation result
  preparationTime: string;  // item_amount * 10 minutes
  deliveryTime: string;  // Fixed 10 minutes
  totalTime: string;  // Total ETA
}
