import { Client } from "pg";

// PostgreSQL client configuration
const client = new Client({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 5432, // Default PostgreSQL port
});

async function insertUser() {
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

    const values = [
      "some_unique_id", // external_auth_provider_user_id
      0, // liquiditypoints
      0, // rewardpoints
      "0xYourWalletAddressHere", // walletaddress
      JSON.stringify([]), // socials
      JSON.stringify([]), // friends
      "dark", // theme
      "John Doe", // name
      "https://example.com/pfp.jpg", // pfp
    ];

    const result = await client.query(query, values);
    console.log("User inserted:", result.rows[0]);
  } catch (err) {
    console.error("Error inserting user:", err);
  } finally {
    await client.end();
  }
}

