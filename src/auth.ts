import {
  DUCKCODING_CODEX_BASE_URL,
  PROVIDER_ID_DUCKCODING,
  AUTH_PROFILE_ID,
} from "./constants.js";
import { DUCKCODING_CODEX_MODELS } from "./models.js";

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
    hint: "请输入 DuckCoding API Key（CodeX专用（Droid/OpenClaw））",
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
        message: "DuckCoding API Key（CodeX专用（Droid/OpenClaw））",
        placeholder: "sk-...",
        validate: validateApiKey,
      });

      const trimmedKey = apiKey.trim();
      const defaultModelRef = `${PROVIDER_ID_DUCKCODING}/gpt-5.2-codex`;

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
              [PROVIDER_ID_DUCKCODING]: {
                baseUrl: DUCKCODING_CODEX_BASE_URL,
                apiKey: trimmedKey,
                api: "openai-responses",
                models: DUCKCODING_CODEX_MODELS,
              },
            },
          },
          agents: {
            defaults: {
              model: defaultModelRef,
              models: {
                ...Object.fromEntries(
                  DUCKCODING_CODEX_MODELS.map((m) => [
                    `${PROVIDER_ID_DUCKCODING}/${m.id}`,
                    {},
                  ])
                ),
              },
            },
          },
        },
        defaultModel: defaultModelRef,
        notes: [
          "DuckCoding 提供 CodeX 模型访问。",
          "模型可用 duckcoding/ 前缀调用。",
        ],
      };
    },
  };
}
