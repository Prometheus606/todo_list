require("dotenv").config()
const express = require("express")
const db = require("./model/db")

const app = express()

// server setup
app.set("view engine", "ejs")

//middleware setup
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static("public"))
app.use(db)


//route setup
const indexRouter = require("./routes/index")

app.use("/", indexRouter)

// start server
app.listen(process.env.PORT, () => console.log(`Server is Listining on http://localhost:${process.env.PORT}`))