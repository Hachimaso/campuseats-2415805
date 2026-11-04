import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  if (!orders || orders.length === 0) {
    return <p className="muted">No past orders yet.</p>;
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ marginBottom: "1rem" }}>
            <h3>Order #{order.id.slice(-4)}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mahallah:</strong> {order.mahallah}</p>
            <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
            <p><strong>Total Paid:</strong> RM {order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;