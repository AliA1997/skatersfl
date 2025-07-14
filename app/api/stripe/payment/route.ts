import { StripePaymentIntentProductMetadata, StripePaymentRequest } from "@/lib/types";
import { totalInCents } from "@/lib/utils";
import { getProductsByIDs } from "@/sanity/lib/sanity.query";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

async function POST_SUBMIT_PAYMENT(
    request: NextRequest
) {
    let paymentIntent;
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
        
        paymentIntent = await stripe.paymentIntents.create({
            amount: productMetadataArray.reduce((t: number, item: StripePaymentIntentProductMetadata) => t += item.totalCost, 0),
            currency: 'usd',
            metadata: {
                items: JSON.stringify(productMetadataArray),
            },
            payment_method_configuration: process.env.STRIPE_PAYMENT_CONFIGURATION!,
        });



    } catch(err) {
        console.log("Error post payment intent!", err);
        return Response.error();
    } finally {

        if(paymentIntent)
            return Response.json({
                clientSecret: paymentIntent.client_secret,
            });
        else
            return Response.error();
    }

}

export { POST_SUBMIT_PAYMENT as POST };