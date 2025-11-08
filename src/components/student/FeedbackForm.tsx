"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  analyzeStudentFeedbackSentiment,
  type AnalyzeStudentFeedbackSentimentOutput,
} from "@/ai/flows/analyze-student-feedback-sentiment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { Badge } from "../ui/badge";

const formSchema = z.object({
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
});

const SentimentIcon = ({ sentiment }: { sentiment: string }) => {
    switch (sentiment.toLowerCase()) {
        case 'positive': return <ThumbsUp className="h-4 w-4 text-green-500" />;
        case 'negative': return <ThumbsDown className="h-4 w-4 text-red-500" />;
        case 'neutral': return <Meh className="h-4 w-4 text-yellow-500" />;
        default: return <Bot className="h-4 w-4" />;
    }
}

export function FeedbackForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeStudentFeedbackSentimentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeStudentFeedbackSentiment(values);
      setAnalysisResult(result);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve.",
        className: 'bg-chart-2 border-green-600 text-white'
      });
      form.reset();
    } catch (error) {
      console.error("Error analyzing feedback:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your feedback.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about the food quality, hygiene, service, etc."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing..." : "Submit Feedback"}
          </Button>
        </form>
      </Form>
      {analysisResult && (
        <Alert className="mt-6 border-primary/50">
          <Bot className="h-4 w-4" />
          <AlertTitle className="font-headline">AI Analysis of Your Feedback</AlertTitle>
          <AlertDescription className="space-y-2">
            <div className="flex items-center gap-2">
                <strong>Sentiment:</strong>
                <Badge variant={
                    analysisResult.sentiment === 'positive' ? 'default' : 
                    analysisResult.sentiment === 'negative' ? 'destructive' : 'secondary'
                } className="capitalize">
                    <SentimentIcon sentiment={analysisResult.sentiment} />
                    <span className="ml-1.5">{analysisResult.sentiment}</span>
                </Badge>
                <span className="text-xs text-muted-foreground">(Confidence: {(analysisResult.confidence * 100).toFixed(0)}%)</span>
            </div>
            <div>
              <strong>Summary:</strong> {analysisResult.summary}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
