# formlova-mcp

FORMLOVA MCP setup helper for Codex, Claude Code, Cursor, ChatGPT, and Gemini CLI.

## Main connection URL

Use this MCP server URL in any MCP-compatible client:

`https://formlova.com/api/mcp`

Reviewing setup instructions and registering the URL does not require a FORMLOVA account.  
On first real use, you can log in or sign up during authentication.

## Usage

No install needed:

```bash
npx @alllova/formlova-mcp print --client all
```

Project config write:

```bash
npx @alllova/formlova-mcp install --client all --scope project --yes
```

Connectivity and local config check:

```bash
npx @alllova/formlova-mcp doctor
```

## Commands

### `print`

Print setup snippets only (no file write).

```bash
npx @alllova/formlova-mcp print --client codex
npx @alllova/formlova-mcp print --client claude-code
npx @alllova/formlova-mcp print --client cursor
npx @alllova/formlova-mcp print --client chatgpt
npx @alllova/formlova-mcp print --client gemini-cli
```

### `install`

Writes project-level setup files.

Supported writes:

- Codex: `.codex/config.toml`
- Claude Code: `.mcp.json`
- Cursor: `.cursor/mcp.json`

For ChatGPT and Gemini CLI, this command prints setup instructions (no local config file standard).

```bash
npx @alllova/formlova-mcp install --client all --scope project --yes
```

### `doctor`

Checks:

- `https://formlova.com/api/mcp` reachability
- Presence of common local setup files

```bash
npx @alllova/formlova-mcp doctor
```

## Client quick references

### Claude

- Settings > Connectors で Remote MCP を追加
- Docs: https://support.anthropic.com/en/articles/11175166-how-do-i-connect-to-remote-mcp-servers-from-claude-desktop

### ChatGPT

- 開発者モード時: 設定 > アプリ > 高度な設定（アプリを作成する）
- Docs: https://platform.openai.com/docs/guides/tools-remote-mcp

### Codex

```bash
codex mcp add formlova --url https://formlova.com/api/mcp
```

### Claude Code

```bash
claude mcp add --transport http formlova https://formlova.com/api/mcp
```

### Cursor

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

## Notes

Client-side setup menus and steps may change without notice.
