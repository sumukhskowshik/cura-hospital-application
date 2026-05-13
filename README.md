# 🏥 Cura Hospital Web App

A modern, role-based Hospital Management and Appointment Booking Web Application developed using React, Vite, Tailwind CSS, and Firebase.
The portal allows patients to explore hospital departments, view doctor profiles, book appointments, and track their bookings across various specialties. Admins can manage all incoming appointment requests, update statuses, and oversee operations.

---

# 🚀 Features

## 👤 Patient Features
- User Authentication (Registration & Login)
- Explore Medical Departments
- View Doctor Profiles & Specialties
- Book Appointments Online
- View & Manage Personal Bookings
- Responsive Patient Dashboard

## 🛠 Admin Features
- Secure Admin Authentication
- Dedicated Admin Dashboard
- View All Patient Appointments
- Manage Appointment Status (Confirm, Cancel, Complete)
- Delete Invalid Appointments
- Add New Appointments Manually

## 🎨 UI Features
- Modern, Responsive Healthcare UI
- Dynamic Routing (React Router)
- Smooth Animations (Framer Motion)
- Tailwind CSS Styling
- Professional Dashboard Layouts

---

# 🧰 Tech Stack

## Frontend Development
- React 18
- TypeScript
- Vite
- React Router DOM
- Framer Motion (Animations)
- Lucide React (Icons)

## Styling
- Tailwind CSS
- PostCSS

## Backend / Database & Authentication
- Firebase Authentication (Email/Password)
- Firebase Firestore (NoSQL Database)

---

# 📁 Modules

- User Authentication System
- Patient Dashboard & Booking Portal
- Admin Management Dashboard
- Department & Doctor Catalog
- Appointment Management System

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/sumukhskowshik/cura-hospital.git
```

## 2. Open Project Folder

```bash
cd cura-hospital
```

## 3. Install Dependencies
You need Node.js installed on your system. Run the following command to install the required packages:

```bash
npm install
```

## 4. Configure Database (Firebase)
- Go to the Firebase Console
- Create a new project and enable Authentication (Email/Password) and Firestore Database.
- Update the Firebase config keys in your `src/lib/firebase.ts` file or `.env` file.

## 5. Run Application
Start the local development server:

```bash
npm run dev
```

## 6. Open Browser
Click the localhost link provided in your terminal (usually):

```text
http://localhost:5173
```
*(Or the port specified in your terminal)*

---

# 🔮 Future Enhancements
- Email/SMS Notifications for Appointment Confirmations
- Integrated Payment Gateway for Online Consultation Fees
- Individual Doctor Logins to Manage Their Own Schedules
- Patient Medical Records & Prescription Upload System
- Telemedicine & Video Consultation Integration
- AI-Powered Chatbot for General Queries
- Password Reset/Forgot Password Functionality

---

# 👨‍💻 Developed By

Sumukh S Kowshik