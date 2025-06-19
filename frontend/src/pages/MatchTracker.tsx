import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "../api";

export default function MatchTracker() {
  const [team1Score, setT1] = useState(0);
  const [team2Score, setT2] = useState(0);
  const [matchId, setMatchId] = useState<number | null>(null);

  async function createMatch() {
    const { data } = await api.post("/matches", { team1Id: 1, team2Id: 2 }); // TODO: dynamic teams
    setMatchId(data.id);
  }

  async function save() {
    if (!matchId) return;
    await api.patch(`/matches/${matchId}/score`, { team1Score, team2Score });
  }

  return (
    <section className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-3xl font-bold">Live Score</h1>
      <div className="flex gap-8 text-4xl">
        <span>{team1Score}</span> : <span>{team2Score}</span>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => setT1(t => t + 1)}>+ Team 1</Button>
        <Button onClick={() => setT2(t => t + 1)}>+ Team 2</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={createMatch} disabled={!!matchId}>Start Match</Button>
        <Button onClick={save} disabled={!matchId}>Save Score</Button>
      </div>
    </section>
  );
}
