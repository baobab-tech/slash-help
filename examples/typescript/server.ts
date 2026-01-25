/**
 * /help Protocol Example - TypeScript/Hono
 *
 * Run with: npx tsx server.ts
 * Test with: curl http://localhost:3000/help
 */

import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

const HELP_CONTENT: Record<string, string> = {
  root: `# Example API

A demo /help protocol implementation with Hono.

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
\`\`\`
Authorization: Bearer eyJ...
\`\`\`
`,

  users: `# User Management

## Endpoints
- \`GET /users\` - List users
- \`POST /users\` - Create user
- \`GET /users/{id}\` - Get user
- \`PATCH /users/{id}\` - Update user
- \`DELETE /users/{id}\` - Delete user
`,

  products: `# Product Catalog

## Endpoints
- \`GET /products\` - List products
- \`GET /products/{id}\` - Get product
- \`GET /products/search?q=\` - Search products
`
};

// Root help
app.get('/help', (c) => {
  return c.text(HELP_CONTENT.root);
});

// Topic help endpoints
app.get('/auth/help', (c) => c.text(HELP_CONTENT.auth));
app.get('/users/help', (c) => c.text(HELP_CONTENT.users));
app.get('/products/help', (c) => c.text(HELP_CONTENT.products));

// Search
app.post('/search', async (c) => {
  const body = await c.req.json<{ q?: string }>();
  const q = (body.q || '').toLowerCase();

  const results = Object.entries(HELP_CONTENT)
    .filter(([_, content]) => content.toLowerCase().includes(q))
    .map(([topic, content]) => {
      const title = content.trim().split('\n')[0].replace('# ', '');
      return `- \`/${topic}/help\` - ${title}`;
    });

  if (results.length === 0) {
    return c.text('# Search Results\n\nNo results found.');
  }

  return c.text(`# Search Results for '${q}'\n\n${results.join('\n')}`);
});

// Health check
app.get('/status', (c) => c.json({ status: 'healthy' }));

const port = 3000;
console.log(`/help server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
