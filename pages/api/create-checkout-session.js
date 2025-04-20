import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51REeIXQTOy2eD5AmCiNVkaZRXQO85J7LrcxCxVvU2QsgxyAqzF5rd6WkzZX3msCKAAit1e0ERuzjxKZfgN78w3ar00IAkbHCye', {
  apiVersion: '2023-10-16', // Use the latest API version
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log('Creating Stripe checkout session...');
    
    // Get domain from request headers
    const origin = req.headers.origin || 'http://localhost:3000';
    
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
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });
    
    console.log('Session created successfully:', session.id);
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
