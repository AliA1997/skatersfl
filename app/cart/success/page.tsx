import PaymentSuccessInfo from "@/components/cart/PaymentSuccessInfo";
import StripeElementsProvider from "@/components/stripe-elements-provider";
import { callApi } from "@/lib/apiClient";


export const runtime = "edge"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
  };
}) {
  const paymentIntentId = searchParams.payment_intent;
  const paymentIntentClientSecret = searchParams.payment_intent_client_secret;

  await callApi("POST", `/api/stripe/capture-payment?paymentId=${encodeURIComponent(paymentIntentId)}`, {paymentIntentClientSecret: paymentIntentClientSecret })

  return (
    <>
      <StripeElementsProvider total={0} clientSecret={paymentIntentClientSecret}>
          <div className='py-2'>
            <PaymentSuccessInfo paymentIntentId={paymentIntentId} paymentIntentClientSecret={paymentIntentClientSecret} />
          </div>
      </StripeElementsProvider>
    </>
  );
}
