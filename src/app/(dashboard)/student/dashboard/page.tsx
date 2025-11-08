import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardList, HandCoins, FileText, Utensils, WashingMachine } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const menu = [
    { day: "Monday", breakfast: "Poha, Jalebi", lunch: "Roti, Sabji, Dal, Rice", dinner: "Paneer Butter Masala, Roti, Rice" },
    { day: "Tuesday", breakfast: "Idli, Sambar", lunch: "Roti, Aloo Gobi, Dal, Rice", dinner: "Chole Bhature, Salad" },
    { day: "Wednesday", breakfast: "Aloo Paratha, Curd", lunch: "Roti, Rajma, Dal, Rice", dinner: "Veg Biryani, Raita" },
    { day: "Thursday", breakfast: "Upma, Chutney", lunch: "Roti, Bhindi Fry, Dal, Rice", dinner: "Kadhi Pakoda, Rice, Roti" },
    { day: "Friday", breakfast: "Sandwich, Juice", lunch: "Roti, Mixed Veg, Dal, Rice", dinner: "Pav Bhaji, Salad" },
    { day: "Saturday", breakfast: "Dosa, Sambar", lunch: "Roti, Lauki Sabji, Dal, Rice", dinner: "Special Dinner: Pizza" },
    { day: "Sunday", breakfast: "Puri Sabji", lunch: "Special Lunch: Dal Bati", dinner: "Manchurian, Fried Rice" },
]

export default function StudentDashboardPage() {
  const currentLaundryOrder = { 
    provider: 'Quick Clean Laundry', 
    status: 'Ironing',
    hasActiveOrder: true
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Welcome, Student!
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Mess</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Annapurna Mess</div>
            <p className="text-xs text-muted-foreground">Joined on 1st July 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Laundry</CardTitle>
            <WashingMachine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {currentLaundryOrder.hasActiveOrder ? (
              <>
                <div className="text-2xl font-bold">{currentLaundryOrder.provider}</div>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-xs text-muted-foreground">Status:</p>
                   <Badge variant="secondary">{currentLaundryOrder.status}</Badge>
                </div>
              </>
            ) : (
               <>
                <div className="text-2xl font-bold">No active order</div>
                 <Button asChild size="sm" className="mt-2">
                  <Link href="/student/laundry">Place an order</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Refundable Balance
            </CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹250.00</div>
            <p className="text-xs text-muted-foreground">From 2 mess cuts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Dues</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹500.00</div>
            <p className="text-xs text-muted-foreground">Due for July 2024</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                 <Button asChild variant="outline">
                    <Link href="/student/mess-cut">
                        <HandCoins className="mr-2 h-4 w-4" /> Apply for Mess Cut
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/student/feedback">
                         <ClipboardList className="mr-2 h-4 w-4" /> Give Feedback
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">This Week's Menu</CardTitle>
            <CardDescription>Plan your meals for the week ahead.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Day</TableHead>
                        <TableHead>Breakfast</TableHead>
                        <TableHead>Lunch</TableHead>
                        <TableHead>Dinner</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {menu.map((item) => (
                        <TableRow key={item.day}>
                            <TableCell className="font-semibold">{item.day}</TableCell>
                            <TableCell>{item.breakfast}</TableCell>
                            <TableCell>{item.lunch}</TableCell>
                            <TableCell>{item.dinner}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
