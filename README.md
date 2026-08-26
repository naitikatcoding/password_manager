<h1 align="center">
 🔐 PassOP
</h1>


<p align="center">
  <img src="https://img.shields.io/badge/PassOP-Password%20Manager-0D1117?style=for-the-badge&logo=lock&logoColor=white" alt="PassOP">
</p>

<p align="center">
  <strong>A simple full-stack password manager for storing, managing and securely revealing website credentials.</strong>
</p>

<p align="center">
  Built with React, Express.js, MongoDB and modern web technologies.
</p>

<br>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-security">Security</a>
</p>

---

## 🎥 Demo

<p align="center">
  <br><br>
 

https://github.com/user-attachments/assets/670e4b84-c17d-4cac-ab50-5b43be8a5eea


  <br><br>
</p>


---

## 📌 About The Project

**PassOP** is a full-stack password management application that allows users to store, view, copy and delete website credentials through a clean web interface.

The application uses a **React frontend**, **Express.js backend**, and **MongoDB database** connected through REST APIs. Passwords remain hidden in the interface by default and require verification through a **Master Passkey** before they can be revealed.

The project demonstrates the complete integration of a modern frontend with a REST backend and persistent database storage.

<p align="center">

**Store → Protect → Access → Copy → Manage**

</p>

---

# ✨ Features

### 🔑 Credential Management

* Add website credentials
* Store website URL, username and password
* Retrieve saved credentials
* Delete stored credentials
* Copy passwords directly to clipboard

### 🛡️ Master Passkey Protection

* Passwords remain hidden by default
* Master Passkey required before revealing passwords
* Passkey verification happens on the backend
* Incorrect passkeys are rejected

### 🎨 User Experience

* Clean and responsive React interface
* Password visibility controls
* Loading states
* Delete confirmation
* Success and error notifications
* Toast notifications using React Toastify
* Browser Clipboard API integration

### ⚡ Full-Stack Architecture

* React frontend
* Express.js REST API
* MongoDB persistent storage
* Environment-based configuration
* CORS-enabled frontend/backend communication
* RESTful CRUD operations

---

# 🛠️ Tech Stack

<p align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="60" height="60" alt="MongoDB"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="60" height="60" alt="Express.js"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="60" height="60" alt="React"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="60" height="60" alt="JavaScript"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="60" height="60" alt="Tailwind CSS"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="60" height="60" alt="Vite"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="60" height="60" alt="Git"/>
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="60" height="60" alt="GitHub"/>

</p>

<p align="center">

|       Technology      | Role                                             |
| :-------------------: | :----------------------------------------------- |
|     🍃 **MongoDB**    | NoSQL database for persistent credential storage |
|   🚂 **Express.js**   | Backend framework and REST API                   |
|    ⚛️ **React.js**    | Frontend user interface                          |
|  🎨 **Tailwind CSS**  | UI styling and responsive design                 |
|   🟨 **JavaScript**   | Core programming language                        |
|     🧪 **Postman**    | API development and testing                      |
| 🔔 **React Toastify** | Success and error notifications                  |
|       ⚡ **Vite**      | Frontend development and build tooling           |
|       🔧 **Git**      | Version control                                  |
|     🐙 **GitHub**     | Source code hosting and collaboration            |

</p>

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │        USER         │
                         │     Web Browser     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   REACT FRONTEND    │
                         │      PassOP UI      │
                         └──────────┬──────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   EXPRESS.JS API    │
                         │       BACKEND       │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                ┌─────────────────┐   ┌──────────────────┐
                │  MASTER PASSKEY │   │     MONGODB      │
                │   VERIFICATION  │   │ CREDENTIAL STORE │
                └─────────────────┘   └──────────────────┘
```

The frontend **never communicates directly with MongoDB**.

All database operations go through the Express.js backend.

---

# 🔄 How PassOP Works

```text
User Opens PassOP
       │
       ▼
React Application Loads
       │
       ▼
GET /passwords
       │
       ▼
Express.js Backend
       │
       ▼
MongoDB
       │
       ▼
Saved Credentials Returned
       │
       ▼
Credentials Displayed
       │
       ├───────────────┐
       │               │
       ▼               ▼
    ADD PASSWORD     VIEW PASSWORD
       │               │
       ▼               ▼
   POST /passwords   Master Passkey
                       │
                       ▼
              POST /master-passkey/verify
                       │
                 ┌─────┴─────┐
                 ▼           ▼
               WRONG       CORRECT
                 │           │
                 ▼           ▼
               DENY        REVEAL
       │
       ▼
DELETE /passwords/:id
       │
       ▼
MongoDB
```

---

# 📂 Project Structure

```text
PassOP/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── Manager.jsx
│   │
│   ├── public/
│   │   └── icons/
│   │       └── add.gif
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

> The exact frontend structure may vary depending on the Vite/React configuration.

---

# ⚙️ Installation

## 1. Clone The Repository

```bash
git clone https://github.com/YOUR_USERNAME/PassOP.git
```

```bash
cd PassOP
```

---

## 2. Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a file named:

```text
.env
```

inside the `backend` directory.

Use the following configuration:

```env
MONGO_URL="your_MongoDB_URL"

MASTER_PASSKEY="your PassKey"
```

### Example `.env.example`

Create a file named `.env.example`:

```env
MONGO_URL="your_MongoDB_URL"

MASTER_PASSKEY="your PassKey"
```

Then create your actual `.env` file:

```bash
cp .env.example .env
```

On Windows, you can simply create `.env` manually and copy the contents from `.env.example`.

### ⚠️ Important

**Never commit your `.env` file to GitHub.**

Make sure your `.gitignore` contains:

```text
.env
node_modules/
```

---

# 🍃 MongoDB Setup

PassOP uses MongoDB for persistent credential storage.

The application uses:

```text
Database:    PassOp
Collection:  password
```

A stored credential follows this structure:

```json
{
  "_id": "MongoDB ObjectId",
  "site": "https://github.com",
  "username": "username",
  "password": "password"
}
```

MongoDB automatically generates the `_id` field.

---

# 🚀 Start The Backend

From the `backend` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

Expected output:

```text
✅ Connected to MongoDB
🚀 Server running at http://localhost:3000
```

---

# ⚛️ Start The Frontend

Open another terminal.

Move to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔌 API Reference

PassOP currently exposes four primary REST API operations.

## Get All Passwords

```http
GET /passwords
```

Returns all saved credentials.

Example:

```json
{
  "success": true,
  "result": [
    {
      "_id": "66xxxxxxxxxxxxxxxxxxxx",
      "site": "https://github.com",
      "username": "username",
      "password": "mypassword"
    }
  ]
}
```

---

## Add Password

```http
POST /passwords
```

Request body:

```json
{
  "site": "https://github.com",
  "username": "username",
  "password": "mypassword"
}
```

The backend validates the data and stores the credential in MongoDB.

---

## Delete Password

```http
DELETE /passwords/:id
```

Example:

```http
DELETE /passwords/66xxxxxxxxxxxxxxxxxxxx
```

The MongoDB ObjectId is used to identify and delete the selected credential.

---

## Verify Master Passkey

```http
POST /master-passkey/verify
```

Request:

```json
{
  "passkey": "your PassKey"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Master passkey verified"
}
```

Invalid passkey:

```http
401 Unauthorized
```

---

# 🧪 API Testing

The REST APIs can be tested using **Postman**.

Recommended testing flow:

```text
Postman
   │
   ├── GET    /passwords
   │
   ├── POST   /passwords
   │
   ├── POST   /master-passkey/verify
   │
   └── DELETE /passwords/:id
```

This makes it possible to test the backend independently before connecting it to the React frontend.

---

# 🔔 Notifications

PassOP uses **React Toastify** to provide instant feedback to the user.

### Success notifications

```text
Password saved successfully.
Password deleted successfully.
Copied to clipboard!
```

### Error notifications

```text
Failed to load passwords.
Failed to save password.
Failed to delete password.
Incorrect Master Passkey! Access Denied.
```

This provides immediate feedback without interrupting the user's workflow.

---

# 📋 Clipboard Integration

PassOP uses the browser's native Clipboard API:

```javascript
navigator.clipboard.writeText(password)
```

When the user clicks the copy button:

```text
User clicks Copy
       ↓
Password copied
       ↓
Success Toast
```

---

# 🔐 Password Visibility

Passwords are hidden by default.

```text
••••••••
```

When the user wants to reveal a password:

```text
Click Eye Icon
      ↓
Enter Master Passkey
      ↓
Backend Verification
      ↓
   ┌──┴──┐
   │     │
Wrong  Correct
   │     │
   ▼     ▼
 Deny  Reveal
```

The frontend tracks revealed passwords using local React state.

---

# 🧠 React State Management

PassOP uses React Hooks to manage application state.

### Form State

```javascript
const [form, setForm] = useState({
    site: "",
    username: "",
    password: ""
});
```

### Password List

```javascript
const [passwordArray, setPasswordArray] = useState([]);
```

### Visible Passwords

```javascript
const [visiblePasswords, setVisiblePasswords] = useState(new Set());
```

### Loading State

```javascript
const [loading, setLoading] = useState(true);
```

The application also uses `useEffect()` to load credentials when the application starts.

---

# 🛡️ Security

## Current Security Model

PassOP currently uses a basic Master Passkey verification mechanism:

```text
Master Passkey
      ↓
Backend Verification
      ↓
Password Reveal
```

The passkey is stored as an environment variable and verification is performed by the backend rather than trusting the frontend.

---

## ⚠️ Important Security Disclaimer

The current implementation is a **functional password-manager prototype and learning/portfolio project**.

Passwords are currently stored as **plain text in MongoDB**.

This means the current version should **not be considered a production-grade password manager**.

Before deploying PassOP as a real password-management service, additional security measures are required.

---

# 🔒 Production Security Roadmap

A production version should implement:

### Encryption

```text
User Password
      ↓
Strong Encryption
      ↓
Encrypted Credential
      ↓
MongoDB
```

### Authentication

```text
User Registration
       ↓
Secure Login
       ↓
Session / Token
       ↓
Authenticated API
```

### Authorization

Every credential should belong to a specific user:

```json
{
  "userId": "...",
  "site": "...",
  "encryptedPassword": "..."
}
```

### Additional Protection

* HTTPS
* Rate limiting
* Brute-force protection
* Secure secret management
* Per-user data isolation
* Two-factor authentication
* Security audit logs
* Secure key management

---

# 🚧 Current Limitations

The current version does not yet include:

* Password encryption
* User authentication
* Per-user authorization
* Rate limiting
* Password generator
* Password strength analysis
* Edit/update credentials
* Password breach monitoring
* HTTPS production configuration
* Automated backup/recovery

These are planned areas for future development.

---

# 🚀 Future Roadmap

## Phase 1: Current Prototype

```text
React
  +
Express.js
  +
MongoDB
  +
Master Passkey
```

## Phase 2: Secure Application

```text
Authentication
      +
Encryption
      +
Authorization
      +
HTTPS
      +
Rate Limiting
```

## Phase 3: Consumer Product

```text
Web App
   +
Mobile App
   +
Browser Extension
   +
Cloud Synchronization
```

## Phase 4: Complete Password Platform

```text
Personal Vault
      +
Family Vault
      +
Business Vault
      +
Secure Sharing
      +
Security Monitoring
```

---

# 💡 Planned Features

### 🔐 Security

* [ ] AES-256 encryption
* [ ] Zero-knowledge architecture
* [ ] Secure authentication
* [ ] Two-factor authentication
* [ ] Biometric authentication
* [ ] Session management
* [ ] Rate limiting
* [ ] Brute-force protection
* [ ] Security audit logs

### 🔑 Password Management

* [ ] Password generator
* [ ] Password strength meter
* [ ] Password history
* [ ] Edit credentials
* [ ] Duplicate detection
* [ ] Password expiry reminders
* [ ] Breached-password detection

### 📁 Organization

* [ ] Categories
* [ ] Tags
* [ ] Favorites
* [ ] Search
* [ ] Sorting
* [ ] Folders

### 📱 User Experience

* [ ] Dark mode
* [ ] Mobile responsive interface
* [ ] Browser extension
* [ ] Autofill
* [ ] Keyboard shortcuts
* [ ] Import/export

### ☁️ Advanced

* [ ] Multi-device synchronization
* [ ] Cloud backup
* [ ] Secure sharing
* [ ] Family accounts
* [ ] Team password vaults
* [ ] Admin dashboard
* [ ] Role-based access control

---

# 🎯 Project USP

<p align="center">

### **Simple Credential Management with an Additional Master Passkey Layer**

</p>

PassOP focuses on providing a straightforward interface for managing multiple website credentials from one place.

Instead of remembering multiple passwords individually, users can manage their credentials through a single interface while requiring a **Master Passkey** before revealing stored passwords.

```text
              PASSOP
                │
        ┌───────┴───────┐
        ▼               ▼
      STORE           MANAGE
        │               │
        └───────┬───────┘
                ▼
             PROTECT
                │
                ▼
             ACCESS
                │
                ▼
              COPY
```

---

# 🎓 What This Project Demonstrates

PassOP demonstrates practical full-stack development concepts including:

* React state management
* React lifecycle
* REST APIs
* HTTP methods
* Express.js routing
* MongoDB CRUD operations
* Environment variables
* CORS
* Asynchronous JavaScript
* Error handling
* Loading states
* User feedback
* Clipboard API
* Basic access control
* Frontend/backend integration
* API testing with Postman
* Git and GitHub workflow

---

# 📊 Complete Data Flow

```text
                     ┌─────────────┐
                     │    USER     │
                     └──────┬──────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ React + Vite  │
                    │   Frontend    │
                    └───────┬───────┘
                            │
                         HTTP/REST
                            │
                            ▼
                    ┌───────────────┐
                    │   Express.js  │
                    │    Backend    │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
        ┌────────────────┐    ┌────────────────┐
        │ Master Passkey │    │    MongoDB     │
        │  Verification  │    │   PassOp DB    │
        └────────────────┘    └────────────────┘
```

---

# 📈 Project Evolution

PassOP can evolve from a simple password manager into a complete **digital credential management platform**.

```text
Prototype
    │
    ▼
Secure Password Manager
    │
    ▼
Consumer Password Platform
    │
    ▼
Family & Team Vaults
    │
    ▼
Complete Credential Security Platform
```

---

# 🤝 Contributing

Contributions are welcome.

If you want to contribute:

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/YOUR_USERNAME/PassOP.git

# Create a branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git add .
git commit -m "Add: your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

This project is currently intended as a learning, portfolio and development project.

If you plan to turn PassOP into a commercial password-management service, review and add an appropriate open-source or commercial license before distribution.

---

# 👨‍💻 Author

<p align="center">

<strong>Naitik Gupta</strong>

<br>

B.Tech CSE (AI/ML) Student

<br><br>

<a href="https://github.com/">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

</p>

---

<p align="center">

### 🔐 PassOP

<strong>Store. Protect. Access. Manage.</strong>

<br><br>

Built with ❤️ using React, Express.js and MongoDB.

</p>
