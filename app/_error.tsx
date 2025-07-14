import Link from "next/link";

export const runtime = "edge";

export default function Error() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">Error</h2>
      <Link className="underline" href="/">
        Contact Support
      </Link>
    </div>
  );
}
