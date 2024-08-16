import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    // Validate the plan ID
    if (!plan) {
      throw new Error('Plan ID is required');
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan, // The Stripe price ID for the plan
          quantity: 1,
        },
      ],
      mode: 'subscription', // Change to 'payment' for one-time payments
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/canceled`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Error creating Stripe Checkout Session:', err);
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
}
