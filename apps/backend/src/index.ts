import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { z } from "zod";
import { vainaAgent } from "./agents/vaina.js";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

const chatRequestSchema = z.object({
  characterId: z.string(),
  userMessage: z.string().min(1, "userMessage is required"),
});

const agentResponseSchema = z.object({
  reply: z.string(),
  affectionDelta: z.number(),
  expression: z.enum(["Happy", "Neutral", "Sad", "Angry", "Giggling"]),
});

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Hono backend is alive",
  });
});

app.get("/health", (c) => {
  return c.json({
    ok: true,
  });
});

app.post("/api/chat", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          ok: false,
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        400
      );
    }

    const { characterId, userMessage } = parsed.data;

    if (characterId !== "vaina") {
      return c.json(
        {
          ok: false,
          error: "Character not found",
        },
        404
      );
    }

    const result = await vainaAgent.generate(userMessage);

    const reply =
      typeof result === "string"
        ? result
        : typeof result?.text === "string"
          ? result.text
          : "..."

    return c.json({
      ok: true,
      characterId,
      reply,
      affectionDelta: 1,
      expression: "Neutral",
    });
  } catch (error) {
    console.error("Chat Error:", error);

    return c.json(
      {
        ok: false,
        error: "Failed to generate response",
      },
      500
    );
  }
});

const port = Number(process.env.PORT ?? 3000);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`AI backend running on http://localhost:${info.port}`);
  }
);