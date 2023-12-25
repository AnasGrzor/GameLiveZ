import { Thumbnail } from "@/components/thumbnail";
import { User } from "@prisma/client";
import Link from "next/link";

interface ResultCardProps {
    data: {
        user:User,
        isLive:boolean,
        name:string,
        thumbnailUrl:string | null
    }
}

export const ResultCard = ({ data }: ResultCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
        <div className="w-full h-full space-y-4">
            <Thumbnail 
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
            />
        </div>
        </Link>
    )
}