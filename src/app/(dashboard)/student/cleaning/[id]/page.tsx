"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, CalendarDays, BadgeCheck, Phone, Info, Zap } from "lucide-react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";


const staffProfiles = [
  {
    id: "sunita-devi",
    name: "Sunita Devi",
    rating: 4.9,
    reviews: 85,
    servicesOffered: [
        { name: "Room Cleaning", price: 200, description: "Includes dusting, sweeping, and mopping of one student room." },
        { name: "Bathroom Cleaning", price: 150, description: "Thorough cleaning of one bathroom, including toilet and shower." },
    ],
    subscriptions: [
        { id: "monthly-room", title: "Monthly Room Cleaning", price: 1500, description: "Weekly room cleaning (4 times a month). Save 25%!"},
        { id: "monthly-full", title: "Monthly Full Service", price: 2500, description: "Weekly room & bathroom cleaning. The complete package."}
    ],
    rate: 200,
    rateType: "per service",
    image: "https://picsum.photos/600/600?random=1",
    dataAiHint: "smiling woman portrait",
    isVerified: true,
    contact: "98XXXXXX01",
    description: "With over 5 years of experience, Sunita is known for her meticulous cleaning and reliability. She ensures every corner is spotless.",
    availability: [new Date()], // Mock availability
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    rating: 4.7,
    reviews: 102,
    servicesOffered: [
      { name: "Room Cleaning", price: 250, description: "Includes dusting, sweeping, and mopping of one student room." },
      { name: "Bathroom Cleaning", price: 200, description: "Thorough cleaning of one bathroom, including toilet and shower." },
      { name: "Full Hostel Floor", price: 1000, description: "Complete cleaning of one floor's common areas, corridor, and bathrooms." },
    ],
    subscriptions: [
        { id: "monthly-room-rajesh", title: "Monthly Room Cleaning", price: 1800, description: "Weekly room cleaning (4 times a month)."},
    ],
    rate: 250,
    rateType: "starting from",
    image: "https://picsum.photos/600/600?random=2",
    dataAiHint: "professional man",
    isVerified: true,
    contact: "98XXXXXX02",
    description: "Rajesh is efficient and professional, capable of handling both individual rooms and larger areas. He uses eco-friendly cleaning products.",
    availability: [new Date()],
  },
];

export default function CleaningStaffDetailPage({ params }: { params: { id: string } }) {
  const staff = staffProfiles.find((p) => p.id === params.id);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  })

  if (!staff) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Staff member not found</h1>
        <Link href="/student/cleaning">
          <Button variant="link">Go back to browsing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <Link href="/student/cleaning" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to all staff
        </Link>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-1">
                        <Image
                            src={staff.image}
                            alt={staff.name}
                            width={400}
                            height={400}
                            className="rounded-lg object-cover aspect-square"
                            data-ai-hint={staff.dataAiHint}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                         <CardTitle className="font-headline text-3xl">{staff.name}</CardTitle>
                         <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-lg">{staff.rating}</span>
                                <span>({staff.reviews} reviews)</span>
                            </div>
                            {staff.isVerified && (
                                <div className="flex items-center gap-1.5 text-chart-2 font-semibold">
                                    <BadgeCheck className="w-5 h-5"/>
                                    <span>Verified</span>
                                </div>
                            )}
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground"/>
                            <span>{staff.contact}</span>
                         </div>
                         <p className="text-sm text-muted-foreground pt-2">{staff.description}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h3 className="font-headline text-xl mb-4">One-Time Services</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {staff.servicesOffered.map(service => (
                                <Card key={service.name} className="bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{service.name}</CardTitle>
                                        <CardDescription className="text-base text-primary font-semibold pt-1">₹{service.price}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">Select Service</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl mb-4">Subscription Plans</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {staff.subscriptions.map(sub => (
                                <Card key={sub.id} className="border-primary/30">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">{sub.title} <Badge><Zap className="w-3 h-3 mr-1"/> Best Value</Badge></CardTitle>
                                        <CardDescription className="text-base text-primary font-semibold pt-1">₹{sub.price} <span className="font-normal text-sm text-muted-foreground">/ month</span></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{sub.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Choose Plan</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Book a One-Time Slot</CardTitle>
                    <CardDescription>Select a date range for a one-time cleaning service.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                   <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                     <div className="w-full pt-4">
                        <Button className="w-full" size="lg" disabled={!date}>
                            Book Now
                        </Button>
                        <p className="text-xs text-muted-foreground text-center pt-2">You can review the final details on the next step.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
