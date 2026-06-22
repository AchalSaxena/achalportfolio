import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

// Read database connection string from environment variables for security
const connectionString = process.env.DATABASE_URL;

async function run() {
  if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    console.log('To run this script, set DATABASE_URL, for example:');
    console.log('DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres node supabase/setupDb.js');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Successfully connected to database.');

    const sqlPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing schema.sql...');
    await client.query(sql);
    console.log('Database setup executed successfully!');
  } catch (error) {
    console.error('Failed to configure database:', error);
  } finally {
    await client.end();
  }
}

run();
