import { StripeCapturePaymentRequest, StripePaymentIntentProductMetadata } from "@/lib/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

async function POST_CAPTURE_PAYMENT(
    request: Request
) {
    const { searchParams } = new URL(request.url);

    const customerId = searchParams.get('customerId');
    const paymentId = searchParams.get('paymentId');
    console.log('customerId:', customerId);
    console.log('paymentId:', paymentId);
    
    let customer;
    let payment;
    try {
        const { paymentIntentClientSecret, customerInfo }: StripeCapturePaymentRequest = await request.json();
        console.log("customerInfo:", customerInfo);
        console.log('payment_secret from the body:', paymentIntentClientSecret);

        // if(!customerId) 
        //     throw new Error("customer identifier is required to capturing a payment");

        if(!paymentIntentClientSecret || !paymentId) 
            throw new Error("payment secret is required when capturing a payment.")

        payment = await stripe.paymentIntents.retrieve(paymentId!); 

        console.log('JSON stringified payment', JSON.stringify(payment));
        if(!payment) 
            throw new Error("A valid payment is required when capturing a payment.")

        // customer = await stripe.customers.update(customerId!, {});
        
        payment = await stripe.paymentIntents.capture(payment.id);

    } catch(err) {
        console.log("Error capture payment intent!", err);
        return Response.error();
    } finally {

        if(payment)
            return Response.json({
                paymentIntent: payment,
                customer: customer,
            });
        else
            return Response.error();
    }

}

export { POST_CAPTURE_PAYMENT as POST };