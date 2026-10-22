import { useState, useEffect } from "react";

function SpecialBanner({ specialItem }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    // Sets end of deal to today at 10:00 PM (22:00)
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(30, 0, 0, 0);

    const diff = endTime - now;
    if (diff <= 0) return "Offer ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  }

  useEffect(() => {
    // Update timer every 1000ms (1 second)
    const timerId = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    // B6 requirement: cleanup function clearing the interval
    return () => clearInterval(timerId);
  }, []);

  if (!specialItem) return null;

  return (
    <div
      className="card special-banner"
      style={{
        background: "#e6f4ea",
        border: "1px solid #34a853",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ margin: 0, color: "#137333" }}>⭐ Today's Daily Special!</h3>
      <p style={{ margin: "0.5rem 0" }}>
        <strong>{specialItem.name}</strong> - RM {specialItem.price.toFixed(2)}
      </p>
      <p style={{ margin: 0, fontWeight: "bold", color: "#b3261e" }}>
        ⏰ Deal ends in: {timeLeft}
      </p>
    </div>
  );
}

export default SpecialBanner;
