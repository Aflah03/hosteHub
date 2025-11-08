import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dueHistory = [
    { month: "July 2024", amount: 500.00, status: "Pending" },
    { month: "June 2024", amount: 3000.00, status: "Paid" },
    { month: "May 2024", amount: 3000.00, status: "Paid" },
    { month: "April 2024", amount: 3000.00, status: "Paid" },
]

export default function DuesPage() {
    const pendingDue = dueHistory.find(d => d.status === "Pending");
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Mess Dues History</CardTitle>
                <CardDescription>Track your monthly payments and pending dues.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dueHistory.map(due => (
                            <TableRow key={due.month} className={due.status === 'Pending' ? 'font-bold' : ''}>
                                <TableCell>{due.month}</TableCell>
                                <TableCell>
                                    <Badge variant={due.status === 'Pending' ? 'destructive' : 'default'}>{due.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">₹{due.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Pay Dues</CardTitle>
                <CardDescription>Clear your pending balance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingDue ? (
                    <>
                    <div className="space-y-1 rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Amount to be paid for {pendingDue.month}</p>
                        <p className="text-4xl font-bold">₹{pendingDue.amount.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">You will be redirected to a secure UPI payment gateway.</p>
                    </>
                ) : (
                    <p className="text-center text-muted-foreground py-8">No pending dues. You are all clear!</p>
                )}
            </CardContent>
            {pendingDue && (
                <CardFooter>
                    <Button className="w-full">Pay Now</Button>
                </CardFooter>
            )}
        </Card>
      </div>
    </div>
  );
}
