"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
    total: number;
    clientSecret: any;
}

export default function StripeElementsProvider({ children, clientSecret, total }: React.PropsWithChildren<Props>) {
    return (
        <Elements stripe={stripePromise} options={{
            clientSecret,
           appearance: {
                theme: 'night'
            },
        }}>
            {children}
        </Elements>
    );
}