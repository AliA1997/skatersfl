'use client';
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { Check, InfoIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getDisplayTextFromIntentStatus, isPaymentSuccessful } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

type Props = {
  paymentIntentId: string | undefined;
};

function PaymentSuccessInfoContainer({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-2 py-16 md:py-24">
      {children}
    </div>
  );
}

export default function PaymentSuccessInfo({ paymentIntentId }: Props) {
  const stripe = useStripe();
  const { cart, resetCart } = useCartStore();
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<PaymentIntent.Status | undefined>(undefined);
  const [currentPaymentIntent, setCurrentPaymentIntent] = useState<PaymentIntent | undefined>(undefined);


  const getPaymentStatus = async () => {
    const paymentIntentResult = await stripe?.retrievePaymentIntent(paymentIntentId!);
    if (!paymentIntentResult || !paymentIntentResult.paymentIntent)
      return;

    const { error, paymentIntent } = paymentIntentResult!;

    if (error)
      setMessage("Oh no, something went wrong with your transaction, contact support")
    else {
      setMessage('');
      setCurrentPaymentIntent(paymentIntent);
    }

    if(isPaymentSuccessful(paymentIntent.status))
      resetCart();

    setStatus(paymentIntent.status);
  };

  useEffect(() => {
    if (paymentIntentId)
      getPaymentStatus();

  }, [stripe]);

  
  if(!isPaymentSuccessful(status ?? "requires_action") && !(cart && cart.length)){
    return (
      <PaymentSuccessInfoContainer>
          <div className="rounded-full bg-gray-400 p-8">
            <InfoIcon size={100} />
          </div>
          <div>
            They are no items in your cart.
          </div>
      </PaymentSuccessInfoContainer>
    );
  }


  if (!message && currentPaymentIntent && isPaymentSuccessful(status ?? "requires_action")) {
    return (
      <PaymentSuccessInfoContainer>
        <div className="rounded-full bg-green-400 p-8">
          <Check size={100} />
        </div>
        <h1 className=" text-center text-4xl md:text-6xl">
          Thank you for your order
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-secondary p-4">
          <p className="text-center text-lg">
            The order details and a link to the payment has been sent to your{" "}
            <span className="underline">{currentPaymentIntent.receipt_email}</span> and{" "}
          </p>
          <p className="text-center text-lg">
            <span className="underline">Amount Paid: $#{currentPaymentIntent.amount}</span>
          </p>

          <div className="mt-4 flex flex-row gap-2">
            <Link href={"/"}>
              <Button variant={"secondary"}>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </PaymentSuccessInfoContainer>
    );
  }
  
  if (!isPaymentSuccessful(status ?? "requires_action")) {
    return (
      <PaymentSuccessInfoContainer>
        <div className="rounded-full bg-red-400 p-8">
          <X size={100} />
        </div>
        <div>
          {status && (
            <p>
              {getDisplayTextFromIntentStatus(status ?? "requires_action")}
            </p>
          )}
        </div>
      </PaymentSuccessInfoContainer>
    );
  }

  if (message) {
    return (
      <PaymentSuccessInfoContainer>
        <div className="rounded-full bg-red-400 p-8">
          <X size={100} />
        </div>
        <h1 className=" text-center text-4xl md:text-6xl">
          Oh no something went wrong.
        </h1>
        <div>
          {status && (
            <p>
              {getDisplayTextFromIntentStatus(status ?? "requires_action")}
            </p>
          )}
        </div>
        <div>
          {currentPaymentIntent?.cancellation_reason && (
            <p>
              {currentPaymentIntent?.cancellation_reason}
            </p>
          )}
        </div>
      </PaymentSuccessInfoContainer>
    );
  }

  return <div />
}