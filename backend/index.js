require('dotenv').config(); // <-- Ensure this is at the top
// console.log(process.env); // This will log all environment variables, including MONGO_URL

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Ensure MONGO_URL is correctly loaded from the environment
if (!process.env.MONGO_URL) {
  console.error("Error: MONGO_URL is not defined in the environment variables.");
  process.exit(1);  // Exit the app if the connection string is missing
}

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Connect to MongoDB using the URL from environment variables
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use('/', Routes);

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
