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
