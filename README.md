# 🏥 Cura Hospital Management System

A modern, responsive hospital management web application developed using React, TypeScript, Tailwind CSS, and Firebase.  
The portal allows patients to securely book appointments, explore departments, and view doctor profiles, while administrators can efficiently manage all hospital appointments and patient requests.

---

# 🚀 Features

## 👤 Patient Features
- User Registration & Login (Firebase Authentication)
- Explore Hospital Departments & Specialties
- View Doctor Profiles & Credentials
- Secure Online Appointment Booking
- Select Preferred Doctor, Department, Date, and Time
- View Current Booking Status

## 🛠 Admin Features
- Secure Role-Based Admin Access
- Centralized Admin Dashboard
- View All Patient Appointments
- Update Appointment Status (Pending, Confirmed, Cancelled)
- Manually Add New Appointments for Walk-in Patients
- Delete or Clear Completed Appointments

## 🎨 UI Features
- Fully Responsive Design (Mobile, Tablet, Desktop)
- Clean, Modern, and Professional Healthcare UI
- Dynamic Routing and Navigation
- Interactive Feedback and Status Alerts
- High-Quality SVG Icons (Lucide React)

---

# 🧰 Tech Stack

## Frontend
- React.js 18+
- TypeScript
- Tailwind CSS
- React Router DOM
- HTML5

## Backend & Database
- Firebase Authentication (User Identity)
- Firebase Firestore (NoSQL Database)

## Build Tools
- Vite
- Node.js

---

# 📁 Modules

- Authentication System
- Homepage / Informational Landing Page
- Doctor & Department Directory
- Appointment Booking Engine
- Admin Dashboard 
- Real-time Status Tracking

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/sumukhskowshik/cura-hospital.git
2. Open Project Folder
code
Bash
cd cura-hospital
3. Install Dependencies
You need Node.js installed on your system. Run the following command to install the required packages:
code
Bash
npm install
4. Configure Database (Firebase)
Go to the Firebase Console
Create a new project and enable Authentication (Email/Password) and Firestore Database.
Update the Firebase config keys in your src/lib/firebase.ts or environment variables file.
5. Run Application
Start the local development server:
code
Bash
npm run dev
6. Open Browser
Click the localhost link provided in your terminal (usually http://localhost:5173 or http://localhost:3000).
🔮 Future Enhancements
Email/SMS Notifications for Appointment Confirmations
Integrated Payment Gateway for Online Consultation Fees
Individual Doctor Logins to Manage Their Own Schedules
Patient Medical Records & Prescription Upload System
Telemedicine & Video Consultation Integration
AI-Powered Chatbot for General Queries
Password Reset/Forgot Password Functionality
👨‍💻 Developed By
Sumukh S Kowshik