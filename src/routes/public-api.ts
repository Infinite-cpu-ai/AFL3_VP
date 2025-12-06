import { Router } from 'express';
import { CustomerController } from "../controllers/customer-controller"
import { RestaurantController } from "../controllers/restaurant-controller"
import { OrderController } from "../controllers/order-controller"

const publicRouter = Router()

// --- CUSTOMER API ---
publicRouter.post("/customers", CustomerController.create)
publicRouter.get("/customers", CustomerController.list)
publicRouter.get("/customers/:customerId", CustomerController.get) 
publicRouter.patch("/customers/:customerId", CustomerController.update) 
publicRouter.delete("/customers/:customerId", CustomerController.delete)

// --- RESTAURANT API ---
publicRouter.post("/restaurants", RestaurantController.create)
publicRouter.get("/restaurants", RestaurantController.list)
publicRouter.get("/restaurants/filter/opened", RestaurantController.list)
publicRouter.get("/restaurants/filter/closed", RestaurantController.list)
publicRouter.get("/restaurants/:restaurantId", RestaurantController.get)
publicRouter.patch("/restaurants/:restaurantId", RestaurantController.update)
publicRouter.delete("/restaurants/:restaurantId", RestaurantController.delete)

// --- ORDER API ---
publicRouter.post("/orders", OrderController.create)
publicRouter.get("/orders", OrderController.list)
publicRouter.get("/orders/time", OrderController.time)
publicRouter.get("/orders/eta", OrderController.eta)
publicRouter.get("/orders/customer/:customerId", OrderController.list)
publicRouter.get("/orders/restaurant/:restaurantId", OrderController.list)

export default publicRouter