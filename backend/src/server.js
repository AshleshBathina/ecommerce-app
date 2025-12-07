import express from "express";
import path from "path";

import { clerkMiddleware } from "@clerk/express"
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

const __dirname = path.resolve();

app.use(clerkMiddleware());

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

app.listen(ENV.PORT, () => {
  console.log(`✅ Server is up and running on port ${PORT}`);
  connectDB();
});

