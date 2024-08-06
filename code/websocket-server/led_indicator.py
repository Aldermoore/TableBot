#!/usr/bin/env python3
"""
Code for controlling the LED strip on TableBot 2.  
"""
import threading
import ctypes
import time
import board
import neopixel
from itertools import filterfalse

##### VARIABLES TO CALIBRATE #####
led_delay = 0.3 # Maybe the led delay needs to be dynamic as the robot moves, since it accelerates and decelerates...
##### END OF CALIBRATION #####

# Queue to hold the current thread
movement_queue = []

# pixels = [0,1,2,3,4,5,6,7,8,9,10,11,12] # this is only here for test reasons

minDeg = -90
maxDeg = 90
num_led = 13
old_leds_to_be_on = []

pixel_pin = board.D21
order = neopixel.GRB
pixels = neopixel.NeoPixel(pixel_pin, num_led, brightness = 0.5, pixel_order = order)

pixels.fill((10,10,10))

"""
Shows the pilot's gaze / locus of attention when using shift+mouse_over
"""
def show_gaze(pos: int, led_num: int, led_state: bool): 
    #led = number_remapper(pos,0,24,0,12)
    led = pos
    print("step 1", led)
    led_num = int(led_num)
    leds = calc_leds_to_be_on(led, led_num)
    print("step 2", leds)
    turn_on_leds(leds, led_state)

"""
Lights of the specificed LEDs
"""
def turn_on_leds(leds_to_be_on, led_state):
    global old_leds_to_be_on
    print(leds_to_be_on)
    if(leds_to_be_on != old_leds_to_be_on):
        old_leds_to_be_on = leds_to_be_on
        pixels.fill((10,10,10))
        for p in leds_to_be_on:
            pixels[p] = (210, 210, 210)
            
    elif(leds_to_be_on == old_leds_to_be_on and led_state == True):
        pixels.fill((10,10,10))
        for p in leds_to_be_on:
            pixels[p] = (210, 210, 210)


"""
Calculates which LEDs should be on as specificed by which LED is in the center, and how many LEDs to turn on in total. Will always be an odd number as one LED must be in the center. 
"""
def calc_leds_to_be_on(led: int, led_num: int):
    if(led >= num_led):
        led = num_led-1
    if(led < 0):
        led = 0
    leds_to_be_on = calc_leds(led,led_num)
    # Limiting the leds to be within the led-strip, so some values might be cut off if we are near the end of the strip! 
    leds_to_be_on[:] = [tup for tup in leds_to_be_on if determine(tup)]
    return leds_to_be_on

"""helper function to check in an LED index is out of bound."""
def determine(val: int) -> bool: 
    if val < 0 or val > num_led-1:
        return False
    else: return True

"""
Animates the LED strip from the LED closest to degrees [-90, 90] so that the number of LEDs specificed by led_num, rounded up to an odd number, lights up. The LEDs that light up gradually shifts towards the center led_num LEDs over a duration of 1700ms. 
"""
def show_direction_when_turning(degrees: int, led_num: int, led_state: bool): 
    global pixels
    led = number_remapper(degrees, minDeg, maxDeg, 0, 12)
    print(led)
    led_num = int(led_num)
    delay = calculate_delay(led)

    leds_to_be_on = calc_leds_to_be_on(led, led_num)
    turn_on_leds(leds_to_be_on, led_state)
   
    while(int(led) != int(num_led/2)):
        if (int(led) < num_led/2):
            led +=1 # moving to the right
            leds_to_be_on = calc_leds_to_be_on(led, led_num)
        elif (int(led) > num_led/2):
            led -=1 # moving to the left
            leds_to_be_on = calc_leds_to_be_on(led, led_num)
        print(led)
        
        turn_on_leds(leds_to_be_on, led_state)
        time.sleep(delay)


"""
Maps x from between in_min and in_max, to be the same relative place between out_min and out_max. The remapped value is constrainted to the range [out_min, out_max]
"""
def number_remapper(x: int, in_min: int, in_max: int, out_min: int, out_max: int):
    p = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    if(p > out_max):
        p = out_max
    if(p < out_min):
        p = out_min
    return p

"""
Calculates which LEDs should be on given the led and number of leds to light up. 
"""
def calc_leds(direction, led_num): 
    if(led_num == 1): 
        out = [0]
        out[0] = int(direction)
    elif(led_num == 2): 
        out = [0] * 2
        out[0] = int(direction)
        out[1] = int(direction+0.5)
        if out[0] == out[1]: 
            out[1] = out[1]+1
    elif(led_num == 3): 
        out = [0] * 3
        out[1] = int(direction)
        out[0] = out[1]-1
        out[2] = out[1]+1
    elif(led_num == 4):
        out = [0] * 4
        out[1] = int(direction)
        out[2] = int(direction+0.5)
        if out[1] == out[2]: 
            out[2] = out[2]+1
        out[0] = out[1]-1
        out[3] = out[2]+1
    elif(led_num == 5): 
        out = [0] * 5
        out[2] = int(direction)
        out[1] = out[2]-1
        out[0] = out[1]-1
        out[3] = out[2]+1
        out[4] = out[3]+1
    elif(led_num == 6): 
        out = [0] * 6
        out[2] = int(direction)
        out[3] = int(direction+0.5)
        if out[2] == out[3]: 
            out[3] = out[3]+1
        out[1] = out[2]-1
        out[0] = out[1]-1
        out[4] = out[3]+1
        out[5] = out[4]+1
    elif(led_num == 7): 
        out = [0] * 7
        out[3] = int(direction)
        out[2] = out[3]-1
        out[1] = out[2]-1
        out[0] = out[1]-1
        out[4] = out[3]+1
        out[5] = out[4]+1
        out[6] = out[5]+1
    return out


"""
Calculates the delay between each shift in light-up LEDs based on how many shifts are needed. The duration is always 1700ms. 
"""
def calculate_delay(led_on: int): 
    number_of_leds = int(abs(num_led/2 - led_on)+0.5) # Rounding up and casting to int. 
    if (number_of_leds == 0):
        number_of_leds = 1
    delay = 1.7 / number_of_leds # The total time is always 1,7 seconds, so the delay is this amount split between the number of LEDs to be on. 
    return delay

"""
Main method to call when animating the LED strip when point-and-click rotating the view.
"""
def move(degree, led_num, led_state):
  if movement_queue:
    last_movement = movement_queue.pop()
    last_movement.raise_exception()
    last_movement.join()
  t1 = thread_with_exception('Thread 1', degree, led_num, led_state)
  t1.setDaemon(True)
#   t1.daemon = True
  movement_queue.append(t1)
  t1.start()  
  
"""
Method for turning the LEDs off
"""
def turn_LEDs_off():
    pixels.fill((10,10,10))

"""
Thread class for multitreaded control of an LED strip
"""
class thread_with_exception(threading.Thread):
    def __init__(self, name, degree, led_num, led_state):
        threading.Thread.__init__(self)
        self.name = name
        self.degree = degree
        self.led_num = led_num
        self.led_state = led_state
             
    def run(self):
        show_direction_when_turning(self.degree, self.led_num, self.led_state)
          
    def get_id(self):
        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for id, thread in threading._active.items():
            if thread is self:
                return id
  
    def raise_exception(self):
        thread_id = self.get_id()
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id,
              ctypes.py_object(SystemExit))
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
            print('Exception raise termination')

if __name__ == '__main__': 
    show_gaze(4, 4)
    exit(0)
