"use client";

import { useState } from "react";

export default function HomePage() {

  const [products, setProducts] = useState([
    {
      inventoryId: 1,
      product: {
        name: "Samsung Galaxy S24",
        description: "Flagship Android Phone",
      },
      warehouse: {
        name: "Mumbai Warehouse",
        location: "Mumbai",
      },
      totalUnits: 10,
      reservedUnits: 2,
    },
    {
      inventoryId: 2,
      product: {
        name: "iPhone 15",
        description: "Apple Smartphone",
      },
      warehouse: {
        name: "Delhi Warehouse",
        location: "Delhi",
      },
      totalUnits: 5,
      reservedUnits: 1,
    },
  ]);

  const reserveProduct = (inventoryId: number) => {

    setProducts((prev) =>
      prev.map((item) => {

        if (item.inventoryId === inventoryId) {

          const available =
            item.totalUnits - item.reservedUnits;

          if (available <= 0) {
            alert("No stock available");
            return item;
          }

          alert("Product Reserved Successfully");

          return {
            ...item,
            reservedUnits: item.reservedUnits + 1,
          };
        }

        return item;
      })
    );
  };

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Inventory System
      </h1>

      <div className="grid gap-4">

        {products.map((item) => {

          const availableUnits =
            item.totalUnits - item.reservedUnits;

          return (
            <div
              key={item.inventoryId}
              className="border p-4 rounded-lg"
            >

              <h2 className="text-xl font-semibold">
                {item.product.name}
              </h2>

              <p>{item.product.description}</p>

              <p>
                Warehouse: {item.warehouse.name}
              </p>

              <p>
                Location: {item.warehouse.location}
              </p>

              <p>
                Total Units: {item.totalUnits}
              </p>

              <p>
                Reserved Units: {item.reservedUnits}
              </p>

              <p>
                Available Units: {availableUnits}
              </p>

              <button
                onClick={() =>
                  reserveProduct(item.inventoryId)
                }
                className="mt-3 px-4 py-2 bg-black text-white rounded"
              >
                Reserve
              </button>

            </div>
          );
        })}
      </div>
    </main>
  );
}