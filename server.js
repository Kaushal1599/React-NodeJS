const express = require("express");
const connectDB = require("./config/db");
const app = express();
//connect datatbase
connectDB();

//init middleware

app.use(express.json({ extended: false }));
//define routes

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.get("/", (req, res) => res.json({ msg: "welcome to the API!!" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port  ${PORT}"));
