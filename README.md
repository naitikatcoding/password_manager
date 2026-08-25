# 🔐 PassOP - Your Local Password Vault

PassOP is a fast, secure, and user-friendly open-source password manager designed to keep your online credentials organized and safe. It runs entirely on client-side architecture, ensuring that your usernames and passwords never touch a third-party server.

---

## 🛠️ The Tech Stack

This project is built using a modern, lightweight frontend development setup:

*   **Framework:** React 18 / 19
*   **Build Tool:** Vite (Ultra-fast Hot Module Replacement)
*   **Routing:** React Router DOM (Smooth, non-reloading client-side routing)
*   **Styling:** Tailwind CSS (Utility-first styling with responsive layouts)
*   **Icons & Assets:** Custom vector inline SVGs / Animated GIFs

---

## 🚀 Unique Selling Proposition (USP)

Unlike cloud-dependent database managers that are vulnerable to data breaches, **PassOP is 100% localized**. 

1.  **Zero Server Footprint:** All data is sandboxed directly inside your browser's isolated space.
2.  **Zero Subscription Fees:** Full structural control over your records without tracking cookies, premium feature gates, or third-party background telemetry.
3.  **Privacy by Default:** Completely isolates data on your machine—if someone intercepts your active session, your records remain unreadable without direct interface authorization.

---

## ✨ Key Features

*   **Master Passkey System:** Prompts a setup prompt on initial boot. Restricts password visibility toggles using a cryptographic session wall, demanding authentication before revealing data.
*   **Dynamic Password Masking:** Implements individual row state isolation via native JavaScript `Set` tracking to unmask only the requested cell instead of flashing your whole database layout.
*   **Safe URL Formatting:** Cleans raw user input on form submissions by auto-injecting safe `https://` protocol tags onto domain fragments for one-click secure hyperlinking.
*   **Instant Delete Override:** Features cross-row removal triggers mapped to confirmation hooks that safely eject records from operational runtime arrays and target disk maps simultaneously.
*   **Responsive Tailwind Fluid Layout:** Built using modern flex-grids, sticky view headers, linear vector backdrops, and blur layout anchors designed to transition across mobile, tablet, and desktop viewports.

---

## 📥 Installation and Setup

Follow these quick steps to launch the app locally:

1. Clone the repository down to your computer:
   ```bash
   git clone https://github.com
   ```

2. Open the directory path inside your terminal:
   ```bash
   cd password_manager
   ```

3. Install the application layout dependencies:
   ```bash
   npm install
   ```

4. Boot up the local Vite runtime preview server:
   ```bash
   npm run dev
   ```

---

## 📁 Core Directory Map

```text
src/
├── assets/
│   └── Components/
│       ├── About.jsx       # Application utility description layout
│       ├── Manager.jsx     # Main form controller, storage effects & table logic
│       └── Navbar.jsx      # Fluid non-reloading layout header links
├── App.jsx                 # Client-side Router configuration layout
└── main.jsx                # DOM attachment target script
```
