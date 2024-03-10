import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { SizesClient } from "./components/client";
import { SizesColoum } from "./components/colums";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {

    const sizes = await prismadb.size.findMany({
        where: {
          storeId: params.storeId
        }, 
        orderBy: {
          createdAt: 'desc'
        }
    });

    const formattedSizes: SizesColoum[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

  return (
    <div className="flex-col p-8 space-y-4 pt-6">
      <SizesClient data={formattedSizes} />
    </div>
  );
};

export default SizesPage;
