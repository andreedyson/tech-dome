// components/StatsCard.tsx
import { cn } from "@/lib/utils";
import { StatsCardProps } from "@/types/dashboard";

const StatsCard = ({ name, total, icon: Icon }: StatsCardProps) => {
  let bgGradient =
    name === "Products"
      ? "from-violet-600 to-indigo-600"
      : name === "Brands"
        ? "from-violet-800 to-purple-800"
        : name === "Pending Orders"
          ? "from-amber-500 to-yellow-500"
          : name === "Success Orders"
            ? "from-teal-500 to-green-400"
            : "from-gray-300 to-slate-400";

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-gradient-to-tr p-4 text-white",
        bgGradient,
      )}
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase">Total {name}</p>
        <h4 className="text-5xl font-bold">
          {total} <span className="text-xs font-medium">{name}</span>
        </h4>
      </div>
      <div>
        <Icon className="opacity-80 md:size-20" />
      </div>
    </div>
  );
};

export default StatsCard;
