import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

function CartPage() {
  const { cart, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>;
  }

  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  function handlePlaceOrder(details) {
    placeOrder(details);
    navigate("/orders");
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}

export default CartPage;