# Using /help Endpoints

When a user gives you a `/help` URL, use it to discover and retrieve information.

## Pattern

- `GET /help` - Start here, lists available topics
- `GET /topic/help` - Get details on a specific topic
- Follow links progressively, don't guess paths

## Two Modes

### Knowledge Mode (Discovering Information)

```
https://docs.product.com/help - "How does webhook retry work?"
https://handbook.company.com/help - "What's our PTO policy?"
https://standards.eng.io/help - "How should we handle errors in Go?"
https://runbooks.ops.io/help - "How do I restart the workers?"
https://design.system.io/help - "What's the button component API?"
```

### Capabilities Mode (Invoking Services)

```
https://qr.tools.io/help - "Make a QR code with a logo"
https://cron.utils.dev/help - "What does '0 */4 * * *' mean?"
https://resize.img.io/help - "Shrink this to 800px wide"
https://json.validate.io/help - "Check if this config is valid"
https://screenshot.web.io/help - "Capture this URL at mobile size"
```

## Example Flow

```
User: "Check https://standards.eng.io/help - how should we handle errors in Go?"

1. GET /help
   → See: /go/help, /typescript/help, /api-design/help

2. GET /go/help
   → See: /errors/help, /logging/help, /testing/help

3. GET /go/errors/help
   → Get: wrapping conventions, sentinel errors, when to panic

4. Return the relevant information to the user
```

That's it. URLs + markdown.
