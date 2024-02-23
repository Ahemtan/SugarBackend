import {
    NextResponse
} from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            status: true,
            message: "Logget out successfully",
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });

        return response;
    } catch (error) {

        console.log("[AUTH-LOGOUT-POST]", error);
        return new NextResponse("Internal Server Error", {
            status: 500
        });

    }
}