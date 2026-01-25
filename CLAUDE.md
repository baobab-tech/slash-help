# Using /help Endpoints

When a user gives you a `/help` URL, use it to discover and retrieve information.

## Quick Usage

```bash
# User says: "Check https://api.example.com/help for how to authenticate"

# 1. Fetch the root help
curl https://api.example.com/help

# 2. Look for auth-related topics in the response

# 3. Fetch the specific topic
curl https://api.example.com/auth/help

# 4. Use the information to help the user
```

## Pattern

- `GET /help` - Start here, shows available topics
- `GET /topic/help` - Get details on a specific topic
- Follow links progressively, don't guess paths

## Example

```
User: "Use https://payments.example.com/help to process a refund"

You:
1. curl https://payments.example.com/help
   → See: /refunds/help, /auth/help, /transactions/help

2. curl https://payments.example.com/refunds/help
   → Get refund instructions and endpoint details

3. Execute the refund using the documented endpoint
```

That's it. URLs + markdown.
