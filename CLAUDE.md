# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Matrix Terminal Chat UI — a retro-styled chatbot interface that connects to an n8n webhook backend, deployed on Vercel.

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (`public/index.html`)
- Backend: Vercel serverless function (`api/chat.js`)
- Integration: n8n cloud webhook (GET endpoint)
- Environment: `N8N_WEBHOOK_URL` env var (never hardcoded)

## Commands

### Run locally
```
vercel dev
```
Then open http://localhost:3000

### Deploy
```
vercel deploy --prod
```

## Architecture

- `public/index.html` — Complete frontend app (HTML + CSS + JS). Sends POST to `/api/chat`.
- `api/chat.js` — Vercel serverless function. Proxies POST requests to the n8n GET webhook. Reads webhook URL from `process.env.N8N_WEBHOOK_URL`.
- `.env` — Local environment variables (gitignored). Contains `N8N_WEBHOOK_URL`.
