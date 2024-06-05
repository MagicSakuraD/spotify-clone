import Box from "@/components/Box";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Box className="h-full flex flex-col items-center justify-center gap-y-4">
      <SkeletonDemo />
      <SkeletonDemo />
      <SkeletonDemo />
    </Box>
  );
}
