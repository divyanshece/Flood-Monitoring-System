# AI-Powered Underpass Flood and Pothole Monitoring System

This repository presents a real-time smart infrastructure monitoring system, developed using the NVIDIA Jetson Nano. It is designed to detect waterlogging and potholes in urban underpasses and display the findings on a live, interactive dashboard accessible by relevant authorities.

## Overview

Underpass flooding and surface degradation pose a serious threat to urban mobility and safety. This system combines edge computing, sensor fusion, computer vision, and cloud technologies to offer an automated, scalable, and reliable monitoring solution. The core functionalities include:

- Continuous detection of flood levels and surface anomalies (potholes)
- Real-time data transmission to a cloud backend
- Interactive admin dashboard with live mapping and alerts
- SMS notifications to authorities during emergencies

## Features

- **Flood Level Detection**: Ultrasonic sensors connected to Jetson Nano capture precise water levels in real-time.
- **Pothole Detection**: Jetson Nano processes images from a connected camera module using a YOLOv5 Nano (YOLOv5n) model to detect potholes.
- **Cloud Integration**: Sensor readings and detection outputs are pushed to Firebase Realtime Database and Firebase Storage.
- **Admin Dashboard**: A React.js-based web dashboard provides live visualisation using Google Maps API and allows real-time monitoring of each underpass.
- **Emergency Alerts**: When water levels exceed predefined safety thresholds, SMS alerts are triggered via Twilio API.

## Technology Stack

- **Embedded Controller**: NVIDIA Jetson Nano (4GB)
- **Sensor Modules**: HC-SR04 Ultrasonic Sensor via MCP3008 ADC
- **Camera Interface**: Raspberry Pi Camera v2 / USB Camera
- **Detection Model**: YOLOv5n (trained on pothole dataset)
- **Frontend**: React.js + Google Maps API
- **Backend**: Firebase Realtime Database + Firebase Storage
- **Notification Service**: Twilio SMS API
- **Programming Languages**: Python, JavaScript

## Admin Dashboard

The admin dashboard allows real-time surveillance and alert tracking through an intuitive web interface.

### Key Capabilities

- **Live Map Visualisation**: Each underpass is mapped as a marker whose colour dynamically reflects the flood severity level.
- **Sensor Tooltip Info**: Hovering on each marker shows water depth, timestamp, and underpass ID.
- **Anomaly Image Gallery**: Captured pothole images are stored and displayed with metadata.
- **Alert History**: Authorities can review past incidents and alerts with full context.
- **Mobile Compatibility**: The interface is fully responsive and suitable for field monitoring.

## System Architecture

```plaintext
Ultrasonic Sensor + Camera
          │
          ▼
     Jetson Nano
 (Sensor & Image Processing)
          │
          ├── YOLOv5 Detection (Potholes)
          ├── Firebase Realtime Database
          ├── Firebase Storage (Images)
          └── Twilio SMS Alerts
          │
          ▼
   Admin Dashboard (React.js)
       + Google Maps API
