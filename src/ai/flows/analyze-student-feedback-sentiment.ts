'use server';

/**
 * @fileOverview A student feedback sentiment analysis AI agent.
 *
 * - analyzeStudentFeedbackSentiment - A function that handles the sentiment analysis of student feedback.
 * - AnalyzeStudentFeedbackSentimentInput - The input type for the analyzeStudentFeedbackSentiment function.
 * - AnalyzeStudentFeedbackSentimentOutput - The return type for the analyzeStudentFeedbackSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentFeedbackSentimentInputSchema = z.object({
  feedback: z.string().describe('The feedback text provided by the student.'),
});
export type AnalyzeStudentFeedbackSentimentInput = z.infer<
  typeof AnalyzeStudentFeedbackSentimentInputSchema
>;

const AnalyzeStudentFeedbackSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the feedback, can be positive, negative, or neutral.'
    ),
  confidence: z
    .number()
    .describe(
      'The confidence level of the sentiment analysis, a value between 0 and 1.'
    ),
  summary: z
    .string()
    .describe(
      'A brief summary of the feedback, highlighting the main points and concerns.'
    ),
});
export type AnalyzeStudentFeedbackSentimentOutput = z.infer<
  typeof AnalyzeStudentFeedbackSentimentOutputSchema
>;

export async function analyzeStudentFeedbackSentiment(
  input: AnalyzeStudentFeedbackSentimentInput
): Promise<AnalyzeStudentFeedbackSentimentOutput> {
  return analyzeStudentFeedbackSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStudentFeedbackSentimentPrompt',
  input: {schema: AnalyzeStudentFeedbackSentimentInputSchema},
  output: {schema: AnalyzeStudentFeedbackSentimentOutputSchema},
  prompt: `You are a sentiment analysis expert specializing in analyzing student feedback for mess services.

You will analyze the provided feedback and determine the overall sentiment (positive, negative, or neutral).
Provide a confidence level for your analysis (a value between 0 and 1).
Also, provide a brief summary of the feedback, highlighting the main points and concerns.

Feedback: {{{feedback}}}

Your analysis:`,
});

const analyzeStudentFeedbackSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeStudentFeedbackSentimentFlow',
    inputSchema: AnalyzeStudentFeedbackSentimentInputSchema,
    outputSchema: AnalyzeStudentFeedbackSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
