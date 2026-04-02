# 💰 FinTrack – Personal Finance Dashboard

FinTrack is a modern, responsive personal finance dashboard that helps users track income, expenses, and overall financial health. It provides intuitive visualizations, transaction management, and role-based UI simulation to demonstrate real-world frontend architecture.

---

## 🚀 Live Demo

(https://fin-track-07.vercel.app/)

---

## 📌 Features

### 📊 Dashboard Overview

* Summary cards:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization:

  * Balance trend over time (Line Chart)
* Category-based visualization:

  * Expense breakdown (Pie/Donut Chart)

---

### 💳 Transactions Management

* View all transactions in a structured table
* Fields:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)

#### Functionalities:

* 🔍 Search by category or amount
* 🎯 Filter by transaction type
* ↕️ Sort by date or amount
* ⚠️ Empty state handling (no data UI)

---

### 🔐 Role-Based UI (Frontend Simulation)

Switch roles using a dropdown:

#### 👁 Viewer

* Read-only access
* Cannot modify transactions

#### 🛠 Admin

* Add new transactions
* Edit existing transactions
* Delete transactions

---

### 📈 Insights Section

* Highest spending category
* Monthly income vs expense comparison
* Smart observations (e.g., spending trends)

---

## 🧠 State Management

The application manages:

* Transactions data
* Filters (search, type)
* Selected user role

Implemented using:

* React Context API / Zustand (scalable and clean)

---

## 🎨 UI & UX

* Clean, modern fintech-inspired design
* Fully responsive (mobile + desktop)
* Card-based layout for clarity
* Smooth interactions and intuitive navigation
* Graceful handling of empty states

---

## ✨ Optional Enhancements

* 🌙 Dark mode support
* 💾 Local storage persistence
* 🎬 Animations (Framer Motion)
* 📤 Export transactions (CSV/JSON)
* 🔌 Mock API integration

---

## 🏗️ Tech Stack

* **Frontend:** React (Functional Components + Hooks)
* **Styling:** Tailwind CSS
* **Charts:** Recharts / Chart.js
* **State Management:** Context API / Zustand
* **Icons:** Lucide / Heroicons

---

## 📁 Project Structure

```
src/
│
├── components/       # Reusable UI components
├── pages/            # Main pages (Dashboard, Transactions, Insights)
├── context/ or store/ # State management
├── hooks/            # Custom hooks
├── utils/            # Helper functions
├── data/             # Sample/mock data
└── App.jsx           # Root component
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fintrack-dashboard.git
cd fintrack-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 📊 Sample Data

The app is initialized with mock transaction data including:

* Multiple categories (Food, Travel, Salary, etc.)
* Income and expense entries
* Different dates for trend visualization

---

## 🧪 Assumptions

* No backend is implemented
* Role-based access is simulated on frontend only
* Data persistence (if enabled) uses local storage

---

## 🏁 Evaluation Focus

This project demonstrates:

* Strong UI/UX design
* Clean component architecture
* Effective state management
* Responsive layout implementation
* Real-world dashboard features

---

## 🙌 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication system
* Advanced analytics
* Budget planning tools
* Notifications & alerts

---

## 👨‍💻 Author

**Dhruv kumar**

---

## ⭐ Acknowledgements

* Inspired by modern fintech dashboards
* Built as part of a frontend assessment

---

## 📄 License

This project is for educational and evaluation purposes.
