import { Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 p-4 text-white"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase">Total Products</p>
              <h4 className="text-5xl font-bold">
                10 <span className="text-xs font-medium">Products</span>
              </h4>
            </div>
            <div>
              <Package className="opacity-80 md:size-20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
