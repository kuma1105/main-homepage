import mongoose from "mongoose";

const Mongo_Url = process.env.MONGO_URL;

mongoose.connect(Mongo_Url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});

const db = mongoose.connection;

const handleOpen = () => {
    console.log("Ⓜ️ DB연결 성공")
};

const handleError = (error) => {
    console.log("❌ DB연결 실패", error);
};

db.once("open", handleOpen);
db.on("error", handleError);