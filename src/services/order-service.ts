import { prismaClient } from '../utils/database-util';
import { ResponseError } from '../error/response-error';
import { OrderValidation } from '../../validations/order-validation';
import { Validation } from '../../validations/validation';

export class OrderService {
  // Calculate estimated arrival time
  private calculateETA(itemCount: number): Date {
    const now = new Date();
    const totalMinutes = itemCount * 10 + 10;
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  }

  // Create new order
  async createOrder(data: {
    customerId: number;
    restaurantId: number;
    itemCount: number;
  }) {

    const normalized = {
      customerId: data.customerId,
      restaurantId: data.restaurantId,
      itemAmount: (data as any).itemAmount ?? data.itemCount,
    };

    const validated = Validation.validate(OrderValidation.CREATE, normalized as any);

    // Verify customer exists
    const customer = await prismaClient.customer.findUnique({ where: { id: validated.customerId } });
    if (!customer) {
      throw new ResponseError(404, 'Customer not found');
    }

    // Verify restaurant exists
    const restaurant = await prismaClient.restaurant.findUnique({ where: { id: validated.restaurantId } });
    if (!restaurant) {
      throw new ResponseError(404, 'Restaurant not found');
    }

    // Create order
    const order = await prismaClient.order.create({
      data: {
        customer_id: validated.customerId,
        restaurant_id: validated.restaurantId,
        item_amount: validated.itemAmount,
      },
      include: {
        customer: true,
        restaurant: true,
      },
    });

    return order;
  }

  // Get orders by customer
  async getOrdersByCustomer(customerId: number) {
    return await prismaClient.order.findMany({
      where: { customer_id: customerId },
      include: {
        customer: true,
        restaurant: true,
      },
      orderBy: { order_time: 'desc' },
    });
  }

  // Get orders by restaurant
  async getOrdersByRestaurant(restaurantId: number) {
    return await prismaClient.order.findMany({
      where: { restaurant_id: restaurantId },
      include: {
        customer: true,
        restaurant: true,
      },
      orderBy: { order_time: 'desc' },
    });
  }

  // Get all orders with time information
  async getOrdersWithTime() {
    const orders = await prismaClient.order.findMany({
      include: {
        customer: true,
        restaurant: true,
      },
      orderBy: { order_time: 'desc' },
    });

    // Format the response to include time information
    return orders.map((order) => ({
      ...order,
      orderTime: order.order_time,
      estimatedArrivalTime: undefined,
      itemCount: order.item_amount,
      preparationTime: `${order.item_amount * 10} minutes`,
      deliveryTime: '10 minutes',
      totalTime: `${order.item_amount * 10 + 10} minutes`,
    }));
  }
}

export default new OrderService();
