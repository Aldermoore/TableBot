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
Place nuts in assigned slots on the grid
![1](https://github.com/user-attachments/assets/e8dd08b1-4b12-4c92-a6e7-51da29672f75)
Attach servo arm using four bolts
![2](https://github.com/user-attachments/assets/c31fafb4-1327-4bae-b44e-b410e6b5f489)
![3](https://github.com/user-attachments/assets/4277a65a-7f73-4bb4-a235-5c2f73794715)
Attach the grid to the back of the screen in eight spots
![4](https://github.com/user-attachments/assets/453a277d-ee7a-423b-b1f3-0e848a724667)
Attach holder for Raspberry Pi. Use four small nuts to as spacers to ensure the plastic does not touch the Raspberry Pi directly
![5](https://github.com/user-attachments/assets/e1a09ffd-bc71-48be-883a-acf077dea1d4)
![6](https://github.com/user-attachments/assets/0a9a09de-9eb0-41ce-af5a-ee4a97fabe2e)
Connect the display cable to the screen
![7](https://github.com/user-attachments/assets/e96ec8f4-7270-48cb-adf9-f819c7f72256)
![8](https://github.com/user-attachments/assets/60b46c5a-81ae-4687-bd75-8f50ab7d7d67)
Flip the Raspberry Pi and connect it to the grid using two bolts
![9](https://github.com/user-attachments/assets/57f9fc4a-e34d-438b-b5ff-4f27b5cbee8a)
![10](https://github.com/user-attachments/assets/5b1c3d74-b79b-41a2-8859-99f03ece877d)
Place the screen in the 3d printed frame. Use four bolts to keep it in place
![11](https://github.com/user-attachments/assets/acbcbf8a-8cd9-4135-92c7-84cea568799a)
Install the camera by placing it in the assigned space and use two small screws to keep it in place
![12](https://github.com/user-attachments/assets/2f56756a-72ed-47c7-9139-6df575dc9fdd)
![13](https://github.com/user-attachments/assets/66d64dc0-5dcd-4441-8421-2cd2b3f73335)
Leave the head for now as we build the main body
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
