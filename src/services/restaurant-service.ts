import { PrismaClient } from '../../generated/prisma';
import { ResponseError } from '../error/response-error';

const prisma = new PrismaClient();

export class RestaurantService {
  // Create new restaurant
  async createRestaurant(data: {
    name: string;
    description: string;
    is_opened?: boolean;
  }) {
    // Strict: only accept boolean for is_opened when provided
    if (data.is_opened !== undefined && typeof data.is_opened !== 'boolean') {
      throw new ResponseError(400, 'is_opened must be a boolean');
    }

    return await prisma.restaurant.create({
      data: {
        name: data.name,
        description: data.description,
        is_opened: data.is_opened !== undefined ? data.is_opened : true,
      },
    });
  }

  // Get all restaurants
  async getAllRestaurants() {
    return await prisma.restaurant.findMany({
      include: {
        orders: true,
      },
    });
  }

  // Get restaurant by ID with relations
  async getRestaurantById(id: number) {
    return await prisma.restaurant.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            customer: true,
          },
        },
      },
    });
  }

  // Get restaurants by open/closed status
  async getRestaurantsByStatus(isOpen: boolean) {
    return await prisma.restaurant.findMany({
      where: { is_opened: isOpen },
      include: {
        orders: true,
      },
    });
  }

  // Update restaurant name
  async updateRestaurantName(id: number, name: string) {
    return await prisma.restaurant.update({
      where: { id },
      data: { name },
    });
  }

  // Update restaurant description
  async updateRestaurantDescription(id: number, description: string) {
    return await prisma.restaurant.update({
      where: { id },
      data: { description },
    });
  }

  // Update restaurant status (open/closed)
  async updateRestaurantStatus(id: number, isOpen: boolean) {
    return await prisma.restaurant.update({
      where: { id },
      data: { is_opened: isOpen },
    });
  }

  // Delete restaurant
  async deleteRestaurant(id: number) {
    return await prisma.restaurant.delete({
      where: { id },
    });
  }
}

export default new RestaurantService();
