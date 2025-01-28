import { redirect } from "next/navigation";
import { getUser } from "./auth";

export const validateProtected = async () => {
  const req = await getUser();

  if (!req.session) {
    redirect("/sign-in");
  }

  return req;
};
