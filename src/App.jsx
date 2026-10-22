import SpecialBanner from "./components/SpecialBanner.jsx";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]); // Array of { item, qty }
  const [view, setView] = useState("menu"); // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null);

  // B3: Add item or increment quantity
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (line) => line.item.id === item.id,
      );
      if (existingIndex > -1) {
        return prevCart.map((line, idx) =>
          idx === existingIndex ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prevCart, { item, qty: 1 }];
    });
  }

  // B3: Adjust quantity
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta };
          }
          return line;
        })
        .filter((line) => line.qty > 0),
    );
  }

  // B3: Remove item line
  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
  }

  // B5: Handle Order Placement
  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );
    setLastOrder({ ...details, total });
    setCart([]);
    setView("done");
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        if (data.length > 0) {
          setSelectedVendorId(data[0].id);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  // B3: Compute total quantity for badge
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  // Derive selected vendor and special item
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);
  const specialItem = selectedVendor?.menu.find((item) => item.special);

  // B3/B5: View conditional rendering
  let content;
  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <div className="card">
        <h2>Order Placed!</h2>
        <p>
          Thank you, <strong>{lastOrder?.name}</strong>.
        </p>
        <p>Pickup Mahallah: {lastOrder?.mahallah}</p>
        <p>Pickup Time: {lastOrder?.pickupTime}</p>
        <p>Total Paid: RM {lastOrder?.total.toFixed(2)}</p>
        <button className="btn" onClick={() => setView("menu")}>
          Back to Menu
        </button>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <SpecialBanner specialItem={specialItem} />
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  );
}

export default App;
