"use client";
import { AddressElement, CardCvcElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { StripeElements } from "@stripe/stripe-js";

type Props = {
    stripePaymentIntentId: string;
};

export default function CartForm({ stripePaymentIntentId }: Props) {
    const buttonRef = useRef(null);
    const formRef = useRef(null);
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
        console.log('elements card:', elements?.getElement('card'))

    const onSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await stripe!.confirmPayment({
            elements: elements as StripeElements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart/success?paymentIntentId=${stripePaymentIntentId}&success=true`,
            },
            redirect: 'if_required'
        });

        if (error) {
            console.log("errro:", error)
            alert(JSON.stringify(error));
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message || 'An error occurred.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        }

        setIsLoading(false);
    };

    return (
            <form
                onSubmit={onSubmit}
                className="space-y-8 p-2"
                ref={formRef}
            >
                <PaymentElement 
                    options={{
                        layout: {
                            type: 'tabs'
                        },  
                    }}
                />
                <AddressElement 
                    options={{ mode: 'billing' }} 
                />
                <Button
                    ref={buttonRef}
                    type="submit"
                    className="rounded-md px-4 py-2 text-white cursor-pointer hover:opacity-80"
                    style={{ cursor: 'cursor-pointer' }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className=" flex flex-row gap-2">
                            <span>Purchasing...</span>
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : (
                        "Buy Now"
                    )}
                </Button>
            </form>
    );
}