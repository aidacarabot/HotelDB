require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const clientsRoutes = require("./src/api/routes/client");
const usersRoutes = require("./src/api/routes/user");
const hotelRoutes = require("./src/api/routes/hotel");
const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/users", usersRoutes); //para enlazarnos con el enrutado de users
app.use("/api/v1", clientsRoutes);// enrutado clients
app.use("/api/v1", hotelRoutes);//enrutado hotels

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found")
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})