import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaneIcon } from "lucide-react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">
      <Link
        href="/dashboard"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <PlaneIcon className="h-6 w-6 text-white" />
        <span className="text-white font-bold text-lg ml-2">TravelFinder</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 bg-white">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              <DropdownMenuItem>My Profile</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem>WishList</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
