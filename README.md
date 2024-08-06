# TableBot

Repo for the final code, 3d-models and assembly instructions for the TableBot tabletop telepresence robot

**Table of content**

[Components needed](#components-needed)

* [Electronics](#electronics)
* [Hardware](#hardware)
* [Files to 3D print](#files-to-3d-print)

[Assembly instructions](#assembly-instructions)

* [Assembling the head](#assembling-the-head)
* [Assembling the base](#assembling-the-base)

[Installation](#installation)

[Configuration and Running the software](#configuration-and-running-the-software)



<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

---

# ⚠️ **DISCLAIMER: We provide no guarantee that you will produce a working product from following these instructions!**

---

## Components needed

### Electronics

* Raspberry Pi 4

* 7'' touchscreen for Raspberry Pi 

* 180° fish-eye lens USB camera, model ELP-USBFHD01M-L180 

* Jabra Speak 510 conference microphone and speaker

* Servo RDS3115mg

* Stepper Motor 17HS4401 x2

* Adafruit motor shield V1 (V1 is discontinued, use V2 instead at your own risk)

* Arduino Uno

* RGB LED-strip

* Power Banks 5000mAh 2.5A x3 (TB is designed for quite flat batteries, but the battery compartment can be modified to accomodate other battery shapes)

* USB-A cables to connect powerbanks to electronics (these will be cut open during assembly!) 

* A few basic electronic components; Capacitor, diode, breadboard/soldering-board, Jumperwires

### Hardware

* 3D-printer (Prusa Mini or larger) 

* Access to soldering equipment

* Access to silicone casting to create tires

* Tabletop-tennis ball (for the castor wheel)

* Screws and appropriate screwdriver
  
  * Assorted screws for electronics (see pictures)

## Files to 3D print

TODO

## Assembly instructions

TODO

### Assembling the head

### Assembling the base

## Installation

Flash the code in `code / motorcontroller` on the Arduino Uno. 

The remaining code must be moved to the Raspberry Pi. Using git, make sure to clone into the home folder! 

Follow the build and install instructions in `code / video4linux-custom`

From `code / video4linux-custom` run the script called `setupeverything.sh`. 
**NOTE:** The script expects that the path to the files is `~/TableBot/code/front-end-webrtc/server.sh` and `~/TableBot/code/websocket-server/websocketServer.py`. If you have not cloned the repo to the home folder, or have used other means to move the code to the Raspberry Pi, then update the paths on lines 14 and 15 in the `setupeverything.sh` script to reflect this change! 

## Configuration and Running the software

Connect a keyboard and mouse to the Raspberry Pi. 

Connect the Pi to your Wifi network. Note the IP address of the Pi. 

Run the `setupEverything.sh` script. 

In a browser (Tested with Google Chrome, not working with Firefox!), go to the Pi's IP address, port 5
