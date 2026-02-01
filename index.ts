import {
  PLUGIN_ID,
  PLUGIN_NAME,
  PLUGIN_DESCRIPTION,
  PROVIDER_ID_DUCKCODING,
  DUCKCODING_CODEX_BASE_URL,
  DUCKCODING_API_KEY_ENV,
} from "./src/constants.js";
import { DUCKCODING_CODEX_MODELS } from "./src/models.js";
import { createDuckcodingAuthMethod } from "./src/auth.js";

const EMPTY_PLUGIN_CONFIG_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {},
} as const;

const duckcodingPlugin = {
  id: PLUGIN_ID,
  name: PLUGIN_NAME,
  description: PLUGIN_DESCRIPTION,
  configSchema: EMPTY_PLUGIN_CONFIG_SCHEMA,
  register(api: {
    registerProvider: (provider: {
      id: string;
      label: string;
      envVars?: string[];
      models?: {
        baseUrl: string;
        api: string;
        models: Array<{
          id: string;
          name: string;
          reasoning: boolean;
          input: readonly string[];
          cost: { input: number; output: number; cacheRead: number; cacheWrite: number };
          contextWindow: number;
          maxTokens: number;
        }>;
      };
      auth: Array<ReturnType<typeof createDuckcodingAuthMethod>>;
    }) => void;
  }) {
    const authMethod = createDuckcodingAuthMethod();

    api.registerProvider({
      id: PROVIDER_ID_DUCKCODING,
      label: "DuckCoding CodeX",
      envVars: [DUCKCODING_API_KEY_ENV],
      models: {
        baseUrl: DUCKCODING_CODEX_BASE_URL,
        api: "openai-responses",
        models: DUCKCODING_CODEX_MODELS,
      },
      auth: [authMethod],
    });
  },
};

export default duckcodingPlugin;
