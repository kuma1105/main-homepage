import express from "express";
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import photoRouter from "./routers/photoRouter";
import { localsMiddleware } from './middlewares';

const app = express();

const Mongo_Url = process.env.MONGO_URL;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use("../img", express.static("img"));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        store: MongoStore.create({
            mongoUrl: Mongo_Url
        })
    })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/photos", photoRouter);

export default app;


