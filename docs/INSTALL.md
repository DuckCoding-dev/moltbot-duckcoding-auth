# moltbot-duckcoding-auth 安装教程

DuckCoding Claude provider 插件（OpenClaw / Clawdbot） - 通过 DuckCoding API 访问 Claude 模型。

官网：https://duckcoding.com

## 前置要求

- 已安装 [OpenClaw](https://github.com/openclaw/openclaw)
- DuckCoding API Key（Claude Code 专用 - Kiro 分组）

## 安装步骤

### 1. 安装 OpenClaw

在 **终端** 中执行：

```bash
npm install -g openclaw@latest
```

安装完成后，验证安装：

```bash
openclaw --version
```

（截图）

### 2. 安装插件

```bash
openclaw plugins install moltbot-duckcoding-auth
```

（截图）

然后启用插件：

```bash
openclaw plugins enable moltbot-duckcoding-auth
```

（截图）

如果 gateway 正在运行，需要重启一下：

```bash
openclaw gateway stop
openclaw gateway run
```

### 3. 配置 API Key

```bash
openclaw models auth login --provider duckcoding-claude --set-default
```

按提示输入你的 DuckCoding API Key（Claude Code 专用 - Kiro 分组）。

（截图）

### 4. 验证安装

```bash
openclaw models list | grep duckcoding
```

（截图）

你应该能看到以下模型：

```
duckcoding-claude/claude-sonnet-4-5-20250929
```

> 如果你使用 clawdbot，将命令中的 `openclaw` 替换为 `clawdbot`。

### 5. 执行初始化配置（第一次安装必须）

启动配置流程：

```bash
openclaw onboard --install-daemon
```

（截图）

接下来按提示选择（建议）：

1) 选择 **yes**
（截图）
2) 选择 **Quick Start**
（截图）
3) 选择 **使用已有配置**
（截图）
4) 模型供应商选择 **跳过**
（截图）
5) Provider 选择 **duckcoding**（推荐使用 Claude，工具调用能力强）
（截图）
6) 选择默认模型：`claude-sonnet-4-5-20250929`
（截图）
7) 聊天渠道先 **跳过**，后续再配置
（截图）
8) 设置 skill（可按需选择）

（截图）

推荐的 skill（从上到下顺序）：
- 监控/阅读博客
- Clawdbot/OpenClaw 文档
- MCP 管理
- Obsidian 笔记

按空格选择，选完后按回车确认。后续安装完成即可。

（截图）

提示：后续有些 API 可按需填写，不需要的可选 **no**。Hooks 建议全开。安装过程中若出现权限申请，建议全部允许。

（截图）

## 使用方法

```bash
# 使用默认模型 (Claude Sonnet 4.5)
openclaw agent --message "你好"

# 指定模型
openclaw agent --model duckcoding-claude/claude-sonnet-4-5-20250929 --message "你好"
```

## 支持的模型

| Provider | Model ID | 描述 |
|----------|----------|------|
| Claude | `duckcoding-claude/claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 (200K context) |

## 环境变量（可选）

你也可以通过环境变量设置 API Key：

```bash
export DUCKCODING_API_KEY=your-api-key
```

## 常见问题

### 插件未加载

确保插件已启用：

```bash
openclaw plugins list
```

如果状态是 `disabled`，运行：

```bash
openclaw plugins enable moltbot-duckcoding-auth
```

### API Key 无效

重新配置 API Key：

```bash
openclaw models auth login --provider duckcoding-claude
```
