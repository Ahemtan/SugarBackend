import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { CategoryClient } from "./components/client";
import { CategoryColoum } from "./components/colums";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }, 
        include: {
          billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const foramtedCategories: CategoryColoum[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

  return (
    <div className="flex-col p-8 space-y-4 pt-6">
      <CategoryClient data={foramtedCategories} />
    </div>
  );
};

export default CategoryPage;
