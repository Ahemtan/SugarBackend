import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ success: true, message: "This is an test route 💀!"},{status: 200})

    return response;
  } catch (error) {
    console.log("[AUTH-POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
