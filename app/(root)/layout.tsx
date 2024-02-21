import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function setupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const userId = 'b3d673d5-318f-40ac-8e74-2007996103ad'

    if(!userId) {
        redirect('/sign-in');
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