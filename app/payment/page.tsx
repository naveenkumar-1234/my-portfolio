"use client";

import { useState } from "react";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // Call your backend API to create a Razorpay preference
    const res = await fetch("/api/createPreference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }), // ₹1 = 100 paise
    });

    const data = await res.json();
    setLoading(false);

    if (!data.id) {
      console.error("Failed to create Razorpay preference:", data);
      alert("Failed to create Razorpay preference");
      return;
    }

    // Open Razorpay Checkout
    const options: any = {
      key: "rzp_test_RAG1WIHfDsximq", // Test Key ID
      preference_id: data.id,
      handler: function (response: any) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Razorpay Test Payment</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Loading..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
