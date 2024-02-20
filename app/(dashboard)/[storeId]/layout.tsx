import { Sidebar } from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId : string }
}) {
    const { userId } = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store) {
        redirect('/');
    }

    return (
        <div className="bg-slate-300 w-screen">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-white rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}