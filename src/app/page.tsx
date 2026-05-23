export default function HomePage() {

  const products = [
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
      availableUnits: 8,
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
      availableUnits: 4,
    },
  ];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Inventory System
      </h1>

      <div className="grid gap-4">
        {products.map((item) => (
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
              Available Units: {item.availableUnits}
            </p>

            <button className="mt-3 px-4 py-2 bg-black text-white rounded">
              Reserve
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}