import { columns as OrderColumn } from "@/components/orders/columns";
import { DataTable } from "@/components/ui/data-table";
import { getAllOrders } from "@/lib/data/order";
import { ShoppingCart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

async function OrdersPage() {
  const ordersData = await getAllOrders();

  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg bg-muted p-4">
        {/* Orders Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <ShoppingCart className="size-6 md:size-8" />
              Orders
            </h2>
            <p className="text-sm leading-none text-muted-foreground md:text-base">
              Track, manage, and optimize your orders efficiently.
            </p>
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable
            columns={OrderColumn}
            data={ordersData}
            columnFilter="id"
          />
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;
