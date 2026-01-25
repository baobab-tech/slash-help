"""
/help Protocol Example - Python/FastAPI

Run with: uvicorn main:app --reload
Test with: curl http://localhost:8000/help
"""

from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

# Content storage - in production, load from files or database
HELP_CONTENT = {
    "root": """# Example API

A demo /help protocol implementation.

## Topics
- `/auth/help` - Authentication and authorization
- `/users/help` - User management
- `/products/help` - Product catalog

## Quick Reference
- `GET /status` - Health check
- `POST /search` - Search documentation

## Getting Started
Start with `/auth/help` to learn how to authenticate.
""",

    "auth": """# Authentication

## Overview
This API uses Bearer token authentication.

## Get a Token
```bash
curl -X POST /auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"username": "user", "password": "pass"}'
```

Response:
```json
{"access_token": "eyJ...", "token_type": "bearer"}
```

## Use the Token
Add to all requests:
```
Authorization: Bearer eyJ...
```

## Refresh Token
```bash
curl -X POST /auth/refresh \\
  -H "Authorization: Bearer <current_token>"
```

## Related
- `/users/help` - Managing users
""",

    "users": """# User Management

## List Users
```bash
GET /users?page=1&limit=20
```

## Create User
```bash
POST /users
Content-Type: application/json

{"name": "John", "email": "john@example.com"}
```

## Get User
```bash
GET /users/{id}
```

## Update User
```bash
PATCH /users/{id}
Content-Type: application/json

{"name": "Updated Name"}
```

## Delete User
```bash
DELETE /users/{id}
```

## Related
- `/auth/help` - Authentication required for all endpoints
""",

    "products": """# Product Catalog

## List Products
```bash
GET /products?category=electronics&page=1
```

## Get Product
```bash
GET /products/{id}
```

## Search Products
```bash
GET /products/search?q=laptop
```

## Product Schema
```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "category": "string",
  "in_stock": "boolean"
}
```
"""
}


@app.get("/help", response_class=PlainTextResponse)
def root_help():
    """Root help endpoint - entry point for discovery."""
    return HELP_CONTENT["root"]


@app.get("/auth/help", response_class=PlainTextResponse)
def auth_help():
    """Authentication documentation."""
    return HELP_CONTENT["auth"]


@app.get("/users/help", response_class=PlainTextResponse)
def users_help():
    """User management documentation."""
    return HELP_CONTENT["users"]


@app.get("/products/help", response_class=PlainTextResponse)
def products_help():
    """Product catalog documentation."""
    return HELP_CONTENT["products"]


@app.post("/search", response_class=PlainTextResponse)
def search(query: dict):
    """Simple search across help content."""
    q = query.get("q", "").lower()
    results = []

    for topic, content in HELP_CONTENT.items():
        if q in content.lower():
            # Extract first line as title
            title = content.strip().split("\n")[0].replace("# ", "")
            results.append(f"- `/{topic}/help` - {title}")

    if not results:
        return "# Search Results\n\nNo results found."

    return f"# Search Results for '{q}'\n\n" + "\n".join(results)


@app.get("/status")
def status():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
