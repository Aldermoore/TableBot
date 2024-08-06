#!/usr/bin/env python

import asyncio
import websockets
import serial
from signal import signal, SIGINT
import led_indicator
import logger
import json
# import message_parser

print("setting up serial")
ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1) #Arduino Serial ports for Linux: /dev/ttyACM0 --> Arduino  /dev/ttyAMA0 --> Tastatur
ser.reset_input_buffer()

async def echo(websocket):
    async for message in websocket:
        print(message)

        ser.reset_input_buffer()
        # message_parser.handle_message(message) 
        handle_message(message)



def handle_message(message):
    global ser
    try:
        msg = json.loads(message)
    except:
        print("Failed to parse JSON")
        return

    # the result is a Python dictionary:
    log = prepareLogMessage(msg)
    print(log)
    logger.log(log)

    msg_type = msg["type"]
    msg_led_state = msg["led_on"]
    msg_using_led = msg["led_for_movement"]

    if msg_type == "look": 
        if msg_led_state == False:
            print("turning off the look LEDs")
            led_indicator.turn_LEDs_off()
            print("The LEDs have been turned off")
            
        print("Its a look message")
        led, led_num = prepareLookMessage(msg)
        print("led and led_num:", led, led_num)
        led_indicator.show_gaze(led, led_num, msg_led_state)
        print("finished showing gaze")

    elif(msg_type == "move"):
        print("Its a move message")
        if msg_using_led == False:
            print("Interaction LEDs are turned off")
            arduino_msg = prepareArduinoMessage(msg)
            print("arduino message:", arduino_msg)
            ser.write(bytes(arduino_msg + '\n', 'utf-8'))
            print("wrote to serial")
        else:
            print("Interaction LEDs are turned on")
            arduino_msg = prepareArduinoMessage(msg)
            led_turn_msg = prepareTurnLEDMessage(msg)
            print("arduino message:", arduino_msg, "led message:", led_turn_msg)
            led_indicator.move(led_turn_msg[0], led_turn_msg[1], msg_led_state)
            ser.write(bytes(arduino_msg + '\n', 'utf-8'))
            print("wrote to serial")

def prepareArduinoMessage(msg): 
    arduino_msg = "<"+msg["driveVal"]+","+str(msg["turnVal"])+","+str(msg["tiltVal"])+">"
    return arduino_msg

def prepareTurnLEDMessage(msg):
    led_turn_msg = msg["turnVal"], msg["led_num"] 
    return led_turn_msg

def prepareLookMessage(msg): 
    look_msg = msg["led_direction"], msg["led_num"] 
    return look_msg

def prepareLogMessage(msg): 
    log_msg = ""+msg["type"]+","+msg["driveVal"]+","+str(msg["turnVal"])+","+str(msg["tiltVal"])+","+str(msg["led_direction"])+","+str(msg["led_num"])
    return log_msg




def handler(_signal_received, _frame):
    logger.log("Stopped logging --- Server shutdown")
    print("Exiting the websocket server...")
    exit(0)

async def main():
    signal(SIGINT, handler)
    async with websockets.serve(echo, "", 8000): # "192.168.8.106", 8000): #"172.20.10.5
        await asyncio.Future()  # run forever

asyncio.run(main())
