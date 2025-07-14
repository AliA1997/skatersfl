import PaymentSuccessInfo from "@/components/cart/PaymentSuccessInfo";
import StripeElementsProvider from "@/components/stripe-elements-provider";


export const runtime = "edge"

export default function SuccessPage({
  searchParams,
}: {
  searchParams: {
    paymentIntentId: string;
    redirect_status: string;
  };
}) {
  const paymentIntentId = searchParams.paymentIntentId;

  return (
    <>
      <StripeElementsProvider total={0} clientSecret={paymentIntentId}>
          <div className='py-2'>
            <PaymentSuccessInfo paymentIntentId={searchParams.paymentIntentId} redirectStatus={searchParams.redirect_status} />
          </div>
      </StripeElementsProvider>
    </>
  );
}
