// backend/src/index.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// --- CRUD & leaderboard ---

app.post("/players", async (req, res) => {
  try {
    const player = await prisma.player.create({ data: { name: req.body.name } });
    res.json(player);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/players", async (_req, res) => {
  res.json(await prisma.player.findMany({ orderBy: { rating: "desc" } }));
});

app.post("/matches", async (req, res) => {
  const { playerAId, playerBId, scoreA, scoreB } = req.body;
  const K = 32;

  try {
    const [a, b] = await Promise.all([
      prisma.player.findUnique({ where: { id: playerAId } }),
      prisma.player.findUnique({ where: { id: playerBId } })
    ]);

    const expectedA = 1 / (1 + 10 ** ((b.rating - a.rating) / 400));
    const newA = Math.round(a.rating + K * ((scoreA > scoreB ? 1 : 0) - expectedA));
    const newB = Math.round(b.rating + K * ((scoreB > scoreA ? 1 : 0) - (1 - expectedA)));

    await prisma.$transaction([
      prisma.match.create({ data: { playerAId, playerBId, scoreA, scoreB } }),
      prisma.player.update({ where: { id: a.id }, data: { rating: newA } }),
      prisma.player.update({ where: { id: b.id }, data: { rating: newB } })
    ]);

    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/leaderboard", async (_req, res) => {
  res.json(await prisma.player.findMany({ orderBy: { rating: "desc" } }));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
