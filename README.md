# 📈 Trading Journal App (Next.js + Firebase + AI)

This is a full-featured trading journal built with **Next.js 14**, **Firebase**, and **OpenAI** for AI-powered trade insights.

---

## 🧩 Features

- ✅ Add/edit/delete trades (Firestore)
- 📊 Live charts (Recharts)
- 📅 Monthly calendar view
- 🌍 Multi-language support (EN, ES, FR)
- 📤 Export trades to CSV
- 🤖 AI insight for trade analysis (via Firebase Cloud Function)
- ☁️ Deployable to Firebase Hosting, Vercel, or Netlify

---

## 🚀 Setup Instructions

### 🔧 1. Frontend (Next.js)

#### ✅ Requirements
- Node.js v18+
- Firebase account (for Firestore + Hosting)

#### 📦 Install & Run
```bash
npm install
npm run dev
```

#### ⚙️ Set up `.env.local`
Create a file `.env.local` in the root and add your Firebase + OpenAI keys:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

### 🔧 2. Firebase Cloud Function (AI Insight)

#### 📂 Unzip `trading-journal-functions.zip`

Then deploy using Firebase CLI:
```bash
firebase init functions  # if needed
firebase deploy --only functions
```

#### ⚙️ Set your OpenAI API Key:
```bash
firebase functions:secrets:set OPENAI_API_KEY
```

---

## 🧠 AI Insight API

Send a POST request from frontend:
```ts
await fetch('/api/analyzeTrade', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symbol, amount, result, notes })
});
```

---

## 🌐 Language Support

- English (`/en`), Spanish (`/es`), French (`/fr`)
- Auto-detected by `middleware.ts`

---

## 📤 Deployment

You can deploy to:
- 🔥 Firebase Hosting: `firebase deploy --only hosting`
- ▲ Vercel: `vercel`
- 🌐 Netlify: `netlify deploy`

---

## 🛠 Built With

- [Next.js 14 (App Router)](https://nextjs.org)
- [Firebase](https://firebase.google.com)
- [Recharts](https://recharts.org)
- [OpenAI GPT-3.5](https://platform.openai.com)

---
MIT License • © 2025 Your Name