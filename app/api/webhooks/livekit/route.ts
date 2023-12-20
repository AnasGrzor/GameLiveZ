import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";

const reciever = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

export const POST = async (req:Request) => {
    const body = await req.text()
    const headerPayload = await headers()
    const authorization = headerPayload.get("Authorization")

    if (!authorization) {
        return new Response("Unauthorized", {
            status: 401
        })
    }

    const event = reciever.receive(body,authorization)

    
  if (event.event === "ingress_started") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }
}
