import authRoutes from "./routes/auth";
import matchRoutes from "./routes/match";

app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
