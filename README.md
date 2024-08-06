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

All 3d files to build TableBot are available in the TableBot_stl folder. All files should only be printed once, except for the wheels (you might prefer to have two of those).

The wheels have silicone tires, and the folder Silicone_mould includes the necessary files. To produce the mould, print one of each piece. Connect all pieces with a wheel base as the centre, close outer gaps with tape and pour in your silicone mixture. Pull apart the mould and repeat for the second wheel.

The original TableBot is printed primarily in PLA, but a few pieces are printed in PETG for better heat resistance and flexibility. This includes:
* Arduino_mount.stl
* RaspberryPi_mount.stl
* Screen_grid.stl

The Diffuser_Plane.stl file should be printed in a clear material to allow light through it.

## Assembly instructions

To build the robot, please have the 3d printed files ready and without supports. The following images may include 3d printed elements that differ from those in the included files, as the files offered in this repository has been updated with any changes made to those shown in the images.

First, build the head, then the base and put the two together in the end.

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
Pad the stepper motors with some felt to reduce vibrations and place them in the assigned slots.
![14](https://github.com/user-attachments/assets/66177cdf-c2c8-4f64-8655-903191c360ff)
![15](https://github.com/user-attachments/assets/fe954b3a-af93-40c0-b803-0c7c27717a68)
Place four nuts in the assigned spots inside the bottom of the handle.
![20240806_103520](https://github.com/user-attachments/assets/e82ce23c-f521-47d1-bb8d-8a0dff23b925)
The neck must be fully wired before attached to the body. Prepare the Jabra speaker, the servo motor, a data cable for the Arduino, a power cable for the Raspberry Pi and a length of male/female jumper wires for the LED strip, one for data, one for power and one for ground.
![17](https://github.com/user-attachments/assets/7b6304e2-920f-4ed3-aa6f-dec89525f0f1)
Before wiring the handle, the Jabra speaker needs to have its wire moved from the front to the back of the main body.
![18](https://github.com/user-attachments/assets/cf334a73-6bba-4c32-9e65-3c23fe4e3a9b)
Now send all wires through the handle. Ensure the top of the handle has the wires as shown on the following image. The wire for the servo motor must be moved through the handle to the bottom of the handle.
![19](https://github.com/user-attachments/assets/0eb8ad8b-968f-4d44-872c-42cd05c6cfa1)
Before connecting the handle to the base, move the LED jumper wires through the hole in the base of the main body.
![20](https://github.com/user-attachments/assets/9afd29b7-ef27-4fe5-ae65-98cde10d2eb5)
Slid the handle into the groved on the top of the main body and secure it using two bolts.
![21](https://github.com/user-attachments/assets/8d8e4617-36dc-4a7d-becc-9daeeb0f0802)
Pull the power cable for the Raspberry Pi through the hole in the bottom of the main body.
![22](https://github.com/user-attachments/assets/f41d735e-5177-48df-8ea8-f26ccfbc4263)
Prepare the Arduino motor driver shield.
![23](https://github.com/user-attachments/assets/38134189-a928-4fcc-8a0b-1f3ce41c83f6)
![24](https://github.com/user-attachments/assets/22de4243-4db0-4177-9975-0d356847daab)
Combine the 3d printed Arduni base with the Arduino and shield.
![25](https://github.com/user-attachments/assets/b793bfbe-332d-4ca3-b21d-37fadab50ce7)
![26](https://github.com/user-attachments/assets/f52776a7-b8cf-42e9-b91d-04db78b6fa86)
Slide the Arduino onto the main body.
![27](https://github.com/user-attachments/assets/2a278fa1-16e4-45f8-a68b-cf0b257d6bec)
Up next secure the connection between the power and Servo motor using a flyback diode.
![28](https://github.com/user-attachments/assets/c3260e62-d93b-4a98-8e60-111486ba71d0)
![29](https://github.com/user-attachments/assets/6b5892d2-2e25-4b5c-8768-7cf5fcff9fe1)
Connect the servo motor to the Arduino motor driver shield through the flyback diode.
![30](https://github.com/user-attachments/assets/9739f70d-258e-4faf-a399-a3e5c01ed780)
Tug the loose wires into the space below the handle.
![31](https://github.com/user-attachments/assets/e351bfdc-1eb6-498b-ac9e-a93c83a86518)
Under the main body, pull the power supply chords for the Arduino and Servo motor through the same hole as the power cable for the Raspberry Pi.
![32](https://github.com/user-attachments/assets/f3bb8dcc-cb1e-4041-a03d-cafa08d697d4)
Next, prepare the side covers for the main body.
![33](https://github.com/user-attachments/assets/fc7f7904-0d86-4528-8ef4-90d80e92855d)
Pull the wires for the wires for the stepper motors through the hole underneath the side piece. Connect them with the closest free wires from the Arduino motor shield by matching the colours.
![34](https://github.com/user-attachments/assets/8e8e3a47-a0cf-4141-87a3-41548bba61be)
To secure the side cover, slide it into place while pulling the wires out of the way. Repeat on the other side.
![35](https://github.com/user-attachments/assets/26303427-10d4-4adc-88cb-26a570a411ec)
Tug the loose wires into the space above the stepper motors.
![36](https://github.com/user-attachments/assets/917a2bc6-bfa0-4b34-b9fa-c85ae746c6f3)
At the front of the main body, prepare 3d prints and an LED strip.
![38](https://github.com/user-attachments/assets/ea21bd54-70fe-4c63-b9f5-e3d5033340fd)
Place the LED strip within the slot on the solid piece. To help it along, shape the LED strip through small bends.
![39](https://github.com/user-attachments/assets/e1d625e5-8486-45e6-b6b6-c091b756a57a)
Place the 3d printed piece with the LED strip on the front of the main body. Make sure the wires for the LED strip face the centre of the front area when placing it. Connect the LED strip with the jumper wires.
![40](https://github.com/user-attachments/assets/49ee876b-acad-4210-bc1c-e2a521793070)
![41](https://github.com/user-attachments/assets/b990563f-0d14-4430-a8ec-b82be26050e1)
Tug the wires away along the side and place Jabra speaker in the assigned slot with its wires rolled up around its base.
![42](https://github.com/user-attachments/assets/8a9416a8-6d18-4181-9cc3-312bfc275a30)
Lightly place the diffuser piece over the LEDs.
![43](https://github.com/user-attachments/assets/93fdfde0-e867-4181-a386-096f75d16c9c)
Attach the large wheels to the stepper motors.
![44](https://github.com/user-attachments/assets/8a89f075-ee3c-4e07-90a6-3d000d443633)
Underneath the robot attach the ball wheel base with two short wood screws. Once in place, insert the ping-pong ball.
![45](https://github.com/user-attachments/assets/60cd34f4-b349-4693-8e47-5d92a5948c9f)
![46](https://github.com/user-attachments/assets/703ad940-6e55-4fb0-b055-a31bdd6ff3c0)
Prepare the back piece and two bolts.
![47](https://github.com/user-attachments/assets/19cd4f27-bcd3-42b8-ad6c-8e5f96f4a5c1)
Slide the back piece in place and secure it with the two bolts
![48](https://github.com/user-attachments/assets/d257e972-e9b2-45cb-af80-c7e49bb7bde6)
![49](https://github.com/user-attachments/assets/953305d5-e32f-4cac-8aec-df803d0e10f9)
Attach the head to the body of the robot using the servo arm and the accompanying bolts. Connect all cables and wires to the Raspberry Pi.
![50](https://github.com/user-attachments/assets/99f55977-220b-4f43-b7d9-bff7df401393)
Prepare the back of the head and secure it using four small bolts.
![56](https://github.com/user-attachments/assets/56d25cf7-1466-45e4-bc2d-2ec7e67fe5d4)
![57](https://github.com/user-attachments/assets/ebaead81-04ef-46ec-95bb-eb8ab3b27956)
In the front, ensure the jumper wires for power to the Arduino and Servo have USB ends. Insert the three power banks into the slots in the front of the main body.
![51](https://github.com/user-attachments/assets/021b1a90-018d-41fd-a874-3b930553d479)
Connect a power bank to each wire.
![52](https://github.com/user-attachments/assets/44906cb5-458f-4d6f-b68b-92fd58df0493)
Close the drawer while tugging any remaining lose wires into the drawer space.
![53](https://github.com/user-attachments/assets/b23334d0-6970-42ed-81c8-7e8f19cbeb8a)
### Attach the head
![54](https://github.com/user-attachments/assets/84f3ec3b-e384-49b4-a88c-d42acf736453)
![55](https://github.com/user-attachments/assets/0424be9d-d881-44ee-86d0-2dc11e71fcb0)




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
