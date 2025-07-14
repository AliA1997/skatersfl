import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug.current}`}>
      <Card className="flex h-full w-fit flex-col justify-around">
        <CardHeader className="flex items-center justify-center p-1">
          <Image
            src={product.images.length ? urlForImage(product.images[0]): ""}
            width={200}
            height={200}
            alt={product.title}
            loading="lazy"
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <CardTitle className="line-clamp-2 max-w-[180px] text-sm font-medium leading-tight sm:text-base">
            {product.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {product.category.title}
          </CardDescription>
        </CardContent>
        <CardFooter className="w-full p-2 pt-0">
          <p className="font-medium text-primary">$ {product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
