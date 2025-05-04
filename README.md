# 🧠 AI Drawboard Backend

![License](https://img.shields.io/badge/license-ISC-blue)
![Node.js](https://img.shields.io/badge/node.js-18.x-green)

This is the backend service for the **AI Drawboard** application. It powers features like user authentication and image analysis using Google Generative AI. The backend is built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 **User Authentication** — Register, login, logout, and refresh tokens via JWT.
- 🖼️ **Image Analysis** — Analyze images using Google Generative AI.
- 🛡️ **Secure APIs** — Auth middleware and centralized error handling.
- 💾 **Database Integration** — MongoDB for storing user data.
- 🧱 **Modular Architecture** — Scalable and maintainable folder structure.

---

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:  
   Create a `.env` file in the root directory or use the provided `.env.example` as a reference.

   Example:
   ```env
   PORT=5000
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 👤 User Routes

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/users/register`       | Register a new user      |
| POST   | `/api/users/login`          | Login a user             |
| POST   | `/api/users/refresh-token`  | Refresh access token     |
| POST   | `/api/users/logout`         | Logout a user            |
| GET    | `/api/users/getuser`        | Get user details (secure)|

### 🔍 Analyze Routes

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/analyze`   | Analyze image (secure)     |

---

## 📦 Example API Request

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "...",
  "user": {
    "id": "...",
    "email": "user@example.com"
  }
}
```

---

## 🧰 Tech Stack

- **Backend Framework**: Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  
- **AI Integration**: Google Generative AI  
- **Utilities**: `bcryptjs`, `cookie-parser`, `dotenv`  

---

## ❗ Error Handling

Custom `ApiError` and `AsyncHandler` utilities provide consistent and informative error responses.

---

## 🧪 Testing

Run tests using:

```bash
npm test
```

---

## 🚀 Deployment

To deploy this app, you can use:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Heroku](https://heroku.com/)
- Or deploy on a custom VPS

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🤝 Contributing

Contributions are welcome!  
Please fork the repository and submit a pull request for any improvements or bug fixes.

---

