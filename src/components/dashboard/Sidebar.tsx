import Link from "next/link";
import { Utensils } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold font-headline text-primary">
            <Utensils className="h-6 w-6" />
            <span className="">HostelHub</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLinks />
          </nav>
        </div>
      </div>
    </div>
  );
}
