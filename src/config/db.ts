import { Pool } from 'pg';
const host = 'localhost';
const database = 'jukbox';
const port = 5432;

const pool = new Pool({host, database, port});
export default pool;

function createTables () {
  pool.query(`
    CREATE TABLE users (
      email VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      diamonds INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (email)
    );

    CREATE TABLE venues (
      name VARCHAR NOT NULL,
      ticket_default_no INTEGER NOT NULL DEFAULT 1,
      closing_times VARCHAR,
      PRIMARY KEY (name)
    );

    CREATE TABLE user_venues (
      id SERIAL,
      user_id VARCHAR REFERENCES users(email),
      venue_id VARCHAR REFERENCES venues(name),
      tickets INTEGER NOT NULL DEFAULT 0,
      diamonds INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE playist (
      id SERIAL,
      venue_id VARCHAR REFERENCES venues(name),
      song VARCHAR,
      user_id VARCHAR REFERENCES users(email),
      diamonds INTEGER NOT NULL DEFAULT 0,
      submission_time VARCHAR NOT NULL DEFAULT '${String(new Date(Date.now()))}'
    );
  `);
};

async function setupDB () {
  await createTables();
  console.log(`Database successfully set up on port ${port} 🚀`);
};

try {
  setupDB();
} catch (error) {
  console.log(error);
}