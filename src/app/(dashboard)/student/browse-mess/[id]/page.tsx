
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
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const messes = [
  {
    id: "annapurna-mess",
    name: "Annapurna Mess",
    rating: 4.5,
    reviews: 120,
    price: 3000,
    offer: "10% off for first-time registration",
    image: "https://picsum.photos/800/500",
    tags: ["Vegetarian", "North Indian"],
    dataAiHint: "indian food thali",
    description: "Serving authentic North Indian vegetarian meals. Known for our homely taste and fresh ingredients. We provide a different menu every day of the week to ensure you never get bored.",
    menu: [
        { day: "Monday", breakfast: "Poha, Jalebi", lunch: "Roti, Sabji, Dal, Rice", dinner: "Paneer Butter Masala, Roti, Rice" },
        { day: "Tuesday", breakfast: "Idli, Sambar", lunch: "Roti, Aloo Gobi, Dal, Rice", dinner: "Chole Bhature, Salad" },
        { day: "Wednesday", breakfast: "Aloo Paratha, Curd", lunch: "Roti, Rajma, Dal, Rice", dinner: "Veg Biryani, Raita" },
        { day: "Thursday", breakfast: "Upma, Chutney", lunch: "Roti, Bhindi Fry, Dal, Rice", dinner: "Kadhi Pakoda, Rice, Roti" },
        { day: "Friday", breakfast: "Sandwich, Juice", lunch: "Roti, Mixed Veg, Dal, Rice", dinner: "Pav Bhaji, Salad" },
        { day: "Saturday", breakfast: "Dosa, Sambar", lunch: "Roti, Lauki Sabji, Dal, Rice", dinner: "Special Dinner: Pizza" },
        { day: "Sunday", breakfast: "Puri Sabji", lunch: "Special Lunch: Dal Bati", dinner: "Manchurian, Fried Rice" },
    ]
  },
  {
    id: "south-delights",
    name: "South Delights",
    rating: 4.8,
    reviews: 95,
    price: 3200,
    offer: null,
    image: "https://picsum.photos/800/501",
    tags: ["Vegetarian", "South Indian"],
    dataAiHint: "south indian dosa",
    description: "Experience the true taste of South India. We specialize in a variety of dosas, idlis, and other traditional dishes. Our food is light, healthy, and delicious.",
    menu: [
        { day: "Monday", breakfast: "Pongal, Vada", lunch: "Sambar Rice, Poriyal, Appalam", dinner: "Chapathi, Veg Kurma" },
        { day: "Tuesday", breakfast: "Idli, Sambar", lunch: "Lemon Rice, Coconut Chutney", dinner: "Dosa, Sambar" },
        { day: "Wednesday", breakfast: "Puttu, Kadala Curry", lunch: "Veg Biryani, Raita", dinner: "Appam, Stew" },
        { day: "Thursday", breakfast: "Upma, Chutney", lunch: "Tomato Rice, Curd Rice", dinner: "Kothu Parotta" },
        { day: "Friday", breakfast: "Sandwich, Juice", lunch: "Roti, Mixed Veg, Dal, Rice", dinner: "Masala Dosa" },
        { day: "Saturday", breakfast: "Dosa, Sambar", lunch: "Special Thali", dinner: "Idiyappam, Sodhi" },
        { day: "Sunday", breakfast: "Puri, Masala", lunch: "Non-Veg Meals (Opt)", dinner: "Parotta, Salna" },
    ]
  },
  // Simplified other messes for brevity
  { id: "ghar-ka-khana", name: "Ghar Ka Khana", rating: 4.2, reviews: 78, price: 2800, offer: "Free sweet dish on weekends", image: "https://picsum.photos/800/502", tags: ["Homely", "North Indian"], dataAiHint: "simple thali", description: "Simple, healthy, and homely food.", menu: [] },
  { id: "healthy-bites", name: "Healthy Bites", rating: 4.6, reviews: 55, price: 3500, offer: "Salad bar included", image: "https://picsum.photos/800/503", tags: ["Healthy", "Salads"], dataAiHint: "healthy salad", description: "Focus on health without compromising on taste.", menu: [] },
];

export default function MessDetailPage({ params }: { params: { id: string } }) {
  const mess = messes.find((m) => m.id === params.id);
  const { toast } = useToast();
  const router = useRouter();

  if (!mess) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Mess not found</h1>
        <Link href="/student/browse-mess">
          <Button variant="link">Go back to browsing</Button>
        </Link>
      </div>
    );
  }

  const handleJoinMess = () => {
    // In a real app, this would involve a backend call.
    // For this prototype, we'll just show a toast and redirect.
    toast({
      title: "Successfully Joined!",
      description: `You are now a member of ${mess.name}.`,
      className: 'bg-chart-2 border-green-600 text-white'
    });
    router.push("/student/dashboard");
  };

  return (
    <div className="space-y-6">
       <Link href="/student/browse-mess" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to all messes
        </Link>
      <Card className="w-full">
        <CardHeader className="p-0">
          <Image
            src={mess.image}
            alt={mess.name}
            width={800}
            height={500}
            className="rounded-t-lg object-cover aspect-[16/10] max-h-[400px]"
            data-ai-hint={mess.dataAiHint}
          />
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                 <CardTitle className="font-headline text-3xl">{mess.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{mess.rating}</span>
                    <span>({mess.reviews} reviews)</span>
                </div>
                <div className="flex gap-2">
                    {mess.tags.map((tag) => ( <Badge key={tag} variant="secondary">{tag}</Badge>))}
                </div>
                 <p className="text-muted-foreground">{mess.description}</p>

                 {mess.menu && mess.menu.length > 0 && (
                    <div className="pt-4">
                        <h3 className="font-headline text-xl mb-2">Weekly Menu</h3>
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
                                {mess.menu.map((item) => (
                                    <TableRow key={item.day}>
                                        <TableCell className="font-semibold">{item.day}</TableCell>
                                        <TableCell>{item.breakfast}</TableCell>
                                        <TableCell>{item.lunch}</TableCell>
                                        <TableCell>{item.dinner}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                 )}
            </div>
            <div className="md:col-span-1 space-y-4">
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardDescription className="text-lg font-semibold text-foreground">
                            ₹{mess.price} / month
                        </CardDescription>
                         {mess.offer && (
                            <Badge variant="default" className="mt-2 bg-accent text-accent-foreground w-fit">
                            {mess.offer}
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                 <Button className="w-full" size="lg">Join Mess</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Confirm joining {mess.name}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    By clicking confirm, you agree to join this mess. The monthly fee of ₹{mess.price} will be added to your dues.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleJoinMess}>Confirm</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

    