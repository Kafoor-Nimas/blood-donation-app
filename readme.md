# LifeLink — Emergency Blood Donation & Transfusion Coordination System

**LifeLink** is a full-stack MERN (MongoDB, Express.js, React.js, and Node.js) web application designed to connect volunteer blood donors with patients in need of blood donations across Sri Lanka's 25 administrative districts.

The platform provides a centralized system for managing blood donors, coordinating emergency blood requests, monitoring donor availability, and administering user accounts. Its goal is to make blood donation coordination more accessible, organized, and efficient.

---

## 🌟 Key Features

### 🩸 Emergency Blood Request Management
- Create and manage emergency blood requests.
- Track request urgency levels: `Critical`, `Urgent`, and `Standard`.
- Monitor request statuses: `Pending`, `Under Coordination`, and `Fulfilled`.
- View and manage blood requests through an administrative dashboard.

### 🧑‍🤝‍🧑 Donor Network Management
- Browse and search registered blood donors.
- Filter donors by blood group, district, city, and availability.
- Manage donor profiles and account statuses.

### 🔎 Smart Search
- Search across donor records and blood requests.
- Keyboard shortcut support (`Ctrl + K` / `⌘ + K`) for quick access, where supported.

### 🔐 Privacy & Security
- User authentication and role-based access control.
- Protected administrative operations.
- Masked donor contact information to help protect personal details.
- Account status management, including `Active` and `Suspended` states.

### 📊 Administrative Dashboard
- Overview of donors, users, and blood requests.
- Manage donor and user accounts.
- Monitor and update blood request statuses.
- Review audit and security logs.
- Search, filter, and paginate records.

### 📱 Responsive User Interface
- Responsive layouts for desktop, tablet, and mobile devices.
- Dark and light mode support.
- Reusable UI components and consistent styling.
- Tailwind CSS-based interface.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | User interface development |
| Vite | Frontend build tool and development server |
| Tailwind CSS | Styling and responsive layouts |
| React Router | Client-side routing |
| Context API | Global state management |
| Axios | HTTP requests to the backend |
| Material Symbols / Icons | Interface icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Nodemailer | Email notifications, if configured |

---

## 📁 Project Structure

```text
blood-donation-app/
│
├── client/                         # React frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Global state management
│   │   ├── data/                   # Static data and configurations
│   │   ├── pages/                  # Application pages
│   │   ├── services/               # API services and Axios configuration
│   │   ├── App.jsx                 # Application routes
│   │   └── main.jsx                # Application entry point
│   └── package.json
│
├── server/                         # Express backend
│   ├── config/                     # Database configuration
│   ├── controllers/                # Request handling and business logic
│   ├── models/                     # Mongoose models
│   ├── routes/                     # API route definitions
│   ├── seeds/                      # Database seed scripts
│   ├── server.js                   # Backend entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run LifeLink locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (included with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Kafoor-Nimas/blood-donation-app.git

cd blood-donation-app
```

### 2. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/blood_donation_app?retryWrites=true&w=majority

JWT_SECRET=your_secure_jwt_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
```

**Important:**
- Replace the MongoDB placeholders with your actual database connection details.
- Use a strong, unique JWT secret.
- Configure SMTP credentials only if email functionality is enabled.
- Never commit your `.env` file or expose your credentials publicly.

### 3. Install Backend Dependencies

```bash
cd server

npm install
```

### 4. Seed the Database (Optional)

If your project includes a database seeding script, run:

```bash
npm run seed
```

This initializes the database with sample data, if supported by your seed script.

### 5. Start the Backend Server

```bash
npm run dev
```

The backend API should be available at:

```text
http://localhost:5000
```

### 6. Install Frontend Dependencies

Open a new terminal and navigate to the client directory:

```bash
cd client

npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

> **Note:** The commands above assume your `package.json` files contain the corresponding scripts. Check the actual scripts in your project if a command is unavailable.

---

## 📡 API Endpoints

The following table provides an overview of the main API endpoints. Confirm the exact routes and HTTP methods against your backend implementation.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/donors` | Retrieve donor records |
| GET | `/api/donors/:id` | Retrieve a specific donor |
| PUT | `/api/donors/:id/status` | Update donor account status |
| GET | `/api/requests` | Retrieve blood requests |
| POST | `/api/requests` | Create a blood request |
| PATCH | `/api/requests/:id/status` | Update blood request status |

Some endpoints may require authentication and administrator permissions.

---

## 🔒 Security & Privacy

LifeLink is designed with user privacy and application security in mind.

- Passwords should be securely hashed before storage.
- Protected routes should enforce authentication and authorization.
- Administrative actions should be restricted to authorized users.
- Sensitive donor contact information should be handled carefully.
- Environment variables should be used for confidential configuration.
- Audit logs should avoid storing passwords, authentication tokens, or other sensitive credentials.

---

## 🌍 Project Scope

LifeLink is designed to support blood donation coordination across Sri Lanka, covering its 25 administrative districts.

The system aims to:
- Simplify donor discovery.
- Improve emergency blood request coordination.
- Help administrators manage donor and user information.
- Provide a centralized platform for blood donation activities.

**Disclaimer:** LifeLink is a coordination platform and does not replace professional medical advice, clinical eligibility assessments, or official blood transfusion procedures.

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information, if included in the repository.

---

## 👨‍💻 Developer

**Developed by:** K. Nimas

**GitHub:** [Kafoor-Nimas](https://github.com/Kafoor-Nimas)

**Repository:** [LifeLink – Blood Donation App](https://github.com/Kafoor-Nimas/blood-donation-app)