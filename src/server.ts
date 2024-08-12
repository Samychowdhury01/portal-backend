// /* eslint-disable no-console */
// import { Pool } from 'pg';
import app from './app';
import config from './app/config';

// const { port, database, database_port, host, password, user } = config;
// const pool = new Pool({
//   user: user,
//   host: host,
//   database: database,
//   password: password,
//   port: Number(database_port), // PostgreSQL port
//   ssl: {
//     rejectUnauthorized: false, // For self-signed certificates, set to false
//   },
// });

// pool.on('connect', () => {
//   console.log('Connected to PostgreSQL database');
// });

// pool.on('error', (err) => {
//   console.error('Error connecting to PostgreSQL', err);
// });

// // server
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// export default pool;


// prisma setup
const { port} = config;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
