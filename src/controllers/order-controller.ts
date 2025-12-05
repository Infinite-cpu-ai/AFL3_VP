import { Request, Response, NextFunction } from 'express';
import { CreateOrderDTO as OrderCreateRequest } from '../models/order-model';
import OrderService from '../services/order-service';

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: OrderCreateRequest = req.body as OrderCreateRequest;

      const order = await OrderService.createOrder({
        customerId: request.customer_id,
        restaurantId: request.restaurant_id,
        itemCount: request.item_amount,
      });

      res.status(200).json({ data: order });
    } catch (error: any) {
      if (error.message === 'Customer not found' || error.message === 'Restaurant not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.query.customerId ? Number(req.query.customerId) : undefined;
      const restaurantId = req.query.restaurantId ? Number(req.query.restaurantId) : undefined;

      let response;
      if (customerId) {
        response = await OrderService.getOrdersByCustomer(customerId);
      } else if (restaurantId) {
        response = await OrderService.getOrdersByRestaurant(restaurantId);
      } else {
        response = await OrderService.getOrdersWithTime();
      }

      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}

export const createOrder = (req: Request, res: Response, next: NextFunction) =>
  OrderController.create(req, res, next);

export const listOrders = (req: Request, res: Response, next: NextFunction) =>
  OrderController.list(req, res, next);

