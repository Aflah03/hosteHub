"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    dateRange: z.object({
      from: z.date({
        required_error: "Start date is required.",
      }),
      to: z.date({
        required_error: "End date is required.",
      }),
    }),
  })
  .refine((data) => data.dateRange.from <= data.dateRange.to, {
    message: "End date must be after or the same as the start date.",
    path: ["dateRange"],
  });

export default function MessCutPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const watchDateRange = form.watch("dateRange");
  const days = watchDateRange?.from && watchDateRange?.to
      ? differenceInDays(watchDateRange.to, watchDateRange.from) + 1
      : 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Mess Cut Applied!",
      description: `You have successfully applied for a ${days}-day mess cut.`,
    });
    form.reset();
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Apply for Mess Cut</CardTitle>
        <CardDescription>
          Select the start and end date for your leave. Your balance will be
          adjusted automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Leave Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{ from: field.value?.from!, to: field.value?.to! }}
                        onSelect={field.onChange}
                        initialFocus
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the first and last day of your leave.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {days > 0 && (
                <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-semibold text-lg">Total Mess Cut Days: {days}</p>
                    <p className="text-sm text-muted-foreground">Refundable amount will be calculated based on the number of days.</p>
                </div>
            )}
            <Button type="submit" disabled={days <= 0}>Apply for {days > 0 ? `${days}-Day Cut` : 'Cut'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
