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
import { Star, Sparkles } from "lucide-react";

const cleaningStaff = [
  {
    id: "sunita-devi",
    name: "Sunita Devi",
    rating: 4.9,
    reviews: 85,
    servicesOffered: ["Room", "Bathroom"],
    rate: 200,
    rateType: "per service",
    image: "https://picsum.photos/400/400?random=1",
    dataAiHint: "smiling woman",
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    rating: 4.7,
    reviews: 102,
    servicesOffered: ["Room", "Bathroom", "Full Hostel"],
    rate: 500,
    rateType: "for full hostel",
    image: "https://picsum.photos/400/400?random=2",
    dataAiHint: "man portrait",
  },
  {
    id: "clean-crew",
    name: "The Clean Crew",
    rating: 4.8,
    reviews: 120,
    servicesOffered: ["Full Hostel", "Common Areas"],
    rate: 1000,
    rateType: "per deep clean",
    image: "https://picsum.photos/400/400?random=3",
    dataAiHint: "cleaning supplies",
  },
];

export default function BrowseCleaningPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Cleaning Services
        </h1>
        <p className="text-muted-foreground">
          Book reliable cleaning staff for your room or hostel.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cleaningStaff.map((staff) => (
          <Link href={`/student/cleaning/${staff.id}`} key={staff.id} className="flex">
            <Card className="flex flex-col w-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 relative">
                <Image
                  src={staff.image}
                  alt={staff.name}
                  width={400}
                  height={400}
                  className="rounded-t-lg object-cover aspect-square"
                  data-ai-hint={staff.dataAiHint}
                />
                 <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    Top Rated
                 </Badge>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="font-headline mb-2">{staff.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{staff.rating}</span>
                  <span>({staff.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {staff.servicesOffered.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                 <CardDescription className="text-lg font-semibold text-foreground">
                  ₹{staff.rate}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{staff.rateType}</span>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Profile</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
