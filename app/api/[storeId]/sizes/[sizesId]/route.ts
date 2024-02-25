import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getUserData } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { sizesId: string } }
) {
  try {
    if (!params.sizesId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await prismadb.sizes.findUnique({
      where: {
        id: params.sizesId
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sizesId: string, storeId: string } }
) {
  try {
    const userData = getUserData();
    const userId = userData?.userId

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizesId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.sizes.delete({
      where: {
        id: params.sizesId,
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sizesId: string, storeId: string } }
) {
  try {   
    const userData = getUserData();
    const userId = userData?.userId

    const body = await req.json();
    
    const { name, value } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value URL is required", { status: 400 });
    }

    if (!params.sizesId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.sizes.update({
      where: {
        id: params.sizesId,
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};