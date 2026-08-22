# TDD — Red-Green-Refactor

## Overview

The AutoElite project follows a test-driven development approach for
backend functionality. Tests were designed around the expected behavior
of the REST API and inventory operations.

The main areas covered by the tests are:

- User registration
- User authentication
- Vehicle creation
- Vehicle retrieval
- Vehicle search
- Vehicle update
- Vehicle deletion
- Vehicle purchase
- Vehicle restocking
- Authentication and authorization
- Inventory validation
- Invalid input and error cases

---

## Red — Write the Test

For each important backend behavior, the expected behavior was first
identified and represented through automated tests.

Examples include:

- A user should be able to register successfully.
- Duplicate registration should be rejected.
- Valid users should be able to log in.
- Unauthorized users should not access protected endpoints.
- Administrators should be able to add, update, delete, and restock vehicles.
- Purchasing a vehicle should decrease its stock quantity.
- A vehicle with zero stock should not be purchasable.
- Invalid inventory quantities should be rejected.

The purpose of this stage was to define the expected behavior before
considering the implementation details.

---

## Green — Implement the Functionality

The backend functionality was then implemented to satisfy the expected
behavior defined by the tests.

This included:

- FastAPI REST endpoints
- MySQL database operations
- JWT authentication
- Role-based authorization
- Vehicle CRUD operations
- Vehicle search
- Purchase functionality
- Restocking functionality
- Input validation
- Error handling

The automated test suite was executed after implementation to verify
that the expected behavior was satisfied.

---

## Refactor — Improve the Implementation

After functionality was working, the implementation was reviewed for:

- Code duplication
- Naming
- Separation of responsibilities
- Validation
- Error handling
- Authentication and authorization
- Maintainability
- API consistency

Refactoring was performed while preserving the existing behavior verified
by the automated tests.

---

## Important Test Cases

### Authentication

- Successful registration
- Duplicate email registration
- Successful login
- Invalid login credentials
- Protected endpoint without authentication
- Protected endpoint with invalid authentication

### Vehicle Management

- Create vehicle
- Retrieve all vehicles
- Search by make
- Search by model
- Search by category
- Search by price range
- Update vehicle
- Delete vehicle
- Invalid vehicle ID

### Inventory

- Purchase vehicle with available stock
- Purchase vehicle when stock is zero
- Purchase nonexistent vehicle
- Restock vehicle
- Invalid restock quantity
- Unauthorized restocking
- Non-admin attempting an admin operation

---

## Test Execution

The backend test suite can be executed using the project's configured
test command.

Example:

```bash
pytest
