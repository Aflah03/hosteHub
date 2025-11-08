import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Manage Users</CardTitle>
        <CardDescription>
          A table of all users (students, owners) will be displayed here for management.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div className="h-60 flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">User data table placeholder</p>
        </div>
      </CardContent>
    </Card>
  );
}
