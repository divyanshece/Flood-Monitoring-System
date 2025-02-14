import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Reference to the ultrasonic sensor data in Firebase
const distanceRef = ref(db, "underpasses/underpass_1/sensors/ultrasonic");

onValue(distanceRef, (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("distance-value").innerText = data.distance + " cm";
        document.getElementById("timestamp").innerText = new Date(data.timestamp * 1000).toLocaleString();
    } else {
        document.getElementById("distance-value").innerText = "No Data";
        document.getElementById("timestamp").innerText = "-";
    }
});
