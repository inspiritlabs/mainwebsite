import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51REeIXQTOy2eD5AmCiNVkaZRXQO85J7LrcxCxVvU2QsgxyAqzF5rd6WkzZX3msCKAAit1e0ERuzjxKZfgN78w3ar00IAkbHCye', {
  apiVersion: '2023-10-16', // Use the latest API version
});

export async function POST() {
  try {
    console.log('Creating Stripe checkout session...');
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Digital Memory Replica',
              description: 'Your AI-powered tribute, hosted forever.',
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cancel`,
    });
    
    console.log('Session created successfully:', session.id);
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
