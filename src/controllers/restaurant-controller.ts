import { Request, Response, NextFunction } from "express";
import {
  CreateRestaurantDTO as RestaurantCreateRequest,
  UpdateRestaurantDTO as RestaurantUpdateRequest,
} from "../models/restaurant-model";
import { RestaurantService } from "../services/restaurant-service";
import { ResponseError } from "../error/response-error";

export class RestaurantController {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RestaurantCreateRequest = req.body as RestaurantCreateRequest;
      const response = await RestaurantService.create(request as any);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string | undefined;
            
      if (status && status !== 'opened' && status !== 'closed') {
        throw new ResponseError(
          400, 
          "Invalid status parameter. Use 'opened' or 'closed', or omit for all restaurants."
        );
      }
            
      const response = await RestaurantService.list(status);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      const response = await RestaurantService.get(restaurantId);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RestaurantUpdateRequest = req.body as RestaurantUpdateRequest;
      const restaurantId = Number(req.params.restaurantId);

      const response = await RestaurantService.update(restaurantId, request as any);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      const response = await RestaurantService.delete(restaurantId);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }
}
