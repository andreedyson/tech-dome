import StatsCard from "@/components/card/StatsCard";
import BrandsPerformanceCard from "@/components/dashboard/BrandsPerformanceCard";
import OrdersOverview from "@/components/dashboard/OrdersOverview";
import ProductsOverviewCard from "@/components/dashboard/ProductsOverviewCard";
import SalesByLocationCard from "@/components/dashboard/SalesByLocationCard";
import TopCustomersCard from "@/components/dashboard/TopCustomersCard";
import { getBrandTotalProducts } from "@/lib/data/brand";
import { getStatsCardData } from "@/lib/data/dashboard";
import { getSalesByLocation } from "@/lib/data/location";
import { getLatestOrders } from "@/lib/data/order";
import { getTopProducts } from "@/lib/data/product";
import { getTopCustomers } from "@/lib/data/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const [
    statsCard,
    topProducts,
    salesByLocation,
    topCustomers,
    latestOrders,
    brandProducts,
  ] = await Promise.all([
    getStatsCardData(),
    getTopProducts(),
    getSalesByLocation(),
    getTopCustomers(),
    getLatestOrders(),
    getBrandTotalProducts(),
  ]);

  return (
    <section className="w-full space-y-6">
      {/* Statistics Card */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCard.map((stat) => (
          <StatsCard
            key={stat.name}
            name={stat.name}
            total={stat.total}
            icon={stat.icon}
          />
        ))}
      </div>

      <OrdersOverview latestOrders={latestOrders} />

      <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-8">
        <TopCustomersCard topCustomers={topCustomers} />
        <SalesByLocationCard salesByLocation={salesByLocation} />
      </div>

      <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-12">
        <ProductsOverviewCard topProducts={topProducts} />
        <BrandsPerformanceCard brandProducts={brandProducts} />
      </div>
    </section>
  );
}

export default DashboardPage;
