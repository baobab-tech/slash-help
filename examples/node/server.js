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
  root: `# Recipe Book API

A demo /help protocol implementation.

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

// Root help endpoint
app.get('/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.root);
});

// Topic help endpoints
app.get('/recipes/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.recipes);
});

app.get('/ingredients/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.ingredients);
});

app.get('/techniques/help', (req, res) => {
  res.type('text/plain').send(HELP_CONTENT.techniques);
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
