/**
 * /help Protocol Example - Node.js/Express
 *
 * Run with: node server.js
 * Test with: curl http://localhost:3000/help
 */

const express = require('express');
const app = express();
app.use(express.json());

const HELP_CONTENT = {
  root: `# Example API

A demo /help protocol implementation.

## Topics
- \`/auth/help\` - Authentication and authorization
- \`/users/help\` - User management
- \`/products/help\` - Product catalog

## Quick Reference
- \`GET /status\` - Health check
- \`POST /search\` - Search documentation

## Getting Started
Start with \`/auth/help\` to learn how to authenticate.
`,

  auth: `# Authentication

## Overview
This API uses Bearer token authentication.

## Get a Token
\`\`\`bash
curl -X POST /auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"username": "user", "password": "pass"}'
\`\`\`

Response:
\`\`\`json
{"access_token": "eyJ...", "token_type": "bearer"}
\`\`\`

## Use the Token
Add to all requests:
\`\`\`
Authorization: Bearer eyJ...
\`\`\`
`,

  users: `# User Management

## List Users
\`\`\`bash
GET /users?page=1&limit=20
\`\`\`

## Create User
\`\`\`bash
POST /users
Content-Type: application/json

{"name": "John", "email": "john@example.com"}
\`\`\`

## Get User
\`\`\`bash
GET /users/{id}
\`\`\`
`,

  products: `# Product Catalog

## List Products
\`\`\`bash
GET /products?category=electronics&page=1
\`\`\`

## Get Product
\`\`\`bash
GET /products/{id}
\`\`\`
`
};

// Root help endpoint
app.get('/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.root);
});

// Topic help endpoints
app.get('/auth/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.auth);
});

app.get('/users/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.users);
});

app.get('/products/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.products);
});

// Search endpoint
app.post('/search', (req, res) => {
  const q = (req.body.q || '').toLowerCase();
  const results = [];

  for (const [topic, content] of Object.entries(HELP_CONTENT)) {
    if (content.toLowerCase().includes(q)) {
      const title = content.trim().split('\n')[0].replace('# ', '');
      results.push(`- \`/${topic}/help\` - ${title}`);
    }
  }

  if (results.length === 0) {
    res.type('text/plain').send('# Search Results\n\nNo results found.');
    return;
  }

  res.type('text/plain').send(`# Search Results for '${q}'\n\n${results.join('\n')}`);
});

// Health check
app.get('/status', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`/help server running on http://localhost:${PORT}`);
  console.log(`Try: curl http://localhost:${PORT}/help`);
});
