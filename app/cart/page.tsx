"use client";
import CartOrderTable from "@/components/cart/CartOrderTable";
import CartForm from "@/components/cart/CartForm";
import { useEffect, useMemo, useState } from "react";
import { Product, useCartStore } from "@/store/useCartStore";
import StripeElementsProvider from "@/components/stripe-elements-provider";
import { StripePaymentRequest } from "@/lib/types";
import * as z from 'zod'
import PaymentSuccessInfo from "@/components/cart/PaymentSuccessInfo";
import { Loader, Loader2 } from "lucide-react";

export const runtime = "edge";

export default function CartPage({
  searchParams,
}: {
  searchParams: {
    paymentIntentId: string | undefined;
    success: boolean | undefined;
  };
}) {
  const [clientSecretState, setClientSecretState] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);
  const { cart, totalAmount, resetCart } = useCartStore();
  const totalAmountInCents = useMemo(() => (parseFloat(totalAmount.toFixed(2)) * 100).toFixed(2),  [totalAmount]);
  const showSuccess = useMemo(() => (!!searchParams.paymentIntentId && !!searchParams.success), [searchParams]);

  async function startPaymentIntent() {
    // alert(JSON.stringify(cart))
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

      console.log("RESPONSE JSON:", responseJson);

      setClientSecretState(responseJson.clientSecret);
  }

  useEffect(() => {
    if(cart.length && !mounted) {
      if(!showSuccess)
        startPaymentIntent();
    }

  }, [cart, mounted]);

  useEffect(() => {
    if(showSuccess && searchParams.paymentIntentId) {
      setClientSecretState(searchParams.paymentIntentId)
    }


    setMounted(true);

    
    return () => {
      setMounted(false);
    }

  }, [searchParams]);

  console.log('mounted:', mounted);
  console.log('clientSecretState:', clientSecretState)

  if(mounted && clientSecretState)
    return (
      <section className="p-2">
        <StripeElementsProvider total={parseFloat(totalAmountInCents)} clientSecret={clientSecretState}>
          {!showSuccess && (
            <>
              <CartOrderTable />
              <div className="py-2">
                <h1 className="p-2 text-2xl font-bold">Checkout</h1>
                <CartForm stripePaymentIntentId={clientSecretState} />
              </div>
            </>
          )}
          {showSuccess && (
            <div className='py-2'>
               <PaymentSuccessInfo paymentIntentId={searchParams.paymentIntentId} />
            </div>
          )}
        </StripeElementsProvider>
      </section>
    );
  if(mounted && !(cart && cart.length))
    return (
      <p>No items have been added to cart.</p>
    );

  return <div className='flex justify-center'><Loader2 size={100} className="animate-spin"/></div>
}
