"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
    total: number;
    clientSecret: any;
}

export default function StripeElementsProvider({ children, clientSecret, total }: React.PropsWithChildren<Props>) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

        const inDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(inDarkMode || savedTheme === "dark");
    }, []);

    return (
        <Elements stripe={stripePromise} options={{
            clientSecret,
           appearance: {
                theme: isDarkMode ? 'night' : 'stripe'
            },
        }}>
            {children}
        </Elements>
    );
}