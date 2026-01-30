# moltbot-duckcoding-auth

DuckCoding Claude provider 插件，用于 [OpenClaw](https://github.com/openclaw/openclaw) / Clawdbot（原 Moltbot）。

通过 DuckCoding API 访问 Claude 模型。官网：https://duckcoding.com

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
openclaw models auth login --provider duckcoding-claude --set-default
```

请使用 **Claude Code 专用 - Kiro 分组** 的 Key。

## 支持的模型

| Provider | Model ID | 描述 |
|----------|----------|------|
| Claude | `duckcoding-claude/claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 (200K context) |

## 使用

```bash
# 使用默认模型（Claude Sonnet 4.5）
openclaw agent --message "你好"

# 指定模型
openclaw agent --model duckcoding-claude/claude-sonnet-4-5-20250929 --message "你好"

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
