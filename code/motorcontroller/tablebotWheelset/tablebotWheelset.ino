/*
CODE FOR DRIVING THE TABLEBOT 2.0
TableBot 2.0 uses the Adafruit Motor Driver Shield (v1)

(c) The Authors of TableBot
*/

/***** Things to finetune here *****/
const float wheelsetDistance = 19; // Wheelset distance in cm
const float wheelDiameter = 10.45; // Wheel diameter in cm
const double stepperMaxSpeed = 300; // Max steps/s for the steppers 
const double stepperAcceletation = 200; // How fast the steppers reach max speed (no. steps it takes?)
const int servoDelay = 25; // Delay im ms between each step in the servo
const int servoMax = 120; // Maximum angle of the servo, looking up. 
const int servoMin = 40; // Minimum angle of the servo, looking down. 
/***** No more things to finetune *****/
 
/*
Enter data in the serial monitor in this way: 
  <driveVal,turnVal,tiltVal>

# driveVal is either 'forward', 'backward' or 'stop' for commands, 
  without the quotes! Any other word will be ignored. 

# turnVal is the number of degrees you wish to turn in place. 
  Positive means turn to the left, negative means turn to the right. 
  0 means no turning. 

# tiltVal is a number corresponding to the position of a servo motor. 
  The number should be <=150, >=90. Numbers outside this range are set 
  to the closest number in the range, e.g. too large number -> 150. 
  Except for 0, which is the don't-change-the-tilt number

e.g. to rotate 120 degrees to the left while tilting the servo down: 
  <stop,120,150>
To stop the movement of the steppers: 
  <stop,0,0>

NOTE: Moving forward or backward while rotating is not an option. 
      The linear movement will terminate followed by the rotation 
      in a funky way. 
      TODO: Fix this ^^
*/


#include <Arduino.h>
#include <AccelStepper.h>
#include <AFMotor.h>
#include <Servo.h>

/* 
Field variables for receiving data from the serial connection
*/
const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];  // temporary array for use when parsing
  // variables to hold the parsed data
char driveVal[numChars] = { 0 };
int turnVal = 0;
int tiltVal = 0;
boolean newData = false;

/* 
Wheelset consts for calculating rotation
*/
const float w = wheelsetDistance; // wheelset distance (cm)
const float dia = wheelDiameter;  // wheel diameter (cm) 
const float rad = dia / 2;        // wheel radius (cm)
const float cir = dia * PI;       // wheel circumference (cm)

/*
servostuff
*/
Servo servo;         // create servo object to control a servo
int pos = 90;        // variable to store the servo's current position
unsigned long lastServoMove = 0;
int servoGoalPos = 90;  // Variable for holding the desired servo position


/*
Setting up stepper motors using the AccelStepper library
*/
// two stepper motors one on each port
AF_Stepper motor1(200, 1);
AF_Stepper motor2(200, 2);

// you can change these to DOUBLE or INTERLEAVE or MICROSTEP!
// wrappers for the first motor!
void forwardstep1() {
  motor1.onestep(FORWARD, INTERLEAVE);
}
void backwardstep1() {
  motor1.onestep(BACKWARD, INTERLEAVE);
}
// wrappers for the second motor!
void forwardstep2() {
  motor2.onestep(FORWARD, INTERLEAVE);
}
void backwardstep2() {
  motor2.onestep(BACKWARD, INTERLEAVE);
}

// Motor shield has two motor ports, now we'll wrap them in an AccelStepper object
AccelStepper rightStepper(forwardstep1, backwardstep1);
AccelStepper leftStepper(forwardstep2, backwardstep2);



void setup() {
  Serial.begin(115200);
  
  servo.attach(10);                     // attaches the servo on pin 10 to the servo object
  servo.write(pos);                     // Sets the servo the current position as the start
  rightStepper.setMaxSpeed(stepperMaxSpeed);
  rightStepper.setAcceleration(stepperAcceletation);
  leftStepper.setMaxSpeed(stepperMaxSpeed);
  leftStepper.setAcceleration(stepperAcceletation);
}

// Scoop di loop
void loop() {
  // Read data from the serial connection
  recvWithStartEndMarkers();
  if (newData == true) {
    strcpy(tempChars, receivedChars);
    // this temporary copy is necessary to protect the original data
    // because strtok() used in parseData() replaces the commas with \0
    parseData();
    showParsedData();
    if (strcmp(driveVal, "forward") == 0) {
      Serial.println("Moving forward");
      forward();
    } else if (strcmp(driveVal, "backward") == 0) {
      Serial.println("Moving backward");
      backward();
    } else if (strcmp(driveVal, "stop") == 0) {
      Serial.println("Stopping");
      stopSteppers();
    }
    // If none of the above, new movements for the steppers
    // will not be set, i.e. any other string is ignored
    if (turnVal != 0) {
      Serial.println("Turning!");
      turn(turnVal);
    }
    if (tiltVal != 0) {
      Serial.print("Tilting ");
      Serial.print(tiltVal);
      Serial.print(" degrees");
      servoGoalPos = pos + tiltVal; 
      if (servoGoalPos > servoMax) { servoGoalPos = servoMax; }
      if (servoGoalPos < servoMin) { servoGoalPos = servoMin; }
      Serial.print(", towards ");
      Serial.println(servoGoalPos);
    }
    newData = false;
  }

  if (pos != servoGoalPos) {
    if ((millis() - lastServoMove) > servoDelay)  //if more than servoDelay passed since the last servo move
    {
      tilt();
    }
  }

  rightStepper.run();
  leftStepper.run();
}

/********** Serial functions **********/
/*  Shamelessly aquired from the web  */
void recvWithStartEndMarkers() {
  static boolean recvInProgress = false;
  static byte ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();

    if (recvInProgress == true) {
      if (rc != endMarker) {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars) {
          ndx = numChars - 1;
        }
      } else {
        receivedChars[ndx] = '\0';  // terminate the string
        recvInProgress = false;
        ndx = 0;
        newData = true;
      }
    }

    else if (rc == startMarker) {
      recvInProgress = true;
    }
  }
}

void parseData() {  // split the data into its parts

  char* strtokIndx;  // this is used by strtok() as an index

  strtokIndx = strtok(tempChars, ",");  // get the first part - the string
  strcpy(driveVal, strtokIndx);         // copy it to messageFromPC

  strtokIndx = strtok(NULL, ",");  // this continues where the previous call left off
  turnVal = atoi(strtokIndx);      // convert this part to an integer

  strtokIndx = strtok(NULL, ",");
  tiltVal = atoi(strtokIndx);  // convert this part to a float
}

void showParsedData() {
  Serial.print("driveVal ");
  Serial.println(driveVal);
  Serial.print("turnVal ");
  Serial.println(turnVal);
  Serial.print("tiltVal ");
  Serial.println(tiltVal);
}

/********** Stepper functions **********/
/*   These should be selfexplanatory   */
void forward() {
  rightStepper.move(240000);
  leftStepper.move(240000);
}

void backward() {
  rightStepper.move(-240000);
  leftStepper.move(-240000);
}

void stopSteppers() {
  rightStepper.stop();
  leftStepper.stop();
}

/*
Calculates the number of steps a pair of stepper motor configured in 
differential steering need to step to rotate the chassis the given 
angle in degrees.
Then it sets the servos to move tha calculated amount of whole steps. 
TODO: Clean this calculation: There is no need to go from degrees to radians and back again...
*/
void turn(int degrees) {
  int deg = degrees;  // Degrees you wish to rotate (positive is right, negative left)
  // Stepper consts
  float steps = 400.0;            // No. steps in stepper motor (INTERLEAVE setting)
  float d_steps = 360.0 / steps;  // rotation per step.

  // Calculating distance the wheels need to travel to rotate deg
  float r = deg / 180.0 * PI;  // calculate radians from degrees
  float d = r * w;             // calculate distance both wheels need to travel
  float left = d / 2;          // calculate distance for left wheel
  float right = -left;         // right wheel is reverse of left wheel
  // Calculating the angle the wheels need to rotate for the previously calculated distance
  float angR = left / rad;           // angle wheels need to rotate in radians
  float angD = angR * (180.0 / PI);  // angle wheels need to rotate in degrees

  float stepsToTurn = angD / d_steps;  // Calculate no. steps each wheel need to turn
  int leftSteps = floor(stepsToTurn + 0.5);
  int rightSteps = floor(-stepsToTurn + 0.5);

  Serial.print("Wheels go brrrrr ");
  Serial.print(leftSteps);
  Serial.println(" steps");

  leftStepper.move(leftSteps);
  rightStepper.move(rightSteps);
}

/********** Servo functions **********/

/*
Move the servo one step in the direction of servoGoalPos
*/
void tilt() {
  Serial.println("Tilting one step");
  servo.write(pos);
  lastServoMove = millis();  //reset the timer
  if (pos < servoGoalPos) {
    pos += 1;
  } else {
    pos -= 1;
  }
}
