"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Mess {
  id: string;
  name: string;
  description: string | null;
  monthlyPrice: number;
  isVeg: boolean;
  isNonVeg: boolean;
  rating: number;
  capacity: number;
  currentStudents: number;
  isActive: boolean;
  hostel: {
    name: string;
    city: string;
  };
  owner: {
    user: {
      name: string;
      email: string;
      phone: string | null;
    };
  };
  _count: {
    subscriptions: number;
    feedback: number;
  };
}

export default function AdminMessesPage() {
  const [messes, setMesses] = useState<Mess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMesses();
  }, []);

  const fetchMesses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/admin/messes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messes");
      }

      const data = await response.json();
      setMesses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMessStatus = async (messId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/messes/${messId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update mess status");
      }

      // Refresh the list
      fetchMesses();
    } catch (err) {
      console.error("Error updating mess status:", err);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">All Messes</CardTitle>
          <CardDescription>
            Manage all registered messes across all hostels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Loading messes...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">All Messes</CardTitle>
          <CardDescription>
            Manage all registered messes across all hostels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center bg-destructive/10 rounded-lg">
            <p className="text-destructive">Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">All Messes</CardTitle>
        <CardDescription>
          Manage all registered messes across all hostels. Total: {messes.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mess Name</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price/Month</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    No messes found
                  </TableCell>
                </TableRow>
              ) : (
                messes.map((mess) => (
                  <TableRow key={mess.id}>
                    <TableCell className="font-medium">{mess.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{mess.hostel.name}</div>
                        <div className="text-muted-foreground">{mess.hostel.city}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{mess.owner.user.name}</div>
                        <div className="text-muted-foreground">{mess.owner.user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {mess.isVeg && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Veg
                          </Badge>
                        )}
                        {mess.isNonVeg && (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            Non-Veg
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>₹{mess.monthlyPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      {mess.currentStudents}/{mess.capacity}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{mess.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">
                          ({mess._count.feedback})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={mess.isActive ? "default" : "secondary"}>
                        {mess.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={mess.isActive}
                        onCheckedChange={() => toggleMessStatus(mess.id, mess.isActive)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
