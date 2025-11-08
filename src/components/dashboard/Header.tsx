"use client";
import Link from "next/link";
import { CircleUser, Menu, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const getRoleFromPath = () => {
    if (pathname.startsWith('/student')) return 'Student';
    if (pathname.startsWith('/owner')) return 'Owner';
    if (pathname.startsWith('/admin')) return 'Admin';
    return 'User';
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
            <SheetHeader className="border-b pb-4 mb-4">
                 <SheetTitle asChild>
                    <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold font-headline text-primary"
                    >
                    <Utensils className="h-6 w-6" />
                    <span>HostelHub</span>
                    </Link>
                </SheetTitle>
            </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{getRoleFromPath()} Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
