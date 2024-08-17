const { Client } = require("pg");
const dotenv = require("dotenv");

/**
 * @typedef {Object} User
 * @property {string} externalAuthProviderUserId
 * @property {number} liquidityPoints
 * @property {number} rewardPoints
 * @property {string} walletAddress
 * @property {string} socials
 * @property {string[]} friends
 * @property {string} theme
 * @property {string} name
 * @property {string} pfp
 */

dotenv.config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Inserts a new user into the database.
 * @param {User} user - The user object to insert.
 */
async function insertUser(user) {
  try {
    await client.connect();

    const query = `
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

    const res = await client.query(query, [
      user.walletAddress, // Using walletAddress as id
      user.externalAuthProviderUserId,
      user.liquidityPoints,
      user.rewardPoints,
      user.walletAddress,
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

// Export the function if needed elsewhere
module.exports = { insertUser };
