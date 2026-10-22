import { useState } from "react";

const MAHALLAHS = [
  "Ali",
  "Siddiq",
  "Aminah",
  "Faruq",
  "Asiah",
  "Bilal",
  "Hafsa",
  "Uthman",
  "Zubair",
];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3)
    errors.name = "Enter your name (at least 3 characters).";
  if (!values.mahallah) errors.mahallah = "Please select a mahallah.";
  if (!values.pickupTime) {
    errors.pickupTime = "Please select a pickup time.";
  } else {
    const [hours, minutes] = values.pickupTime.split(":").map(Number);
    if (
      hours < 7 ||
      (hours === 7 && minutes < 0) ||
      hours > 22 ||
      (hours === 22 && minutes > 0)
    ) {
      errors.pickupTime = "Please select a time between 07:00 and 22:00.";
    }
  }
  return errors;
}

function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState({
    name: "",
    mahallah: "",
    pickupTime: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    // Call onPlaceOrder if no validation errors are found
    if (Object.keys(found).length === 0) {
      onPlaceOrder(values);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        name="mahallah"
        value={values.mahallah}
        onChange={handleChange}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      <label htmlFor="pickupTime">Pickup Time</label>
      <input
        type="time"
        id="pickupTime"
        name="pickupTime"
        value={values.pickupTime}
        onChange={handleChange}
      />
      {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      <button type="submit" className="btn">
        Place order
      </button>
    </form>
  );
}

export default CheckoutForm;
