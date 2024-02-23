import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { SettingForm } from "./components/Setting-form";
import { getUserData } from "@/lib/auth";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: React.FC<SettingPageProps> = async ({ params }) => {
  const userData = getUserData()

  let userId = userData?.userId

  if (!userId) {
    redirect(`/sign-in`);
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
