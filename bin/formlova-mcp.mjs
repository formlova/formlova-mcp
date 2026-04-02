#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const MCP_URL = "https://formlova.com/api/mcp";
const VALID_CLIENTS = new Set([
  "all",
  "codex",
  "claude-code",
  "cursor",
  "chatgpt",
  "gemini-cli",
]);

function printHelp() {
  console.log(`formlova-mcp

Usage:
  formlova-mcp print --client <client|all>
  formlova-mcp install --client <client|all> [--scope project] [--yes]
  formlova-mcp doctor

Options:
  --client   all | codex | claude-code | cursor | chatgpt | gemini-cli
  --scope    project (default) | user
  --yes      write files without prompt
`);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const args = { command, client: "all", scope: "project", yes: false };
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (token === "--client") args.client = rest[i + 1] ?? "all";
    if (token === "--scope") args.scope = rest[i + 1] ?? "project";
    if (token === "--yes") args.yes = true;
    if (token === "--help" || token === "-h") args.command = "help";
  }
  return args;
}

function snippets() {
  return {
    codex: `codex mcp add formlova --url ${MCP_URL}`,
    "claude-code": `claude mcp add --transport http formlova ${MCP_URL}`,
    cursor: `{
  "mcpServers": {
    "formlova": {
      "url": "${MCP_URL}"
    }
  }
}`,
    chatgpt: "ChatGPT (developer mode): Settings > Apps > Advanced settings (Create app), then add MCP server URL.",
    "gemini-cli": `gemini mcp add --transport http formlova ${MCP_URL}`,
  };
}

function resolveClients(target) {
  if (!VALID_CLIENTS.has(target)) {
    throw new Error(`Invalid --client: ${target}`);
  }
  if (target === "all") {
    return ["codex", "claude-code", "cursor", "chatgpt", "gemini-cli"];
  }
  return [target];
}

function printConfig(client) {
  const s = snippets();
  console.log(`\n[${client}]`);
  console.log(s[client]);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeProjectConfig(client) {
  if (client === "codex") {
    const target = path.resolve(process.cwd(), ".codex/config.toml");
    ensureDir(target);
    const content = `[mcp_servers.formlova]
url = "${MCP_URL}"
`;
    fs.writeFileSync(target, content, "utf8");
    console.log(`Wrote ${target}`);
    return;
  }
  if (client === "claude-code") {
    const target = path.resolve(process.cwd(), ".mcp.json");
    ensureDir(target);
    const content = JSON.stringify(
      { mcpServers: { formlova: { url: MCP_URL } } },
      null,
      2
    );
    fs.writeFileSync(target, `${content}\n`, "utf8");
    console.log(`Wrote ${target}`);
    return;
  }
  if (client === "cursor") {
    const target = path.resolve(process.cwd(), ".cursor/mcp.json");
    ensureDir(target);
    const content = JSON.stringify(
      { mcpServers: { formlova: { url: MCP_URL } } },
      null,
      2
    );
    fs.writeFileSync(target, `${content}\n`, "utf8");
    console.log(`Wrote ${target}`);
    return;
  }
  if (client === "chatgpt" || client === "gemini-cli") {
    printConfig(client);
  }
}

async function runDoctor() {
  try {
    const res = await fetch(MCP_URL, { method: "GET" });
    console.log(`MCP URL check: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.log(`MCP URL check: failed (${String(err)})`);
  }

  const checks = [
    ".codex/config.toml",
    ".mcp.json",
    ".cursor/mcp.json",
  ];
  for (const p of checks) {
    const abs = path.resolve(process.cwd(), p);
    console.log(`${p}: ${fs.existsSync(abs) ? "found" : "not found"}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.command || args.command === "help") {
    printHelp();
    return;
  }

  if (args.command === "print") {
    for (const client of resolveClients(args.client)) printConfig(client);
    return;
  }

  if (args.command === "install") {
    if (args.scope === "user") {
      console.log("User-scope auto-write is not enabled yet.");
      console.log("Use --scope project or run: formlova-mcp print --client all");
      return;
    }
    if (!args.yes) {
      console.log("Add --yes to write files. Example:");
      console.log("  formlova-mcp install --client all --scope project --yes");
      return;
    }
    for (const client of resolveClients(args.client)) writeProjectConfig(client);
    return;
  }

  if (args.command === "doctor") {
    await runDoctor();
    return;
  }

  printHelp();
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

