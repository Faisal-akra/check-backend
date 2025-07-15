const express = require("express");
const app = express();
const connectDB = require("./config/connect");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const taskRoute = require("./routes/task");
const cors = require("cors");
dotenv.config();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "https://check-frontend-pnbv.vercel.app",
    credentials: true,
  })
);
app.use("/api/auth", userRouter);
app.use("/api/task", taskRoute);
const port = "https://localhost:9000";

app.listen(9000, () => {
  console.log(`port is running on ${port}`);
});
