"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  ClipboardList,
  HandCoins,
  Star,
  Settings,
  FileText,
  BarChart3,
  Building,
  NotebookPen,
  ChevronDown,
  WashingMachine,
  Utensils,
  Brush,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";

const studentDashboardLink = { href: "/student/dashboard", label: "Dashboard", icon: Home };

const studentMessLinks = [
  { href: "/student/browse-mess", label: "Browse Messes", icon: ClipboardList },
  { href: "/student/custom-plan", label: "Custom Plan", icon: NotebookPen },
  { href: "/student/mess-cut", label: "Mess Cut", icon: HandCoins },
  { href: "/student/dues", label: "Dues", icon: FileText },
  { href: "/student/feedback", label: "Feedback", icon: Star },
];

const studentLaundryLink = { href: "/student/laundry", label: "Laundry", icon: WashingMachine };
const studentCleaningLink = { href: "/student/cleaning", label: "Cleaning", icon: Brush };


const ownerLinks = [
  { href: "/owner/dashboard", label: "Dashboard", icon: Home },
];

const ownerMessLinks = [
    { href: "/owner/manage-mess", label: "Manage Mess", icon: Settings },
    { href: "/owner/custom-requests", label: "Custom Requests", icon: NotebookPen },
    { href: "/owner/feedback", label: "Feedback Analysis", icon: BarChart3 },
]

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/messes", label: "All Messes", icon: Building },
  { href: "/admin/users", label: "Manage Users", icon: Users },
];


const NavLink = ({ link, isActive }: { link: { href: string; label: string; icon: React.ElementType }, isActive: boolean }) => {
    const LinkIcon = link.icon;
    return (
        <Link
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )}
          >
            <LinkIcon className="h-4 w-4" />
            {link.label}
          </Link>
    )
}

export function NavLinks() {
  const pathname = usePathname();
  
  if (pathname.startsWith("/student")) {
    const isMessSectionActive = studentMessLinks.some(link => pathname.startsWith(link.href));
    return (
        <>
            <NavLink link={studentDashboardLink} isActive={pathname === studentDashboardLink.href} />
             <Accordion type="single" collapsible defaultValue={isMessSectionActive ? "mess-section" : undefined} className="w-full">
                <AccordionItem value="mess-section" className="border-b-0">
                    <AccordionTrigger className="py-2 px-3 text-muted-foreground hover:text-primary hover:no-underline rounded-lg data-[state=open]:bg-muted data-[state=open]:text-primary">
                         <div className="flex items-center gap-3">
                            <Utensils className="h-4 w-4" />
                            <span>Mess</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pt-2">
                        {studentMessLinks.map((link) => (
                             <NavLink key={link.label} link={link} isActive={pathname.startsWith(link.href)} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <NavLink link={studentLaundryLink} isActive={pathname.startsWith(studentLaundryLink.href)} />
            <NavLink link={studentCleaningLink} isActive={pathname.startsWith(studentCleaningLink.href)} />
        </>
    )
  }

  if (pathname.startsWith("/owner")) {
    const isMessSectionActive = ownerMessLinks.some(link => pathname.startsWith(link.href));
    return (
        <>
            {ownerLinks.map((link) => (
                <NavLink key={link.label} link={link} isActive={pathname === link.href} />
            ))}
            <Accordion type="single" collapsible defaultValue={isMessSectionActive ? "mess-section" : undefined} className="w-full">
                <AccordionItem value="mess-section" className="border-b-0">
                    <AccordionTrigger className="py-2 px-3 text-muted-foreground hover:text-primary hover:no-underline rounded-lg data-[state=open]:bg-muted data-[state=open]:text-primary">
                         <div className="flex items-center gap-3">
                            <Building className="h-4 w-4" />
                            <span>Mess</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pt-2">
                        {ownerMessLinks.map((link) => (
                             <NavLink key={link.label} link={link} isActive={pathname.startsWith(link.href)} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
  }

  if (pathname.startsWith("/admin")) {
     return (
        <>
            {adminLinks.map((link) => (
                <NavLink key={link.label} link={link} isActive={pathname === link.href} />
            ))}
        </>
    )
  }


  return null;
}
