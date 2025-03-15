# RoundRobin - Coupon Management System

## 🌍 Live Demo
🔗 **Frontend (Netlify):** [(https://coupon247.netlify.app/)]
🔗 **Backend (Render):** [https://roundrobinbackend-sn4n.onrender.com]
github Frontend - https://github.com/27SHIVAMSUYAL/roundRobinFrontend
github Backend - https://github.com/27SHIVAMSUYAL/roundRobinBackend
---

## 🚀 Project Overview
RoundRobin is a **coupon management system** designed for admins to **add, view, and manage coupons**. The system provides a simple dashboard for managing coupons and ensuring seamless API interactions with a secure backend.

### **🛠️ Tech Stack**
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Atlas)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **Hosting:** Netlify (Frontend), Render (Backend)

---

## 📜 Features
✅ **Admin Authentication:** Secure login with JWT tokens.
✅ **Coupon Management:** Add, view, and manage coupons.
✅ **Protected Routes:** Prevents unauthorized access.
✅ **Responsive UI:** Works on all screen sizes.
✅ **REST API:** Backend hosted on Render.

---

## 🏗️ Installation & Setup
### **🔹 Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### **🔹 Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ````
4. Start the server:
   ```sh
   npm start
   ```

### **🔹 Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Update `API_URL` in `AdminDashboard.js` to use the deployed backend:
   ```js
   const API_URL = "https://roundrobinbackend-sn4n.onrender.com";
   ```
4. Start the frontend:
   ```sh
   npm start
   ```

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/admin/login` | Admin Login |
| **GET** | `/api/admin/view` | Fetch All Coupons |
| **POST** | `/api/admin/add` | Add New Coupon |

---

## 🛠️ Deployment
### **🔹 Backend (Render)**
- Push your code to GitHub.
- Connect Render with your GitHub repository.
- Add environment variables (`MONGO_URI`, `JWT_SECRET`).
- Deploy and monitor logs for errors.

### **🔹 Frontend (Netlify)**
- Push frontend code to GitHub.
- Connect Netlify to your repository.
- Set `API_URL` to the Render backend URL.
- Deploy and test.

---

## 🤝 Contribution
Feel free to contribute by **raising issues**, **fixing bugs**, or **suggesting new features**!

1. **Fork the repo**
2. **Create a new branch** (`feature-new-feature`)
3. **Commit changes**
4. **Push the branch**
5. **Create a Pull Request**

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📩 Contact
For queries, reach out via GitHub Issues or email me at `27shivam.1o1@gmail.com`.

🚀 **Happy Coding!**

