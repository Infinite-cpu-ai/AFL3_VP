import { prismaClient } from '../utils/database-util';
import { ResponseError } from '../error/response-error';
import {
  CreateCustomerDTO as CustomerCreateRequest,
  UpdateCustomerDTO as CustomerUpdateRequest,
} from '../models/customer-model';
import { CustomerValidation } from '../../validations/customer-validation';
import { Validation } from '../../validations/validation';

export class CustomerService {
  // Create new customer 
  static async create(request: CustomerCreateRequest) {
    const validated = Validation.validate(CustomerValidation.CREATE, request as any);

    const customer = await prismaClient.customer.create({
      data: {
        name: validated.name,
        phone: validated.phone,
      },
    });

    return customer;
  }

  // List all customers
  static async list() {
    return await prismaClient.customer.findMany({ orderBy: { id: 'desc' } });
  }

  // Get customer by ID
  static async get(id: number) {
    const customer = await prismaClient.customer.findUnique({ where: { id } });

    if (!customer) {
      throw new ResponseError(404, 'Customer not found!');
    }

    return customer;
  }

  // Update customer fields
  static async update(id: number, request: CustomerUpdateRequest) {
    const validated = Validation.validate(CustomerValidation.UPDATE, request as any);

    const count = await prismaClient.customer.count({ where: { id } });
    if (count === 0) {
      throw new ResponseError(404, 'Customer not found!');
    }

    const updateData: any = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.phone !== undefined) updateData.phone = validated.phone;

    const updated = await prismaClient.customer.update({ where: { id }, data: updateData });
    return updated;
  }

  // Delete customer
  static async delete(id: number) {
    const count = await prismaClient.customer.count({ where: { id } });
    if (count === 0) {
      throw new ResponseError(404, 'Customer not found!');
    }

    await prismaClient.customer.delete({ where: { id } });
    return 'Customer data has been deleted successfully!';
  }
}

export default CustomerService;
