const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");;

app.use(cors());
app.use(express.json()) // parse body
app.use("/images", express.static(path.join(__dirname, "images")));



app.listen(5000, () => {
    console.log("-----------------------server has started on port 5000------------------")
});
// onload, display read homepage
// go to order page, read all from database

app.get("/foods", async (req, res) => {
    try {
        const allFood = await pool.query(
            "SELECT * FROM food"
        )
        //get a list of food
        res.json(allFood.rows)
       
    } catch (err) {
        console.error(err.message);
    }
})
// as admin, have CRUD routes