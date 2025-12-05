import { Request, Response, NextFunction } from "express";
import {
  CreateCustomerDTO as CustomerCreateRequest,
  UpdateCustomerDTO as CustomerUpdateRequest,
} from "../models/customer-model";
import { CustomerService } from "../services/customer-service";

export class CustomerController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CustomerCreateRequest = req.body as CustomerCreateRequest;
            const response = await CustomerService.create(request as any);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CustomerService.list();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.get(customerId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CustomerUpdateRequest = req.body as CustomerUpdateRequest;
            const customerId = Number(req.params.customerId);

            const response = await CustomerService.update(customerId, request as any);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.delete(customerId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}
