import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { productId, warehouseId, quantity = 1 } = await req.json();

    const inventory = await prisma.inventory.findFirst({
      where: {
        productId,
        warehouseId,
      },
    });

    if (!inventory) {
      return Response.json({ message: "Inventory not found" }, { status: 404 });
    }

    const available = inventory.totalUnits - inventory.reservedUnits;

    if (available < quantity) {
      return Response.json({ message: "Out of stock" }, { status: 400 });
    }

    const updated = await prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        reservedUnits: inventory.reservedUnits + quantity,
      },
    });

    return Response.json({
      message: "Reserved successfully",
      inventory: updated,
    });
  } catch (error) {
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}