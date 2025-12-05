/*
  Warnings:

  - You are about to drop the column `items` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "items",
ADD COLUMN     "estimatedArrival" TIMESTAMP(3),
ADD COLUMN     "itemCount" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "customer_restaurants" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_restaurants_customerId_restaurantId_key" ON "customer_restaurants"("customerId", "restaurantId");

-- AddForeignKey
ALTER TABLE "customer_restaurants" ADD CONSTRAINT "customer_restaurants_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_restaurants" ADD CONSTRAINT "customer_restaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
