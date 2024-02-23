import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const userId = "55412fd4-47d4-46b3-bb60-56e590f9c757";
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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