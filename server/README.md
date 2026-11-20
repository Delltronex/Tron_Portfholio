# Node.js SMTP Mail Server

Standalone Express & Nodemailer backend server to securely handle contact form emails for the React portfolio via SMTP (Gmail, Outlook, Hostinger, AWS SES, or any custom mail server).

---

## 🚀 Setup & Run

### 1. Install Dependencies
Open a terminal in the `server` folder:
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file inside `server/` (or copy `.env.example`):
```bash
cp .env.example .env
```

Fill in your SMTP credentials:
```env
SERVER_PORT=5001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_RECEIVER=your_email@gmail.com
```

> **Note for Gmail users**: Use a Google **App Password** (Google Account → Security → 2-Step Verification → App passwords). Do not use your regular account password.

### 3. Start the Server

```bash
# Normal start
npm start

# Development mode with auto-reload (Node 18+)
npm run dev
```

The server will listen at `http://localhost:5001`.

---

## 📡 API Endpoints

### `GET /api/health`
Check if the server is running.
- **Response**: `{ status: "ok", service: "Node.js SMTP Mail Server", smtp_configured: true }`

### `POST /api/contact`
Send an email message via SMTP.
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "message": "Hello, I would like to discuss a project."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Email delivered successfully via SMTP!"
}
```

---

## 🔗 Connection with React Frontend
The React Vite app already includes a proxy configuration in `vite.config.js`:
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5001',
      changeOrigin: true
    }
  }
}
```
Any `fetch('/api/contact', ...)` in the React app will automatically route to this Node.js SMTP server.
