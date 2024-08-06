#!/usr/bin/env python
"""
Message interpreter and handler code 
"""
import json
import logger 
import led_indicator
import serial

ser = ""

def handle_message(message, serial_conn):
    global ser
    ser = serial_conn
    # parse x:
    msg = json.loads(message)

    # the result is a Python dictionary:
    log = prepareLogMessage(msg)
    print(log)
    logger.log(log)

    msg_type = msg["type"]

    if msg_type == "look": 
        print("Its a look message")
        led, led_num = prepareLookMessage(msg)
        print("led and led_num:", led, led_num)
        led_indicator.show_gaze(led, led_num)

    elif(msg_type == "move"): 
        print("Its a move message")
        arduino_msg = prepareArduinoMessage(msg)
        led_turn_msg = prepareTurnLEDMessage(msg)
        print("arduino message:", arduino_msg, "led message:", led_turn_msg)
        led_indicator.move(led_turn_msg[0], led_turn_msg[1])
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


if __name__ == '__main__': 
    # Test JSON object string 
    message =  '{"type":"move", "driveVal":"stop", "turnVal":90, "tiltVal":0, "led_direction":13,"led_num":3}'
    handle_message(message)
    exit(0)