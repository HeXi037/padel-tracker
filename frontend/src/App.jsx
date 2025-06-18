import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const api = axios.create({ baseURL: "/api" });

function Leaderboard() {
  const { data } = useQuery(["lb"], () => api.get("/leaderboard").then(r => r.data));
  return (
    <div className="grid gap-4">
      {data?.map(p => (
        <Card key={p.id}>
          <CardContent className="flex justify-between p-4">
            <span>{p.name}</span>
            <span className="text-xl font-bold">{p.rating}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AddMatch() {
  const qc = useQueryClient();
  const [f, setF] = useState({ playerAId: "", playerBId: "", scoreA: 0, scoreB: 0 });
  const mut = useMutation(d => api.post("/matches", d), {
    onSuccess: () => qc.invalidateQueries(["lb"])
  });

  return (
    <Card>
      <CardContent className="p-4 grid gap-2">
        {["playerAId","playerBId","scoreA","scoreB"].map(k => (
          <input
            key={k}
            placeholder={k}
            className="border p-2 rounded"
            value={f[k]}
            onChange={e => setF({ ...f, [k]: e.target.value })}
          />
        ))}
        <Button onClick={() => mut.mutate({ ...f, scoreA: +f.scoreA, scoreB: +f.scoreB })}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="max-w-xl mx-auto p-4 grid gap-6">
      <h1 className="text-3xl font-bold text-center">Padel Tracker</h1>
      <AddMatch />
      <Leaderboard />
    </div>
  );
}
