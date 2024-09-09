import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { LifeBuoy, LogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions/auth-action";

const UserProfile = async () => {
  const session = await auth();
  const imageUrl = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Button
          variant={"secondary"}
          className="flex items-center justify-start gap-1 lg:gap-2 m-0 p-0 lg:px-3 lg:w-full bg-transparent hover:bg-transparent"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${name}'s profile picture`}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <p className="truncate text-center text-gray-500 hover:text-primary">
            {email}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="lg:w-full px-28 flex items-center justify-center group">
          <span className="flex items-center gap-8">
            <Settings className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
            <Link
              href="/settings"
              className="hover:text-primary hover:bg-transparent"
            >
              Settings
            </Link>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem className="lg:w-full px-28 flex items-center justify-center group">
          <span className="flex items-center gap-8">
            <LifeBuoy className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
            <Link
              href="/support"
              className="hover:text-primary hover:bg-transparent"
            >
              Support
            </Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="lg:w-full px-28 flex items-center justify-center group">
          <form action={signOutAction} className="flex items-center">
            <LogOut className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
            <Button
              type="submit"
              variant={"ghost"}
              className="hover:text-primary hover:bg-transparent"
            >
              Logout
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
