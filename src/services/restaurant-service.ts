import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export class RestaurantService {
  // Create new restaurant
  static async create(data: { name: string; description: string; is_opened?: boolean }) {
    return await prisma.restaurant.create({
      data: {
        name: data.name,
        description: data.description,
        is_opened: data.is_opened !== undefined ? data.is_opened : true,
      },
    });
  }

  // List restaurants; optional status filter ('opened'|'closed')
  static async list(status?: string) {
    if (status === 'opened') {
      return await prisma.restaurant.findMany({ where: { is_opened: true }, include: { orders: true } });
    }
    if (status === 'closed') {
      return await prisma.restaurant.findMany({ where: { is_opened: false }, include: { orders: true } });
    }
    return await prisma.restaurant.findMany({ include: { orders: true } });
  }

  // Get restaurant by ID with relations
  static async get(id: number) {
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

  // Update restaurant (accepts partial fields)
  static async update(id: number, data: { name?: string; description?: string; is_opened?: boolean }) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.is_opened !== undefined) updateData.is_opened = data.is_opened;

    return await prisma.restaurant.update({ where: { id }, data: updateData });
  }

  // Delete restaurant
  static async delete(id: number) {
    return await prisma.restaurant.delete({ where: { id } });
  }
}

export default RestaurantService;
