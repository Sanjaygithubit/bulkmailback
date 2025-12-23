const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const mailRoutes = require("./routes/mailRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/mail", mailRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
app.listen(process.env.PORT, () =>
  console.log(`Server running`)
);

