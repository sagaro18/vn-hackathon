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

    // FIX: Changed "0" to "-1, 0, or 1" so the AI knows it's supposed to change it!
    const systemInstruction = `\n\n[SYSTEM INSTRUCTION: You must respond in valid JSON format exactly like this: {"reply": "your dialogue here", "affectionDelta": <insert -1, 0, or 1 here>, "suggestedPrompts": ["Option 1", "Option 2", "Option 3"]}. Do not include any other text outside the JSON.]`;

    const result = await activeAgent.generate(userMessage + systemInstruction);

    const rawText = typeof result === "string"
        ? result
        : typeof result?.text === "string"
            ? result.text
            : "{}";

    // DEBUG LOG: This will print the AI's raw output to your backend terminal!
    console.log("\n--- RAW AI RESPONSE ---");
    console.log(rawText);
    console.log("-----------------------\n");

    let reply = "...";
    let suggestedPrompts: string[] = [];
    let aiAffectionDelta = 0;

    // Parse the AI's JSON response
    try {
      const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const aiData = JSON.parse(cleanedText);

      reply = aiData.reply || "...";
      suggestedPrompts = aiData.suggestedPrompts || [];

      aiAffectionDelta = Number(aiData.affectionDelta);
      if (isNaN(aiAffectionDelta)) {
        aiAffectionDelta = 0;
      }

    } catch (parseError) {
      console.warn("Failed to parse AI JSON, falling back to raw text.");
      reply = rawText;
      suggestedPrompts = ["Tell me more.", "I see.", "That's interesting."];
    }

    const nextAffection = Math.max(0, currentAffection + aiAffectionDelta);
    const nextTurnCount = turnCount + 1;
    const sceneEnded = nextTurnCount >= 4 && nextAffection >= 3;

    // Determine expression based on the AI's affection delta
    let expression = "Neutral";
    if (aiAffectionDelta > 0) expression = characterId === "vaina" ? "Happy" : "Giggling";
    else if (aiAffectionDelta < 0) expression = "Angry";

    return c.json({
      ok: true,
      characterId,
      reply,
      affectionDelta: aiAffectionDelta,
      expression,
      nextAffection,
      nextTurnCount,
      sceneEnded,
      suggestedPrompts,
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