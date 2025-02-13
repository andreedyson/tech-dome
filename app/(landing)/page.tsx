import Brands from "@/components/pages/Brands";
import Categories from "@/components/pages/Categories";
import Hero from "@/components/pages/Hero";
import Products from "@/components/pages/Products";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
      <Products />
      <Brands />
    </div>
  );
}
