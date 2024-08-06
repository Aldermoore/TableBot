import pyrebase
import serial

print("setting up serial")
ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) #Arduino Serial ports for Linux: /dev/ttyACM0 --> Arduino  /dev/ttyAMA0 --> Tastatur
ser.reset_input_buffer()

firebaseConfig = {
  "apiKey": "AIzaSyA-EdS2J1nRsEwW4n8RJEOloQ455vfvIGY",
  "authDomain": "tablebot-29dd0.firebaseapp.com",
  "databaseURL": "https://tablebot-29dd0-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "tablebot-29dd0",
  "storageBucket": "tablebot-29dd0.appspot.com",
  "messagingSenderId": "1086497272021",
  "appId": "1:1086497272021:web:6fe3cfe998efc75a34f25c"
}

firebase = pyrebase.initialize_app(firebaseConfig)

db = firebase.database()
command = db.child("/")


def stream_handler(message):
    print("event:", message["event"]) 
    print("path:", message["path"]) 
    print("data:", message["data"]) 
    handle_message(message["data"])


def handle_message(message): 
    global ser
    message_type = message["type"]
    if message_type == "move":
        print("Its a move message")
        arduino_msg = prepareArduinoMessage(message)
        print("arduino message:", arduino_msg)
        ser.write(bytes(arduino_msg + '\n', 'utf-8'))
        print("wrote to serial")
        ser.reset_input_buffer()


def prepareArduinoMessage(msg): 
    arduino_msg = "<"+msg["driveVal"]+","+str(msg["turnVal"])+","+str(msg["tiltVal"])+">"
    return arduino_msg


my_stream = db.child("command").stream(stream_handler)