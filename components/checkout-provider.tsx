"use client";

import * as React from "react";
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const loadStripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const fetchClientSecret = async () => {

    return fetch('/api/stripe/checkout-session', { method: 'POST' })
        .then((response) => response.json())
        .then((json) => json.checkoutSessionClientSecret)
};

export function StripeCheckoutProvider({ children }: React.PropsWithChildren<any>) {
    return <CheckoutProvider stripe={loadStripePromise} options={{ fetchClientSecret }}>{children}</CheckoutProvider>
}
