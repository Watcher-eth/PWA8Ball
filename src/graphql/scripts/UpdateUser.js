const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Updates an existing user in the database.
 * @param {string} userId - The ID of the user to update.
 * @param {Record<string, any>} updates - An object containing the fields to update and their new values.
 * @returns {Promise<void>}
 */
async function updateUser(userId, updates) {
  try {
    await client.connect();

    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");

    const values = [userId, ...Object.values(updates)];

    const query = `
      UPDATE "User"
      SET ${setClause}, "updatedAt" = ${Math.floor(Date.now() / 1000)}
      WHERE "id" = $1
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

module.exports = { updateUser };
