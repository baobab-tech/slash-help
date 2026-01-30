# Agent Instructions: Building /help Services

This file is for AI agents helping developers **build** /help protocol services.

## What You're Building

A /help endpoint is a simple HTTP service that returns markdown documentation. Any AI agent that can `curl` can use it—no SDKs needed.

## Core Pattern

Every /help service follows this structure:

```
GET /help              → Root overview (table of contents)
GET /topic/help        → Topic-specific documentation
GET /topic/subtopic    → Deeper detail
```

All responses are plain text markdown.

## Implementation Checklist

When building a /help service:

1. **Root endpoint first** - Always implement `GET /help` that lists available topics
2. **Content-Type: text/plain** - Return markdown as plain text
3. **Self-contained topics** - Each `/topic/help` should be usable standalone
4. **Link related content** - Use relative paths like `/recipes/help`
5. **Optional search** - Add `POST /search` for large knowledge bases

## Response Guidelines

### Root `/help`
- Service name and brief description
- List of available topics with descriptions
- Quick reference of common actions
- Getting started pointer

### Topic `/topic/help`
- Clear heading
- Overview of what this covers
- Code examples with curl commands
- Request/response formats
- Links to related topics

## Code Template (FastAPI)

```python
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/help", response_class=PlainTextResponse)
def root_help():
    return """# My Service

Brief description.

## Topics
- `/topic1/help` - What topic1 covers
- `/topic2/help` - What topic2 covers

## Quick Actions
- `GET /action` - Description
"""

@app.get("/topic1/help", response_class=PlainTextResponse)
def topic1_help():
    return """# Topic 1

## Overview
What this covers.

## Usage
```bash
curl -X POST /endpoint -d '{"key": "value"}'
```

## Related
- `/topic2/help`
"""
```

## Common Structures

### Documentation Service
```
/help
├── /concepts/help
├── /guides/help
│   ├── /guides/quickstart
│   └── /guides/advanced
└── /reference/help
```

### API Wrapper
```
/help
├── /recipes/help
├── /ingredients/help
└── /techniques/help
```

### Internal Knowledge Base
```
/help
├── /policies/help
├── /engineering/help
└── /oncall/help
```

## Testing

Always verify:
```bash
# Root returns markdown
curl http://localhost:8000/help

# Topics are reachable
curl http://localhost:8000/recipes/help

# Content-type is text/plain
curl -I http://localhost:8000/help | grep Content-Type
```
