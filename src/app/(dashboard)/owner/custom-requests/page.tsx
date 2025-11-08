"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const initialRequests = [
  {
    id: "REQ004",
    student: "Amit Kumar",
    planType: "Gym Diet",
    duration: "Weekly",
    requirements: "High protein, low carb. 200g chicken breast for lunch, egg whites for breakfast.",
    expectedPrice: 1000,
    status: "Pending",
    date: "2024-07-28",
  },
  {
    id: "REQ005",
    student: "Priya Singh",
    planType: "Allergy-Free",
    duration: "Monthly",
    requirements: "Strictly no peanuts or tree nuts in any meal.",
    expectedPrice: 3400,
    status: "Pending",
    date: "2024-07-27",
  },
  {
    id: "REQ001",
    student: "Rohan Sharma",
    planType: "High-Protein",
    duration: "Monthly",
    requirements: "Extra paneer in lunch and dinner.",
    expectedPrice: 3500,
    status: "Approved",
    finalPrice: 3800,
    comments: "Approved with slight price adjustment for extra ingredients.",
    date: "2024-07-01",
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

export default function OwnerCustomRequestsPage() {
    const { toast } = useToast();
    const [requests, setRequests] = useState(initialRequests);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleAction = (id: string, newStatus: 'Approved' | 'Rejected', finalPrice?: number, comments?: string) => {
        setRequests(requests.map(req => 
            req.id === id ? { ...req, status: newStatus, finalPrice, comments } : req
        ));
        toast({
            title: `Request ${newStatus}`,
            description: `The student's custom plan has been updated.`,
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Custom Menu Requests</CardTitle>
        <CardDescription>
          Review and respond to custom meal plan requests from students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <AccordionItem value={`item-${req.id}`} key={req.id} asChild>
                  <>
                    <TableRow>
                      <TableCell className="font-semibold">{req.student}</TableCell>
                      <TableCell>{req.planType}</TableCell>
                      <TableCell>{req.duration}</TableCell>
                      <TableCell><StatusBadge status={req.status} /></TableCell>
                      <TableCell className="text-right">
                        {req.status === 'Pending' && (
                           <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" onClick={() => setSelectedRequest(req)}>Review</Button>
                            </DialogTrigger>
                             <ApproveRejectDialog request={req} onAction={handleAction}/>
                           </Dialog>
                        )}
                      </TableCell>
                       <TableCell>
                        <AccordionTrigger className="p-0 [&[data-state=open]&gt;svg]:rotate-180"></AccordionTrigger>
                    </TableCell>
                    </TableRow>
                    <AccordionContent asChild>
                      <tr>
                        <td colSpan={6} className="p-0">
                          <div className="p-4 bg-muted/50 grid grid-cols-3 gap-4">
                            <div>
                                <p className="font-semibold text-sm">Requirements:</p>
                                <p className="text-muted-foreground text-sm mt-1">{req.requirements}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-sm">Expected Price:</p>
                                <p className="text-muted-foreground text-sm mt-1">₹{req.expectedPrice}</p>
                            </div>
                            {req.comments && (
                                <div>
                                    <p className="font-semibold text-sm">Your Comments:</p>
                                    <p className="text-muted-foreground text-sm mt-1">{req.comments}</p>
                                </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </AccordionContent>
                  </>
                </AccordionItem>
              ))}
            </TableBody>
          </Table>
        </Accordion>
      </CardContent>
    </Card>
  );
}


const ApproveRejectDialog = ({ request, onAction }: { request: any, onAction: Function }) => {
    const [finalPrice, setFinalPrice] = useState(request.expectedPrice);
    const [comments, setComments] = useState('');

    const handleApprove = () => {
        onAction(request.id, 'Approved', finalPrice, comments);
    }
     const handleReject = () => {
        onAction(request.id, 'Rejected', undefined, comments);
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Review Request from {request.student}</DialogTitle>
                <DialogDescription>
                    Approve or reject the custom plan. You can adjust the price and add comments.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <h4 className="font-semibold">{request.planType} ({request.duration})</h4>
                    <p className="text-sm text-muted-foreground">{request.requirements}</p>
                </div>
                 <div className="space-y-2">
                    <Label>Final Price (INR)</Label>
                    <Input id="final-price" type="number" value={finalPrice} onChange={(e) => setFinalPrice(Number(e.target.value))} />
                </div>
                 <div className="space-y-2">
                    <Label>Comments for Student</Label>
                    <Textarea id="comments" placeholder="e.g., Price adjusted due to ingredient costs." value={comments} onChange={(e) => setComments(e.target.value)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="destructive" onClick={handleReject}>Reject</Button>
                </DialogClose>
                 <DialogClose asChild>
                    <Button type="submit" onClick={handleApprove}>Approve</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}
