# formlova-mcp

Connect [FORMLOVA](https://formlova.com) to any MCP-compatible AI client without hand-writing setup files.

FORMLOVA is a chat-first form operations service. Most form tools stop at creation — FORMLOVA starts after publish. It covers the full post-publish lifecycle: response management, follow-up emails, reminders, A/B tests, email sequences, analytics, team management, and more — all from your AI chat.

**127 MCP tools across 25 categories.** Works with Claude, ChatGPT, Codex, Claude Code, Cursor, Gemini CLI, Windsurf, and any MCP-compatible client.

`formlova-mcp` is not the FORMLOVA server. It is a small CLI helper for setup snippets, project-level config files, and a quick connectivity check.

## The fastest path

Most users do not need this package.

If your AI client already has an MCP add screen, use this URL directly:

```txt
https://formlova.com/api/mcp
```

Reviewing setup instructions and registering the URL does not require a FORMLOVA account. On first real use, you can log in or sign up during authentication.

If you want a CLI helper instead, start here:

```bash
npx -y formlova-mcp print --client all
```

If you want project-level config files written for supported developer tools:

```bash
npx -y formlova-mcp install --client all --scope project --yes
```

This writes config files only. Authentication still begins inside the client on first use, and some clients require a restart or reconnect before the tools appear.

## What this package is for

- Print copy-paste setup snippets for supported clients
- Generate project-level config files for common developer tools
- Check whether the FORMLOVA MCP URL is reachable from your machine
- Standardize local MCP setup across a team or repo

## Supported clients

This package provides setup helpers for:

- ChatGPT
- Claude
- Codex
- Claude Code
- Cursor
- Gemini CLI
- Windsurf

Any MCP-compatible client can connect with the same URL — the list above is not a limitation:

```txt
https://formlova.com/api/mcp
```

## Command overview

| Command | Purpose | Writes files |
| --- | --- | --- |
| `print` | Show setup snippets for one or more clients | No |
| `install` | Write supported project-level config files | Yes |
| `doctor` | Check MCP URL reachability and local config presence | No |

### `print`

Print setup snippets only. No files are written.

```bash
npx -y formlova-mcp print --client codex
npx -y formlova-mcp print --client claude-code
npx -y formlova-mcp print --client cursor
npx -y formlova-mcp print --client chatgpt
npx -y formlova-mcp print --client gemini-cli
```

### `install`

Write project-level setup files for supported developer tools.

```bash
npx -y formlova-mcp install --client all --scope project --yes
```

`install` does not complete OAuth or client-side authentication for you.

Current write targets:

| Client | Path written by `install` |
| --- | --- |
| Codex | `.codex/config.toml` |
| Claude Code | `.mcp.json` |
| Cursor | `.cursor/mcp.json` |

For ChatGPT and Gemini CLI, `install` prints setup guidance because there is no stable local config file target in this package.

### `doctor`

Check MCP URL reachability and common local config files.

```bash
npx -y formlova-mcp doctor
```

## Client setup references

### ChatGPT

- Enable developer mode first
- Then open `Settings > Apps > Advanced settings (Create app)` and add the MCP server URL
- Docs: [OpenAI remote MCP guide](https://platform.openai.com/docs/guides/tools-remote-mcp)

### Claude

- Open `Settings > Connectors`
- Add the remote MCP server URL
- Docs: [Claude remote MCP guide](https://support.anthropic.com/en/articles/11175166-how-do-i-connect-to-remote-mcp-servers-from-claude-desktop)

### Codex

```bash
codex mcp add formlova --url https://formlova.com/api/mcp
```

### Claude Code

```bash
claude mcp add --transport http formlova https://formlova.com/api/mcp
```

### Cursor

You can use the normal MCP UI, or a config file such as:

```json
{
  "mcpServers": {
    "formlova": {
      "url": "https://formlova.com/api/mcp"
    }
  }
}
```

### Gemini CLI

```bash
gemini mcp add --transport http formlova https://formlova.com/api/mcp
```

## What it does not do

- It does not run a local FORMLOVA MCP server
- It does not replace the normal web-based setup flow for ChatGPT or Claude
- It does not complete client-side authentication or OAuth on your behalf
- It does not auto-write user-level config yet

## Requirements

- Node.js `18.17+`

## Notes

Client-side setup menus and steps may change without notice. When in doubt, ask your AI client how to add an MCP server, then use:

```txt
https://formlova.com/api/mcp
```

## Links

- Product: [formlova.com](https://formlova.com)
- Setup guide: [formlova.com/en/setup](https://formlova.com/en/setup)
- Workflow Place: [formlova.com/en/workflows](https://formlova.com/en/workflows)
- Blog: [formlova.com/en/blog](https://formlova.com/en/blog)
- Public repo: [github.com/formlova/formlova-mcp](https://github.com/formlova/formlova-mcp)
- Product Hunt: [producthunt.com/products/formlova](https://www.producthunt.com/products/formlova?launch=formlova)
