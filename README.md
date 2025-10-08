# 🏡 Estate Finder

A **full-stack MERN application** for real estate listings with **user authentication, profile management, and real-time chat** powered by **Socket.IO**.  
Deployed using **Vercel (frontend)** and **Render (backend + sockets)**.

---

## 🚀 Live Demo
- **Frontend (Vercel)**: [Estate Finder UI](https://estate-finder-two.vercel.app)  
- **Backend (Render)**: [Estate Finder API](https://estate-finder-y5gg.onrender.com)  
- **Socket Server (Render)**: [Estate Chat Server](https://estate-chat.onrender.com)  

---

## ⚙️ Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Context API  
- **Backend**: Node.js, Express.js, Prisma ORM, MongoDB Atlas  
- **Authentication**: JWT + HttpOnly Cookies  
- **Real-time**: Socket.IO (separate service for chat)  
- **Deployment**: Vercel (frontend), Render (backend + socket)  

---

## ✨ Features
- 🔑 **User Authentication** (Register, Login, Logout)  
- 👤 **Profile Management** (Update avatar, email, username)  
- 🏘️ **Create & Manage Posts** (Add real estate listings)  
- ❤️ **Save Listings** (Bookmark properties for later)  
- 💬 **Real-time Chat** with other users (Socket.IO)  
- 🔒 **JWT-secured APIs** with cookie-based auth  
- 📱 **Responsive Design** for desktop & mobile  

---

## 📂 Project Structure
ESTATEAPP/
├── backend/        # Express.js + Prisma backend
│    ├── app.js
│    ├── routes/
│    ├── controllers/
│    ├── prisma/
│    └── package.json
│
├── frontend/       # React + Vite frontend
│    ├── src/
│    ├── public/
│    └── package.json
│
├── socket/         # Socket.IO server
│    ├── app.js
│    └── package.json
│
└── README.md

