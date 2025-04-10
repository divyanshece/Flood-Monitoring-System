# Smart Underpass Monitoring & Alert System

A full-stack AI-powered monitoring system built to detect waterlogging and road surface damage (e.g. potholes) in underpasses and alert city authorities via a live dashboard and automated SMS notifications. Designed using Jetson Nano as an edge device, this project primarily showcases modern cloud integration, frontend development, computer vision, and real-time communication between embedded hardware and software infrastructure.

## 🧠 Project Focus

Although this system includes a hardware component, its **software architecture** is the central focus. This includes:

- Real-time **frontend dashboard** (React.js + Google Maps API)
- **Backend integration** with Firebase Realtime Database & Storage
- **Computer Vision** with YOLOv5 for pothole detection
- **Cloud-based alerts** via Twilio API
- Modular, scalable codebase written in **Python and JavaScript**

---

## 🔧 Key Features

### 🔹 Real-Time Monitoring Dashboard

- Developed with **React.js**
- Uses **Google Maps API** to display underpass status via live map markers
- Dynamically updates marker colour based on flood severity
- Displays pothole images and sensor readings in real-time
- Fully responsive for mobile/desktop environments

### 🔹 AI-Powered Pothole Detection

- Camera images captured by Jetson Nano are processed using **YOLOv5n** (lightweight, real-time model)
- Detected images are sent to Firebase Storage and rendered in the dashboard with timestamps and location metadata

### 🔹 Cloud Integration

- Firebase is used for:
  - **Realtime Database**: live updates of water level and detection metadata
  - **Storage**: storing and retrieving pothole detection images

### 🔹 Alert System (Twilio API)

- Automated SMS alerts are sent to registered authorities when:
  - Water level exceeds a critical threshold
  - Road damage is detected in sensitive zones

---

## 💻 Software Architecture

```plaintext
Jetson Nano
├── Captures camera frames
├── Interprets ultrasonic sensor data
├── Runs YOLOv5 detection on images
├── Pushes data to Firebase (DB + Storage)
├── Triggers Twilio SMS alert if needed

React.js Dashboard
├── Connects to Firebase in real-time
├── Displays flood level and detection data on a live map
├── Updates UI immediately with new data and alerts
```
## 🧱 Tech Stack

### 🖥️ Frontend
- **React.js** – Building the interactive admin dashboard
- **Google Maps API** – Real-time geolocation and status visualization
- **CSS & Bootstrap** – Responsive design and UI styling

### 🧠 Backend
- **Firebase Realtime Database** – Cloud-hosted NoSQL DB for real-time sensor data sync
- **Firebase Storage** – Storing pothole detection images with timestamps
- **Firebase Authentication (Optional)** – Secure access control for dashboard

### 🎯 Computer Vision & ML
- **YOLOv5 Nano (PyTorch)** – Lightweight real-time object detection for potholes
- **OpenCV** – Image processing and handling camera feed
- **Jetson Nano** – Edge device for on-site processing and inference

### 📡 Communication & Alerts
- **Twilio API** – Automated SMS alerts to authorities on threshold breach
- **Python** – Main scripting language for edge device integration

### ⚙️ Other Tools & Libraries
- **Node.js & npm** – Environment for frontend development
- **Firebase Admin SDK** – Python integration with Firebase
- **Jetson.GPIO** – Reading ultrasonic sensor data on Jetson Nano
- **Git & GitHub** – Version control and collaboration
