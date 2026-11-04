import { useState, useEffect } from "react";
import { Link } from "react-router"; // 1. Import Link from react-router

function SpecialBanner({ specialItem, vendorId }) {
  // 2. Accept vendorId prop
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0);

    const diff = endTime - now;
    if (diff <= 0) return "Offer ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!specialItem || !vendorId) return null;

  return (
    // 3. Wrap banner in Link to /vendor/:vendorId
    <Link
      to={`/vendor/${vendorId}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        className="card special-banner"
        style={{
          background: "#e6f4ea",
          border: "1px solid #34a853",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <h3 style={{ margin: 0, color: "#137333" }}>
          ⭐ Today's Daily Special!
        </h3>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>{specialItem.name}</strong> - RM{" "}
          {specialItem.price.toFixed(2)}
        </p>
        <p style={{ margin: 0, fontWeight: "bold", color: "#b3261e" }}>
          ⏰ Deal ends in: {timeLeft}
        </p>
      </div>
    </Link>
  );
}

export default SpecialBanner;
