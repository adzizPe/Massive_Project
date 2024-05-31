const Mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const Db = Mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

async function testConnection() {
  try {
    await Db.getConnection();
    console.log("Koneksi ke database berhasil!!!");
  } catch (error) {
    console.log("koneksi gagal", error);
  }
}

async function query(query, value) {
  try {
    const [excekuteQuery] = await Db.query(query, value ?? []);
    return excekuteQuery;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  testConnection,
  query,
};
