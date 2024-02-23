import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {

    const body = await req.json();

    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new NextResponse("All fields are required!", { status: 422 });
    }

    const existingUser = await prismadb.user.findFirst({
        where: {
          email,
        },
    });

    if(existingUser) {
        return new NextResponse("User already exists!", { status: 400 });
    }
 
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await prismadb.user.create({
        data: { 
            email, 
            password: hashedPassword, 
            name }
    });

    return NextResponse.json({ success: true, message: "User Created Successfully"},{status: 200})   

  } catch (error) {
    console.log("[AUTH-POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}