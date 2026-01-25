# /help Protocol

> URLs + markdown is enough for remote knowledge and capabilities.

A simple, HTTP-based standard for remote knowledge bases and service capabilities. Any agent that can `curl` a URL can discover and use a `/help` endpoint—no SDKs, schemas, or protocol connectors required.

## Why /help?

| Aspect | MCP | Agent Skills | /help |
|--------|-----|--------------|-------|
| Transport | JSON-RPC | Filesystem | HTTP |
| Discovery | Upfront schemas | Metadata in prompt | `/help` endpoint |
| Context cost | High | Low | **Minimal** |
| Reach | Local | Local | **Remote** |

The `/help` protocol brings the simplicity of [Anthropic's Agent Skills](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/skills) to remote endpoints. It uses **progressive disclosure**—agents fetch only what they need, when they need it.

## Quick Start

### The Pattern

```
GET /help              → Overview and available topics
GET /topic/help        → Detailed information on topic
GET /topic/subtopic    → Deeper drilling
```

All responses are **markdown-formatted**—human-readable and AI-parseable.

### Minimal Example (Python/FastAPI)

```python
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/help", response_class=PlainTextResponse)
def root_help():
    return """# My API

Welcome! Here's what you can do:

## Topics
- `/auth/help` - Authentication guide
- `/users/help` - User management
- `/search` - POST endpoint for queries

## Quick Actions
- `GET /status` - Health check
- `POST /users` - Create a user
"""

@app.get("/auth/help", response_class=PlainTextResponse)
def auth_help():
    return """# Authentication

## Getting a Token
POST to `/auth/token` with:
```json
{"username": "...", "password": "..."}
```

## Using the Token
Add header: `Authorization: Bearer <token>`

## Token Refresh
POST to `/auth/refresh` with your current token.
"""

@app.get("/users/help", response_class=PlainTextResponse)
def users_help():
    return """# User Management

## List Users
`GET /users` - Returns paginated user list

## Create User
`POST /users` with:
```json
{"name": "...", "email": "..."}
```

## Get User
`GET /users/{id}` - Returns user details
"""
```

### Using It

```bash
# Discover what's available
curl https://api.example.com/help

# Drill into a topic
curl https://api.example.com/auth/help

# Search (optional)
curl -X POST https://api.example.com/search -d '{"q": "how to authenticate"}'
```

## Two Modes

### Knowledge Mode
Serve navigable documentation. Agents fetch the table of contents first, then retrieve only relevant sections.

```
/help
├── /concepts/help
│   ├── /concepts/architecture
│   └── /concepts/data-model
├── /guides/help
│   ├── /guides/quickstart
│   └── /guides/deployment
└── /reference/help
```

### Capabilities Mode
Describe available services and how to use them. Agents discover and invoke endpoints on demand.

```
/help
├── /payments/help      → How to process payments
├── /shipping/help      → Shipping rate calculation
└── /inventory/help     → Stock management
```

## Design Principles

1. **No mandatory structure** beyond the root `/help` endpoint
2. **Markdown everywhere** for universal compatibility
3. **Progressive disclosure** to minimize context overhead
4. **Implicit versioning** through content updates
5. **Composition via URLs** linking between endpoints

## Use Cases

- **Documentation Sites** - Agent-navigable docs serving sections on demand
- **Internal Knowledge** - Company policies accessible via lookup
- **API References** - Markdown descriptions replacing OpenAPI verbosity
- **Service Wrappers** - Capability discovery for agent orchestration
- **Multi-Agent RAG** - Structured navigation over vector search

## For Builders

Creating a /help service? Check out:
- [`SKILL.md`](./SKILL.md) - Claude Code skill for building /help services
- [`AGENTS.md`](./AGENTS.md) - Agent instructions for building /help services
- [`examples/`](./examples/) - Implementation examples in Python, Node, TypeScript, Go

## For Users

Using a /help endpoint with your AI agent? Just give it the URL:
- [`CLAUDE.md`](./CLAUDE.md) - Simple instructions for consuming /help endpoints

```
"Check https://api.example.com/help and help me authenticate"
```

That's it. Your agent fetches `/help`, reads the markdown, follows the links.

## Philosophy

The `/help` protocol proves that simple standards win:

> "Just like Agent Skills proved 'folders + markdown is enough for local agent capabilities,' /help proves 'URLs + markdown is enough for remote knowledge and capabilities.'"

No JSON-RPC. No schema negotiation. No SDK dependencies. Just HTTP and markdown.

---

**Read the full proposal:** [The /help Protocol](https://baobabtech.ai/posts/help-protocol)

## License

MIT
