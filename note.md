การสร้าง MCV ของ OpenCode

1 สร้าง opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "my-local-mcp-server": {
      "type": "local",
      // Or ["bun", "x", "my-mcp-command"]
      "command": ["npx", "-y", "my-mcp-command"],
      "enabled": true,
      "environment": {
        "MY_ENV_VAR": "my_env_var_value",
      },
    },
  },
}


แก้ไข mcv next js
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}

ให้อยู่ในรูปแบบ opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "next-devtools": {
      "type": "local",
      "command": ["npx", "-y", "next-devtools-mcp@latest"],
      "enabled": true
    }
  }
}



