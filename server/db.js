const Pool = require("pg").Pool;
const { PASSWORD } = require('./.env.json');
const pool = new Pool({
    user: "postgres",
    password: PASSWORD,
    host: "localhost",
    port: 5433,
    database: "dimsum"
})