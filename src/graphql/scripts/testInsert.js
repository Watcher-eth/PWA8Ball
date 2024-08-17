const { Client } = require("pg");
const dotenv = require("dotenv");
const { insertUser } = require("./InsertUser.js"); // Adjust the path as needed

dotenv.config({ path: ".env.local" });

async function testInsertUser() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
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

    await insertUser(newUser);

    const result = await client.query(
      `SELECT * FROM "User" WHERE "externalAuthProviderUserId" = $1`,
      [newUser.externalAuthProviderUserId]
    );

    console.log("Retrieved User:", result.rows[0]);

    // Perform assertions if needed (if using a test framework)
    if (result.rows[0].name !== "Test User") {
      console.error("Test failed: Incorrect user name");
    } else {
      console.log("Test passed: User inserted successfully");
    }
  } catch (err) {
    console.error("Error during test execution:", err);
  } finally {
    await client.query(
      `DELETE FROM "User" WHERE "externalAuthProviderUserId" = $1`,
      ["auth0|9876543210"]
    ); // Cleanup after the test
    await client.end();
  }
}

testInsertUser();
