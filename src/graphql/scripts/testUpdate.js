const { Client } = require("pg");
const dotenv = require("dotenv");
const { updateUser } = require("./UpdateUser.js"); // Adjust the path as needed

dotenv.config({ path: ".env.local" });

async function testUpdateUser() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    // Insert a test user first
    const newUser = {
      externalAuthProviderUserId: "auth0|9876543210",
      liquidityPoints: 100,
      rewardPoints: 50,
      walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      socials: '{"twitter": "@testuser", "discord": "testuser#4321"}',
      friends: ["friendA", "friendB"],
      theme: "light",
      name: "Test User",
      pfp: "https://example.com/path/to/test-pic.jpg",
    };

    const insertQuery = `
      INSERT INTO "User" (
        id,
        "externalAuthProviderUserId",
        "liquidityPoints",
        "rewardPoints",
        "walletAddress",
        socials,
        friends,
        theme,
        name,
        pfp
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      ) RETURNING *;
    `;

    const res = await client.query(insertQuery, [
      newUser.walletAddress, // Using walletAddress as id
      newUser.externalAuthProviderUserId,
      newUser.liquidityPoints,
      newUser.rewardPoints,
      newUser.walletAddress,
      newUser.socials,
      JSON.stringify(newUser.friends),
      newUser.theme,
      newUser.name,
      newUser.pfp,
    ]);

    console.log("Inserted User:", res.rows[0]);

    // Update the test user
    await updateUser(newUser.walletAddress, {
      rewardPoints: 75,
      theme: "dark",
    });

    const result = await client.query(`SELECT * FROM "User" WHERE "id" = $1`, [
      newUser.walletAddress,
    ]);

    console.log("Updated User:", result.rows[0]);

    // Perform assertions
    if (
      result.rows[0].rewardPoints === "75" &&
      result.rows[0].theme === "dark" &&
      typeof result.rows[0].updatedAt === "string"
    ) {
      console.log("Test passed: User updated successfully");
    } else {
      console.error("Test failed: Incorrect updated values");
    }
  } catch (err) {
    console.error("Error during test execution:", err);
  } finally {
    // Cleanup after the test
    await client.query(`DELETE FROM "User" WHERE "id" = $1`, [
      "0xabcdef1234567890abcdef1234567890abcdef12",
    ]);
    await client.end();
  }
}

testUpdateUser();
