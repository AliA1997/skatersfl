

export const runtime = "edge"

export default function SuccessPage({
  searchParams,
}: {
  searchParams: {
    paymentIntentId: string;
  };
}) {
  const paymentIntentId = searchParams.paymentIntentId;

  return (
    <div />
  );
}
