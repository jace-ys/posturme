#Python 3.5.2 ( default, Sep 27 2018, 17:25:39)
#[GCC g.3.0 20170516] on linux
#Type "copyright", "credits" or "license()" for more information"
import time
import serial
import RPi.GPIO as GPIO

#To enable google pubsub
from google.cloud import pubsub_v1
import json

#Project and topic variables
project_id = "ichealthhack19"
topic_name = "posturme"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)

#Define the call back
def callback(message_future):
    # When timeout is unspecified, the exception method waits indefinitely.
    if message_future.exception(timeout=30):
        print('Publishing message on {} threw an Exception {}.'.format(
            topic_name, message_future.exception()))
    else:
        print(message_future.result())

#Convert bytes to an int
def bytes_to_int(bytes):
    result = 0
    for b in bytes:
            result = result*256 + int(b)
    return result

#Reading the serial port and initialising the arrays
ser = serial.Serial("/dev/ttyACM0", 9600)
ser.baudrate=9600
fposture = []
xposture = []
zposture = []
av = []
pos = []
avg = 0

while True:
    read_ser = ser.readline()

    f,x,z = read_ser.split()
    fnew = bytes_to_int(f) - 48
    xnew = bytes_to_int(x) - 48
    znew = bytes_to_int(z) - 48

    fposture.append(fnew)
    xposture.append(xnew)
    zposture.append(znew)

    print(len(fposture), len(xposture), len(zposture))
    print(fnew,xnew,znew)
    if(len(fposture) >= 30):
        av.append(sum(fposture)/len(fposture))
        av.append(sum(xposture)/len(xposture))
        av.append(sum(zposture)/len(zposture))

        for x in range (0,3):
            if(av[x] < 0.5):
                pos.append(False)
            else:
                pos.append(True)

        fposture = []
        zposture = []
        xposture = []

        print(pos[0], pos[1], pos[2])
        #Compile the json
        data = json.dumps({ "flex": pos[0], "xAcel": pos[1], "zAcel": pos[2]});

        # Data must be a bytestring
        data = data.encode('utf-8')
        # When you publish a message, the client returns a Future.
        message_future = publisher.publish(topic_path, data=data)
        message_future.add_done_callback(callback)
        #test
        time.sleep(1)
        av = []
        pos = []

    print('Published message IDs:')

# We must keep the main thread from exiting to allow it to process
# messages in the background.
while True:
    time.sleep(60)

sys.exit(1)
