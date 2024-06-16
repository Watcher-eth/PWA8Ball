import { db } from "../../../../shared/db/drizzle";
import { users } from "../../../../shared/db/schema";
import { siweServer } from "@/utils/siweServer";

import { eq } from "drizzle-orm";
import { first } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accountType } = req.body;

  const session = await siweServer.getSession(req, res);
  if (!session || !session.address) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await db
    .insert(users)
    .values({
      internal_id: session.address,
      address: session.address,
      accountType: accountType,
    })
    .onDuplicateKeyUpdate({
      set: {
        address: session.address,
      },
    });

  const dbUsers = await db
    .select()
    .from(users)
    .where(eq(users.internal_id, session.address))
    .limit(1);

  const dbUser = first(dbUsers);

  return res.status(200).json({ user: dbUser });
}
