# AI Usage & Prompt Log

## Project: AutoElite — Car Dealership Inventory System

This document records how AI tools were used during the development of the
AutoElite Car Dealership Inventory System.

AI was used as a development assistant for planning, understanding technical
concepts, generating initial implementation ideas, debugging, reviewing code,
improving UI/UX, writing tests, and preparing project documentation.

The final implementation was reviewed, modified, tested, and integrated by me.

> Note: This document is a reconstructed record of the prompts and AI-assisted
> development workflow used during the project. It is not intended to represent
> an unedited export of a historical chat transcript.

---

# 1. Understanding the Assessment

### Prompt

I have an assessment for a TDD Kata: Car Dealership Inventory System.

The requirements are:

- Build a RESTful backend API.
- Use a proper database such as MySQL/PostgreSQL/MongoDB/SQLite.
- Implement user registration and login.
- Use JWT authentication.
- Implement vehicle CRUD operations.
- Implement vehicle search by make, model, category, and price range.
- Implement vehicle purchase functionality that decreases inventory quantity.
- Implement vehicle restocking functionality that increases inventory quantity.
- Admin-only operations should be protected.
- Build a React single-page application.
- Provide registration and login forms.
- Display available vehicles.
- Implement search and filtering.
- Disable the Purchase button when quantity is zero.
- Provide admin UI for adding, updating, and deleting vehicles.
- Follow TDD.
- Write clean and maintainable code.
- Use Git with meaningful commits.
- Document AI usage in the repository.
- Provide screenshots and a test report.

Please help me understand the requirements and break the project into
manageable development stages without skipping any mandatory requirement.

### AI Assistance

AI was used to analyze the assessment and divide the work into backend,
database, authentication, testing, frontend, documentation, and final
verification stages.

---

# 2. Project Architecture

### Prompt

I want to build this car dealership inventory system as a full-stack project.

I am planning to use:

- FastAPI for the backend
- MySQL for the database
- React for the frontend
- JWT for authentication

Help me design a clean project structure that separates the backend,
frontend, database models, authentication, API routes, services, tests,
and frontend components.

Please keep the architecture understandable for a fresher while following
good software engineering practices.

### AI Assistance

AI suggested a modular project structure and explained how the backend,
frontend, database, authentication, and tests should communicate with each
other.

I used the suggestions as a starting point and adapted the structure to the
actual project.

---

# 3. Database Design

### Prompt

Design a MySQL database for a car dealership inventory system.

Each vehicle must have:

- unique ID
- make
- model
- category
- price
- quantity in stock

Users must have:

- unique ID
- name
- email
- password
- role

I also need to support registration, login, vehicle CRUD, purchasing,
restocking, and admin authorization.

Suggest suitable tables, columns, relationships, constraints, and indexes.

### AI Assistance

AI helped design the database schema and explained how users, roles, and
vehicles could be represented in MySQL.

The final database structure was reviewed and adapted to the application.

---

# 4. Backend API Planning

### Prompt

Help me design the REST API for the AutoElite car dealership inventory system.

Required endpoints include:

POST /api/auth/register
POST /api/auth/login

Protected vehicle endpoints:

POST /api/vehicles
GET /api/vehicles
GET /api/vehicles/search
PUT /api/vehicles/{id}
DELETE /api/vehicles/{id}

Inventory operations:

POST /api/vehicles/{id}/purchase
POST /api/vehicles/{id}/restock

Explain which endpoints should require authentication and which operations
should be restricted to administrators.

Also explain appropriate HTTP status codes and validation behavior.

### AI Assistance

AI helped map the assessment requirements to REST endpoints, authentication
requirements, authorization rules, validation, and HTTP status codes.

---

# 5. Authentication and JWT

### Prompt

I need secure authentication for my FastAPI application.

Users should be able to register and log in. After login, the backend should
return a JWT token. Protected endpoints should require a valid token.

Administrators should have additional permissions to add, update, delete,
and restock vehicles.

Please explain how JWT authentication should work in FastAPI and how to
separate authentication from authorization.

Also explain password hashing and why passwords should never be stored as
plain text.

### AI Assistance

AI explained JWT authentication, password hashing, bearer tokens,
authentication dependencies, and role-based authorization.

I used this explanation to implement the authentication flow and adapt it
to the project's requirements.

---

# 6. Backend Implementation

### Prompt

Help me implement the FastAPI backend for the car dealership inventory
system using MySQL.

I need:

1. Database connection
2. User registration
3. User login
4. Password hashing
5. JWT generation
6. JWT verification
7. Vehicle CRUD
8. Vehicle search
9. Purchase
10. Restock
11. Admin authorization
12. Input validation
13. Proper error handling

Please keep the implementation modular and explain the important parts rather
than putting everything into one large file.

### AI Assistance

AI provided implementation guidance and example patterns for FastAPI,
database operations, Pydantic validation, authentication, and error handling.

The generated suggestions were reviewed and integrated into the application.

---

# 7. Vehicle Search

### Prompt

I need a vehicle search API that can search vehicles by:

- make
- model
- category
- minimum price
- maximum price

The search parameters should be optional so that users can combine filters.

For example:

/api/vehicles/search?make=Toyota
/api/vehicles/search?category=SUV
/api/vehicles/search?min_price=500000&max_price=1500000

Please suggest a clean implementation and validation approach.

### AI Assistance

AI helped design the optional search parameters and query filtering logic.

---

# 8. Purchase Functionality

### Prompt

Implement the purchase logic for a vehicle inventory system.

When a customer purchases a vehicle:

- the vehicle must exist
- quantity must be greater than zero
- quantity should decrease by one
- purchasing should fail when quantity is zero
- the API should return an appropriate error response

Please explain how to avoid accidentally allowing negative inventory.

### AI Assistance

AI helped reason through the inventory validation and edge cases, especially
the zero-stock condition and preventing negative quantities.

---

# 9. Restock Functionality

### Prompt

Implement vehicle restocking.

Only an authenticated administrator should be allowed to restock a vehicle.

The endpoint should:

- verify the user
- verify administrator privileges
- verify that the vehicle exists
- validate the restock quantity
- increase the existing inventory quantity

Explain the important validation and authorization checks.

### AI Assistance

AI helped design the admin authorization and inventory update logic.

---

# 10. Test-Driven Development

### Prompt

This assessment specifically requires TDD.

Help me create meaningful backend tests before or alongside implementation.

I need tests for:

- user registration
- duplicate registration
- login
- invalid login
- vehicle creation
- retrieving vehicles
- vehicle search
- updating a vehicle
- deleting a vehicle
- purchasing a vehicle
- purchasing when quantity is zero
- restocking
- unauthorized access
- admin-only access
- invalid vehicle IDs
- invalid input

Please organize the tests clearly and explain how they demonstrate the
Red-Green-Refactor process.

### AI Assistance

AI helped identify important test cases and edge cases.

The tests were used to verify API behavior and identify implementation
problems.

The test suite was then refined as the backend implementation evolved.

---

# 11. Debugging Backend Errors

### Prompt

I am getting an error while running my FastAPI backend.

Here is the error:

[Actual error/output was provided during development.]

Please identify the likely cause, explain why it happens, and give me a
minimal fix. Do not change unrelated parts of the project.

### AI Assistance

AI was used as a debugging assistant to interpret error messages, identify
likely causes, and suggest targeted fixes.

I verified the fixes locally instead of blindly applying generated code.

---

# 12. React Frontend Planning

### Prompt

Now I need to build the frontend for the car dealership inventory system.

Use React and create a modern single-page application.

The application should contain:

- Login
- Registration
- Dashboard
- Vehicle listing
- Search and filters
- Vehicle details
- Purchase button
- Admin vehicle management
- Add vehicle
- Edit vehicle
- Delete vehicle
- Restock vehicle
- Logout

The interface should be responsive, professional, and visually appealing.

Suggest a component structure and page structure.

### AI Assistance

AI helped plan the React component hierarchy, page organization, API
communication, authentication state, and UI states.

---

# 13. AutoElite UI/UX

### Prompt

I want the frontend to look like a professional modern dealership management
platform rather than a basic CRUD application.

The product name is AutoElite.

Create a dark dashboard-style interface with:

- professional sidebar navigation
- dealership branding
- vehicle cards
- dashboard statistics
- search and filtering
- modern buttons
- responsive layouts
- consistent spacing
- clear typography
- success/error states
- admin controls
- professional settings screens

The design should feel suitable for a real dealership management product.

### AI Assistance

AI helped brainstorm visual hierarchy, dashboard layouts, component styling,
empty states, buttons, cards, navigation, and responsive UI patterns.

The final UI was adjusted according to the actual application.

---

# 14. Vehicle Dashboard

### Prompt

Design the main AutoElite vehicle dashboard.

It should allow users to:

- view available vehicles
- search vehicles
- filter vehicles
- see price
- see category
- see stock quantity
- purchase a vehicle
- clearly identify unavailable vehicles

The Purchase button must be disabled when stock quantity is zero.

For administrators, provide controls for managing inventory.

### AI Assistance

AI helped structure the dashboard and identify the UI states required by the
assessment.

---

# 15. Frontend and Backend Integration

### Prompt

I have a React frontend and FastAPI backend.

Help me connect them using REST API calls.

I need to:

- register a user
- log in
- store the JWT
- send the JWT with protected requests
- retrieve vehicles
- search vehicles
- purchase vehicles
- perform admin operations
- handle API errors
- show loading states
- refresh inventory after a purchase

Please explain the request/response flow.

### AI Assistance

AI helped explain how the frontend communicates with the backend and how
authentication tokens are passed with protected requests.

---

# 16. Authentication UI

### Prompt

Help me create a professional login and registration experience for AutoElite.

The login form should handle:

- email
- password
- validation
- incorrect credentials
- successful authentication
- loading state

Registration should handle:

- name
- email
- password
- confirmation/validation where applicable
- duplicate email
- successful registration
- error messages

After successful login, the user should be taken to the dashboard.

### AI Assistance

AI helped improve form validation, error handling, loading states, and
navigation behavior.

---

# 17. Admin Features

### Prompt

The assessment requires admin users to be able to add, update, delete, and
restock vehicles.

Design an admin experience that is clearly separated from normal customer
operations.

The frontend should not show admin controls to normal users, while the
backend must still enforce authorization independently.

Explain why frontend hiding alone is not sufficient for security.

### AI Assistance

AI explained the difference between UI-level role visibility and actual
backend authorization.

This helped ensure that authorization is enforced at the API level rather
than relying only on the React interface.

---

# 18. Inventory Edge Cases

### Prompt

Review the inventory functionality and identify edge cases.

Consider:

- purchase with quantity 0
- purchase with quantity 1
- purchase with invalid vehicle ID
- restock with zero quantity
- restock with negative quantity
- unauthorized restock
- non-admin restock
- deleting a nonexistent vehicle
- updating a nonexistent vehicle
- invalid price
- invalid vehicle data

Suggest appropriate validation and error responses.

### AI Assistance

AI was used to identify additional edge cases that should be covered by
validation and tests.

---

# 19. Code Review

### Prompt

Review my AutoElite backend/frontend implementation as if you were a
technical interviewer.

Look for:

- unnecessary duplication
- poor naming
- security problems
- authentication issues
- authorization issues
- database problems
- incorrect API behavior
- poor error handling
- missing validation
- maintainability issues
- unnecessary complexity

Do not rewrite everything. Identify concrete issues and explain what should
be improved.

### AI Assistance

AI was used as a code-review assistant to identify possible implementation
and maintainability issues.

I evaluated the suggestions and made relevant changes manually.

---

# 20. Testing and Final Verification

### Prompt

I am close to completing my AutoElite assessment.

Create a final verification checklist based strictly on the assessment.

Verify:

Backend:
- REST APIs
- MySQL
- registration
- login
- JWT
- protected endpoints
- vehicle CRUD
- search
- purchase
- restock
- admin authorization

Frontend:
- React SPA
- login
- registration
- dashboard
- search/filter
- vehicle display
- purchase
- zero-stock disabled state
- admin UI
- responsive design

Engineering:
- TDD
- tests
- Git
- clean code
- README
- AI usage
- screenshots
- test report
- PROMPTS.md

### AI Assistance

AI helped create a final requirements checklist so that the implementation
could be reviewed against the assessment before submission.

---

# 21. README Preparation

### Prompt

Help me prepare a professional README for the AutoElite project.

It should include:

1. Project overview
2. Features
3. Technology stack
4. Architecture
5. Database setup
6. Backend setup
7. Frontend setup
8. Environment variables
9. How to run the application
10. API information
11. Testing instructions
12. Screenshots
13. AI Usage section
14. Project limitations/future improvements

Do not claim features that are not actually implemented.

### AI Assistance

AI helped organize the README and identify the documentation sections needed
for a professional repository.

The README was reviewed against the actual project.

---

# 22. AI Usage Documentation

### Prompt

The assessment requires transparent AI usage documentation.

Help me write a professional "My AI Usage" section explaining:

- which AI tools were used
- what they were used for
- how they helped during development
- how I validated generated suggestions
- what I learned from using AI
- how I ensured that I remained responsible for the final implementation

Do not exaggerate the role of AI.

### AI Assistance

AI helped structure the AI Usage documentation and explain responsible AI
assistance during software development.

---

# 23. Git and AI Co-Authorship

### Prompt

The assessment requires AI co-authorship information for commits where AI
was used.

Explain how to format Git commit messages according to the assessment's
required format.

Also explain how to avoid claiming AI assistance for work where AI was not
used.

### AI Assistance

AI explained how AI co-authored commit messages should be documented and
helped ensure that the repository documentation acknowledges AI assistance
appropriately.

---

# 24. Screenshot Documentation

### Prompt

I need to submit screenshots of the final application.

Help me determine which screens are useful to demonstrate the completed
AutoElite application.

The screenshots should demonstrate the important functionality and the
professional UI.

Include relevant screens such as:

- Login
- Registration
- Dashboard
- Vehicle inventory
- Search/filter
- Purchase
- Admin management
- Settings
- Notifications
- Team & Access
- Security
- Integrations
- Data & Privacy

### AI Assistance

AI helped identify screenshots that provide good visual coverage of the
completed application.

The final screenshots were captured from the implemented application.

---

# 25. Final Submission Review

### Prompt

I am preparing to submit the AutoElite Car Dealership Inventory System
assessment.

Review the assessment requirements and give me a final submission checklist.

Pay special attention to:

- required files
- backend APIs
- database
- authentication
- authorization
- frontend functionality
- tests
- TDD evidence
- Git history
- README
- screenshots
- PROMPTS.md
- AI usage disclosure
- secrets/API keys
- repository structure

I want to avoid missing any mandatory deliverable.

### AI Assistance

AI was used as a final checklist and review assistant before submission.

---

# 26. Reflection on AI Usage

AI significantly helped accelerate the development workflow, especially in
areas where I needed to understand unfamiliar concepts, debug errors, think
through edge cases, and improve the structure of the application.

The most useful areas were:

- understanding REST API design
- authentication and JWT concepts
- database design
- test-case planning
- debugging
- React component organization
- UI/UX improvements
- validation and edge-case analysis
- documentation

AI was not treated as a replacement for understanding the code.

When AI suggested code or an approach, I reviewed it, adapted it to my
application, ran it locally, and tested the resulting behavior.

The development process also helped me understand that AI-generated code can
contain assumptions or mistakes. Therefore, generated suggestions had to be
checked against the assessment requirements and actual application behavior.

AI was most valuable as a development assistant, reviewer, explainer, and
debugging partner.

---

# 27. Final Statement

I used AI tools as part of my software development workflow while retaining
responsibility for the final implementation, integration, testing, and
submission.

The purpose of using AI was to improve development speed and learning while
still understanding the functionality and decisions implemented in the
project.
