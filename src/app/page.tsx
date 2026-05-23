"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  // Load from DB
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Reserve API
  const reserve = async (productId: string, warehouseId: string) => {
    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        warehouseId,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("Reserved Successfully");

      // refresh data
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else {
      setMsg(data.message || "Error");
    }

    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Inventory System</h1>

      {msg && <div style={styles.message}>{msg}</div>}

      <div style={styles.grid}>
        {products.map((p: any) => {
          const inventory = p.inventories?.[0];

          const total = inventory?.totalUnits || 0;
          const reserved = inventory?.reservedUnits || 0;
          const available = total - reserved;

          const isOut = available <= 0;

          return (
            <div key={p.id} style={styles.card}>
              <h2 style={styles.productName}>{p.name}</h2>

              <p>
                <b>Warehouse:</b>{" "}
                {inventory?.warehouse?.name || "No warehouse"}
              </p>

              <p>Total Units: {total}</p>
              <p>Reserved Units: {reserved}</p>

              <p
                style={{
                  color: isOut ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {isOut ? "OUT OF STOCK" : `Available: ${available}`}
              </p>

              <button
                onClick={() =>
                  reserve(p.id, inventory?.warehouseId)
                }
                disabled={isOut}
                style={{
                  ...styles.button,
                  backgroundColor: isOut ? "#ccc" : "#111",
                  cursor: isOut ? "not-allowed" : "pointer",
                }}
              >
                {isOut ? "Out of Stock" : "Reserve"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Styles
const styles: any = {
  page: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f6f7fb",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  message: {
    padding: "10px",
    marginBottom: "20px",
    background: "#e8fff0",
    border: "1px solid #2ecc71",
    borderRadius: "8px",
    width: "fit-content",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
  },
};