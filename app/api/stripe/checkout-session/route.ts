import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", // Updated to latest stable API version
});

export async function POST(request: Request) {
  try {
    // Optional: Validate request body if you expect any data
    // const body = await request.json();
    
    // Create a checkout session with your pricing params
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/canceled`,
      automatic_tax: { enabled: true }, // Recommended for tax compliance
    });

    return NextResponse.json({
      checkoutSessionClientSecret: session.client_secret,
      sessionId: session.id, // Useful for client-side reference
    });
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err);
    
    return NextResponse.json(
      { 
        error: err instanceof Error ? err.message : 'Internal server error',
        details: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}