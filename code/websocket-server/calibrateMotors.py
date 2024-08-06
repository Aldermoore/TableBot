import serial

print("setting up serial")
ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) #Arduino Serial ports for Linux: /dev/ttyACM0 --> Arduino  /dev/ttyAMA0 --> Tastatur
ser.reset_input_buffer()

drive = "null"
tilt = "0"

def test_turn(degrees):
  data = "<" + drive + "," + degrees + "," + tilt + ">";
  print(data)
  ser.write(bytes(data + '\n', 'utf-8'))


while(True):
	turnval = input()
	test_turn(turnval)
