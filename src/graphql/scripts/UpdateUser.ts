import { Client } from 'pg';

// PostgreSQL client configuration
const client = new Client({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Default PostgreSQL port
});

async function updateUser(userId: string, updates: Partial<Record<string, any>>) {
  try {
    await client.connect();

    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [userId, ...Object.values(updates)];

    const query = `
      UPDATE users
      SET ${setClause}, updated_at = current_timestamp
      WHERE external_auth_provider_user_id = $1
      RETURNING *;
    `;

    const result = await client.query(query, values);
    console.log('User updated:', result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
  } finally {
    await client.end();
  }
}

// Example usage: updateUser('some_unique_id', { name: 'Jane Doe', theme: 'light' });
