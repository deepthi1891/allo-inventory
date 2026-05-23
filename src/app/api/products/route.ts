export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const inventories = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  const formatted = inventories.map((item) => ({
    inventoryId: item.id,

    product: {
      id: item.product.id,
      name: item.product.name,
      description: item.product.description,
    },

    warehouse: {
      id: item.warehouse.id,
      name: item.warehouse.name,
      location: item.warehouse.location,
    },

    totalUnits: item.totalUnits,
    reservedUnits: item.reservedUnits,

    availableUnits:
      item.totalUnits - item.reservedUnits,
  }));

  return NextResponse.json(formatted);
}