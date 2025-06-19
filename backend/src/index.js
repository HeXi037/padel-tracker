import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/match.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
