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
    "root": """# Recipe Book API

A demo /help protocol implementation.

## Topics
- `/recipes/help` - Browse and search recipes
- `/ingredients/help` - Ingredient information
- `/techniques/help` - Cooking techniques

## Quick Reference
- `GET /status` - Health check
- `POST /search` - Search documentation

## Getting Started
Start with `/recipes/help` to browse available recipes.
""",

    "recipes": """# Recipes

## Browse All Recipes
```bash
GET /recipes
```

## Filter by Category
```bash
GET /recipes?category=dinner
```

Available categories: breakfast, lunch, dinner, dessert, snack

## Get Recipe Details
```bash
GET /recipes/{id}
```

Returns full recipe with:
- Ingredients list
- Step-by-step instructions
- Cooking time and servings

## Search Recipes
```bash
GET /recipes/search?q=pasta
```

Search by recipe name or ingredient.

## Related
- `/ingredients/help` - Look up ingredient details
- `/techniques/help` - Learn cooking methods
""",

    "ingredients": """# Ingredients

## Look Up Ingredient
```bash
GET /ingredients/{name}
```

Returns:
- Nutritional information
- Common uses
- Storage tips

## Browse by Category
```bash
GET /ingredients?category=vegetables
```

Categories: vegetables, fruits, proteins, grains, dairy, spices

## Find Substitutes
```bash
GET /ingredients/{name}/substitutes
```

Get alternatives for dietary restrictions or availability.

## Related
- `/recipes/help` - Find recipes using ingredients
""",

    "techniques": """# Cooking Techniques

## List Techniques
```bash
GET /techniques
```

## Get Technique Details
```bash
GET /techniques/{name}
```

Returns:
- Description
- When to use it
- Tips and common mistakes

## Browse by Type
```bash
GET /techniques?type=dry-heat
```

Types: dry-heat, moist-heat, combination, preparation

## Examples
- `/techniques/saute` - Quick high-heat cooking
- `/techniques/braise` - Low and slow with liquid
- `/techniques/julienne` - Cutting into thin strips
"""
}


@app.get("/help", response_class=PlainTextResponse)
def root_help():
    """Root help endpoint - entry point for discovery."""
    return HELP_CONTENT["root"]


@app.get("/recipes/help", response_class=PlainTextResponse)
def recipes_help():
    """Recipe browsing documentation."""
    return HELP_CONTENT["recipes"]


@app.get("/ingredients/help", response_class=PlainTextResponse)
def ingredients_help():
    """Ingredient information documentation."""
    return HELP_CONTENT["ingredients"]


@app.get("/techniques/help", response_class=PlainTextResponse)
def techniques_help():
    """Cooking techniques documentation."""
    return HELP_CONTENT["techniques"]


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
