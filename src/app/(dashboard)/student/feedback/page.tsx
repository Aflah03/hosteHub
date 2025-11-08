import { FeedbackForm } from "@/components/student/FeedbackForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function StudentFeedbackPage() {
    return (
        <div className="flex justify-center items-start pt-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Submit Feedback</CardTitle>
                    <CardDescription>
                        We value your opinion. Let us know how we can improve our service. Your feedback will be analyzed to identify key areas of improvement.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FeedbackForm />
                </CardContent>
            </Card>
        </div>
    );
}
