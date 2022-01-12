const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    post: 5432,
    database: "completeexpenses2"
})

module.exports = pool;