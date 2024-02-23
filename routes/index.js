const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    const result = await req.db.query("SELECT * FROM items")
    const items = result.rows
    res.render("index", {
        items: items
    })
})

router.post("/", async (req, res) => {
    await req.db.query("INSERT INTO items (title) VALUES ($1)", [req.body.title])
    res.json({
        success: true,
        message: "Successful added a new todo"
    })
})

router.patch("/", async (req, res) => {
    await req.db.query("UPDATE items SET title=$2 WHERE id=$1", [req.body.id, req.body.title])
    res.json({
        success: true,
        message: "Successful updated todo"
    })
})

router.delete("/", async (req, res) => {
    console.log(req.body);
    await req.db.query("DELETE FROM items WHERE id=$1", [req.body.id])
    res.json({
        success: true,
        message: "Successful deleted todo"
    })
})

module.exports= router