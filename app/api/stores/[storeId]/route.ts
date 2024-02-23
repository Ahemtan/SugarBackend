import { getUserData } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params } : {params: { storeId: string }}
) {
    try {
        const userData = getUserData()

        let userId = userData?.userId

        if(!userId) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        const body = await req.json();

        const {name} = body;

        if(!name) {
            return new NextResponse("Name is require!", { status: 400})
        }

        if(!params.storeId) {
            return new NextResponse("storeid is require!", { status: 400})
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_PATCH]', error)
        return new NextResponse("Internal server error", {status:500})
    }
}

export async function DELETE (
    req: Request,
    { params } : {params: { storeId: string }}
) {
    try {
        const userData = getUserData()

        let userId = userData?.userId

        if(!userId) {
            return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401})
        }

        if(!params.storeId) {
            return new NextResponse("storeid is require!", { status: 400})
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_DELETE]', error)
        return new NextResponse("Internal server error", {status:500})
    }
}
	