import Categories from "@/components/pages/Categories";
import Hero from "@/components/pages/Hero";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
    </div>
  );
}
