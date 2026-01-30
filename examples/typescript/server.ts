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
  root: `# Recipe Book API

A demo /help protocol implementation with Hono.

## Topics
- \`/recipes/help\` - Browse and search recipes
- \`/ingredients/help\` - Ingredient information
- \`/techniques/help\` - Cooking techniques

## Quick Reference
- \`GET /status\` - Health check
- \`POST /search\` - Search documentation

## Getting Started
Start with \`/recipes/help\` to browse available recipes.
`,

  recipes: `# Recipes

## Browse All Recipes
\`\`\`bash
GET /recipes
\`\`\`

## Filter by Category
\`\`\`bash
GET /recipes?category=dinner
\`\`\`

Available categories: breakfast, lunch, dinner, dessert, snack

## Get Recipe Details
\`\`\`bash
GET /recipes/{id}
\`\`\`

## Search Recipes
\`\`\`bash
GET /recipes/search?q=pasta
\`\`\`
`,

  ingredients: `# Ingredients

## Look Up Ingredient
\`\`\`bash
GET /ingredients/{name}
\`\`\`

## Browse by Category
\`\`\`bash
GET /ingredients?category=vegetables
\`\`\`

## Find Substitutes
\`\`\`bash
GET /ingredients/{name}/substitutes
\`\`\`
`,

  techniques: `# Cooking Techniques

## List Techniques
\`\`\`bash
GET /techniques
\`\`\`

## Get Technique Details
\`\`\`bash
GET /techniques/{name}
\`\`\`

## Browse by Type
\`\`\`bash
GET /techniques?type=dry-heat
\`\`\`
`
};

// Root help
app.get('/help', (c) => {
  return c.text(HELP_CONTENT.root);
});

// Topic help endpoints
app.get('/recipes/help', (c) => c.text(HELP_CONTENT.recipes));
app.get('/ingredients/help', (c) => c.text(HELP_CONTENT.ingredients));
app.get('/techniques/help', (c) => c.text(HELP_CONTENT.techniques));

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
