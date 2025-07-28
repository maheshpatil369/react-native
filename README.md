# 📱 **Offline Data Management Mobile App**

A **Flutter-based mobile application** designed to manage and access work bundles efficiently, even in offline mode.  
The app ensures **secure login**, **work assignment**, **data synchronization**, and **offline search** capabilities.

---

## 🚀 **Features**
- 🔐 **Secure Login** with session token management
- 🗂️ **Assign Work Bundles** dynamically based on district & taluka selection
- 🔄 **Sync Data** to local device storage (SQLite) for offline access
- 🔍 **Offline Search** to retrieve records without internet
- 📲 **User-friendly UI** optimized for mobile field use

---

## 🏗️ **Workflow**

### ✅ **Step 1: Login**  
![Login Screen](https://github.com/user-attachments/assets/e0b38dd9-00ba-4702-b8f7-6571c50a7b0d)  

1. User opens the app and sees the **Login Screen**.  
2. Enters **Email** and **Password**, taps **Login**.  
3. App verifies credentials with the backend.  
4. Upon success, session token is saved, and user is redirected to the **Home Screen**.  
5. User stays logged in until they log out manually.

---

### ✅ **Step 2: Assign Work Bundles**  
![Home Screen](https://github.com/user-attachments/assets/d614d89d-dc0d-4170-8ec8-ef7946740251)  

1. On the **Home Dashboard**, user selects **District** from dropdown.  
2. Relevant **Talukas** are fetched dynamically and shown in second dropdown.  
3. User selects a Taluka and taps **Assign Bundle**.  
4. App sends this information to the backend, assigning the selected bundle.  
5. User can repeat the process to assign multiple bundles.

---

### ✅ **Step 3: Sync Data to Device**  
![Data Management](https://github.com/user-attachments/assets/51ce549c-b263-4f55-9c05-c9d477c8fbb3)  

1. User navigates to **Data Management** from the drawer menu.  
2. List of all assigned bundles is displayed.  
3. For each bundle, user taps **Sync to Device**.  
4. App downloads all records from backend and stores them into **SQLite (local storage)**.  
5. UI updates showing the number of records saved locally (e.g., *250 records on device*).

---

## 🌐 **Phase 2: Offline Field Work**

When internet is unavailable, the app continues to work seamlessly.

---

### ✅ **Step 4: Access & Search Data Offline**  
![Offline Search](https://github.com/user-attachments/assets/f07b01f1-f5f3-40f7-a032-c5a44c1c00a4)  

1. User opens the app (still logged in from previous session).  
2. Goes to **Data Management Screen**.  
3. Uses the **Search Bar** to type a person's Unique ID.  
4. App queries the local SQLite database (no internet required).  
5. Search results appear instantly, displaying the record details.

---

## 📂 **Additional Resources**
- 📄 [Processed Records – Chhatrapati Sambhajinagar (Excel)](https://github.com/user-attachments/files/21467645/chhatrapati-sambhajinagar-processed-records-2025-07-26.xlsx)

---

## 🛠️ **Tech Stack**
- **Flutter** – Cross-platform mobile app development  
- **Provider** – State management  
- **SQLite** – Local database for offline mode  
- **REST API** – Backend communication  

---

## 🏆 **Key Highlights**
- ✅ Fully **offline-capable**  
- ✅ **Fast local search**  
- ✅ **Secure authentication**  
- ✅ Designed for **field use with unstable internet**

---

## 📄 **License**
This project is private and for official use only.




**Backend ki readme** 
# Data Management Backend

This is the secure, centralized backend server for the Data Management and Processing application. It is built with Node.js, Express, and TypeScript, and it communicates with a Firebase Realtime Database. This server handles all business logic, data processing, and security for both the Admin Web Panel and the User Mobile App.

---

## Features

- **Secure Authentication:** All endpoints are protected, with specific routes restricted to Admin users.
- **User Management:** Complete CRUD (Create, Read, Update, Delete) functionality for user profiles.
- **Data Pipeline:** Manages the entire data workflow, from Excel file uploads to processing and final export.
- **Atomic Operations:** Uses database transactions for critical operations like bundle assignment to prevent race conditions and ensure data integrity.
- **Offline-First Support:** Provides dedicated endpoints for mobile clients to download assigned data and sync processed records in batches.
- **Comprehensive Analytics:** Powerful data aggregation endpoints to provide detailed statistics for the admin dashboard and analytics pages.
- **Configuration Management:** Serves configuration data (like locations and talukas) from the database.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Firebase Realtime Database
- **Authentication:** Firebase Authentication
- **File Handling:**
  - `multer` for receiving file uploads.
  - `exceljs` for parsing and generating `.xlsx` files.

---

## Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- npm
- A Firebase project with the Realtime Database and Authentication enabled.

### 1\. Install Dependencies

```bash
npm install
```

### 2\. Configure Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the following values:

| Variable                        | Description                                                                             | Example                                               |
| :------------------------------ | :-------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `PORT`                          | The port the server will run on.                                                        | `8000`                                                |
| `CORS_ORIGIN`                   | The URL of the frontend application (for local development).                            | `http://localhost:3000`                               |
| `FIREBASE_DATABASE_URL`         | The URL of your Firebase Realtime Database.                                             | `https://your-project-id-default-rtdb.firebaseio.com` |
| `ADMIN_UID`                     | The unique Firebase Auth UID of the single Admin user.                                  | `aBcDeFg123hIjKlMnOpQrStUvWxYz`                       |
| `FIREBASE_WEB_API_KEY`          | The Web API Key from your Firebase project settings.                                    | `AIzaSy...`                                           |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | The entire content of your Firebase service account JSON file, pasted on a single line. | `'{"type": "service_account", ...}'`                  |

### 4\. Available Scripts

- **Run the development server:**

  ```bash
  npm run dev
  ```

  The server will run on the port specified in your `.env` file and automatically restart when you save changes.

- **Build for production:**

  ```bash
  npm run build
  ```

  This compiles your TypeScript code into JavaScript in the `/dist` directory.

- **Run the production server:**

  ```bash
  npm run start
  ```

- **Generate an auth token for testing:**

  ```bash
  npm run get-token
  ```

  This script generates a valid ID token for the `ADMIN_UID` specified in your `.env` file, which you can use for testing protected endpoints.

---

## API Endpoint Documentation

All requests must include the `Authorization: Bearer <ID_TOKEN>` header for protected routes.

### Auth Routes

`Base Path: /api/auth`

| Method & Endpoint | Protection | Description                                                                                                                                                          |
| :---------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /login`     | Admin      | **Re-authentication.** Verifies the admin's password. Used to confirm sensitive "Danger Zone" actions. **Body:** `{ "email": "admin@email.com", "password": "..." }` |

### User Management Routes

`Base Path: /api/users`

| Method & Endpoint | Protection | Description                                                                                                                                                     |
| :---------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /`           | Admin      | Retrieves a list of all user profiles.                                                                                                                          |
| `POST /`          | Admin      | Creates a new user. **Body:** `{ "name": "...", "username": "...", "mobile": "...", "location": "...", "role": "User", "password": "...", "excelFile": "..." }` |
| `PUT /:id`        | Admin      | Updates a user's profile. **Body:** `{ "name": "...", "location": "..." }`                                                                                      |
| `DELETE /:id`     | Admin      | Deletes a user from Auth and the database.                                                                                                                      |

### Data & Workflow Routes

`Base Path: /api/data`

| Method & Endpoint              | Protection | Description                                                                                                                                                        |
| :----------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /config`                  | Public     | Retrieves public configuration data (locations, talukas).                                                                                                          |
| `POST /upload/:location`       | Admin      | Uploads an Excel file for a specific location. **Body:** `form-data` with key `file`.                                                                              |
| `GET /files/:location`         | Admin      | Lists all uploaded Excel files for a location.                                                                                                                     |
| `GET /files/:location/:fileId` | Admin      | Retrieves the details of a single uploaded file.                                                                                                                   |
| `POST /bundles/assign`         | User       | Assigns a new work bundle to the authenticated user. **Body:** `{ "taluka": "..." }`                                                                               |
| `POST /records/sync`           | User       | **Syncs a batch of processed records** from the user's device to the server. **Body:** `{ "taluka": "...", "bundleNo": 1, "sourceFile": "...", "records": [...] }` |
| `POST /bundles/complete`       | User       | Marks the user's active bundle as complete. **Body:** `{ "taluka": "..." }`                                                                                        |
| `GET /bundles/active`          | User       | Retrieves the user's currently active bundle, including total record count.                                                                                        |
| `GET /assigned-file`           | User       | **"Sync to Device."** Downloads the content of the user's assigned raw data file.                                                                                  |
| `GET /records/search`          | User       | Searches for a single raw record in the user's assigned file. **Query Param:** `?searchId=...`                                                                     |
| `GET /records/next-unique-id`  | User       | Generates and returns the next available unique ID for a record. **Query Param:** `?taluka=...`                                                                    |

### Admin & Analytics Routes

`Base Path: /api/admin`

| Method & Endpoint                      | Protection | Description                                                                                                                                                                                                    |
| :------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /analytics`                       | Admin      | **Main Analytics Endpoint.** Retrieves all aggregated data for the Analytics page (top-level stats, charts, tables). **Query Params (Optional):** `?location=...&taluka=...` for filtering the bundle summary. |
| `GET /analytics/bundle-counters`       | Admin      | Retrieves the live status of all bundle counters.                                                                                                                                                              |
| `GET /export/processed/:location`      | Admin      | Generates and downloads an Excel file of all processed records for a location.                                                                                                                                 |
| `POST /reset-progress`                 | Admin      | Resets a user's progress on their active bundle. **Body:** `{ "userId": "...", "taluka": "..." }`                                                                                                              |
| `POST /force-complete`                 | Admin      | Manually marks a bundle as complete. **Body:** `{ "userId": "...", "taluka": "...", "bundleNo": 1 }`                                                                                                           |
| `POST /manual-assign`                  | Admin      | Manually assigns a specific bundle to a user. **Body:** `{ "userId": "...", "taluka": "...", "bundleNo": 5 }`                                                                                                  |
| `POST /danger-zone/reset-all-data`     | Admin      | **[DANGER]** Deletes all processed records from the database.                                                                                                                                                  |
| `POST /danger-zone/reset-all-counters` | Admin      | **[DANGER]** Resets all bundle counters and user states.                                                                                                                                                       |
