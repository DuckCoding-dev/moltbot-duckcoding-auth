import {
  DUCKCODING_CLAUDE_BASE_URL,
  PROVIDER_ID_CLAUDE,
  AUTH_PROFILE_ID,
} from "./constants.js";
import { DUCKCODING_CLAUDE_MODELS } from "./models.js";

function validateApiKey(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "API Key 不能为空";
  if (trimmed.length < 10) return "API Key 似乎过短";
  return undefined;
}

export function createDuckcodingAuthMethod() {
  return {
    id: "api_key",
    label: "DuckCoding API Key",
    hint: "请输入 DuckCoding API Key（Claude Code 专用 - Kiro 分组）",
    kind: "api_key" as const,
    run: async (ctx: {
      prompter: {
        text: (opts: {
          message: string;
          placeholder?: string;
          validate?: (value: string) => string | undefined;
        }) => Promise<string>;
      };
    }) => {
      const apiKey = await ctx.prompter.text({
        message: "DuckCoding API Key（Claude Code 专用 - Kiro 分组）",
        placeholder: "sk-...",
        validate: validateApiKey,
      });

      const trimmedKey = apiKey.trim();
      const defaultModelRef = `${PROVIDER_ID_CLAUDE}/claude-sonnet-4-5-20250929`;

      return {
        profiles: [
          {
            profileId: AUTH_PROFILE_ID,
            credential: {
              type: "api_key" as const,
              provider: "duckcoding",
              key: trimmedKey,
            },
          },
        ],
        configPatch: {
          models: {
            providers: {
              [PROVIDER_ID_CLAUDE]: {
                baseUrl: DUCKCODING_CLAUDE_BASE_URL,
                apiKey: trimmedKey,
                api: "anthropic-messages",
                models: DUCKCODING_CLAUDE_MODELS,
              },
            },
          },
          agents: {
            defaults: {
              model: defaultModelRef,
              models: {
                ...Object.fromEntries(
                  DUCKCODING_CLAUDE_MODELS.map((m) => [
                    `${PROVIDER_ID_CLAUDE}/${m.id}`,
                    {},
                  ])
                ),
              },
            },
          },
        },
        defaultModel: defaultModelRef,
        notes: [
          "DuckCoding 提供 Claude 模型访问。",
          "模型可用 duckcoding-claude/ 前缀调用。",
        ],
      };
    },
  };
}
