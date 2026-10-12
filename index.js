
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./utils/db-connection");
const User = require("./models/user");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);

sequelize.sync()
    .then(() => {
        console.log("Database connected and table created");
    })
    .catch((error) => {
        console.log("Database error:", error);
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});