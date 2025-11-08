import Image from 'next/image';
import { Copyright } from '@/components/auth/Copyright';
import { LoginTabs } from '@/components/auth/LoginTabs';


export default function Home() {
  return (
    <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-card">
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 relative">
        <div className="w-full max-w-md space-y-6 z-10">
          <div className="text-center space-y-2">
            <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary">
              HostelHub
            </h1>
            <p className="text-muted-foreground">
              The smartest way to manage your hostel life.
            </p>
          </div>
          <LoginTabs />
        </div>
        <Copyright />
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="https://picsum.photos/1200/1800"
          alt="A variety of delicious mess food"
          width={1200}
          height={1800}
          className="object-cover w-full h-full"
          data-ai-hint="mess food"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-primary/20" />
      </div>
    </main>
  );
}
