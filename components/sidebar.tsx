"use client"

import { useState } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link"

import { LayoutDashboard, FileImage, BarChartHorizontal, Scaling, Brush, Shirt, Truck, Cog, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    const [open, setOpen] = useState(true) 

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
          href: `/${params.storeId}`,
          label: 'Overview',
          active: pathname === `/${params.storeId}`,
          icon: LayoutDashboard,
        },
        {
          href: `/${params.storeId}/billboards`,
          label: 'Billboards',
          active: pathname === `/${params.storeId}/billboards`,
          icon: FileImage,
        },
        {
          href: `/${params.storeId}/categories`,
          label: 'Categories',
          active: pathname === `/${params.storeId}/categories`,
          icon: BarChartHorizontal,
        },
        {
          href: `/${params.storeId}/sizes`,
          label: 'Sizes',
          active: pathname === `/${params.storeId}/sizes`,
          icon: Scaling,
        },
        {
          href: `/${params.storeId}/colors`,
          label: 'Colors',
          active: pathname === `/${params.storeId}/colors`,
          icon: Brush,
        },
        {
          href: `/${params.storeId}/products`,
          label: 'Products',
          active: pathname === `/${params.storeId}/products`,
          icon: Shirt,
        },
        {
          href: `/${params.storeId}/orders`,
          label: 'Orders',
          active: pathname === `/${params.storeId}/orders`,
          icon: Truck,
        },
        {
          href: `/${params.storeId}/settings`,
          label: 'Settings',
          active: pathname === `/${params.storeId}/settings`,
          icon: Cog,
        },
      ]

    return ( 
        <>
        <div className={`${open? "w-72" : "w-20 "} duration-300 pl-2 pr-0 mt-2 h-screen bg-slate-300 relative`}>

            <div onClick={() => setOpen(!open)} className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-white duration-300 ${!open && 'rotate-180'}`}>
                <ArrowLeft />
            </div>

            <div className="flex gap-x-4 items-center mr-2">
                <Image alt="logo" width="50" height="50" src="https://seeklogo.com/images/T/threads-logo-E9BA734BF6-seeklogo.com.png?v=638242470460000000" />
                <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Dashboard</h1>
            </div>

            <ul className="pt-6">
                {
                    routes.map((menu, index) => (
                        <li key={index} className={cn('text-gray-50 text-sm flex items-center gap-x-4 p-2 hover:bg-slate-200}', menu.active ? 'bg-white text-black rounded-l-lg' : '')}>
                            <menu.icon />
                            <Link className={`${!open && 'hidden'}`} href={menu.href}>{menu.label}</Link>
                        </li>
                    ))
                }
            </ul>

        </div>
        </>
     );
}