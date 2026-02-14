import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "../compontes/Navbar";
import Footer from "../compontes/Footer";

export default function PremiumPage() {
  const plans = [
    {
      id: 1,
      name: "Weekly",
      amount: 9900,
      price: "₹99",
      duration: "per week",
      features: [
        "Unlimited Projects",
        "Priority Support",
        "Premium Resources",
      ],
    },
    {
      id: 2,
      name: "Monthly",
      amount: 29900,
      price: "₹299",
      duration: "per month",
      popular: true,
      features: [
        "Everything in Weekly",
        "Advanced Analytics",
        "Team Access",
        "Faster API",
      ],
    },
    {
      id: 3,
      name: "Yearly",
      amount: 299900,
      price: "₹2999",
      duration: "per year",
      features: [
        "Everything in Monthly",
        "1-on-1 Mentorship",
        "Early Feature Access",
        "Best Value",
      ],
    },
  ];

  /* ---------------- Load Razorpay Once ---------------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* ---------------- Handle Payment ---------------- */
  const handleBuy = async (plan) => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded. Please refresh.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/payments/create-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: plan.amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: "INR",
        name: "CodeCraft Platform",
        description: `${plan.name} Premium Plan`,
        order_id: orderData.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              "http://localhost:8000/payments/verify-payment/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
              }
            );

            if (!verifyRes.ok) {
              throw new Error("Verification failed");
            }

            alert("Payment Verified. Premium Activated!");
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "User",
          email: "user@example.com",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again later.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Upgrade to <span className="text-indigo-600">Premium</span>
          </h1>

          <p className="text-gray-600 text-lg mb-16">
            Choose the plan that fits your goals
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 border transition-all hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-indigo-600 scale-105"
                    : "border-gray-200"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}

                {/* Plan Name */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>

                {/* Price */}
                <div className="my-6">
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">
                    / {plan.duration}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 text-left mb-8">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <CheckCircle size={18} className="text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => handleBuy(plan)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-900 text-white hover:bg-indigo-600"
                  }`}
                >
                  Buy {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
