import express from "express";
import userRouter from "./routes/userRoute/userRoutes.js";
import adminRouter from "./routes/adminRoute/adminRoutes.js";
import path from "path";
import ejs from "ejs";

import flash from "connect-flash";
import session from "express-session";
import connectDB from "./database/db.config.js";
const app = express();
const port = 3000;
await connectDB("mongodb+srv://rashid:Secret1234@cluster0.mmmhiyq.mongodb.net");
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engin", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/userView", userRouter);
app.use("/admin", adminRouter);

app.listen(port, (req, res) => {
  console.log(`${port}`);
  //console.log(path.join(process.cwd(),"/public"));
});
