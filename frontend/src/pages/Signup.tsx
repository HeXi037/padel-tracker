import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "../api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await api.post("/auth/register", { email, password });
    nav("/login");
  }
  return (
    <Card className="max-w-sm mx-auto mt-10">
      <CardContent as="form" onSubmit={submit} className="grid gap-4 p-6">
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Create account</Button>
      </CardContent>
    </Card>
  );
}
