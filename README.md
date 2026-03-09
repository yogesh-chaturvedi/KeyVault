# KeyVault

**🛒 KeyVault – Secure Password Manager** is a secure password manager built with the MERN stack that follows a Zero-Knowledge Architecture.
All sensitive data is encrypted before storage, ensuring that even the server cannot read user passwords.

The vault must be unlocked with a master password, and all passwords are encrypted using strong cryptographic methods.


## 🌐 Live Demo

👉 [Visit keyVault Live](https://key-vault-swart.vercel.app/)

---

## ✨ Features

### 🔑 Authentication

- User signup and login

- Secure password hashing

- Protected routes for authenticated users

### 🔐 Zero-Knowledge Architecture

- Master password is never stored on the server

- Encryption key is derived using salted key derivation

- Passwords are encrypted before saving to the database

- Server cannot decrypt vault data

### 🗝️ Vault Unlock System

- Vault locked by default after login

- Requires master password to unlock

- Vault session stored temporarily in memory

- Automatic vault session expiration for security

### 🔒 Secure Password Storage

- AES-256-GCM encryption

- Unique IV and authentication tag per password

- Encrypted passwords stored safely in database

### 📂 Password Management

- Add new passwords

- Edit existing passwords

- View decrypted passwords only when vault is unlocked

- Delete stored passwords

### 📊 Password Strength Detection

- Uses zxcvbn to analyze password strength

- Shows weak / medium / strong indicators

### 👤 Profile Management

- Update profile information

- Upload profile image

- Default avatar fallback if no image uploaded

### 🎨 Modern UI

- Built with React + Tailwind CSS

- Responsive interface

- Toast notifications for feedback

---

## 🏗️ Tech Stack

### Frontend

- React

- React Router

- Tailwind CSS

- React Hook Form

- React Toastify

- Axios

### Backend

- Node.js

- Express.js

- MongoDB

- Mongoose

- Crypto (AES-256-GCM)

- JWT / Cookie Authentication

### Security Tools

- zxcvbn (password strength checking) 
---

## 🔐 Security Architecture

KeyVault follows a Zero-Knowledge design, meaning the server never has access to plaintext passwords.

## Flow

- User logs in

- Vault is locked by default

- User enters master password

- Encryption key is derived using stored salt

- Vault verification checks the derived key

- Vault session is created temporarily

- Passwords are encrypted/decrypted using this key

- Even if the database is compromised, attackers cannot read stored passwords.

---

## 📁 Project Structure
KeyVault
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── utils
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── utils
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yogesh-chaturvedi/KeyVault
cd keyVault
```

### 2️⃣ Environment Variables
Create a .env file in the backend directory and add:
```bash
cd backend
npm install

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_exp_time
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev
```
### 3. Setup Frontend
Create a .env file in the frontend directory

```bash
cd frontend
npm install

VITE_API_URL=http://localhost:3000 

npm run dev
```
---
## 👤 Author
- Name: Yogesh Chaturvedi
- GitHub: [@yogesh-chaturvedi](https://github.com/yogesh-chaturvedi)