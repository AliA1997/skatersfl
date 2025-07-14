import { PaymentIntent } from "@stripe/stripe-js";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function totalInCents(price: number, quantity: number): number {
  const priceInCents = Math.round(price * 100);
  const totalInCents = quantity * priceInCents;
  return totalInCents;
}

export const isPaymentSuccessful = (status: PaymentIntent.Status) => status === "succeeded";
export function getDisplayTextFromIntentStatus(status: PaymentIntent.Status) {
  let result = '';
  switch (status) {
    case "succeeded":
      result = "Payment is successful";
      break;
    case "processing":
      result = "Payment is processing, please wait some time";
      break;
    case "requires_action":
    case "requires_capture":
      result = "Something went wrong, please try again.";
      break;
    case "requires_payment_method":
      result = "You need to select a payment method to use to purchase your cart.";
      break;
    case "requires_confirmation":
      result = "You payment requires confirmation from your payment provider";
      break;
    case "succeeded":
      result = "Payment Successful";
      break;
    case "canceled":
      result = "Payment cancelled, please try again.";
      break;
    default:
      break;
  }

  return result;
}