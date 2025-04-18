import RPi.GPIO as GPIO
import time
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

# Firebase Setup
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://monitor-fea81-default-rtdb.firebaseio.com/'
})

# GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BOARD)

# Define GPIO pins
TRIG1 = 16
ECHO1 = 18
TRIG2 = 22
ECHO2 = 24

GPIO.setup(TRIG1, GPIO.OUT)
GPIO.setup(ECHO1, GPIO.IN)
GPIO.setup(TRIG2, GPIO.OUT)
GPIO.setup(ECHO2, GPIO.IN)

def get_distance(trig, echo):
    GPIO.output(trig, False)
    time.sleep(0.1)

    GPIO.output(trig, True)
    time.sleep(0.00001)
    GPIO.output(trig, False)

    start = time.time()
    stop = time.time()

    while GPIO.input(echo) == 0:
        start = time.time()
    while GPIO.input(echo) == 1:
        stop = time.time()

    elapsed = stop - start
    distance = (elapsed * 34300) / 2
    return round(distance, 2)

try:
    while True:
        distance1 = get_distance(TRIG1, ECHO1)
        distance2 = get_distance(TRIG2, ECHO2)
        timestamp = int(time.time())

        data = {
            "ultrasonic1": {"distance": distance1, "timestamp": timestamp},
            "ultrasonic2": {"distance": distance2, "timestamp": timestamp}
        }

        db.reference("/underpasses/underpass_1/sensors").update(data)

        print(f"✅ Sent to Firebase | D1: {distance1} cm, D2: {distance2} cm")
        time.sleep(5)

except KeyboardInterrupt:
    print("Program stopped manually")

finally:
    GPIO.cleanup()
