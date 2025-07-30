# Employee Management System

A full-stack Employee Management System built with **React (frontend)** and **Node.js/Express (backend)** with MongoDB.

## 🚀 Getting Started

Follow these steps to run both the frontend and backend locally:

---

### 📁 Project Structure

```
Azul-Arc-project/
│
├── employee-management-frontend/   # React frontend
└── employee-backend/               # Node.js backend
```

---

### 🧩 Step-by-Step Setup

#### 1️⃣ Install frontend dependencies

```bash
cd Azul-Arc-project
cd employee-management-frontend
npm install
```

#### 2️⃣ Install backend dependencies

```bash
cd ..
cd employee-backend
npm install
```

#### 3️⃣ Run both frontend and backend

```bash
npm run start
```

This will start:
- Backend on [http://localhost:5000](http://localhost:5000)
- Frontend on [http://localhost:3000](http://localhost:3000)

---

### 🛠 Environment Variables

Inside `employee-backend`, create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

---

### ✅ Features

- Add, edit, delete employees
- Upload profile photos
- Prevent duplicate emails
- Calculate and store age from DOB
- Form validations

---

### 🧾 Scripts

Inside `employee-backend/package.json`:

```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "node server.js",
  "client": "cd ../employee-management-frontend && npm start"
}
```

---

### 📝 License

MIT