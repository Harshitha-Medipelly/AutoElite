🚗 AutoElite — Dealership Intelligence Platform

A modern dealership operations workspace for inventory, sales, customers, test drives, purchasing, analytics, reports, and AI-assisted dealership decisions.

<div align="center">

🌐 LIVE DEMO

🚀 Open AutoElite Live Application

🔐 DEMO LOGIN

Email: admin@autoelite.com
Password: admin(123)

⭐ Fastest option for reviewers: Open the live application and click Use Demo on the login screen. The demo credentials are filled automatically.

💻 SOURCE CODE

View Public GitHub Repository

</div>

✨ Why AutoElite?

AutoElite brings common dealership workflows into a single, professional workspace instead of scattering operations across separate tools.

The platform is designed around three goals:

Operate — manage vehicles, inventory, customers, leads, appointments, test drives, sales, and purchases.

Understand — monitor KPIs, analytics, reports, and dealership performance.

Assist — use the AI Dealership Copilot to ask questions and receive dealership-focused assistance.

🚀 Live Demo

Resource

Link

🌐 Live Application

Open AutoElite

💻 GitHub Repository

View Source Code

⚡ Frontend Deployment

Vercel

🧠 Backend

FastAPI included in this repository

🔐 Reviewer Access

Recommended:
Open the live application → click Use Demo → enter the application automatically.

Manual credentials:

Email:    admin@autoelite.com
Password: admin(123)

Note: The demo account is intended for evaluation of the application. Production deployments should use secure authentication and should never expose real credentials.

🎯 Core Features

📊 Dealership Operations

Module

What it provides

Dashboard

Dealership KPIs, operational overview and quick actions

Inventory

Inventory monitoring and stock visibility

Vehicles

Vehicle browsing and vehicle information

Vehicle Details

Detailed vehicle-level information

Leads

Lead tracking and management

Customers

Customer management

Appointments

Appointment scheduling and tracking

Test Drives

Test-drive management

Sales

Sales workflow and sales information

Purchases

Purchase and purchase-order tracking

Purchase Flow

Guided purchasing workflow

🧠 Intelligence

📈 Analytics dashboard

🤖 AI Insights

📑 Reports

💬 AI Dealership Copilot

📊 KPI monitoring

🔎 Search and filtering

⚡ Operational status indicators

🎨 User Experience

Professional dark dealership-operations interface

Responsive desktop and mobile layouts

Sidebar navigation

Mobile navigation

Interactive KPI cards

Tables and status badges

Modal-based actions

Search and filtering

Login and demo access

Toast notifications

AI chatbot interface

Logout flow

🤖 AI Dealership Copilot

AutoElite includes an AI Dealership Copilot designed specifically around dealership operations.

The assistant is positioned to help with questions related to:

🚗 Vehicles

📦 Inventory

💰 Sales

👥 Customers

📅 Appointments

🚘 Test drives

📊 Dealership performance

The chatbot is integrated into the application interface and is designed to provide a conversational layer over dealership operations.

AI Architecture

The current project includes a FastAPI backend and Groq SDK integration where enabled.

Future versions can extend the assistant with:

Dealership Data
      ↓
Document / Data Processing
      ↓
Chunking
      ↓
Embeddings
      ↓
Vector Database
      ↓
Retriever
      ↓
Relevant Context
      ↓
LLM
      ↓
AI Dealership Copilot

This architecture can be extended into a full Retrieval-Augmented Generation (RAG) implementation.

🛠️ Technology Stack

Frontend

React

Vite

JavaScript / JSX

Tailwind CSS

React Router

Lucide React

Backend

Python

FastAPI

Uvicorn

Pydantic

python-dotenv

Groq SDK

Development & Deployment

GitHub

Vercel

VS Code

npm

🗂️ Project Structure

AutoElite/
│
├── src/
│   ├── components/
│   │   ├── AIChatbot.jsx
│   │   ├── AIChatbot.css
│   │   ├── AppLayout.jsx
│   │   ├── KpiCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Toast.jsx
│   │   ├── Topbar.jsx
│   │   └── VehicleCard.jsx
│   │
│   ├── pages/
│   │   ├── AIInsights.jsx
│   │   ├── Analytics.jsx
│   │   ├── Appointments.jsx
│   │   ├── Customers.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── Leads.jsx
│   │   ├── Login.jsx
│   │   ├── PurchaseFlow.jsx
│   │   ├── Purchases.jsx
│   │   ├── Reports.jsx
│   │   ├── Sales.jsx
│   │   ├── Settings.jsx
│   │   ├── TestDrives.jsx
│   │   ├── VehicleDetails.jsx
│   │   └── Vehicles.jsx
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── mockData.js
│
├── backend/
├── main.py
├── index.html
├── package.json
├── package-lock.json
├── requirements.txt
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
├── PROMPTS.md
├── TEST_REPORT.md
└── screenshots/

💻 Run AutoElite Locally

Prerequisites

Install:

Node.js

npm

Python 3.11+ recommended

Optional:

Git

Verify the installations:

node --version
npm --version
python --version

1️⃣ Get the Project

Option A — Clone with Git

git clone https://github.com/Harshitha-Medipelly/AutoElite.git
cd AutoElite

Option B — Download ZIP

Open the public repository:

https://github.com/Harshitha-Medipelly/AutoElite

Choose:

Code → Download ZIP

Extract the ZIP and open the project folder.

🎨 2️⃣ Frontend Setup

From the project root:

npm install

Start the development server:

npm run dev

Vite will display a local URL similar to:

http://localhost:5173

Open the displayed URL in your browser.

⚙️ 3️⃣ Backend Setup

Open a second terminal.

From the AutoElite project root:

python -m pip install -r requirements.txt

Start FastAPI:

python -m uvicorn main:app --reload --port 8000

Backend:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs

Keep the backend terminal running while testing frontend features that communicate with the backend.

🔑 Environment Variables

If the backend uses Groq for the AI service, create a local .env file:

GROQ_API_KEY=your_groq_api_key

⚠️ Security

Never commit your real API key to GitHub.

Make sure .env is included in .gitignore.

Example:

.env
.env.*
!.env.example

🧪 4️⃣ Production Build

Run:

npm run build

A successful build generates the production dist directory.

Preview the production build:

npm run preview

🧪 Testing

A detailed testing record is available in:

TEST_REPORT.md

The project was verified through:

Production Vite build

Vercel deployment

Manual application smoke testing

Navigation testing

Major page testing

Login/demo flow testing

UI interaction testing

Backend startup verification

The test report clearly distinguishes completed verification from automated testing that has not been configured.

📸 Screenshots

Screenshots of the application and deployment are available in:

screenshots/

🔐 Login



🌐 Vercel Deployment



💻 Repository



Additional screenshots are available in the screenshots/ directory.

☁️ Deployment

The production frontend is deployed using Vercel.

Live URL

https://auto-elite-upfs.vercel.app/

The GitHub repository is connected to the deployment, allowing changes pushed to the configured branch to trigger new deployments according to the Vercel project configuration.

Deployment Architecture

                 ┌─────────────────────┐
                 │       GitHub        │
                 │    AutoElite Repo   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │       Vercel        │
                 │  React + Vite App   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   AutoElite UI      │
                 │ Dashboard / Modules │
                 │ AI Chatbot / Reports│
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     FastAPI         │
                 │      Backend        │
                 └─────────────────────┘

Important: The Vercel deployment is currently the frontend production deployment. The FastAPI backend included in the repository should be deployed separately when backend functionality is required in production.

🧠 My AI Usage

AI assistance was used as a development aid during this project.

I used ChatGPT to:

Discuss project architecture and feature organization.

Understand AI concepts including RAG, chunks, tokens, embeddings and vector databases.

Assist with React component structure and UI implementation.

Assist with the AI chatbot interface.

Debug frontend import and build errors.

Assist with FastAPI backend setup.

Assist with connecting the React chatbot interface to a backend API.

Improve UI/UX wording and responsive layouts.

Troubleshoot Vercel deployment issues.

Prepare development documentation and testing checklists.

AI-generated suggestions were reviewed, adapted and integrated into the project based on the requirements of AutoElite.

The final project was assembled and tested as the AutoElite implementation rather than submitting an unchanged external repository or template.

Raw AI Interaction Record

The assessment-required raw AI interaction record is provided separately in:

PROMPTS.md

PROMPTS.md is intended to contain the raw, unedited AI chat logs or public chat links required by the assessment.

🔒 Security & Data Notes

Do not commit .env files containing API keys.

Do not commit real customer information.

Demonstration data is used for the demo environment.

The displayed demo credentials are for evaluation/demo access.

Production authentication should use secure server-side authentication.

Production systems should implement proper authorization and role-based access control.

🔮 Future Improvements

The current platform can be extended with:

Persistent MySQL/PostgreSQL database

Production authentication

Role-based access control

Secure session/token management

Production AI backend deployment

Full RAG pipeline

Vector database integration

Real-time inventory synchronization

Automated frontend tests

Automated backend tests

End-to-end testing with Playwright

CI/CD pipeline

Custom production domain

Advanced dealership forecasting

Audit logs

Activity tracking

Real dealership data integrations

👩‍💻 Author

Harshitha Medipelly

🎓 B.Tech — Electronics & Communication Engineering

🔗 GitHub:
https://github.com/Harshitha-Medipelly

🚗 Project:
AutoElite — Dealership Intelligence Platform

<div align="center">

⭐ AutoElite

Dealership operations. Intelligence. One workspace.

🚀 Launch Live Demo · 💻 View GitHub

</div>
