import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export class CustomerService {
  // Create new customer (name + phone)
  static async create(data: { name: string; phone: string }) {
    return await prisma.customer.create({
      data: {
        name: data.name,
        phone: data.phone,
      },
    });
  }

  // List all customers
  static async list() {
    return await prisma.customer.findMany();
  }

  // Get customer by ID
  static async get(id: number) {
    return await prisma.customer.findUnique({
      where: { id },
    });
  }

  // Update customer fields
  static async update(id: number, data: { name?: string; phone?: string }) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.phone !== undefined) updateData.phone = data.phone;

    return await prisma.customer.update({
      where: { id },
      data: updateData,
    });
  }

  // Delete customer
  static async delete(id: number) {
    return await prisma.customer.delete({ where: { id } });
  }
}

export default CustomerService;
