# Travel Lust

## Overview
Travel Lust is a travel destination web app with a Node.js backend (Express, SQLite) and a static HTML/CSS/JS frontend.

## Installation
1. Install backend dependencies:
	 ```sh
	 npm install
	 ```
2. Create a `.env` file in the root directory with:
	 ```env
	 JWT_SECRET=your_jwt_secret_here
	 ADMIN_EMAIL=admin@email.com
	 ```

## Backend (Node.js)
- Entry point: `server.js`
- Start the server:
	```sh
	node server.js
	```
- Uses SQLite database (`wanderlust.db`). Tables are auto-created on first run.
- Email sending requires configuration in `mailer.js` and templates in `emailTemplates.js`.

## API Endpoints

### Auth
- `POST /api/login` — Login with `{ identifier, password }` (identifier = email or phone). Returns JWT token.
- `POST /api/signup` — Register new user `{ name, email, phone, password }`. Returns JWT token.

### Feedback
- `POST /api/feedback` — Submit feedback `{ userId?, name?, contact?, type?, message?, rating?, share? }`. Sends thank you email and notifies admin.

### Bookings
- `POST /api/bookings` — Create booking (JWT required) `{ destination, startDate?, endDate?, travelers?, notes? }`.

### Profile
- `GET /api/profile/:userId` — Get user profile, feedback, and bookings (JWT required; user or admin only).

### Admin Endpoints (JWT admin only)
- `GET /api/admin/users` — List all users
- `GET /api/admin/feedback` — List all feedback
- `GET /api/admin/bookings` — List all bookings
- `PATCH /api/admin/bookings/:id` — Update booking status `{ status }` (sends email to user)
- `PATCH /api/admin/feedback/:id` — Update feedback status `{ status }`

## Authentication
- All protected endpoints require `Authorization: Bearer <token>` header.
- Admin role is assigned to the email in `ADMIN_EMAIL`.

## Environment Variables
- `JWT_SECRET` — Secret for JWT signing
- `ADMIN_EMAIL` — Admin email for notifications and admin access

## Database
- SQLite file: `wanderlust.db` (auto-created)
- Tables: `users`, `feedback`, `bookings`

## Email
- Outgoing emails use configuration in `mailer.js` and templates in `emailTemplates.js`.
- Emails sent for signup, feedback, booking creation, and status changes.

## Frontend
- All HTML, CSS, and JS files are in the `frontend/` folder.
- Open `frontend/index.html` in your browser to view the homepage.
- Other destination pages (e.g., `goa.html`, `kashmir.html`) can be accessed directly or via navigation links.

## Folder Structure
- `server.js` — Node.js backend server
- `frontend/` — Static frontend files
- `package.json` — Project dependencies
- `mailer.js` — Email sending logic
- `emailTemplates.js` — Email templates

## Quick Start
1. Install dependencies
2. Add `.env` file
3. Run the backend server
4. Open the frontend in your browser
