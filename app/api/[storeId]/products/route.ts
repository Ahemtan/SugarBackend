import { NextResponse } from "next/server";
import { getUserData } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userData = getUserData();
    const userId = userData?.userId
    const body = await req.json();

    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is required!", { status: 400 });
    }

    if (!price) {
      return NextResponse.json("Price is required!", { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json("Category is required!", { status: 400 });
    }

    if (!colorId) {
      return NextResponse.json("Color is required!", { status: 400 });
    }

    if (!sizeId) {
      return NextResponse.json({ success: false, message: "Color is required!"}, { status: 400 });
    }

    if (!images || !images.length) {
      return NextResponse.json({success: false, message: "Image is required!"}, { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required!", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => image)
            ]
          }
        }
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT-POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      
      const { searchParams } = new URL(req.url);

      const categoryId = searchParams.get("categoryId") || undefined;
      const colorId = searchParams.get("colorId") || undefined;
      const sizeId = searchParams.get("sizeId") || undefined;
      const isFeatured = searchParams.get("isFeatured") || undefined;
    
      if (!params.storeId) {
        return new NextResponse("Store id is required!", { status: 400 });
      }

      const product = await prismadb.product.findMany({
       where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined
       },
       include: {
        images: true,
        category: true,
        size: true,
        color: true,
       },
       orderBy: {
        createdAt: 'desc'
       }
      });

      return NextResponse.json(product);
    } catch (error) {
      console.log("[PRODUCT-GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }