import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { getUserData } from "@/lib/auth";

export default async function setupLayout({
    children
}: {
    children: React.ReactNode;
}, ) {

    const userData = getUserData()

    let userId;

    if(userData) {
        userId = userData.userId
    }

    if(!userId) {
        redirect('/login')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )

}