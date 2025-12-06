import { prismaClient } from "../utils/database-util";
import { ResponseError } from "../error/response-error";
import {
  CreateRestaurantDTO as RestaurantCreateRequest,
  UpdateRestaurantDTO as RestaurantUpdateRequest,
} from "../models/restaurant-model";
import { RestaurantValidation } from "../../validations/restaurant-validation";
import { Validation } from "../../validations/validation";

export class RestaurantService {
  //create new restaurant
  static async create(request: RestaurantCreateRequest) {
    const normalized = {
      name: (request as any).name,
      description: (request as any).description,
      isOpened: (request as any).isOpened ?? (request as any).is_opened,
    };

    const validatedData = Validation.validate(RestaurantValidation.CREATE, normalized as any);

    const restaurant = await prismaClient.restaurant.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        is_opened: validatedData.isOpened ?? true,
      },
    });

    return restaurant;
  }
  //list all restaurant
  static async list(status?: string) {
    const whereClause: { is_opened?: boolean } = {};

    if (status === 'opened') {
      whereClause.is_opened = true;
    } else if (status === 'closed') {
      whereClause.is_opened = false;
    }

    const restaurants = await prismaClient.restaurant.findMany({
      where: whereClause,
      orderBy: {
        id: 'desc'
      }
    });

    return restaurants;
  }
  //get restaurant by id
  static async get(id: number) {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id }
    });

    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found!");
    }

    return restaurant;
  }
  //update restaurant
  static async update(id: number, request: RestaurantUpdateRequest) {
    const normalized = {
      name: (request as any).name,
      description: (request as any).description,
      isOpened: (request as any).isOpened ?? (request as any).is_opened,
    };

    const validatedData = Validation.validate(RestaurantValidation.UPDATE, normalized as any);

    const restaurantCheck = await prismaClient.restaurant.count({ where: { id } });

    if (restaurantCheck === 0) {
      throw new ResponseError(404, "Restaurant not found!");
    }

    const dataToUpdate: any = {};
    if (validatedData.name !== undefined) dataToUpdate.name = validatedData.name;
    if (validatedData.description !== undefined) dataToUpdate.description = validatedData.description;
    if (validatedData.isOpened !== undefined) dataToUpdate.is_opened = validatedData.isOpened;

    const restaurant = await prismaClient.restaurant.update({
      where: { id },
      data: dataToUpdate
    });

    return restaurant;
  }

  //delete restaurant
  static async delete(id: number) {
    const restaurantCheck = await prismaClient.restaurant.count({ where: { id } });

    if (restaurantCheck === 0) {
      throw new ResponseError(404, "Restaurant not found!");
    }

    await prismaClient.restaurant.delete({ where: { id } });

    return "Restaurant data has been deleted successfully!";
  }
}
