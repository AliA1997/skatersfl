import ProductDetailCard from "@/components/product/ProductDetailCard";
import {ProductsMarqueeWrapper} from "@/components/product/ProductsMarqueeWrapper";
import { CategoryForProduct, Product } from "@/lib/types";
import { getCategoryById, getProductBySlug, getProductsSlug } from "@/sanity/lib/sanity.query";
import type { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/image";

export const dynamicParams = false;

type Props = {
  params: { productSlug: string };
};

type ProductSlug = {
  slug: {
    current: string;
  };
};

export async function generateStaticParams() {
  const productSlugs = await getProductsSlug();
  return productSlugs.map((productSlug: ProductSlug) => {
    return {
      productSlug: productSlug.slug.current,
    };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await getProductBySlug(params.productSlug);
  return {
    title: product.title,
    alternates: {
      canonical: `/product/${params.productSlug}`,
    },
    description: product.features,
  };
}

const ProductPage = async ({ params }: Props) => {
  const product: Product = await getProductBySlug(params.productSlug);

  const jsonLd = {  
    "@context": "https://skatersfl.netlify.app//",
    "@type": "Product",
    name: product.title,
    image: urlForImage(product.images[0]),
    description: product.features,
    brand: {
      "@type": "Brand",
      name: "skatersfl",
    },
  };

  return (
    <div className="px-2">
      <ProductDetailCard product={product} category={product.category} />
      <ProductsMarqueeWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default ProductPage;
