# Motor-Controller

Motor controller code for Arduino. The code assumes that the Adafruit Motor Shield (AMS) V1 is connected to the arduino, and that the motors are wired as described below. 

**It is NOT tested with the Motor Shield V2**

## Overview of files

`tablebotWheelset/tablebotWheelset.ino` is the one that should be uploaded to the Arduino to work with TableBot. 

## Wiring Arduino and motors

1. Connect the arduino motor shield to the arduino

2. Connect the stepper motors in the following way
   
   1. Left stepper is connected to M3 & M4, while right stepper is connected to M1 & M2. 
   
   2. With the specific set of motor terminals facing you, the steppers are wired up in the order: 
      Orange, Brown, Red, Yellow
      So the leftmost terminal connects the orange wire on the stepper, while the rightmost terminal connects the yellow wire on the stepper. Fuck this up and the steppers will *not* drive correctly! 
   
   3. Left stepper obviously need to be on the left side of the robot chassis (duh) 

3. Connect the servo to the first servo port labeled SER1 or SERVO_1 or similar.

4. You should be all done for now, except for the fact that the steppers draw too much power so they might shut down the arduino which is kind of a problem for future us...

## Powering the motors

The steppers can be powered from external power via the `EXT_PWR`  connectors. Wire up a bettery to this port, e.g. by cutting a USB-cable and soldering some jumper wire ends to the power and ground leads of the cable. 

Additionally the `PWRJMP` jumper should be removed from the board when using external power. 
