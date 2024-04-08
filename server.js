const mongoConnect = require("./utils/mongoConnect");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

const userRouter = require("./Routers/userRouter");
const questionRouter = require("./Routers/questionRouter");
const answerRouter = require("./Routers/answerRouter");
const tagRouter = require("./Routers/tagRouter");

mongoose.set("strictQuery", false);
mongoConnect();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);
app.use("/tag", tagRouter);

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});
