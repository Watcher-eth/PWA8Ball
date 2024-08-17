import { Client } from "pg";
import dotenv from "dotenv";

interface User {
  external_auth_provider_user_id: string;
  liquiditypoints: number;
  rewardpoints: number;
  walletaddress: string;
  socials: string;
  friends: string[];
  theme: string;
  name: string;
  pfp: string;
}

dotenv.config({ path: ".env.local" });

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || "5432", 10),
});

async function insertUser(user: User): Promise<void> {
  try {
    await client.connect();

    const query = `
      INSERT INTO users (
        external_auth_provider_user_id,
        liquiditypoints,
        rewardpoints,
        walletaddress,
        socials,
        friends,
        theme,
        name,
        pfp
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) RETURNING *;
    `;

    const res = await client.query(query, [
      user.external_auth_provider_user_id,
      user.liquiditypoints,
      user.rewardpoints,
      user.walletaddress,
      user.socials,
      JSON.stringify(user.friends),
      user.theme,
      user.name,
      user.pfp,
    ]);

    console.log("New User:", res.rows[0]);
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await client.end();
  }
}

// Example usage
const newUser: User = {
  external_auth_provider_user_id: "auth0|1234567890",
  liquiditypoints: 0,
  rewardpoints: 0,
  walletaddress: "0x1234567890abcdef1234567890abcdef12345678",
  socials: '{"twitter": "@newuser", "discord": "newuser#1234"}',
  friends: ["friend1", "friend2", "friend3"],
  theme: "dark",
  name: "New User",
  pfp: "https://example.com/path/to/profile-pic.jpg",
};

insertUser(newUser);
