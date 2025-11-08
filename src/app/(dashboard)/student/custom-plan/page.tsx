"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const messes = [
    { id: "annapurna-mess", name: "Annapurna Mess" },
    { id: "south-delights", name: "South Delights" },
    { id: "ghar-ka-khana", name: "Ghar Ka Khana" },
    { id: "healthy-bites", name: "Healthy Bites" },
];

const pastRequests = [
  {
    id: "REQ001",
    planType: "High-Protein",
    duration: "Monthly",
    status: "Approved",
    finalPrice: 3800,
    date: "2024-07-01",
  },
  {
    id: "REQ002",
    planType: "Veg-Only",
    duration: "Weekly",
    status: "Approved",
    finalPrice: 800,
    date: "2024-06-20",
  },
  {
    id: "REQ003",
    planType: "Allergy-Free (Gluten)",
    duration: "15 Days",
    status: "Rejected",
    finalPrice: null,
    date: "2024-06-15",
  },
   {
    id: "REQ004",
    planType: "Gym Diet",
    duration: "Weekly",
    status: "Pending",
    finalPrice: null,
    date: "2024-07-28",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <Badge className="bg-chart-2 text-white hover:bg-chart-2/90">{status}</Badge>;
    case 'rejected':
      return <Badge variant="destructive">{status}</Badge>;
    case 'pending':
      return <Badge variant="secondary">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function CustomPlanPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "Your custom plan request has been sent to the selected mess owner(s).",
    });
    // In a real app, you would also clear the form.
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Create a Custom Meal Plan
            </CardTitle>
            <CardDescription>
              Design a meal plan that fits your needs and submit it to mess
              owners for approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4 rounded-lg border p-4">
                 <h4 className="font-medium">Send Request To</h4>
                 <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="select-all" />
                        <Label htmlFor="select-all" className="font-semibold">Select All Messes</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-6 pt-2">
                        {messes.map(mess => (
                             <div key={mess.id} className="flex items-center space-x-2">
                                <Checkbox id={mess.id} />
                                <Label htmlFor={mess.id} className="font-normal">{mess.name}</Label>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-type">Plan Type</Label>
                <Select>
                  <SelectTrigger id="plan-type">
                    <SelectValue placeholder="Select a plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg-only">Veg-Only</SelectItem>
                    <SelectItem value="high-protein">High-Protein</SelectItem>
                    <SelectItem value="gym-diet">Gym Diet</SelectItem>
                    <SelectItem value="allergy-free">Allergy-Free</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">General Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="e.g., No spicy food, use less oil, include salad twice a day"
                  className="min-h-[100px]"
                />
              </div>

               <div className="space-y-4 rounded-lg border p-4">
                 <h4 className="font-medium">Daily Meal Courses (Optional)</h4>
                  <div className="space-y-2">
                    <Label htmlFor="breakfast-req">Breakfast</Label>
                    <Textarea id="breakfast-req" placeholder="e.g., Oats with fruits, 4 boiled egg whites" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="lunch-req">Lunch</Label>
                    <Textarea id="lunch-req" placeholder="e.g., 200g grilled chicken, brown rice, large salad bowl" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="dinner-req">Dinner</Label>
                    <Textarea id="dinner-req" placeholder="e.g., 150g paneer stir-fry, quinoa" />
                  </div>
               </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                    <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="price-range">Expected Price (INR)</Label>
                    <Input id="price-range" type="number" placeholder="e.g., 3500" />
                 </div>
              </div>
               <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Requests</CardTitle>
            <CardDescription>
              Track the status of your custom plan requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                        <div className="font-medium">{req.planType}</div>
                        <div className="text-xs text-muted-foreground">{req.duration}</div>
                    </TableCell>
                    <TableCell><StatusBadge status={req.status} /></TableCell>
                    <TableCell className="text-right font-semibold">
                        {req.finalPrice ? `₹${req.finalPrice}` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
