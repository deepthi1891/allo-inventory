export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Inventory System</h1>

      <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>
        <h2>Samsung Galaxy S24</h2>
        <p>Warehouse: Mumbai Warehouse</p>
        <p>Available Units: 8</p>
        <button>Reserve</button>
      </div>

      <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>
        <h2>iPhone 15</h2>
        <p>Warehouse: Delhi Warehouse</p>
        <p>Available Units: 4</p>
        <button>Reserve</button>
      </div>
    </main>
  );
}