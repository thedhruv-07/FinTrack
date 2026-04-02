# 💎 FinTrack Pro — Elite Financial Suite

Welcome to your premium personal finance dashboard. This project is architected for both immediate performance and professional-grade production.

## 🚀 Instant Launch
If you want to use the dashboard right now without any setup:
1. Open **`preview.html`** in your browser.
2. Every feature (Vault, Analysis, Data Persistence, Dark Mode) is fully functional here.

## 🛠️ Professional Development (Localhost)
To run the full React source code at `localhost:5173`:
1.  **Repair Node.js**: If you encounter `mkdir \\?` errors, please reinstall Node.js (LTS version) from [nodejs.org](https://nodejs.org).
2.  **Install Dependencies**: Run `npm install` in this folder.
3.  **Start Dev Server**: Run `npm run dev`.

## 📂 Project Architecture
- **`src/App.tsx`**: Main UI Shell & Elite Layout.
- **`src/store.ts`**: Zustand state management with real localStorage persistence.
- **`src/components/`**: 
  - `SpendingTrends.tsx`: High-fidelity Recharts dashboards.
  - `TransactionList.tsx`: Searchable vault for all your entries.
  - `TransactionModal.tsx`: The "Secure Entry" popup for adding data.
- **`preview.html`**: A standalone, zero-dependency version of the entire suite.

---
**Enjoy your new elite financial intelligence platform!**
