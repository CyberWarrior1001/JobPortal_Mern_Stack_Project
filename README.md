# 💼 Job Portal - MERN Stack Application

A full-featured Job Portal built using **MongoDB**, **Express.js**, **React**, and **Node.js**, styled with **Tailwind CSS** and **shadcn/ui** components.

---

## 🚀 Features
- User Authentication (Login / Register)
- Admin Dashboard to manage jobs and users
- Post and Apply for Jobs
- Real-time job search and filters
- Responsive UI using Tailwind CSS
- Clean UI powered by shadcn/ui
- Secure API using Express & JWT

---

## 🏗️ Tech Stack
**Frontend:** React, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Cloud - MongoDB Atlas)  
**Tools:** Axios, JWT, bcrypt, Mongoose  

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

### 2. nstall dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Setup environment variables
Create a .env file inside the server folder and add:
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the app
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

### Project Structure

```bash
job-portal/
├── client/          # React frontend
├── server/          # Express backend
├── .gitignore
└── README.md
```
