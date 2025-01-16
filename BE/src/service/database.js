import pkg from "mssql";
const sql = pkg;
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
  },
};

let pool = null;

const connectToDatabase = async () => {
  if (!pool) {
    try {
      pool = new sql.ConnectionPool(config);
      await pool.connect();
      console.log("Connected to SQL Server");
    } catch (err) {
      console.error("Database connection error:", err.message || err);
      throw err;
    }
  }
  return pool;
};

export { sql, connectToDatabase };
