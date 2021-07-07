import "dotenv/config";
import "./db";
import "./models/User";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✅${PORT}포트 서버 가동`);

app.listen(PORT, handleListening);