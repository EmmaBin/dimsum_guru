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

app.delete("/order/:id", async (req, res) => {
    const { id } = req.params;
    const { foodID } = req.query;
    try {
        await pool.query('DELETE FROM food_order WHERE id = (SELECT MAX(id) FROM food_order WHERE food_id=$1 AND order_id=$2)', [foodID, id]);
        res.json("One instance of the food was deleted");
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Internal Server Error
    }
});


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

app.put("/order/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;


    try {
        const updatedOrder = await pool.query(
            "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        res.json(updatedOrder.rows[0])


    } catch (err) {
        console.error(err.message)
    }
})


// as admin, have CRUD routes

app.get("/admin/total", async (req, res) => {

    try {
        const result = await pool.query(
            `SELECT SUM(food.price) AS total_revenue
        FROM orders
        JOIN food_order ON orders.id = food_order.order_id
        JOIN food ON food_order.food_id = food.food_id
        WHERE orders.status = 'fulfilled'`
        );

        // This will send the total revenue to the client.
        res.json(result.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
})
app.post("/admin/", async (req, res) => {
    const name = req.body.name
    const price = +req.body.price
    const category = req.body.category
    const image = req.body.image
    try {
        const addNewItem = await pool.query(
            "INSERT INTO food (name, price, category, image) VALUES ($1, $2, $3, $4)",
            [name, price, category, image]
        );


        res.status(200).json({ message: "Item added successfully" });

    } catch (err) {
        console.error('new item added', err.message)
    }

})
app.delete('/admin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM food WHERE food_id = $1 RETURNING *", [id]);
        res.json("One food was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

app.put('/admin/:id', async (req, res) => {
    const { id } = req.params;
    const name = req.body.food_info.name
    const price = +req.body.food_info.price
    const category = req.body.food_info.category
    const image = req.body.food_info.image
    try {
        const updateMenu = await pool.query(
            "UPDATE food SET name = $1, price = $2, category = $3, image = $4 WHERE food_id = $5 RETURNING *",
            [name, price, category, image, id]
        );
        res.json(updateMenu.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/food/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const food = await pool.query("SELECT name, price, category, image FROM food WHERE food_id = $1", [id]);

        if (food.rows.length > 0) {
            console.log("get food information")
            res.json(food.rows[0]);
        } else {
            res.status(404).json({ message: "No food with this ID was found." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});
