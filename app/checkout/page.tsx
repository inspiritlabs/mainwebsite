'use client';

import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51REeIXQTOy2eD5AmIwj2UF7iHwGPvmHlHKQhj0oheKnQ6AGXHNjXx9MXadsLFh1ApClIVVgfOYrsKnB9Juy9V2DY00BihMOBXv');

export default function CheckoutPage() {
  // Log when Stripe is loaded
  useEffect(() => {
    const checkStripe = async () => {
      const stripe = await stripePromise;
      console.log('Stripe loaded:', !!stripe);
    };
    checkStripe();
  }, []);

  const handleCheckout = async () => {
    console.log('Checkout button clicked');
    try {
      console.log('Fetching checkout session...');
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        console.error('Error response:', data);
        alert('Checkout failed: ' + (data.error || 'Unknown error'));
        return;
      }
      
      console.log('Loading Stripe...');
      const stripe = await stripePromise;
      
      if (!stripe) {
        console.error('Stripe failed to load');
        alert('Payment system not available');
        return;
      }
      
      console.log('Redirecting to checkout with session ID:', data.id);
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      
      if (error) {
        console.error('Redirect error:', error);
        alert('Payment redirect failed: ' + error.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Payment processing error');
    }
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
