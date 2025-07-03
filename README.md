# 📝 Todo Task Management Web Application

A responsive, feature-rich Todo Task Manager built with **React.js**, **Firebase Authentication**, and **Bootstrap**. This app helps users track tasks efficiently with support for priorities, authentication, dark mode, and more — all **without a backend server**.

Developed for the **Katomaran Full Stack Hackathon 2025**.

---

## 🚀 Features

* 🔐 Social login via Firebase Authentication (Google)
* 🧑‍💻 Profile section with Edit Name & Age
* ✅ Create, edit, delete, and complete tasks
* 📬 Share tasks with other users (in-app UI feature)
* 🔍 Filter tasks by:

  * Incomplete
  * Completed
  * Expiring Soon
  * Expired
* 🏷️ Priority tags with color-coding
* 🌗 Toggle Dark/Light Mode (saved in localStorage)
* 📅 Set task deadlines
* 🔔 Toast notifications for user actions
* 📱 Mobile-first responsive design using Bootstrap 5
* 💾 Task persistence via localStorage (offline support)

---

## 📁 Project Structure

```
todo-task-manager/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── user-avatar.png
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   └── TaskList.jsx
│   ├── firebase-config.js
│   ├── App.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── index.js
├── screenshots/
│   ├── Screenshot-dark-editable.png
│   └── Screenshot-dark-saved.png
├── README.md
├── package.json
└── vite.config.js
```

---

## 🧪 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/praveen01718/todo-task-manager.git
cd todo-task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Update the Firebase configuration inside `src/firebase-config.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

### 4. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Screenshots

### ✅ Dark Mode UI with Editable Profile

`./screenshots/Screenshot-dark-editable.png`

### ✅ After Profile Save – Age & Name Updated

`./screenshots/Screenshot-dark-saved.png`

> 📌 Add these two screenshots to a `/screenshots/` folder in your GitHub repo and rename them accordingly.

---

## 🗂️ Assumptions Made

* Backend was not implemented due to the scope and time; localStorage is used for persistence.
* Sharing tasks is simulated in UI only.
* Real-time updates are not implemented (polling or WebSockets not used).
* Email notification feature is not included.

---

## 🧠 Architecture Diagram

> Upload the architecture diagram with the repo under `/screenshots/architecture.png`

---

## 📹 Demo Video

Watch the full demo of this app on Loom: [Demo Loom Video](https://loom.com/share/your-demo-link)

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** Bootstrap 5, CSS
* **Icons:** Bootstrap Icons
* **Routing:** React Router DOM
* **Authentication:** Firebase Auth (OAuth with Google)
* **Storage:** localStorage (offline support)

---

## 🙌 Credits

* 🔥 [Firebase](https://firebase.google.com/)
* 💙 [React](https://reactjs.org/)
* 🎨 [Bootstrap](https://getbootstrap.com/)
* 🧭 [React Router](https://reactrouter.com/)
* 👨‍💻 Built by [Praveen P](https://github.com/praveen01718)

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 📌 Note

This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)
