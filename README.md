# Tandoori Market — Hiring Bot

A production-ready, multilingual Telegram bot for collecting job applications across 3 market branches: **Philadelphia**, **Pittsburgh**, and **New York**.

---

## Features

- **3 languages**: English, Russian, Uzbek — user picks at the start, everything follows
- **20-question application flow** — one question at a time, mobile-friendly buttons
- **Full review screen** before submission — edit any field without losing other answers
- **Branch routing** — each branch has its own admin who receives the application
- **Admin message** in both English and Uzbek with full applicant details
- **Session safety** — `/start` always resets cleanly; data never leaks between sessions
- **Polling or webhook** — set via `.env`

---

## Installation

```bash
cd Tandoori
npm install
```

---

## Setup

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your `.env`:
   ```
   BOT_TOKEN=your_token_from_botfather
   PHILADELPHIA_ADMIN_ID=123456789
   PITTSBURGH_ADMIN_ID=987654321
   NEW_YORK_ADMIN_ID=111222333
   MODE=polling
   PORT=3000
   SERVER_URL=
   ```

---

## How to get Admin Chat IDs

1. Have the admin open Telegram and message **@userinfobot**
2. The bot will reply with their **Chat ID** — use that number in `.env`
3. The admin must **start the bot first** (send `/start`) or the bot cannot message them

---

## Running Locally (Polling Mode)

```bash
npm start
```

The bot will connect via long-polling. No public URL required.

---

## Running in Webhook Mode (Production)

1. Set `MODE=webhook` in `.env`
2. Set `SERVER_URL` to your public HTTPS URL, e.g.:
   ```
   SERVER_URL=https://yourdomain.com
   ```
3. Run:
   ```bash
   npm start
   ```

The bot registers the webhook automatically on startup.

> **Note:** Telegram requires HTTPS for webhooks. Use a service like Railway, Render, or a VPS with nginx + SSL.

---

## Deploying to Railway

1. Push this repo to GitHub
2. Create a new Railway project → deploy from GitHub
3. Add your env variables in the Railway dashboard
4. Railway gives you a public URL — paste it as `SERVER_URL`
5. Set `MODE=webhook`

---

## Project Structure

```
/src
  bot.js             ← Main bot logic, step handler, message router
  config.js          ← Loads and validates env variables
  translations.js    ← All user-facing text in EN / RU / UZ
  sessions.js        ← In-memory session store (swap with Redis later)
  keyboards.js       ← All Telegram reply keyboards
  validators.js      ← Input validation functions
  formatApplication.js ← Review screen builder + admin message formatter
  server.js          ← Express webhook server

index.js             ← Entry point
.env.example         ← Sample environment variables
package.json
README.md
```

---

## Session Architecture

Each user has a session object:

```js
sessions[userId] = {
  language: 'en',       // 'en' | 'ru' | 'uz'
  step: 'ask_name',     // current step in the flow
  editingField: null,   // set when user edits a specific field
  data: {
    branch: '',
    fullName: '',
    age: '',
    // ... all 19 fields
  }
}
```

To swap in Redis later, only update `sessions.js` — the rest of the code uses the same interface.

---

## Common Errors & Fixes

| Error | Fix |
|---|---|
| `Missing required env variable: BOT_TOKEN` | Add your bot token to `.env` |
| `Bot is not started` | Make sure `npm install` ran and token is valid |
| `Admin not receiving messages` | Admin must message the bot first to open a chat |
| `Webhook error: 403` | Admin ID is wrong — verify with @userinfobot |
| `ETELEGRAM: 409 Conflict` | Two instances running — stop the other one first |
| `SERVER_URL required for webhook` | Set `MODE=polling` or add a valid HTTPS URL |

---

## Application Flow

```
/start
  → Choose language (EN / RU / UZ)
  → Welcome message
  → Choose branch (Philadelphia / Pittsburgh / New York)
  → 19 application questions (one by one)
  → Full review screen
    → Confirm → sends to admin, success message to applicant
    → Edit → pick field → re-answer → back to review
    → Cancel → confirmation → session deleted
```

---

## Admin Message Format

Each confirmed application is sent to the branch admin with:
- Branch name and submission timestamp
- Applicant Telegram ID and username
- All answers in **English**
- All field labels + yes/no answers in **Uzbek**

---

## License

MIT
