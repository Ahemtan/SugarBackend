import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { getUserData } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./logout";

const Navbar = async () => {
  const userData = getUserData();

  const userId = userData?.userId;
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b p-2">
      <div className="h-16 px-4 flex justify-between items-center">
        <StoreSwitcher items={stores} />
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images.png" alt="@shadcn" />
                  <AvatarFallback>{userData?.name}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Logout />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
