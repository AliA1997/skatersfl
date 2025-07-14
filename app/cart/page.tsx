"use client";
import CartOrderTable from "@/components/cart/CartOrderTable";
import CartForm from "@/components/cart/CartForm";
import { useEffect, useMemo, useState } from "react";
import { Product, useCartStore } from "@/store/useCartStore";
import StripeElementsProvider from "@/components/stripe-elements-provider";
import { StripePaymentRequest } from "@/lib/types";
import LoadingSection from "@/components/LoadingSection";

export const runtime = "edge";

export default function CartPage() {
  const [clientSecretState, setClientSecretState] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const { cart, totalAmount, setPaymentIntentId, paymentIntentId } = useCartStore();
  const totalAmountInCents = useMemo(() => (parseFloat(totalAmount.toFixed(2)) * 100).toFixed(2),  [totalAmount]);

  async function startPaymentIntent() {
      const cartProducts = cart.map((item: Product) => ({
          id: item._id,
          price: item.price,
          quantity: item.quantity
      }));

      const responseJson: any = await fetch("/api/stripe/payment", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              products: cartProducts,
          } as StripePaymentRequest),
      }).then((response) => response.json());

      setClientSecretState(responseJson.clientSecret);
      setPaymentIntentId(responseJson.clientSecret);
  }

  useEffect(() => {
    if(cart.length && !paymentIntentId && !mounted) {
      startPaymentIntent();
    }
    setMounted(true);

    return () => {
      setMounted(false);
    };

  }, [cart]);

  if(mounted && paymentIntentId)
    return (
      <section className="p-2">
        <StripeElementsProvider total={parseFloat(totalAmountInCents)} clientSecret={paymentIntentId}>
          {cart && cart.length ? (
            <>
              <CartOrderTable />
              <div className="py-2">
                <h1 className="p-2 text-2xl font-bold">Checkout</h1>
                <CartForm stripePaymentIntentId={paymentIntentId} />
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
