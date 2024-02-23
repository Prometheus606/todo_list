const pg = require("pg")

const db = new pg.Client({
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
})
db.connect()

module.exports =  (req,res, next) => {
    req.db = db
    next()
}