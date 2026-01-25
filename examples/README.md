# /help Protocol Examples

Ready-to-run implementations in multiple languages.

## Python (FastAPI)

```bash
cd python
pip install -r requirements.txt
uvicorn main:app --reload
```

## Node.js (Express)

```bash
cd node
npm install
npm start
```

## TypeScript (Hono)

```bash
cd typescript
npm install
npm start
```

## Go

```bash
cd go
go run main.go
```

## Testing

Once running, test with:

```bash
# Discover available topics
curl http://localhost:8000/help

# Get specific topic
curl http://localhost:8000/auth/help

# Search
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"q": "token"}'
```

## What Each Example Includes

- `GET /help` - Root discovery endpoint
- `GET /auth/help` - Authentication documentation
- `GET /users/help` - User management docs
- `GET /products/help` - Product catalog docs
- `POST /search` - Search across all content
- `GET /status` - Health check
