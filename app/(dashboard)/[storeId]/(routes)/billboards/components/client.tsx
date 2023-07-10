"use client";

import { Plus } from "lucide-react"
import { useRouter ,useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Billboard Client" description="Manage Billboard for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
        </>
    )
}