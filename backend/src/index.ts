import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono, type Next } from "hono";
import { type AuthSession } from "./lib/better-auth/auth-types.js";
import { auth } from "./lib/better-auth/auth.js";
import { configCors } from "./middleware/cors.middleware.js";
import { addSession } from "./middleware/session.middleware.js";
import { PORT } from "./lib/env.js";
import sessionValidator from "./middleware/unauthorized-access.middleware.js";
const app = new Hono<AuthSession>();

app.use(configCors);
app.use(addSession);
app.use(sessionValidator);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

const port = Number(PORT) || 5000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
