#include <Arduino.h>
// #include <ESP8266WiFi.h>
#include <FirebaseESP32.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <time.h>  // For getting real-time

#define WIFI_SSID "A3"
#define WIFI_PASSWORD "12345678"

#define API_KEY "AIzaSyDD4jvOspUMRN24rCa7LfzKiImXwmn2aBI"
#define DATABASE_URL "https://monitor-fea81-default-rtdb.firebaseio.com/"

// User Credentials
#define USER_EMAIL "divyanshece242@gmail.com"
#define USER_PASSWORD "qwerty"

#define TRIG_PIN1 23
#define ECHO_PIN1 22
#define TRIG_PIN2 18
#define ECHO_PIN2 5
#define TRIG_PIN3 2
#define ECHO_PIN3 4

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool loginOK = false;

void setup() {
    Serial.begin(115200);

    pinMode(TRIG_PIN1, OUTPUT);
    pinMode(ECHO_PIN1, INPUT);
    pinMode(TRIG_PIN2, OUTPUT);
    pinMode(ECHO_PIN2, INPUT);
    // pinMode(TRIG_PIN3, OUTPUT);
    // pinMode(ECHO_PIN3, INPUT);

    // Wi-Fi Connection
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    int attempt = 0;
    while (WiFi.status() != WL_CONNECTED && attempt < 10) {
        Serial.print(".");
        delay(1000);
        attempt++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nConnected to Wi-Fi!");
        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nFailed to connect to Wi-Fi. Check credentials.");
        return;
    }

    // Firebase Setup
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;

    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    Serial.println("Logging in with email & password...");
    if (Firebase.ready()) {
        Serial.println("Firebase login successful");
        loginOK = true;
    } else {
        Serial.println("Firebase login failed!");
    }

    // NTP Time Sync Setup
    configTime(0, 0, "pool.ntp.org", "time.nist.gov"); // Get time from NTP servers
    Serial.println("Getting real-time clock...");
    delay(2000);
    time_t now = time(nullptr);
    
    while (now < 100000) { // Keep retrying if time fetch fails
        Serial.print(".");
        delay(500);
        now = time(nullptr);
    }
    Serial.println("\nReal-time clock synchronized!");
}

// float getDistance(int trigPin, int echoPin) {
//     digitalWrite(trigPin, LOW);
//     delayMicroseconds(2);
//     digitalWrite(trigPin, HIGH);
//     delayMicroseconds(10);
//     digitalWrite(trigPin, LOW);

//     long duration = pulseIn(echoPin, HIGH);
//     float distance = (duration * 0.034) / 2; // Convert to cm

//     return distance; // Returns distance in cm
// }

void loop() {
    if (Firebase.ready() && loginOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {
        sendDataPrevMillis = millis();

        // Get Current Time as Unix Timestamp
        time_t now = time(nullptr);

        // --- Distance 1 ---
        digitalWrite(TRIG_PIN1, LOW);
        delayMicroseconds(2);
        digitalWrite(TRIG_PIN1, HIGH);
        delayMicroseconds(10);
        digitalWrite(TRIG_PIN1, LOW);
        long duration1 = pulseIn(ECHO_PIN1, HIGH, 30000); // Optional timeout
        float distance1 = (duration1 * 0.034) / 2;
        delay(100); // Allow echoes to settle

// // --- Distance 2 ---
digitalWrite(TRIG_PIN2, LOW);
delayMicroseconds(2);
digitalWrite(TRIG_PIN2, HIGH);
delayMicroseconds(10);
digitalWrite(TRIG_PIN2, LOW);
long duration2 = pulseIn(ECHO_PIN2, HIGH, 30000);
float distance2 = (duration2 * 0.034) / 2;
delay(100);

// // --- Distance 3 ---
// digitalWrite(TRIG_PIN3, LOW);
// delayMicroseconds(2);
// digitalWrite(TRIG_PIN3, HIGH);
// delayMicroseconds(10);
// digitalWrite(TRIG_PIN3, LOW);
// long duration3 = pulseIn(ECHO_PIN3, HIGH, 30000);
// float distance3 = (duration3 * 0.034) / 2;

        // Create JSON Object for Firebase
        FirebaseJson json;
        json.set("ultrasonic1/distance", distance1);
        json.set("ultrasonic1/timestamp", now);
        json.set("ultrasonic2/distance", distance2);
        json.set("ultrasonic2/timestamp", now);
        // json.set("ultrasonic3/distance", distance3);
        // json.set("ultrasonic3/timestamp", now);

        // Send Data to Firebase
        if (Firebase.updateNode(fbdo, "/underpasses/underpass_1/sensors", json)) {
            Serial.println("✅ Data sent successfully! in pass 1");
            Serial.print("Distance1: ");
            Serial.print(distance1);
            Serial.print(" cm");
            Serial.print(distance2);
            Serial.println(" cm");
            // Serial.print(distance3);
            // Serial.println(" cm");
            // Serial.println("2"+ distance2);
        } else {
            Serial.println("❌ Failed to send data");
            Serial.println("REASON: " + fbdo.errorReason());
        }
    }
}