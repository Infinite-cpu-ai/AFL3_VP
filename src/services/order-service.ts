import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export class OrderService {
  // Calculate estimated arrival time
  // Formula: 10 minutes per item + 10 minutes for delivery
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
    // Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: data.restaurantId },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    // Calculate ETA
    // Create order using new schema field names
    const order = await prisma.order.create({
      data: {
        customer_id: data.customerId,
        restaurant_id: data.restaurantId,
        item_amount: data.itemCount,
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
    return await prisma.order.findMany({
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
    return await prisma.order.findMany({
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
    const orders = await prisma.order.findMany({
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
