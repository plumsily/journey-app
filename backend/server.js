const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

//Connect to MongoDB
// connectDB(); //Ensure connection is made before listening in a serverless environment

const app = express();

//Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/journeys", require("./routes/journeyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set app to production mode");
  });
}

//Use custom error handling rather than default express handler
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
// app.listen(port, () => {
//   console.log(`Server running on part ${port}`);
// });
