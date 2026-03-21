# 📱 AI Visual Novel: Social Link Edition (Hackathon Build)

A mobile-first visual novel where the standard dialogue trees are replaced by dynamic, AI-driven conversations. Players experience a tightly written mystery/horror story, but during "Free Time," they text directly with characters (powered by a local LLM). The AI evaluates the player's tone and dynamically adjusts their relationship/affection meter in real-time.

## 🛠 The Tech Stack
This project uses a lightning-fast monorepo setup.
* **Frontend:** React Native / Expo (TypeScript, Expo Router/React Navigation)
* **Backend:** Hono (Node.js)
* **AI Orchestration:** Mastra 
* **Local Inference:** Ollama (Llama 3.1 8B)
* **Package Manager:** pnpm

---

## 🚀 Local Development Setup

To get the full engine running, you need to spin up three things: the local AI, the backend server, and the mobile bundler. 

### 0. Prerequisites
Before you start, make sure you have installed:
* [Node.js](https://nodejs.org/) & [pnpm](https://pnpm.io/installation)
* [Ollama](https://ollama.com/) (For running the local AI)
* **Expo Go** app on your physical iOS/Android device (for mobile testing)

Install all workspace dependencies from the root:
```bash
pnpm install
```

### 1. Boot the AI Brain (Ollama)
We are running Llama 3.1 8B locally to avoid API costs, rate limits, and censorship filters during the hackathon. 

Open a dedicated terminal and start the Ollama server:
```bash
ollama serve
```

In a separate terminal window, download and run the model:
```bash
ollama run llama3.1
```
*(Leave the `ollama serve` terminal running in the background).*

### 2. Start the Hono Backend
The backend acts as the bridge between the mobile app and the AI, parsing the structured JSON so the UI knows how the character reacts.

Open a new terminal and run:
```bash
cd apps/backend
pnpm run dev
```
*The server will start on `http://localhost:3000`.*

### 3. Start the Expo Mobile App
Now, let's boot up the UI. 

Open a final terminal window and run:
```bash
cd apps/mobile
npx expo start
```
* **To test on Web:** Press `w` in the terminal to open it in your browser.
* **To test on Mobile:** Connect your phone to the same Wi-Fi network and scan the QR code with your camera (or the Expo Go app). 

*(Note: If testing on a physical phone, you must change `localhost` in `apps/mobile/screens/ChatScreen.tsx` to your computer's local Wi-Fi IP address!)*

---

## 📂 Folder Structure

* `/apps/mobile/` - The React Native Expo frontend.
  * `/data/story.ts` - The linear visual novel script.
  * `/screens/` - UI components (`StoryScreen.tsx`, `ChatScreen.tsx`).
* `/apps/backend/` - The Hono API and AI logic.
  * `/src/agents/` - Mastra system prompts and character logic (e.g., `vaina.ts`).
  * `/src/index.ts` - The core API endpoints.

---

## 🎯 Hackathon TODO List
*(Features we still need to ship before Sunday!)*
- [x] Build the visual novel engine (`StoryScreen`).
- [x] Integrate Mastra + Ollama for dynamic AI responses.
- [x] Build the chat interface and affection meter (`ChatScreen`).
- [ ] **WIP:** Integrate RevenueCat for the premium Gem economy.
- [ ] **WIP:** Add a second AI character (Meri).
- [ ] **WIP:** Build the Paywall UI (Unlock premium scenes if affection is high enough).