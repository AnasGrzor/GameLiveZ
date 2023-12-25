import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { Stream, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps {
   data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
};


export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`} className="">
      <div className="w-full flex gap-y-4 mt-2">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
            <div className="flex items-center gap-x-2 ml-4">
                <p className="font-bold text-lg cursor-pointer hover:text-blue-500 ">
                    {data.user.username}
                </p>
                <VerifiedMark />
            </div>
            <p className="text-sm text-muted-foreground ml-4">{data.name}</p>
            <p className="text-sm text-muted-foreground ml-4">{formatDistanceToNow(new Date(data.updatedAt),{
                addSuffix: true
            })}</p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};