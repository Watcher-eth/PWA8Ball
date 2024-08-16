import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || "5432", 10),
});

async function updateUser(
  userId: string,
  updates: Record<string, any>
): Promise<void> {
  try {
    await client.connect();

    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = [userId, ...Object.values(updates)];

    const query = `
      UPDATE users
      SET ${setClause}, updated_at = current_timestamp
      WHERE external_auth_provider_user_id = ${userId}
      RETURNING *;
    `;

    const res = await client.query(query, values);

    console.log("Updated User:", res.rows[0]);
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await client.end();
  }
}
