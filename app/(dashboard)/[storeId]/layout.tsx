import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getUserData } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userData = getUserData();

  let userId = userData?.userId;

  if (!userId) {
    redirect("/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="bg-slate-300 w-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-white">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
