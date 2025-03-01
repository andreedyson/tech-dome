import { columns as CustomerColumn } from "@/components/customers/columns";
import { DataTable } from "@/components/ui/data-table";
import { getAllCustomers } from "@/lib/data/user";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

async function CustomersPage() {
  const customersData = await getAllCustomers();

  return (
    <section className="space-y-4">
      <div className="space-y-3 rounded-lg border-2 bg-background p-4">
        {/* Customers Page Header */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-none md:text-3xl">
              <Users className="size-6 md:size-8" />
              Customers
            </h2>
            <p className="text-sm leading-none text-muted-foreground md:text-base">
              manage all the customers that are registered to DealDome
              E-Commerce.
            </p>
          </div>
        </div>
        {/* Data Table */}
        <div>
          <DataTable
            columns={CustomerColumn}
            data={customersData}
            columnFilter="name"
          />
        </div>
      </div>
    </section>
  );
}

export default CustomersPage;
