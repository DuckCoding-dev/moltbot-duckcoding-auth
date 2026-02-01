# moltbot-duckcoding-auth

[![npm version](https://img.shields.io/npm/v/moltbot-duckcoding-auth)](https://www.npmjs.com/package/moltbot-duckcoding-auth)
[![npm downloads](https://img.shields.io/npm/dm/moltbot-duckcoding-auth)](https://www.npmjs.com/package/moltbot-duckcoding-auth)
[![license](https://img.shields.io/github/license/DuckCoding-dev/moltbot-duckcoding-auth)](https://github.com/DuckCoding-dev/moltbot-duckcoding-auth/blob/main/LICENSE)

DuckCoding CodeX provider 插件，用于 [OpenClaw](https://github.com/openclaw/openclaw) / Clawdbot（原 Moltbot）。

通过 DuckCoding API 访问 CodeX 模型。官网：https://duckcoding.com

## 安装

```bash
openclaw plugins install moltbot-duckcoding-auth
```

或通过 npm 安装：

```bash
npm install moltbot-duckcoding-auth
```

启用插件：

```bash
openclaw plugins enable moltbot-duckcoding-auth
```

> 如果你使用 clawdbot，将命令中的 `openclaw` 替换为 `clawdbot`。

## 认证

安装后使用 DuckCoding API Key 认证：

```bash
openclaw models auth login --provider duckcoding --set-default
```

请使用 **CodeX专用（Droid/OpenClaw）** 的 Key。

## 支持的模型

| Provider | Model ID | 描述 |
|----------|----------|------|
| CodeX | `duckcoding/gpt-5.2-codex` | GPT 5.2 CodeX (400K context) |

## 使用

```bash
# 使用默认模型（GPT 5.2 CodeX）
openclaw agent --message "你好"

# 指定模型
openclaw agent --model duckcoding/gpt-5.2-codex --message "你好"

# 查看可用模型
openclaw models list | grep duckcoding
```

## 环境变量

也可以通过环境变量设置 API Key：

```bash
export DUCKCODING_API_KEY=your-api-key
```

## License

MIT
