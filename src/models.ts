export const DUCKCODING_CODEX_MODELS = [
  {
    id: "gpt-5.2-codex",
    name: "GPT 5.2 CodeX",
    reasoning: true,
    input: ["text", "image"] as const,
    cost: { input: 1.75, output: 14, cacheRead: 0.175, cacheWrite: 0 },
    contextWindow: 400000,
    maxTokens: 128000,
  },
];
