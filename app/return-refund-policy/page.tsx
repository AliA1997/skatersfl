export default function ReturnRefundPolicy() {
  return (
    <section className="flex flex-col gap-2 px-2 py-4">
      <h2 className="p-4 text-3xl font-medium ">Return and Refund Policy</h2>

      <section>
        <h3 className="p-2 text-2xl">Skateboard Products</h3>
        <p className="p-2">
          At skatersfl, we stand behind the quality of our skateboard products.
          Minor variations in grip tape application or deck graphics may occur
          and are considered normal for skateboard equipment.
        </p>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Product Wear</h3>
        <p className="p-2">
          Skateboarding is an extreme sport that naturally wears down equipment.
          We cannot accept returns for products that show signs of use, including
          scratched decks, worn grip tape, or used bearings.
        </p>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Safety Considerations</h3>
        <p className="p-2">
          For your safety, all helmets and protective gear must be returned in
          original, unused condition with all tags and packaging intact.
          Used safety equipment cannot be returned or exchanged.
        </p>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Customer Satisfaction</h3>
        <p className="p-2">
          Your satisfaction is important to us. If you're not completely happy
          with your purchase, we'll work with you to find a solution when the
          conditions of our return policy are met.
        </p>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Valid Reasons for Return</h3>
        <ul className="list-disc p-2">
          <li>
            Wrong product was delivered (different size, color, or product than ordered)
          </li>
          <li>
            Product arrived damaged or defective (must report within 48 hours of delivery)
          </li>
          <li>
            Minor variations in product appearance due to manufacturing processes
            are considered normal and not valid for return
          </li>
        </ul>
      </section>

      <section>
        <h3 className="p-2 text-2xl">How to Initiate a Return</h3>
        <p className="p-2">
          Please contact us immediately if you need to return an item:
        </p>
        <ol className="list-disc p-2">
          <li>
            Email <a href="mailto:aabiz1997@gmail.com">returns@skatersfl.netlify.app</a>
            with photos of the issue and your order number
          </li>
          <li>
            Our customer service team will provide return instructions and
            necessary forms if applicable
          </li>
        </ol>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Return Requirements</h3>
        <ul className="list-disc p-2">
          <li>
            Items must be returned within 14 days of delivery
          </li>
          <li>
            Products must be in original condition with all packaging, tags, and
            protective films intact
          </li>
          <li>
            Skateboard decks must be returned with original shrink wrap intact
          </li>
          <li>
            Customer is responsible for return shipping unless the return is due
            to our error
          </li>
        </ul>
      </section>

      <section>
        <h3 className="p-2 text-2xl">After We Receive Your Return</h3>
        <p className="p-2">
          Our team will inspect the returned items and notify you via email
          about the status of your return.
        </p>
        <ul className="list-disc p-2">
          <li>
            Approved returns will receive store credit or refund to original
            payment method (excluding shipping costs)
          </li>
          <li>
            If the return doesn't meet our policy requirements, the item will
            be shipped back to you at your expense
          </li>
        </ul>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Processing Time</h3>
        <p className="p-2">
          Please allow 5-7 business days for us to process your return after
          we receive it.
        </p>
        <p className="p-2">
          Refunds to credit/debit cards may take 1-2 billing cycles to appear
          on your statement, depending on your bank's processing time.
        </p>
      </section>

      <section>
        <h3 className="p-2 text-2xl">Special Notes</h3>
        <p className="p-2">
          <strong>Clearance items:</strong> All sales are final on clearance merchandise.
        </p>
        <p className="p-2">
          <strong>Custom orders:</strong> Customized or assembled skateboards
          cannot be returned unless defective.
        </p>
      </section>
    </section>
  );
}
