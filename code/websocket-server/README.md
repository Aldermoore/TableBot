# Websocket-Server

Websocket server for TableBot 2.0 

THe websocket is responsible for recieving control messages and relay them to the motor controller - an Arduino connected to `/dev/ttyACM0` using the Adafruit Motor Shield (AMS). The data is also relayed to an led indicator script that will correctly display the pilot's direction of attention on the robot. 

The main file is `websocketServer.py`. The code expect that an Arduino is connected to `/dev/ttyACM0`, otherwise it won't work. All messages received through the websocket are logged to a file called `tablebot2.log`