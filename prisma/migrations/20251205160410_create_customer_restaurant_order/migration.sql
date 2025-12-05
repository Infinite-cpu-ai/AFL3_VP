/*
  Warnings:

  - You are about to drop the `customer_restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_restaurants" DROP CONSTRAINT "customer_restaurants_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customer_restaurants" DROP CONSTRAINT "customer_restaurants_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_restaurantId_fkey";

-- DropTable
DROP TABLE "customer_restaurants";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "restaurants";

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "is_opened" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "item_amount" INTEGER NOT NULL,
    "order_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE INDEX "order_customer_id_idx" ON "order"("customer_id");

-- CreateIndex
CREATE INDEX "order_restaurant_id_idx" ON "order"("restaurant_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
