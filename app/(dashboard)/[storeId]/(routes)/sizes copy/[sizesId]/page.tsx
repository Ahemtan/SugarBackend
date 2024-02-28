import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/billboard-form";

const BillboardPage = async ({
     params 
}: {
    params: { sizesId: string }
}) => {

    const size = await prismadb.sizes.findUnique({
        where: {
            id: params.sizesId
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
     );
}
 
export default BillboardPage;