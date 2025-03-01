import OrderHistoryProduct from "@/components/card/OrderHistoryProduct";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import { getUserOrderHistory } from "@/lib/data/order";
import { convertRupiah, formatDate } from "@/lib/utils";
import { MailCheck, ReceiptText } from "lucide-react";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const { session, user } = await getUser();

  if (!session || !user) {
    redirect("/");
  }

  const userInitial =
    user.name.split(" ").length > 1
      ? user.name.split(" ")[0].charAt(0) + user.name.split(" ")[1].charAt(0)
      : user.name.charAt(0);
  const userOrders = await getUserOrderHistory(user.id);

  return (
    <section className="w-full">
      {/* User Profile */}
      <div className="relative">
        <div className="h-[250px] w-full rounded-xl bg-gradient-to-r from-blue-800 to-indigo-900" />
        <div className="absolute -bottom-20 flex w-full flex-col items-center justify-center space-y-4">
          <Avatar className="flex size-24 items-center justify-center border-8 border-zinc-300 bg-main-violet-300 text-2xl font-semibold">
            {userInitial}
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-semibold">{user.name}</p>
            <div className="flex items-center gap-2 font-medium text-muted-foreground">
              <MailCheck size={16} />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6 mt-24 h-[2px]" />

      <div className="flex flex-col gap-4">
        {/* Order History Header */}
        <div className="w-full space-y-0.5">
          <h2 className="flex items-center gap-2 text-xl font-bold leading-none md:text-2xl">
            <ReceiptText className="size-6" strokeWidth={3} />
            Order History
          </h2>
          <p className="text-sm leading-none text-muted-foreground md:text-base">
            Showing list of your order history.
          </p>
        </div>

        {/* Order History */}
        <div className="grid gap-4">
          {userOrders.map((order) => (
            <div key={order.id} className="rounded-lg border-2 p-4">
              {/* Order Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <ReceiptText size={16} />
                    <p className="font-semibold">Order</p>
                  </div>
                  <p>{formatDate(order.updatedAt)}</p>
                  <p className="font-medium text-muted-foreground underline">
                    {order.id}
                  </p>
                </div>
                <Badge
                  className={`max-md:hidden ${order.status === "SUCCESS" ? "bg-lime-500" : "bg-slate-500"}`}
                >
                  {order.status}
                </Badge>
              </div>

              <Separator className="my-3 h-[2px]" />

              {/* Order Products */}
              <div className="flex w-full flex-col gap-4">
                {order.products.map((product, i) => (
                  <OrderHistoryProduct
                    key={product.name + i}
                    product={product}
                  />
                ))}

                <Separator className="my-3 h-[2px]" />

                <div className="flex justify-between max-md:flex-row md:justify-end">
                  <Badge
                    className={`md:hidden ${order.status === "SUCCESS" ? "bg-lime-500" : "bg-slate-500"}`}
                  >
                    {order.status}
                  </Badge>
                  <div className="leading-5">
                    <p className="text-sm">Grand Total</p>
                    <p className="font-bold text-main-violet-500">
                      {convertRupiah(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
