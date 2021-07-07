import express from "express";
import logger from "morgan";
import ejs from "ejs";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import photoRouter from "./routers/photoRouter";


const app = express();

const handleListening = () => console.log("✅3003포트 서버 가동");

app.use(logger("dev"));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/photos", photoRouter);

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3003, handleListening);