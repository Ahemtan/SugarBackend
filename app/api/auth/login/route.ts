import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prismadb from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("All fields are required!", { status: 422 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorizes!." },
        { status: 401 }
      );
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password!." },
        { status: 401 }
      );
    }

    let tokenData = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SERECT!, {
      expiresIn: process.env.EXPIRESIN,
    });

    const response = NextResponse.json(
      { success: true, messsage: "Logged in successfully!" },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log("[AUTH-POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
