import CategoryCard from "@/components/category/CategoryCard";
import Skateboard from "@/public/categoryImages/skateboards.webp";
import Accessories from "@/public/categoryImages/accessories.webp";
import BulkBuyCard from "../BulkBuyCard";

export default function CategoryCardSection() {
  return (
    <section className=" py-4 md:py-10">
      <div className=" grid grid-cols-1 justify-end gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        <BulkBuyCard className=" col-span-1 sm:col-span-2" />
        <CategoryCard
          title="Boards"
          description="Discover our range of high-quality skateboards, perfect for beginners and pros alike, with durable decks and stylish designs to elevate your ride."
          image={Skateboard}
          link="/category/boards"
        />
        <CategoryCard
          title="Accessories"
          description="Upgrade your ride with top-notch skateboard accessories that enhance performance and style, curated just for you at our skateboard ecommerce store."
          image={Accessories}
          link="/category/accessories"
        />
      </div>
    </section>
  );
}
