"use client";

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
import { Star, ArrowLeft, Truck, Minus, Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";


const providers = [
  {
    id: "quick-clean",
    name: "Quick Clean Laundry",
    rating: 4.8,
    reviews: 150,
    image: "https://picsum.photos/800/400",
    dataAiHint: "modern laundromat",
    pickupDropAvailable: true,
    description: "Your one-stop shop for all laundry needs. We use premium detergents and modern equipment to ensure your clothes get the best care.",
    priceList: [
        { item: "Shirt", price: 10 },
        { item: "T-Shirt", price: 8 },
        { item: "Pant / Jeans", price: 15 },
        { item: "Towel", price: 12 },
        { item: "Bedsheet (Single)", price: 25 },
        { item: "Bedsheet (Double)", price: 40 },
        { item: "Jacket", price: 50 },
    ],
    packages: [
        { id: "monthly-40", title: "Monthly 40", price: 350, description: "Get 40 clothes washed and ironed. Ideal for a single person." },
        { id: "monthly-80", title: "Monthly 80", price: 650, description: "Get 80 clothes washed and ironed. Perfect for heavy users." },
    ]
  },
   // Other providers can be added here...
];

export default function LaundryDetailPage({ params }: { params: { id: string } }) {
  const provider = providers.find((p) => p.id === params.id);
  
  // State to manage item quantities
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  if (!provider) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
        <Link href="/student/laundry">
          <Button variant="link">Go back to browsing</Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (item: string, delta: number) => {
    setItemQuantities(prev => {
        const newQuantity = (prev[item] || 0) + delta;
        return { ...prev, [item]: Math.max(0, newQuantity) };
    });
  }

  const getTotalPrice = () => {
    return provider.priceList.reduce((total, item) => {
        const quantity = itemQuantities[item.item] || 0;
        return total + (quantity * item.price);
    }, 0);
  }

  const totalItems = Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = getTotalPrice();

  return (
    <div className="space-y-6">
       <Link href="/student/laundry" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to all providers
        </Link>
      <Card className="w-full">
         <CardHeader className="p-0">
          <Image
            src={provider.image}
            alt={provider.name}
            width={800}
            height={400}
            className="rounded-t-lg object-cover aspect-[2/1] max-h-[350px]"
            data-ai-hint={provider.dataAiHint}
          />
        </CardHeader>
        <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-4">
                     <CardTitle className="font-headline text-3xl">{provider.name}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                             <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-lg">{provider.rating}</span>
                            <span>({provider.reviews} reviews)</span>
                        </div>
                        {provider.pickupDropAvailable && (
                            <div className="flex items-center gap-2 text-sm text-chart-2 font-semibold">
                                <Truck className="w-5 h-5" />
                                <span>Pickup & Drop Available</span>
                            </div>
                        )}
                    </div>
                     <p className="text-muted-foreground">{provider.description}</p>
                    
                    <Tabs defaultValue="place-order" className="pt-4">
                        <TabsList>
                            <TabsTrigger value="place-order">Place Order</TabsTrigger>
                            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="place-order" className="pt-4">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-center">Price</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {provider.priceList.map((item) => (
                                        <TableRow key={item.item}>
                                            <TableCell className="font-semibold">{item.item}</TableCell>
                                            <TableCell className="text-center">₹{item.price}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.item, -1)}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-6 text-center">{itemQuantities[item.item] || 0}</span>
                                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.item, 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                         <TabsContent value="subscriptions" className="pt-4 grid md:grid-cols-2 gap-4">
                             {provider.packages.map(pkg => (
                                <Card key={pkg.id}>
                                    <CardHeader>
                                        <CardTitle>{pkg.title}</CardTitle>
                                        <CardDescription>{pkg.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">₹{pkg.price} <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Choose Plan</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                 </div>
                 <div className="md:col-span-1 space-y-4">
                    <Card className="bg-muted/50 sticky top-20">
                        <CardHeader>
                            <CardTitle>Your Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {totalItems > 0 ? (
                                <div className="space-y-4">
                                     {Object.entries(itemQuantities).filter(([,qty]) => qty > 0).map(([item, qty]) => (
                                         <div key={item} className="flex justify-between items-center text-sm">
                                             <span>{item} x {qty}</span>
                                             <span className="font-medium">₹{qty * (provider.priceList.find(p => p.item === item)?.price || 0)}</span>
                                         </div>
                                     ))}
                                     <hr className="my-2" />
                                     <div className="flex justify-between items-center font-bold text-lg">
                                         <span>Total</span>
                                         <span>₹{totalPrice}</span>
                                     </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    <p>Select items to start your order.</p>
                                </div>
                            )}
                        </CardContent>
                        {totalItems > 0 && (
                            <CardFooter>
                                <Button className="w-full" size="lg">Place Order (₹{totalPrice})</Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
