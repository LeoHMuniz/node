import 'dotenv/config'
import postgres from 'postgres';



let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGUSER = decodeURIComponent(PGUSER);
PGPASSWORD = decodeURIComponent(PGPASSWORD);
PGDATABASE = decodeURIComponent(PGDATABASE);

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});
