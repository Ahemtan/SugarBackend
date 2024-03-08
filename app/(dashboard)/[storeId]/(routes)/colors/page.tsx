import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { SizesClient } from "./components/client";
import { ColorColoum } from "./components/colums";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {

    const colors = await prismadb.color.findMany({
        where: {
          storeId: params.storeId
        }, 
        orderBy: {
          createdAt: 'desc'
        }
    });

    const formattedColors: ColorColoum[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

  return (
    <div className="flex-col p-8 space-y-4 pt-6">
      <SizesClient data={formattedColors} />
    </div>
  );
};

export default ColorPage;
