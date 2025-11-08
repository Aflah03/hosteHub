import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"


const mockFeedback = [
	{
		id: 1,
		date: "2024-07-28",
		original: "The food was really good today, especially the paneer curry. Keep it up!",
		analysis: {
			sentiment: "positive",
			confidence: 0.95,
			summary: "The student praised the food quality, specifically mentioning the paneer curry, and expressed satisfaction.",
		},
	},
	{
		id: 2,
		date: "2024-07-27",
		original: "The rotis were a bit hard and the dining area could have been cleaner.",
		analysis: {
			sentiment: "negative",
			confidence: 0.88,
			summary: "The student raised concerns about the hardness of the rotis and the cleanliness of the dining area.",
		},
	},
	{
		id: 3,
		date: "2024-07-26",
		original: "The meal was okay. Nothing special but not bad either. Just average.",
		analysis: {
			sentiment: "neutral",
			confidence: 0.91,
			summary: "The feedback indicates an average or neutral experience with the meal, with no strong positive or negative points.",
		},
	},
	{
		id: 4,
		date: "2024-07-25",
		original: "I loved the special dinner on Saturday! The pizza was a great surprise and very tasty. Would love to see more variety like this.",
		analysis: {
			sentiment: "positive",
			confidence: 0.98,
			summary: "The student expressed strong approval for the special Saturday dinner (pizza), praising its taste and suggesting more variety.",
		},
	},
];

const SentimentBadge = ({ sentiment }: { sentiment: 'positive' | 'negative' | 'neutral' }) => {
	switch (sentiment) {
		case 'positive':
			// Using chart colors for semantic meaning. Chart-2 is greenish.
			return <Badge className="bg-chart-2 text-white hover:bg-chart-2/90">Positive</Badge>;
		case 'negative':
			return <Badge variant="destructive">Negative</Badge>;
		case 'neutral':
			return <Badge variant="secondary">Neutral</Badge>;
		default:
			return <Badge variant="outline">{sentiment}</Badge>;
	}
}

export default function OwnerFeedbackPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-headline">Student Feedback Analysis</CardTitle>
				<CardDescription>
					Review summarized and analyzed feedback from students. Click on any row to see the original comment.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Accordion type="single" collapsible className="w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[120px]">Date</TableHead>
								<TableHead className="w-[150px]">Sentiment</TableHead>
								<TableHead>AI Summary</TableHead>
								<TableHead className="text-right w-[120px]">Confidence</TableHead>
								<TableHead className="w-[50px]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockFeedback.map((fb) => (
								<AccordionItem value={`item-${fb.id}`} key={fb.id}>
									<TableRow>
										<TableCell>{fb.date}</TableCell>
										<TableCell>
											<SentimentBadge sentiment={fb.analysis.sentiment as any} />
										</TableCell>
										<TableCell className="font-medium">{fb.analysis.summary}</TableCell>
										<TableCell className="text-right">
											{(fb.analysis.confidence * 100).toFixed(0)}%
										</TableCell>
										<TableCell>
											<AccordionTrigger className="p-0 [&[data-state=open]>svg]:rotate-180"></AccordionTrigger>
										</TableCell>
									</TableRow>
									<AccordionContent asChild>
										<tr>
											<td colSpan={5} className="p-0">
												<div className="p-4 bg-muted/50">
													<p className="font-semibold text-sm">Original Feedback:</p>
													<blockquote className="mt-1 border-l-2 pl-4 italic text-muted-foreground">
														"{fb.original}"
													</blockquote>
												</div>
											</td>
										</tr>
									</AccordionContent>
								</AccordionItem>
							))}
						</TableBody>
					</Table>
				</Accordion>
			</CardContent>
		</Card>
	);
}
