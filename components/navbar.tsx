import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { getUserData } from "@/lib/auth";

const Navbar = async () => {

    
    const userData = getUserData()

    const userId = userData?.userId
    const stores = await prismadb.store.findMany({
        where: {
            userId,
        }
    })
    return ( 
        <div className="border-b p-2">
            <div className="h-16 px-4 flex justify-between items-center">
                <StoreSwitcher items={stores} />
                <div className="flex items-center space-x-4">
                    <h1>{userData?.name}</h1>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;