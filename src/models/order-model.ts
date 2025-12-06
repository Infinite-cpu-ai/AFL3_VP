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
  orderTime: Date; 
  estimatedArrivalTime?: Date; 
  preparationTime: string;  
  deliveryTime: string; 
  totalTime: string;  
}
