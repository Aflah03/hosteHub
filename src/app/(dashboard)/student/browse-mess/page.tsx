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
import { Star } from "lucide-react";

const messes = [
  {
    id: "annapurna-mess",
    name: "Annapurna Mess",
    rating: 4.5,
    reviews: 120,
    price: 3000,
    offer: "10% off for first-time registration",
    image: "https://picsum.photos/400/250",
    tags: ["Vegetarian", "North Indian"],
    dataAiHint: "indian food",
  },
  {
    id: "south-delights",
    name: "South Delights",
    rating: 4.8,
    reviews: 95,
    price: 3200,
    offer: null,
    image: "https://picsum.photos/400/251",
    tags: ["Vegetarian", "South Indian"],
    dataAiHint: "dosa idli",
  },
  {
    id: "ghar-ka-khana",
    name: "Ghar Ka Khana",
    rating: 4.2,
    reviews: 78,
    price: 2800,
    offer: "Free sweet dish on weekends",
    image: "https://picsum.photos/400/252",
    tags: ["Homely", "North Indian"],
    dataAiHint: "home food",
  },
  {
    id: "healthy-bites",
    name: "Healthy Bites",
    rating: 4.6,
    reviews: 55,
    price: 3500,
    offer: "Salad bar included",
    image: "https://picsum.photos/400/253",
    tags: ["Healthy", "Salads"],
    dataAiHint: "salad bowl",
  },
];

export default function BrowseMessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Browse Messes
        </h1>
        <p className="text-muted-foreground">
          Choose from the best mess options available near you.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {messes.map((mess) => (
          <Link href={`/student/browse-mess/${mess.id}`} key={mess.id} className="flex">
            <Card className="flex flex-col w-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <Image
                  src={mess.image}
                  alt={mess.name}
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover aspect-[16/10]"
                  data-ai-hint={mess.dataAiHint}
                />
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="font-headline mb-2">{mess.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{mess.rating}</span>
                  <span>({mess.reviews} reviews)</span>
                </div>
                <div className="flex gap-2 mb-4">
                  {mess.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {mess.offer && (
                  <Badge
                    variant="default"
                    className="mb-4 bg-accent text-accent-foreground"
                  >
                    {mess.offer}
                  </Badge>
                )}
                <CardDescription className="text-lg font-semibold text-foreground">
                  ₹{mess.price} / month
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Mess</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}