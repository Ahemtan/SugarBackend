import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId : string }
}) {

    const userId = 'b3d673d5-318f-40ac-8e74-2007996103ad'

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
                <div className="flex-1 bg-white">
                    <Navbar/>
                    {children}
                </div>
            </div>
        </div>
    )
}