// /help Protocol Example - Go
//
// Run with: go run main.go
// Test with: curl http://localhost:8080/help

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

var helpContent = map[string]string{
	"root": `# Example API

A demo /help protocol implementation in Go.

## Topics
- ` + "`/auth/help`" + ` - Authentication and authorization
- ` + "`/users/help`" + ` - User management
- ` + "`/products/help`" + ` - Product catalog

## Quick Reference
- ` + "`GET /status`" + ` - Health check
- ` + "`POST /search`" + ` - Search documentation

## Getting Started
Start with ` + "`/auth/help`" + ` to learn how to authenticate.
`,

	"auth": `# Authentication

## Overview
This API uses Bearer token authentication.

## Get a Token
` + "```bash" + `
curl -X POST /auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'
` + "```" + `

## Use the Token
Add header: ` + "`Authorization: Bearer <token>`" + `
`,

	"users": `# User Management

## Endpoints
- ` + "`GET /users`" + ` - List users
- ` + "`POST /users`" + ` - Create user
- ` + "`GET /users/{id}`" + ` - Get user
`,

	"products": `# Product Catalog

## Endpoints
- ` + "`GET /products`" + ` - List products
- ` + "`GET /products/{id}`" + ` - Get product
`,
}

func helpHandler(topic string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		content, ok := helpContent[topic]
		if !ok {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprint(w, content)
	}
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var body struct {
		Q string `json:"q"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	q := strings.ToLower(body.Q)
	var results []string

	for topic, content := range helpContent {
		if strings.Contains(strings.ToLower(content), q) {
			lines := strings.Split(strings.TrimSpace(content), "\n")
			title := strings.TrimPrefix(lines[0], "# ")
			results = append(results, fmt.Sprintf("- `/%s/help` - %s", topic, title))
		}
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	if len(results) == 0 {
		fmt.Fprint(w, "# Search Results\n\nNo results found.")
		return
	}
	fmt.Fprintf(w, "# Search Results for '%s'\n\n%s", q, strings.Join(results, "\n"))
}

func statusHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
}

func main() {
	http.HandleFunc("/help", helpHandler("root"))
	http.HandleFunc("/auth/help", helpHandler("auth"))
	http.HandleFunc("/users/help", helpHandler("users"))
	http.HandleFunc("/products/help", helpHandler("products"))
	http.HandleFunc("/search", searchHandler)
	http.HandleFunc("/status", statusHandler)

	port := "8080"
	fmt.Printf("/help server running on http://localhost:%s\n", port)
	fmt.Printf("Try: curl http://localhost:%s/help\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
