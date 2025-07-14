import { StripeCheckoutRequest } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", // Updated to latest stable API version
});

export async function POST(request: NextRequest) {
  try {
    const { data: values }: { data: StripeCheckoutRequest } = await request.json();

    if (!values.products || !values.products.length) {
      return NextResponse.json(
        { error: "No products provided" },
        { status: 400 }
      );
    }

    console.log('body passed into the post request:', values);

    // Calculate total amount
    const totalAmount = values.products.reduce(
      (sum, product) => sum + (product.price * product.quantity * 100), // Convert to cents
      0
    );

    // Prepare product metadata
    const productMetadata = values.products.reduce((acc, product, index) => {
      return {
        ...acc,
        [`product_${index}_id`]: product._id,
        [`product_${index}_name`]: product.title,
        [`product_${index}_quantity`]: product.quantity,
        [`product_${index}_categoryId`]: product.category._id,
      };
    }, {});

    // Create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        ...productMetadata,
        customer_name: values.customerDetails?.name || '',
        customer_email: values.customerDetails?.email || '',
      },
      // Add automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('payment Intent:', paymentIntent)
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}