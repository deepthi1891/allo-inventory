import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
      location: "Bangalore",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Hyderabad Warehouse",
      location: "Hyderabad",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Apple smartphone",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Samsung Galaxy S24",
      description: "Samsung smartphone",
    },
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalUnits: 10,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalUnits: 5,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalUnits: 7,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });