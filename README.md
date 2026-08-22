AutoElite — Dealership Intelligence Platform

AutoElite is a modern dealership management and intelligence platform designed to bring core vehicle-dealership operations into one workspace.

Live Application

Live demo: https://auto-elite-upfs.vercel.app/

Public repository: https://github.com/Harshitha-Medipelly/AutoElite

The Vercel deployment is the frontend production deployment. The FastAPI backend is included in this repository for local development.

Project Overview

AutoElite provides a centralized interface for dealership teams to manage:

Dashboard and dealership KPIs

Vehicle inventory

Vehicles and vehicle details

Leads

Customers

Appointments

Test drives

Sales

Purchases / purchase orders

Analytics

AI Insights

Reports

Settings

AI Dealership Copilot chatbot

The application uses a dark, professional dealership-operations interface with responsive navigation, status indicators, KPI cards, tables, forms, purchase workflows, analytics views, reports and an AI assistant.

Main Features

Operations

Dashboard with dealership metrics

Inventory management

Vehicle browsing and details

Lead management

Customer management

Appointment management

Test-drive tracking

Sales management

Vehicle purchasing and purchase-order tracking

Intelligence

Analytics dashboard

AI Insights

Reports

AI Dealership Copilot

User Experience

Professional responsive UI

Sidebar navigation

Mobile navigation

Search and filtering

Status badges

Modal-based actions

Login screen

Demo access

Logout

Responsive layouts

Technology Stack

Frontend

React

Vite

JavaScript / JSX

Tailwind CSS

Lucide React

React Router

Backend

Python

FastAPI

Uvicorn

Pydantic

python-dotenv

Groq SDK (for the AI backend where enabled)

Deployment

Vercel for the production frontend

GitHub for source-code hosting

Project Structure

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
├── requirements.txt
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js

Local Setup

Prerequisites

Install:

Node.js

npm

Python 3.11+ recommended

Git (optional if the repository is downloaded as ZIP)

Verify:

node --version
npm --version
python --version

1. Get the Project

Clone the repository:

git clone https://github.com/Harshitha-Medipelly/AutoElite.git
cd AutoElite

Or download the repository ZIP from GitHub and extract it.

2. Frontend Setup

From the project root:

npm install

Start the frontend:

npm run dev

Vite will display a local address, normally similar to:

http://localhost:5173

Open that address in the browser.

3. Backend Setup

Open a second terminal.

From the AutoElite project root:

python -m pip install -r requirements.txt

Start FastAPI:

python -m uvicorn main:app --reload --port 8000

The backend will normally be available at:

http://127.0.0.1:8000

FastAPI documentation is available at:

http://127.0.0.1:8000/docs

If the AI chatbot is configured to call the backend, keep the backend terminal running while testing the chatbot locally.

Environment Variables

If the backend version in the repository uses Groq, create a .env file in the project root:

GROQ_API_KEY=your_groq_api_key

Never commit a real API key to GitHub.

The .env file should be ignored by Git.

4. Production Build Test

Before deployment, run:

npm run build

A successful build should finish without Vite/Rollup errors and create the production dist output.

To preview the production build locally:

npm run preview

Login / Demo

The application contains a demo-access option on the login page.

For the current demo implementation, use the credentials shown by the application's Demo Access section rather than committing production credentials to the repository.

Screenshots

The screenshots/ directory contains screenshots of the application and deployment workflow.

Login



Deployment



Repository Structure



AI Usage

My AI Usage

AI assistance was used as a development aid during the project.

I used ChatGPT to:

Discuss the project architecture and feature organization.

Understand concepts required for the AI chatbot, including RAG, chunks, tokens, embeddings and vector databases.

Assist with React component structure and UI implementation.

Debug frontend build and import errors.

Assist with FastAPI backend setup.

Assist with connecting the React chatbot interface to a backend API.

Improve UI/UX wording, navigation structure and responsive layouts.

Troubleshoot deployment issues with Vercel.

Prepare documentation and development checklists.

AI-generated suggestions were reviewed, adapted and integrated into the project rather than treating AI output as an unquestioned final implementation.

The source code in this repository represents the project implementation submitted for the assessment.

For the required raw AI interaction record, see PROMPTS.md.

Testing

See TEST_REPORT.md for the test report and verification status.

The production frontend was successfully built and deployed to Vercel.

Deployment

The production frontend is deployed on Vercel:

https://auto-elite-upfs.vercel.app/

Every push/commit to the connected main branch can trigger a new production deployment depending on the Vercel project configuration.

Security Notes

Do not commit .env files containing API keys.

Do not commit real customer information.

Demo data is used for the demonstration environment.

Production authentication should use a secure backend/session/token system rather than frontend-only demo credentials.

Future Improvements

Possible next-stage improvements include:

Persistent database integration

Real authentication and authorization

Role-based access control

Production-grade AI service deployment

Retrieval-Augmented Generation (RAG)

Vector database integration

Real-time inventory synchronization

Automated frontend/backend test coverage

CI/CD pipeline

Custom production domain

Advanced dealership forecasting

Audit logs and activity tracking

Author

Harshitha Medipelly

GitHub: https://github.com/Harshitha-Medipelly

Project: AutoElite — Dealership Intelligence Platform
