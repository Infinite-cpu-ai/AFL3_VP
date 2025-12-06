import 'dotenv/config';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  console.log('Clearing existing data...');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "order", "customer", "restaurant" RESTART IDENTITY CASCADE;');

  //CUSTOMERS
  console.log('Creating customers...');
  const customer1 = await prisma.customer.create({ data: { name: 'Wesley', phone: '+62 852-4610-0038' } });

  const customer2 = await prisma.customer.create({ data: { name: 'Bryan', phone: '+62 812-3488-1603' } });

  const customer3 = await prisma.customer.create({ data: { name: 'Mario', phone: '+62 819-3627-3663' } });

  console.log(`Created 3 customers`);

  //RESTAURANTS
  console.log('Creating restaurants...');
  const restaurant1 = await prisma.restaurant.create({ data: { name: 'Paus Puas', description: 'Cheapest snack in town', is_opened: true } });

  const restaurant2 = await prisma.restaurant.create({ data: { name: 'Cincau Classic', description: 'Juicy chicken smash and ice tea', is_opened: true } });

  const restaurant3 = await prisma.restaurant.create({ data: { name: 'Uncle Tan', description: 'Authentic Fried rice and kuah', is_opened: false } });

  console.log(`Created 3 restaurants`);

  const calculateETA = (itemCount: number): Date => {
    const now = new Date();
    const totalMinutes = itemCount * 10 + 10;
    now.setMinutes(now.getMinutes() + totalMinutes);
    return now;
  };

  //ORDERS
  console.log('Creating orders...');

  const order1 = await prisma.order.create({ data: { customer_id: customer1.id, restaurant_id: restaurant1.id, item_amount: 2 } });

  const order2 = await prisma.order.create({ data: { customer_id: customer2.id, restaurant_id: restaurant2.id, item_amount: 3 } });

  const order3 = await prisma.order.create({ data: { customer_id: customer3.id, restaurant_id: restaurant1.id, item_amount: 1 } });

  const order4 = await prisma.order.create({ data: { customer_id: customer1.id, restaurant_id: restaurant2.id, item_amount: 4 } });
  
  const order5 = await prisma.order.create({ data: { customer_id: customer2.id, restaurant_id: restaurant1.id, item_amount: 5 } });

  console.log(`Created 5 orders`);

  console.log('\nSeed completed successfully!\n');
  console.log('Summary:');
  console.log(`  - 3 Customers created`);
  console.log(`  - 3 Restaurants created (2 open, 1 closed)`);
  console.log(`  - 5 Orders created`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
