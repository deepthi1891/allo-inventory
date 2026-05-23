import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      inventoryId: 1,
      product: {
        id: 1,
        name: "Samsung Galaxy S24",
        description: "Flagship Android Phone",
      },
      warehouse: {
        id: 1,
        name: "Mumbai Warehouse",
        location: "Mumbai",
      },
      totalUnits: 10,
      reservedUnits: 2,
      availableUnits: 8,
    },
    {
      inventoryId: 2,
      product: {
        id: 2,
        name: "iPhone 15",
        description: "Apple Smartphone",
      },
      warehouse: {
        id: 2,
        name: "Delhi Warehouse",
        location: "Delhi",
      },
      totalUnits: 5,
      reservedUnits: 1,
      availableUnits: 4,
    },
  ]);
}