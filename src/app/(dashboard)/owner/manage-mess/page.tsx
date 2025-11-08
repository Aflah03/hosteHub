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
import { Textarea } from "@/components/ui/textarea";

export default function ManageMessPage() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Manage Your Mess</CardTitle>
        <CardDescription>
          Update your mess details, menu, and pricing. This information will be
          visible to students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mess-name">Mess Name</Label>
              <Input
                id="mess-name"
                defaultValue="Annapurna Mess"
                placeholder="e.g., Annapurna Mess"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Price (INR)</Label>
              <Input
                id="price"
                type="number"
                defaultValue="3000"
                placeholder="e.g., 3000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="offer">Special Offer</Label>
            <Input
              id="offer"
              defaultValue="10% off for first-time registration"
              placeholder="e.g., Free sweet dish on weekends"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu">Weekly Menu</Label>
            <Textarea
              id="menu"
              placeholder="Describe your weekly menu here. You can format it day by day."
              className="min-h-[200px]"
              defaultValue="Monday: Poha, Jalebi | Roti, Sabji, Dal, Rice | Paneer Butter Masala, Roti, Rice..."
            />
          </div>
          <div className="space-y-2">
             <Label htmlFor="image">Mess Image</Label>
             <Input id="image" type="file" />
             <p className="text-xs text-muted-foreground">Upload a picture of your mess or a signature dish.</p>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
