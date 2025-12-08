import express from "express";
import path from "path";

import { clerkMiddleware } from '@clerk/express'
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }))

const PORT = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
  res.send("OK");
})

//make our app ready for deployment

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`✅ Server up and running on ${ENV.PORT}`);
  })
}

startServer();