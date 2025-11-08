"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function LoginTabs() {
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (role: 'student' | 'owner' | 'admin') => {
    // In a real app, you'd perform authentication here.
    // For this prototype, we'll just show a toast and redirect.
    toast({
      title: "Login Successful",
      description: `Redirecting to ${role} dashboard...`,
    });
    router.push(`/${role}/dashboard`);
  };

  const LoginForm = ({ role }: { role: 'student' | 'owner' | 'admin' }) => (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(role); }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input id={`${role}-email`} type="email" placeholder="m@example.com" required defaultValue={role === 'student' ? 'student@hostelhub.com' : role === 'owner' ? 'owner@hostelhub.com' : 'admin@hostelhub.com'} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor={`${role}-password`}>Password</Label>
            <a href="#" className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline">
              Forgot your password?
            </a>
          </div>
          <Input id={`${role}-password`} type="password" required defaultValue="password" />
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline text-primary/80 hover:text-primary">
            Sign up
          </a>
        </div>
      </div>
    </form>
  );

  if (!isClient) {
    return null;
  }

  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="owner">Owner</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="font-headline">Student Portal</CardTitle>
            <CardDescription>
              Access your mess details, dues, and feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm role="student" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="owner">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="font-headline">Owner Portal</CardTitle>
            <CardDescription>
              Manage your mess, view feedback, and track records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm role="owner" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="admin">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="font-headline">Admin Portal</CardTitle>
            <CardDescription>
              Oversee the entire HostelHub platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm role="admin" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
