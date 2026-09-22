# Paytm GrowthPilot

Paytm GrowthPilot is an intelligent analytics and automation platform designed to empower merchants and businesses within the Paytm ecosystem. It leverages data-driven insights to optimize transaction flows, track business growth metrics, and streamline payment workflows.

---

## 🚀 Features

* **Merchant Analytics Dashboard:** Real-time visibility into transactions, revenue trends, and customer retention.
* **Automated Insights:** Growth recommendations and anomaly detection for business transactions.
* **Dual-Stack Architecture:** Decoupled frontend and backend for modularity, speed, and scalability.
* **Secure Integration:** Built to interface cleanly with modern payment gateways and business APIs.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication & APIs:** JWT, RESTful APIs

---

## 📂 Project Structure

```text
paytm-growthpilot/
├── backend/          # API server, database models, payment routes & business logic
├── frontend/         # Client-side user interface, dashboard components & state management
├── .gitignore        # Git ignore file
└── README.md         # Project documentation

```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

* Node.js (v18+)
* Git
* MongoDB (Local or Atlas URI)

---

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yaxit-01/paytm-growthpilot.git
cd paytm-growthpilot

```


2. **Backend Setup:**
```bash
cd backend
npm install

```


Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYTM_MERCHANT_ID=your_merchant_id
PAYTM_MERCHANT_KEY=your_merchant_key

```


Start the backend server:
```bash
npm run dev

```


3. **Frontend Setup:**
```bash
cd ../frontend
npm install

```


Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000

```


Start the frontend development server:
```bash
npm run dev

```



---

## 📜 License

This project is licensed under the MIT License.
