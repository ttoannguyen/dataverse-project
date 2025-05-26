const pkg = require("pg");
const { Client } = pkg;

const clientDBsetup = (): any => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "postgres",
    port: 5432,
  });

  client
    .connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch((err: any) => console.error("❌ Connection error", err));
  return client;
};

module.exports = clientDBsetup;
