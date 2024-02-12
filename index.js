import express from "express";
import sequelize from "./util/database.js";

import Customer from "./models/customer.js";
import Order from "./models/order.js";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

Customer.hasMany(Order);

// sequelize
//   .sync({ force: true })
//   .then((result) => {
//     // console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/", (req, res) => {
  console.log("Home endpoint hit");
  res.send("Welcome Home!");
});

app.post("/create-customer", async (req, res) => {
  const { name, email } = req.body;

  try {
    await Customer.create({
      name,
      email,
    });

    res.status(201).send("Customer created successfully");
  } catch (error) {
    console.error("Error creating Customer:", error);
    res.status(500).send("Error creating Customer");
  }
});

app.get("/get-customers", async (req, res) => {
  const customers = await Customer.findAll();
  res.status(200).send(customers);
});

app.get("/get-customer/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id },
    });
    console.log(customer);
    res.status(200).send(customer);
  } catch (error) {
    console.error("Error fetching Customer:", error);
    res.status(500).send("Error fetching Customer");
  }
});

app.post("/create-order/:customerId", async (req, res) => {
  const { total } = req.body;
  const { customerId } = req.params;

  try {
    const customer = await Customer.findByPk(customerId);

    const result = await customer.createOrder({ total: total });

    console.log(result);
    res.status(201).send("Order place successfully");
  } catch (error) {
    console.error("Error placing Order:", error);
    res.status(500).send("Error placing Order");
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
