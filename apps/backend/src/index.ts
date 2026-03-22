import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { z } from "zod";
import { vainaAgent } from "./agents/vaina.js";
import { meriAgent } from "./agents/meri.js"; 

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
  currentAffection: z.number().optional(),
  turnCount: z.number().optional(),
});

type Expression = "Happy" | "Neutral" | "Sad" | "Angry" | "Giggling";

function scoreAffection(userMessage: string, characterId: string): {
  affectionDelta: number;
  expression: Expression;
} {
  const msg = userMessage.toLowerCase().trim();

  const negativeSignals = [
    "shut up", "stupid", "idiot", "liar", "you're weird", 
    "you are weird", "i don't care", "whatever", "leave me alone", 
    "annoying", "dumb", "freak"
  ];

  const negativeMatch = negativeSignals.some((phrase) => msg.includes(phrase));
  if (negativeMatch) {
    return { affectionDelta: -1, expression: "Angry" };
  }

  let positiveSignals: string[] = [];

  if (characterId === "vaina") {
    positiveSignals = [
      "thank you", "tell me more", "that sounds beautiful", 
      "stars", "dream", "adventure", "leave with me", "how are you"
    ];
  } else if (characterId === "meri") {
    positiveSignals = [
      "food", "eat", "hungry", "meal", "share", 
      "you're normal", "i understand", "want to hang out",
      "are you okay", "you seem" 
    ];
  }

  const positiveMatch = positiveSignals.some((phrase) => msg.includes(phrase));
  
  if (positiveMatch) {
    return { affectionDelta: 1, expression: characterId === "vaina" ? "Happy" : "Giggling" };
  }

  return { affectionDelta: 0, expression: "Neutral" };
}

app.get("/", (c) => c.json({ ok: true, message: "Hono backend is alive" }));
app.get("/health", (c) => c.json({ ok: true }));

app.post("/api/chat", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return c.json({ ok: false, error: "Invalid request body", details: parsed.error.flatten() }, 400);
    }

    const { characterId, userMessage, currentAffection = 0, turnCount = 0 } = parsed.data;

    let activeAgent;
    if (characterId === "vaina") activeAgent = vainaAgent;
    else if (characterId === "meri") activeAgent = meriAgent;
    else return c.json({ ok: false, error: "Character not found" }, 404);

    const result = await activeAgent.generate(userMessage);

    const reply =
      typeof result === "string"
        ? result
        : typeof result?.text === "string"
          ? result.text
          : "...";

    const { affectionDelta, expression } = scoreAffection(userMessage, characterId);

    const nextAffection = Math.max(0, currentAffection + affectionDelta);
    const nextTurnCount = turnCount + 1;
    const sceneEnded = nextTurnCount >= 4 && nextAffection >= 3;

    return c.json({
      ok: true,
      characterId,
      reply,
      affectionDelta,
      expression,
      nextAffection,
      nextTurnCount,
      sceneEnded,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    return c.json({ ok: false, error: "Failed to generate response" }, 500);
  }
});

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AI backend running on http://localhost:${info.port}`);
});