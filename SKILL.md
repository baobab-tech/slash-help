# Skill: /help Protocol Builder

Build /help endpoints that any AI agent can discover and use.

## What is /help?

A simple HTTP-based standard for remote knowledge and capabilities:
- `GET /help` returns markdown describing available topics
- `GET /topic/help` returns detailed information
- Progressive disclosure minimizes context overhead

## Creating a /help Endpoint

### 1. Root Endpoint

Always start with a root `/help` that serves as table of contents:

```python
@app.get("/help", response_class=PlainTextResponse)
def root_help():
    return """# Service Name

Brief description of what this service does.

## Topics
- `/topic1/help` - Description
- `/topic2/help` - Description

## Quick Actions
- `GET /endpoint` - What it does
- `POST /endpoint` - What it does
"""
```

### 2. Topic Endpoints

Each topic should be self-contained and actionable:

```python
@app.get("/topic1/help", response_class=PlainTextResponse)
def topic1_help():
    return """# Topic 1

## Overview
What this topic covers.

## How To
Step-by-step instructions with code examples.

## Related
- `/topic2/help` - Related topic
"""
```

### 3. Optional Search

Add a search endpoint for large knowledge bases:

```python
@app.post("/search", response_class=PlainTextResponse)
def search(query: str):
    # Search your content
    results = search_content(query)
    return format_as_markdown(results)
```

## Best Practices

### Response Format
- Always return `text/plain` with markdown content
- Keep responses focused—one topic per endpoint
- Include code examples inline
- Link to related topics using relative paths

### Structure
```
/help                    # Root overview
├── /auth/help          # Authentication
│   ├── /auth/tokens    # Deeper topic
│   └── /auth/oauth     # Deeper topic
├── /api/help           # API reference
└── /guides/help        # Guides index
    └── /guides/quickstart
```

### Content Guidelines
- Lead with the most important information
- Include runnable code examples
- Show request/response formats
- Link to related endpoints
- Keep each response under ~2000 tokens

## Framework Examples

### FastAPI (Python)
```python
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/help", response_class=PlainTextResponse)
def help():
    return "# My Service\n..."
```

### Express (Node.js)
```javascript
app.get('/help', (req, res) => {
  res.type('text/plain').send('# My Service\n...');
});
```

### Hono (TypeScript)
```typescript
app.get('/help', (c) => {
  return c.text('# My Service\n...');
});
```

### Go (net/http)
```go
http.HandleFunc("/help", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain")
    fmt.Fprint(w, "# My Service\n...")
})
```

## Testing Your Endpoint

```bash
# Check root help
curl http://localhost:8000/help

# Check topic
curl http://localhost:8000/auth/help

# Verify content-type
curl -I http://localhost:8000/help | grep Content-Type
```

## Common Patterns

### Knowledge Base
```
/help → List of documentation sections
/docs/api/help → API documentation
/docs/guides/help → User guides
/search → Full-text search
```

### Service Wrapper
```
/help → List of capabilities
/payments/help → How to process payments
/payments/refund → Refund instructions
```

### Internal Tools
```
/help → Company resources
/policies/help → HR policies
/engineering/help → Engineering docs
/oncall/help → On-call procedures
```
