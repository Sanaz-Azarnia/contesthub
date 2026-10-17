import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}