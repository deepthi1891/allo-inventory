"use client";

import { useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Samsung Galaxy S24",
      warehouse: "Mumbai",
      total: 10,
      reserved: 2
    },
    {
      id: 2,
      name: "iPhone 15",
      warehouse: "Delhi",
      total: 5,
      reserved: 1
    }
  ]);

  const [message, setMessage] = useState("");

  const reserve = (id: number) => {

    setProducts(prev =>
      prev.map(p => {

        if (p.id === id) {

          const available = p.total - p.reserved;

          if (available <= 0) {
            setMessage("❌ No stock available");
            return p;
          }

          setMessage("✅ Reserved successfully");

          return {
            ...p,
            reserved: p.reserved + 1
          };
        }

        return p;
      })
    );

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <main style={{ padding: 30 }}>

      <h1>Inventory System</h1>

      {message && (
        <p style={{ marginTop: 10, color: "green" }}>
          {message}
        </p>
      )}

      {products.map(p => (
        <div key={p.id} style={{ marginTop: 20, border: "1px solid black", padding: 10 }}>

          <h2>{p.name}</h2>

          <p>Warehouse: {p.warehouse}</p>

          <p>Total: {p.total}</p>

          <p>Reserved: {p.reserved}</p>

          <p>Available: {p.total - p.reserved}</p>

          <button onClick={() => reserve(p.id)}>
            Reserve
          </button>

        </div>
      ))}

    </main>
  );
}