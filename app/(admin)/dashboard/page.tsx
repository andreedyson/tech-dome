import StatsCard from "@/components/card/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatsCardData } from "@/lib/data/dashboard";
import { getTopProducts } from "@/lib/data/product";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const statsCard = await getStatsCardData();
  const topProducts = await getTopProducts();

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

      {/* Top Selling Products & Latest Orders */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="col-span-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              {topProducts.length > 0 ? (
                topProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={getImageUrl(product.images[0], "products")}
                        width={64}
                        height={64}
                        alt={product.name}
                        className="size-16 md:size-[64px]"
                      />
                      <div className="leading-none">
                        <p className="line-clamp-1 text-base font-bold md:text-lg">
                          {product.name}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground md:text-base">
                          {product.category.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <p className="font-semibold">
                        {convertRupiah(product.price)}
                      </p>
                      <Badge className="rounded-full bg-slate-400 font-bold">
                        {product.totalOrders} Sold
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Total Customers</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Sales by Country</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Latest Orders</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
              <div></div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Brand Performance</CardTitle>
              <Separator className="h-[2px]" />
            </CardHeader>
            <CardContent>
              <div></div>
              <div></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
