'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function CheckoutPage() {
  const handleCheckout = async () => {
    const res = await fetch('pages/api/create-checkout-session.js', {
      method: 'POST',
    });
    const { id } = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-6">Support Inspirt Labs</h1>
        <p className="mb-8 text-lg text-gray-300">
          Buy a digital memory replica for $20 and preserve what matters most.
        </p>
        <button
          onClick={handleCheckout}
          className="px-6 py-3 rounded-2xl text-white text-lg font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          Buy for $20
        </button>
      </div>
    </div>
  );
}
