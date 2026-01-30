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
    return """# Recipe Book API

Welcome! Here's what you can explore:

## Topics
- `/recipes/help` - Browse recipes by category
- `/ingredients/help` - Ingredient information
- `/techniques/help` - Cooking techniques

## Quick Actions
- `GET /status` - Health check
- `GET /recipes` - List all recipes
"""

@app.get("/recipes/help", response_class=PlainTextResponse)
def recipes_help():
    return """# Recipes

## Browse by Category
`GET /recipes?category=dinner` - Filter by category

Available categories: breakfast, lunch, dinner, dessert

## Get Recipe Details
`GET /recipes/{id}` - Returns full recipe with ingredients and steps

## Search Recipes
`GET /recipes/search?q=pasta` - Search by name or ingredient
"""

@app.get("/ingredients/help", response_class=PlainTextResponse)
def ingredients_help():
    return """# Ingredients

## Look Up Ingredient
`GET /ingredients/{name}` - Returns nutrition and substitutes

## List by Category
`GET /ingredients?category=vegetables` - Browse ingredients

## Find Substitutes
`GET /ingredients/{name}/substitutes` - Get alternatives
"""
```

### Using It

```
GET https://recipes.example.com/help
→ See available topics

GET https://recipes.example.com/recipes/help
→ Learn how to browse and search

GET https://recipes.example.com/recipes/search?q=vegetarian
→ Find matching recipes
```

## Two Modes

### Knowledge Mode
Serve navigable documentation, policies, or specs. Agents fetch the table of contents first, then retrieve only relevant sections.

```
https://docs.product.com/help      → "How does webhook retry work?"
https://handbook.company.com/help  → "What's our PTO policy?"
https://standards.eng.io/help      → "How should we handle errors in Go?"
https://runbooks.ops.io/help       → "How do I restart the workers?"
https://design.system.io/help      → "What's the button component API?"
```

### Capabilities Mode
Describe available services and how to invoke them. Agents discover and use functionality on demand.

```
https://qr.tools.io/help           → "Make a QR code with a logo"
https://cron.utils.dev/help        → "What does '0 */4 * * *' mean?"
https://resize.img.io/help         → "Shrink this to 800px wide"
https://json.validate.io/help      → "Check if this config is valid"
https://screenshot.web.io/help     → "Capture this URL at mobile size"
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
"Check https://recipes.example.com/help and find me a quick dinner recipe"
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
