# AutoElite — AI Development Prompts

> This file documents the AI prompts used as development assistance while building
> the AutoElite — Dealership Intelligence Platform.
>
> AI was used as a development aid for architecture discussions, implementation
> guidance, debugging, UI/UX refinement, deployment troubleshooting, testing,
> and documentation.
>
> The project implementation was reviewed, adapted, tested, and integrated by
> the developer.

---

# Table of Contents

1. [Project Planning & Architecture](#1-project-planning--architecture)
2. [Frontend Development](#2-frontend-development)
3. [Login & Authentication UI](#3-login--authentication-ui)
4. [Dashboard & Dealership Modules](#4-dashboard--dealership-modules)
5. [AI Chatbot](#5-ai-chatbot)
6. [Backend & FastAPI](#6-backend--fastapi)
7. [AI Concepts](#7-ai-concepts)
8. [Debugging & Error Resolution](#8-debugging--error-resolution)
9. [Deployment](#9-deployment)
10. [Documentation](#10-documentation)
11. [Testing](#11-testing)
12. [AI Usage Declaration](#12-ai-usage-declaration)

---

# 1. Project Planning & Architecture

## Prompt 1

I am developing a dealership management and intelligence platform called
AutoElite.

The application should provide a centralized workspace for:

- Dashboard
- Vehicle inventory
- Vehicles
- Vehicle details
- Leads
- Customers
- Appointments
- Test drives
- Sales
- Purchases
- Analytics
- AI Insights
- Reports
- Settings
- AI Dealership Copilot

Help me structure the application professionally using React, Vite,
Tailwind CSS, JavaScript/JSX and React Router.

The UI should look like a modern dealership intelligence platform with a
professional dark theme, responsive navigation, KPI cards, tables,
status indicators, forms and an AI assistant.

---

## Prompt 2

Help me design a professional React project structure for AutoElite.

I want reusable components such as:

- Sidebar
- Topbar
- AppLayout
- KPI cards
- Vehicle cards
- Toast notifications
- AI chatbot

I also want separate page components for the dealership modules.

Give me a clean and scalable folder structure.

---

# 2. Frontend Development

## Prompt 3

Develop a professional AppLayout.jsx for AutoElite using React Router,
Sidebar and Topbar.

The layout should:

- Support responsive navigation
- Support mobile sidebar opening
- Keep the sidebar fixed on desktop
- Provide a responsive main content area
- Use a dark dealership intelligence theme
- Render page content using Outlet

---

## Prompt 4

Help me create a professional responsive Sidebar component for AutoElite.

The sidebar should contain navigation for:

Dashboard
Inventory
Vehicles
Leads
Customers
Appointments
Test Drives
Sales
Purchases
Analytics
AI Insights
Reports
Settings

Use icons and a professional dark UI.

---

## Prompt 5

Help me improve the AutoElite dashboard UI.

The dashboard should display dealership KPIs and operational information
in a professional way.

Include:

- KPI cards
- Inventory statistics
- Sales information
- Customer information
- Leads
- Appointments
- Recent activity
- Responsive layout

---

## Prompt 6

Create a professional vehicle card component for a dealership application.

The card should show:

- Vehicle image
- Vehicle name
- Brand
- Model
- Year
- Price
- Inventory status
- CTA/action button

The design should match a modern dark dealership dashboard.

---

# 3. Login & Authentication UI

## Prompt 7

Create a professional Login.jsx page for AutoElite.

The login page should have:

- AutoElite branding
- Dealership intelligence messaging
- Email field
- Password field
- Remember me
- Forgot password
- Login button
- Demo access
- Professional dark theme
- Responsive layout

The page should look polished enough for a professional software
demonstration.

---

## Prompt 8

Create complete CSS styling for the AutoElite login page.

The design should be:

- Modern
- Professional
- Responsive
- Dark
- Dealership-focused
- Suitable for a production-style dashboard

Use attractive gradients, cards, spacing, typography and subtle
animations without making the UI excessive.

---

# 4. Dashboard & Dealership Modules

## Prompt 9

Help me build the Inventory page for AutoElite.

It should allow users to view vehicles and their inventory status.

Include:

- Search
- Filtering
- Vehicle cards/table
- Availability status
- Pricing
- Vehicle information
- Action buttons

---

## Prompt 10

Help me design Customers.jsx for AutoElite.

The page should provide a professional customer-management interface with:

- Customer list
- Search
- Filters
- Customer details
- Contact information
- Status
- Actions

---

## Prompt 11

Help me design Leads.jsx for AutoElite.

Include:

- Lead list
- Lead status
- Customer information
- Vehicle interest
- Follow-up information
- Search/filtering
- Professional dashboard UI

---

## Prompt 12

Help me design the Sales and Purchases pages for a dealership management
platform.

The UI should support dealership workflows while remaining suitable for a
frontend demonstration using mock data.

---

# 5. AI Chatbot

## Prompt 13

I want to add an AI chatbot at the bottom of the AutoElite application.

The chatbot should appear as a floating AI icon in the bottom-right corner.

When clicked, it should open a professional chat panel.

The chatbot should be branded:

AutoElite AI
AI Dealership Copilot

It should have:

- AI icon
- Chat header
- Message history
- User messages
- AI messages
- Text input
- Send button
- Clear chat
- Close button
- Responsive design

---

## Prompt 14

Create AIChatbot.jsx for AutoElite.

The chatbot should initially work with predefined responses so that the
frontend can be demonstrated without depending on an external AI service.

The predefined responses should be related to:

- Inventory
- Sales
- Customers
- Vehicles
- Dealership performance
- Appointments
- Leads

Make the component easy to connect to a FastAPI backend later.

---

## Prompt 15

Create AIChatbot.css with a polished professional design.

The chatbot should look similar to a modern enterprise AI assistant.

Use:

- Dark background
- Cyan/blue/purple accent gradients
- Rounded cards
- Floating chatbot button
- Message bubbles
- Responsive sizing
- Smooth transitions
- Professional typography

The chatbot should remain usable on desktop and mobile.

---

## Prompt 16

Add the AutoElite AI chatbot to AppLayout.jsx so that it is available
throughout the application.

The chatbot should appear above the application content and remain
accessible while navigating between dashboard pages.

---

# 6. Backend & FastAPI

## Prompt 17

I do not currently have a backend for my AutoElite AI chatbot.

Help me create a FastAPI backend using Python.

The backend should expose an endpoint that accepts a user chat message
and returns an AI response.

Use Pydantic for request validation.

Structure it so that the React frontend can call it using fetch.

---

## Prompt 18

Create a complete main.py for AutoElite using FastAPI.

The backend should:

- Create the FastAPI application
- Enable CORS
- Provide a health endpoint
- Provide a chatbot endpoint
- Validate incoming requests
- Return JSON responses
- Be runnable using Uvicorn

---

## Prompt 19

Help me connect my React AIChatbot.jsx component to the FastAPI backend.

The frontend should send a POST request containing the user's message and
display the returned response.

Also handle backend errors gracefully.

---

## Prompt 20

Help me configure environment variables for an AI backend.

I want to keep API keys outside the source code using a .env file.

Explain how python-dotenv can be used and how .env should be excluded
from GitHub.

---

# 7. AI Concepts

## Prompt 21

Explain RAG completely in simple terms.

Explain:

- Retrieval-Augmented Generation
- Documents
- Chunks
- Tokens
- Embeddings
- Vector databases
- Similarity search
- Retrieval
- Context
- LLM generation

Use an AutoElite dealership example.

---

## Prompt 22

Explain chunks, tokens and embeddings using a dealership inventory
example.

Show how a user question about vehicles could be converted into an
embedding and matched against stored dealership information.

---

## Prompt 23

Explain vector databases and ChromaDB.

Explain how they could be used in AutoElite for a future AI chatbot.

Also explain the difference between a normal SQL database and a vector
database.

---

# 8. Debugging & Error Resolution

## Prompt 24

I am getting a Vite error:

Failed to resolve import "./Login.css" from "src/pages/Login.jsx".

Explain why this happens and how to fix the file path/import correctly.

---

## Prompt 25

My Vercel deployment is failing with:

Could not resolve "./styles/index.css" from "src/main.jsx".

Help me diagnose the problem based on the project folder structure.

---

## Prompt 26

My Vercel deployment is failing with:

Could not resolve "../data/mockData" from "src/pages/Dashboard.jsx".

My project currently has mockData.js under src.

Explain the correct import path.

---

## Prompt 27

Vercel is showing:

@import must precede all other statements.

My CSS contains Tailwind directives and a Google Fonts @import.

Explain the correct order of the CSS statements.

---

## Prompt 28

My FastAPI server shows:

Error loading ASGI app.
Could not import module "main".

Explain what this means and how to check whether main.py exists
in the correct directory.

---

# 9. Deployment

## Prompt 29

I have a React + Vite project in GitHub.

Explain step by step how to deploy the frontend publicly using Vercel.

Assume I am a beginner and do not know Git or Vercel deployment.

---

## Prompt 30

My AutoElite project is hosted in GitHub.

I want a public production URL that anyone can open.

Explain how to connect the GitHub repository to Vercel and deploy the
React/Vite frontend.

---

## Prompt 31

My Vercel deployment successfully builds the frontend.

The production URL should be:

https://auto-elite-upfs.vercel.app/

Explain how to verify that the production deployment is working.

---

# 10. Documentation

## Prompt 32

Help me create a professional README.md for AutoElite.

The README should include:

- Project title
- Project overview
- Live application
- Public GitHub repository
- Demo access
- Features
- Technology stack
- Project structure
- Local setup
- Frontend setup
- Backend setup
- Environment variables
- Screenshots
- AI Usage
- Testing
- Deployment
- Security notes
- Future improvements
- Author

The README should be attractive and easy for an evaluator to understand.

---

## Prompt 33

Improve the README so that an evaluator can immediately see the live
application and repository links at the top.

Make the project documentation professional and suitable for a technical
assessment.

---

# 11. Testing

## Prompt 34

Help me prepare a professional test report for AutoElite.

The report should cover:

- Login
- Demo access
- Navigation
- Dashboard
- Inventory
- Vehicles
- Leads
- Customers
- Appointments
- Test Drives
- Sales
- Purchases
- Analytics
- AI Insights
- Reports
- Settings
- AI chatbot
- Responsive UI

Include columns for:

Test ID
Feature
Test Case
Expected Result
Actual Result
Status

Do not claim a test passed unless it has actually been tested.

---

## Prompt 35

Explain how to perform a final manual testing pass on a React/Vite
dealership application before submitting it for evaluation.

Include UI testing, navigation testing, responsive testing, error
handling, deployment testing and documentation verification.

---

# 12. AI Usage Declaration

## Prompt 36

Help me document responsible AI usage for the AutoElite project.

AI assistance was used for:

- Architecture discussions
- React component guidance
- UI/UX ideas
- FastAPI setup
- Chatbot integration
- Debugging
- Deployment troubleshooting
- Documentation
- Testing guidance
- Understanding RAG and vector databases

The documentation should clearly state that AI was used as a development
assistant and that the developer reviewed and adapted the resulting
implementation.

---

# AI Usage Statement

AI tools were used during the development of AutoElite as an engineering
and learning assistant.

The assistance included:

- Understanding technical concepts
- Discussing application architecture
- Generating implementation suggestions
- Debugging development and deployment errors
- Improving UI/UX
- Structuring documentation
- Preparing testing checklists
- Understanding AI chatbot architecture

AI output was not treated as an unquestioned final implementation.
Suggestions were reviewed, adapted, integrated and tested during project
development.

The final project was assembled and configured for the AutoElite
dealership use case by the developer.

---

# Important Note

This file is intended to document the AI-assisted development process.

Where the assessment requires completely raw and unedited AI conversation
logs, the corresponding original conversations or public conversation
links should be provided without modification.

No claim is made here that this document itself is a complete transcript
of every AI conversation used during development.

---

# Project Links

## Live Application

https://auto-elite-upfs.vercel.app/

## Public GitHub Repository

https://github.com/Harshitha-Medipelly/AutoElite

---

# End of PROMPTS.md
