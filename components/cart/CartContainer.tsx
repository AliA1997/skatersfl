"use client";
import { StripePaymentRequest } from "@/lib/types";
import { Product, useCartStore } from "@/store/useCartStore";
import { useEffect, useMemo, useState } from "react";
import StripeElementsProvider from "../stripe-elements-provider";
import CartOrderTable from "./CartOrderTable";
import CartForm from "./CartForm";
import LoadingSection from "../LoadingSection";
import { callApi } from "@/lib/apiClient";

export default function CartContainer() {
    const [clientSecretState, setClientSecretState] = useState<string>('');
    const [mounted, setMounted] = useState<boolean>(false);
    const {
        cart,
        totalAmount,
        setPaymentIntentSecret,
        paymentIntentSecret,
        setCustomerId,
        customerId,
        setCustomerSessionId,
        customerSessionId
    } = useCartStore();
    const totalAmountInCents = useMemo(() => (parseFloat(totalAmount.toFixed(2)) * 100).toFixed(2), [totalAmount]);

    async function startPaymentIntent() {
        const cartProducts = cart.map((item: Product) => ({
            id: item._id,
            price: item.price,
            quantity: item.quantity
        }));
        let initializeApiUrl;
        if (customerId && customerSessionId)
            initializeApiUrl = `/api/stripe/initialize-customer-session?customerId=${customerId}&customerSessionId=${customerSessionId}`;
        else
            initializeApiUrl = "/api/stripe/initialize-customer-session";

        const responseJson: any = await callApi("POST", initializeApiUrl, { products: cartProducts } as StripePaymentRequest);

        debugger;
        setClientSecretState(responseJson.clientSecret);
        setCustomerId(responseJson.customerId);
        setPaymentIntentSecret(responseJson.clientSecret);
        setCustomerSessionId(responseJson.customerSessionClientSecret);
    }

    useEffect(() => {
        if (cart.length && !clientSecretState && !mounted) {
            startPaymentIntent()
                .then(() => {
                    setMounted(true);
                    debugger;
                });
        } else {
            setMounted(false);
        }

        return () => {
            setMounted(false);
        };

    }, [cart]);
    

    if (mounted && clientSecretState)
        return (
            <section className="p-2">
                <StripeElementsProvider total={parseFloat(totalAmountInCents)} clientSecret={clientSecretState}>
                    {cart && cart.length ? (
                        <>
                            <CartOrderTable />
                            <div className="py-2">
                                <h1 className="p-2 text-2xl font-bold">Checkout</h1>
                                <CartForm />
                            </div>
                        </>
                    ) : (
                        <p>No items have been added to cart.</p>
                    )}
                </StripeElementsProvider>
            </section>
        );

    return <LoadingSection />;
}