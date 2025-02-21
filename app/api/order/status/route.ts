import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { data } = await req.json();
  try {
    const code = data.reference_id;

    await prisma.order.update({
      where: {
        code: code,
      },
      data: {
        status: data.status === "SUCCEEDED" ? "SUCCESS" : "PENDING",
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
