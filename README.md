# 🌿 Yefet’s Natural Healing Website

A multi-page React application that shares **Yefet’s story of alternative medicine**, provides practical guidance for seniors, and lets visitors submit their details for a respectful follow-up.

Built for **simplicity, accessibility, and RTL (Hebrew) support** — friendly for elderly users.

---

## ✨ Features

### Frontend
- React + Vite + React Router + TailwindCSS
- Fully responsive, RTL-friendly design
- Pages: **Home**, **Yefet’s Story**, **Knowledge Base**, **Reviews**, **FAQ**, **Contact**
- Accessibility controls (larger text)
- Image areas for Yefet and his garden

### Backend
- **Flask (Python) + SQLite** (no external DB server required)
- `POST /api/leads` endpoint:
  - Validates input
  - Saves leads to a local SQLite DB file
  - Sends **HTML+plain** email to the owner
  - Sends **plain** confirmation email to the user

---

## 🔧 How to Run the Project (Step by Step)

### 1. Backend (Flask + SQLite)
1. Open a terminal.
2. Go into the `server` folder:
   ```bash
   cd server
3. Make sure you have Python 3 installed. (Run python --version).
4. install dependencies:
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # macOS/Linux:
   source .venv/bin/activate

    pip install -r requirements.txt
5. Copy the example environment file and edit it:
   cp .env.example .env

  Fill in your details inside .env:
   DB_PATH=./data/leads.db
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yourgmail@gmail.com
   SMTP_PASS=your_gmail_app_password
   FRONTEND_ORIGIN=http://localhost:5173
   OWNER_EMAIL=yefet@example.com
6. python app.py

### 2. Frontend (React + Vite)
1. Open second terminal.
2. Go into the project root folder (where package.json is):
   cd saba-yefet-website
3. Install dependencies (*only the first time*):
   npm install
4. Start the dev server:
   npm run dev
5. Open http://localhost:5173




