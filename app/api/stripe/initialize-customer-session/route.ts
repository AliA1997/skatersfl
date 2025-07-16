import { StripePaymentIntentProductMetadata, StripePaymentRequest } from "@/lib/types";
import { totalInCents } from "@/lib/utils";
import { getProductsByIDs } from "@/sanity/lib/sanity.query";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

async function POST_INITIALIZE_CUSTOMER_SESSION(
    request: NextRequest
) {
    const searchParams = new URLSearchParams(request.url);
    const searchParamCustomerId = searchParams.get('customerId');
    const newCustomer = !searchParamCustomerId;
    
    let paymentIntent;
    let customer;
    let customerSession;
    try {
        const { products }: StripePaymentRequest = await request.json();
        
        const productDict = new Map<string, StripePaymentIntentProductMetadata>();
        const productsInfo = await getProductsByIDs(products.map(p => p.id));
        
        
        products.map(p => {
            if(productDict.has(p.id)) {
                let iteratedProd = Object.assign({}, productDict.get(p.id));
                iteratedProd!.quantity += p.quantity;
                iteratedProd!.totalCost = totalInCents(p.price, iteratedProd!.quantity);
                productDict.delete(p.id)
                productDict.set(p.id, iteratedProd);
            } else {
                let realProdPrice = productsInfo.find((prodInfo: any) => prodInfo._id === p.id).price;
                productDict.set(p.id, {
                    id: p.id,
                    quantity: p.quantity,
                    priceOfEach: realProdPrice,
                    totalCost: totalInCents(realProdPrice, p.quantity)
                } as StripePaymentIntentProductMetadata)
            }
        });
        const productMetadataArray = Array.from(productDict.values());
        

        if(newCustomer) {
            customer = await stripe.customers.create({
                tax_exempt: 'exempt'
            })
        }

        paymentIntent = await stripe.paymentIntents.create({
            amount: productMetadataArray.reduce((t: number, item: StripePaymentIntentProductMetadata) => t += item.totalCost, 0),
            currency: 'usd',
            metadata: {
                items: JSON.stringify(productMetadataArray),
            },
            payment_method_configuration: process.env.STRIPE_PAYMENT_CONFIGURATION!,
            customer: customer?.id ?? searchParamCustomerId!,
            confirmation_method: 'automatic',
            capture_method: 'manual'
        });

        customerSession = await stripe.customerSessions.create({
            customer: customer?.id ?? searchParamCustomerId!,
            components: {
                payment_element: {
                    enabled: true,
                    features: {
                        payment_method_redisplay: 'enabled',
                        payment_method_save: 'enabled',
                        payment_method_save_usage: 'off_session',
                        payment_method_remove: 'enabled'
                    }
                }
            }
        });

    } catch(err) {
        console.log("Error post payment intent!", err);
        return Response.error();
    } finally {

        if(paymentIntent)
            return Response.json({
                customerId: customer?.id ?? searchParamCustomerId,
                clientSecret: paymentIntent.client_secret,
                customerSessionClientSecret: customerSession?.client_secret
            });
        else
            return Response.error();
    }

}

export { POST_INITIALIZE_CUSTOMER_SESSION as POST };