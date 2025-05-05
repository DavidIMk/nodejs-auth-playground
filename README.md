# Node.js Auth Playground

A minimal Express.js boilerplate demonstrating two authentication schemes:

1. **HTTP Basic Authentication**  
2. **Bearer Token Authentication** (JWT)

---

## 🚀 Features

- **Basic Auth**: Protect routes using `Authorization: Basic <credentials>`.  
- **Bearer JWT**:  
  - **Register** users with hashed passwords.  
  - **Login** to receive a signed JSON Web Token.  
  - **Protect** routes with `Authorization: Bearer <token>`.

---

## 🛠 Tech Stack

- **Node.js** (ES Modules)  
- **Express.js**  
- **bcrypt** (password hashing)  
- **jsonwebtoken** (JWT handling)  
- **dotenv** (env-vars)
- **mongoose**

---

## 📥 Getting Started

### Prerequisites

- Node.js v14+  
- npm or yarn  

### Installation

1. **Clone** the repo  
   ```bash
   git clone https://github.com/yourusername/nodejs-auth-playground.git
   cd nodejs-auth-playground
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn
   ```

3. **Create** a `.env` file in the root:  
   ```env
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1h
   PORT=3000
   MONGO_URI=your_mongo_uri
   ```

4. **Run** the server  
   ```bash
   npm start
   # or
   yarn start
   ```

---

## 📑 API Reference

### 1. Register & Login (JWT Bearer)

#### Register a new user  
```
POST /auth/register
Content-Type: application/json
```
**Body**  
```json
{ "username": "alice", "password": "P@ssw0rd!" }
```
**Response**  
```json
{ "id": "<user-id>", "username": "alice" }
```

#### Login → get JWT  
```
POST /auth/login
Content-Type: application/json
```
**Body**  
```json
{ "username": "alice", "password": "P@ssw0rd!" }
```
**Response**  
```json
{ "accessToken": "<jwt-token>" }
```

#### Protected Profile  
```
GET /auth/profile
Authorization: Bearer <jwt-token>
```
**Response**  
```json
{ "message": "Hello user <userId>!" }
```

---

### 2. HTTP Basic Authentication

#### Protected Secret  
```
GET /basic/secret
Authorization: Basic <base64(username:password)>
```
**Example**  
```bash
curl -u alice:P@ssw0rd! http://localhost:3000/basic/secret
```
**Response**  
```json
{ "message": "Hello user <userId>!" }
```

---

## 💡 Usage Examples

```bash
# 1) Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"P@ssw0rd!"}'

# 2) Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"P@ssw0rd!"}'

# 3) Suppose accessToken="eyJhbGciOi..."
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer eyJhbGciOi..."

# 4) Basic Auth
curl -u alice:P@ssw0rd! http://localhost:3000/basic/secret
```

---

## 📂 Project Structure

```
src/
├── app.js
├── config.js
├── controllers/
│   └── authController.js
├── middleware/
│   ├── auth.js         # Bearer JWT guard
│   └── basicAuth.js    # HTTP Basic guard
├── routes/
│   ├── authRoutes.js
│   └── basicRoutes.js
├── services/
│   └── tokenService.js
└── models/
    └── User.js         # In-memory or your chosen DB model
```

---

## 📝 License

This project is licensed under MIT.  
Feel free to adapt and extend it for your own authentication experiments!  
