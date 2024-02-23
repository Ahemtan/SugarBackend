import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { getUserData } from "@/lib/auth";

export async function POST(req: Request) {
  
  const userData = getUserData()

  try {
    const userId = userData?.userId;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized"}, { status: 401 });
    }

    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("Store-Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}