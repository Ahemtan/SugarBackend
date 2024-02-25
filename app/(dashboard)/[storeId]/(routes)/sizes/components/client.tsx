"use client";

import { Plus } from "lucide-react"
import { useRouter ,useParams } from "next/navigation"
import { Billboard } from "@prisma/client";

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-tables";

import { SizesColoum, columns } from "./colums";

interface SizesClientProps {
    data: SizesColoum[]
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`} description="Manage Sizes for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}