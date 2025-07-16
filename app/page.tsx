import Billboard from "@/components/Billboard";
import {ProductsMarqueeWrapper} from "@/components/product/ProductsMarqueeWrapper";
import CategoryCardSection from "@/components/category/CategoryCardSection";

export default function Home() {
  return (
    <main className="px-2">
      <Billboard />
      <ProductsMarqueeWrapper />
      <CategoryCardSection />
    </main>
  );
}
