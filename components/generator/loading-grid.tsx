import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingGridProps = {
  count?: number;
  detailed?: boolean;
};

export function LoadingGrid({ count = 8, detailed = false }: LoadingGridProps) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden p-4">
          <Skeleton className="h-5 w-2/3" />
          {detailed ? (
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : null}
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        </Card>
      ))}
    </div>
  );
}
