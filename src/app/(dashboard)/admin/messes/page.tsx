import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminMessesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">All Messes</CardTitle>
        <CardDescription>
          A table of all registered messes will be displayed here for management.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Mess data table placeholder</p>
        </div>
      </CardContent>
    </Card>
  );
}
