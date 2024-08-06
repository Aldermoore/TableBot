

def number_remapper(x: int, in_min: int, in_max: int, out_min: int, out_max: int):
    p = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    if(p > out_max):
        p = out_max
    if(p < out_min):
        p = out_min
    return p

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

def find_leds(pos, num):
    num = int(num)
    print("finding LEDS for position", pos, "with", num, "LEDS lighting up")
    led = number_remapper(pos,0,24,0,12)
    print(led)
    # leds_to_be_on = [led]
    leds_to_be_on = calc_leds(led,num)
    print("leds found", leds_to_be_on, "checking for out of bounds...")
    leds_to_be_on[:] = [tup for tup in leds_to_be_on if determine(tup)]
    print("leds to light up", leds_to_be_on)
    return leds_to_be_on

"""helper function to check in an LED index is out of bound."""
def determine(val: int) -> bool: 
    if val < 0 or val > 12:
        return False
    else: return True



if __name__ == "__main__":
    assert find_leds(5,4) == [1,2,3,4]
    assert find_leds(12,3.25) == [5,6,7]
    assert find_leds(17,6) == [6,7,8,9,10,11]
    assert find_leds(24,5) == [10,11,12]
    assert find_leds(11,2) == [5,6]
    assert find_leds(1,2) == [0,1]
    assert find_leds(1.2,4) == [0,1,2]
    find_leds(20, 4.75)

    
    exit(0)
