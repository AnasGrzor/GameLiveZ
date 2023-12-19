import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecomended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    console.log(error);
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  return users;
};