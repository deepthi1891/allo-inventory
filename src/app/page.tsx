"use client";

import { useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Samsung Galaxy S24",
      warehouse: "Mumbai",
      total: 10,
      reserved: 9,
    },
    {
      id: 2,
      name: "iPhone 15",
      warehouse: "Delhi",
      total: 5,
      reserved: 5,
    },
  ]);

  const [msg, setMsg] = useState("");

  const reserve = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const available = p.total - p.reserved;

          if (available <= 0) {
            setMsg("❌ Out of Stock");
            return p;
          }

          setMsg("Reserved Successfully");

          return {
            ...p,
            reserved: p.reserved + 1,
          };
        }
        return p;
      })
    );

    setTimeout(() => setMsg(""), 1500);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Inventory System</h1>

      {msg && <div style={styles.message}>{msg}</div>}

      <div style={styles.grid}>
        {products.map((p) => {
          const available = p.total - p.reserved;
          const isOut = available <= 0;

          return (
            <div key={p.id} style={styles.card}>
              <h2 style={styles.productName}>{p.name}</h2>

              <p> Warehouse: {p.warehouse}</p>
              <p> Total: {p.total}</p>
              <p> Reserved: {p.reserved}</p>

              <p
                style={{
                  color: isOut ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {isOut ? "OUT OF STOCK" : `Available: ${available}`}
              </p>

              <button
                onClick={() => reserve(p.id)}
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
  },
};