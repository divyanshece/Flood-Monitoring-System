# Smart Underpass Flood Monitoring & Alert System

A real-time, AI-driven underpass monitoring system designed to enhance urban safety and traffic management. This project features a custom live map for authorities, intelligent route redirection for users, and automated alerts powered by computer vision and sensor fusion. Built with a robust software architecture and edge-AI deployment on Jetson Nano, it serves as a scalable smart-city prototype.

---

##  Key Features

### 📍 Real-Time Live Map with Dynamic Markers
- Built using **Google Maps API** within a **React.js dashboard**
- Custom map markers reflect live underpass status: _Safe_, _Warning_, or _Critical_
- Each marker updates automatically from Firebase in real time

### 🛣️ Smart Alternative Route Suggestions
- If an underpass is flooded or damaged, the system suggests **alternative navigation routes**
- Ensures public safety and traffic redirection in urban areas
- Future-ready for Google Maps Directions API or OpenRoute integration

### 🎯 Admin Monitoring Dashboard
- Web interface designed for **municipal authorities**
- Displays:
  - Real-time water levels from ultrasonic sensors
  - Latest pothole detection images
  - Historical sensor and alert logs
- Responsive design for desktop and mobile

### 🧠 On-Device Pothole Detection
- Jetson Nano runs **YOLOv5 Nano model** on camera feed to detect potholes in real time
- Annotated images uploaded to Firebase Storage and viewable in dashboard

### ⚠️ Automated Alerts via Twilio
- SMS alerts are triggered automatically if:
  - Water levels cross danger thresholds
  - Potholes are detected at critical zones
- Sends alerts to pre-configured authority contacts via **Twilio API**

### 🔄 Real-Time Cloud Integration
- **Firebase Realtime Database** syncs water level and system status in real time
- **Firebase Storage** hosts all captured and processed images
- Ensures seamless data flow between edge device and frontend dashboard

---

##  Tech Stack

### 🖥️ Frontend
- **React.js** – Interactive admin dashboard
- **Google Maps API** – Live map with custom status markers & routing
- **CSS & Bootstrap** – UI/UX styling and responsiveness

### 🧠 Backend
- **Firebase Realtime Database** – Live sensor data & system sync
- **Firebase Storage** – Image repository for pothole detections
- **Firebase Auth (Optional)** – Admin access control

### 🔍 Computer Vision & AI
- **YOLOv5 Nano (PyTorch)** – Lightweight real-time object detection
- **OpenCV** – Image preprocessing and camera interfacing
- **Jetson Nano** – Edge inference and sensor-camera integration

### 📡 Communication
- **Twilio SMS API** – Alert system for emergency communication
- **Python** – Core scripts for sensor, camera, vision, and cloud communication

### ⚙️ Tooling
- **Node.js, npm** – Frontend build system
- **Jetson.GPIO** – Sensor interfacing on Jetson
- **Git & GitHub** – Version control

---

## 📂 Folder Structure

```bash
├── dashboard/               # React frontend
├── firebase_config.py       # Firebase setup and credentials
├── main.py                  # Jetson Nano script (sensors + CV)
├── twilio_alerts.py         # SMS alert handler
├── yolov5/                  # YOLOv5 model and weights
├── sensors/                 # Ultrasonic sensor read scripts
└── README.md
