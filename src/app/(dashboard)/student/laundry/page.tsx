import Image from "next/image";
import Link from "next/link";
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
import { Star, Truck } from "lucide-react";

const laundryProviders = [
  {
    id: "quick-clean",
    name: "Quick Clean Laundry",
    rating: 4.8,
    reviews: 150,
    services: ["Per Piece", "Per Kg", "Subscription"],
    image: "https://picsum.photos/400/255",
    dataAiHint: "laundry service",
    pickupDropAvailable: true,
  },
  {
    id: "fresh-folds",
    name: "Fresh Folds",
    rating: 4.6,
    reviews: 98,
    services: ["Per Piece", "Ironing"],
    image: "https://picsum.photos/400/256",
    dataAiHint: "folded clothes",
    pickupDropAvailable: false,
  },
  {
    id: "campus-wash",
    name: "Campus Wash & Dry",
    rating: 4.5,
    reviews: 210,
    services: ["Per Kg", "Subscription"],
    image: "https://picsum.photos/400/257",
    dataAiHint: "washing machine",
    pickupDropAvailable: true,
  },
  {
    id: "the-iron-press",
    name: "The Iron Press",
    rating: 4.9,
    reviews: 75,
    services: ["Ironing Only"],
    image: "https://picsum.photos/400/258",
    dataAiHint: "ironing clothes",
    pickupDropAvailable: false,
  },
];

export default function BrowseLaundryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Laundry Services
        </h1>
        <p className="text-muted-foreground">
          Find the best laundry service providers near you.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {laundryProviders.map((provider) => (
          <Link href={`/student/laundry/${provider.id}`} key={provider.id} className="flex">
            <Card className="flex flex-col w-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover aspect-[16/10]"
                  data-ai-hint={provider.dataAiHint}
                />
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="font-headline mb-2">{provider.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{provider.rating}</span>
                  <span>({provider.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                {provider.pickupDropAvailable && (
                    <div className="flex items-center gap-2 text-sm text-chart-2 font-semibold">
                        <Truck className="w-4 h-4" />
                        <span>Pickup & Drop available</span>
                    </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Services</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
