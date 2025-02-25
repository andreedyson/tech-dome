import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { getUser } from "@/lib/auth";
import { MailCheck, ReceiptText } from "lucide-react";
import { redirect } from "next/navigation";
import { getUserOrderHistory } from "@/lib/data/order";

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

      {/* Profile Page Header */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="w-full space-y-0.5">
          <h2 className="flex items-center gap-2 text-xl font-bold leading-none md:text-2xl">
            <ReceiptText className="size-6" strokeWidth={3} />
            Order History
          </h2>
          <p className="text-sm leading-none text-muted-foreground md:text-base">
            Showing list of your order history.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
