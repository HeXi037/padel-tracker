import { Router } from "express";
import prisma from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/requireAuth";

const router = Router();
router.use(requireAuth);

// create new match (expects team1Id & team2Id already exist)
router.post("/", async (req: AuthRequest, res) => {
  const { team1Id, team2Id } = req.body;
  const match = await prisma.match.create({ data: { team1Id, team2Id } });
  res.json(match);
});

// update score
router.patch(":id/score", async (req, res) => {
  const { id } = req.params;
  const { team1Score, team2Score } = req.body;
  const match = await prisma.match.update({ where: { id: Number(id) }, data: { team1Score, team2Score } });
  res.json(match);
});

// list matches (most recent first)
router.get("/", async (_req, res) => {
  const matches = await prisma.match.findMany({ orderBy: { playedAt: "desc" }, include: { team1: true, team2: true } });
  res.json(matches);
});

export default router;
