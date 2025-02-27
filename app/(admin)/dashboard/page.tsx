import StatsCard from "@/components/card/StatsCard";
import { getStatsCardData } from "@/lib/data/dashboard";
import { Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const statsCard = await getStatsCardData();
  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-4">
        {statsCard.map((stat) => (
          <StatsCard
            key={stat.name}
            name={stat.name}
            total={stat.total}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
