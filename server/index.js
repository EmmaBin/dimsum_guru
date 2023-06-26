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

//create new orders_id when order page is loaded, status will be unfulfilled until payment is done

app.post("/order", async (req, res) => {
    try {
        const newOrder = await pool.query(
            "INSERT INTO orders (status) VALUES ($1) RETURNING *",
            ["unfulfilled"]
        );
        // After creating the new order, send it back to the client
        res.json(newOrder.rows[0]);
    } catch (err) {
        console.error(err.message)


    }
})


app.post("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { foodID } = req.body;
        const order = await pool.query(
            "INSERT INTO food_order (food_id, order_id) VALUES ($1, $2) RETURNING *",
            [foodID, id]
        );
        res.json(order.rows[0]);
    } catch (err) {
        console.error(err.message)

    }
})


app.get("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await pool.query(
            "SELECT food.food_id, food.name, food.price, food.image " +
            "FROM food_order " +
            "INNER JOIN food ON food_order.food_id = food.food_id " +
            "WHERE food_order.order_id = $1",
            [id]
        );

        const total = await pool.query(
            "SELECT SUM(food.price) as total " +
            "FROM food_order " +
            "INNER JOIN food ON food_order.food_id = food.food_id " +
            "WHERE food_order.order_id = $1",
            [id]
        );

        res.json({ orderItems: order.rows, total: total.rows[0].total });

    } catch (err) {
        console.error(err.message);
    }
})
//inside the cart, update(post) and delete and show total amount

// as admin, have CRUD routes

