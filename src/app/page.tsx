"use client";

import { useEffect, useState } from "react";

type ProductData = {
  inventoryId: string;

  product: {
    id: string;
    name: string;
    description: string;
  };

  warehouse: {
    id: string;
    name: string;
    location: string;
  };

  totalUnits: number;
  reservedUnits: number;
  availableUnits: number;
};

export default function HomePage() {

  const [products, setProducts] = useState<ProductData[]>([]);

  async function fetchProducts() {

    const response = await fetch("/api/products");

    const data = await response.json();

    setProducts(data);
  }

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-10">
        Inventory System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {products.map((item) => (

          <div
            key={item.inventoryId}
            className="bg-white border rounded-2xl p-6 shadow-lg"
          >

            <h2 className="text-2xl font-semibold">
              {item.product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {item.product.description}
            </p>

            <div className="mt-5 space-y-2">

              <p>
                <strong>Warehouse:</strong>{" "}
                {item.warehouse.name}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {item.warehouse.location}
              </p>

              <p>
                <strong>Total Units:</strong>{" "}
                {item.totalUnits}
              </p>

              <p>
                <strong>Reserved Units:</strong>{" "}
                {item.reservedUnits}
              </p>

              <p>
                <strong>Available Units:</strong>{" "}
                {item.availableUnits}
              </p>

            </div>

            <button
              disabled={item.availableUnits === 0}
              onClick={async () => {

                const response = await fetch(
                  "/api/reservations",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify({
                      productId: item.product.id,
                      warehouseId: item.warehouse.id,
                      quantity: 1,
                    }),
                  }
                );

                const data =
                  await response.json();

                if (response.ok) {

                  alert(
                    "Reservation Successful"
                  );

                  fetchProducts();

                } else {

                  alert(data.error);
                }
              }}
              className={`mt-6 px-5 py-2 rounded-lg text-white ${
                item.availableUnits === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {item.availableUnits === 0
                ? "Out of Stock"
                : "Reserve"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}