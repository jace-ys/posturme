#Python 3.5.2 ( default, Sep 27 2018, 17:25:39)
#[GCC g.3.0 20170516] on linux
#Type "copyright", "credits" or "license()" for more information"
import time
import serial
import RPi.GPIO as GPIO

#To enable google pubsub
from google.cloud import pubsub_v1
import json

# #Setting the Serial port
# ser = serial.Serial("/dev/ttyACM0", 9600)
# #Speed of reading
# ser.baudrate=9600
# while True:
#     read_ser = ser.readline()
#     print(read_ser)
#
#     x,z = read_ser.split()
#     print(x, z)


#Project and topic variables
project_id = "ichealthhack19"
topic_name = "flex-sensor"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)

def callback(message_future):
    # When timeout is unspecified, the exception method waits indefinitely.
    if message_future.exception(timeout=30):
        print('Publishing message on {} threw an Exception {}.'.format(
            topic_name, message_future.exception()))
    else:
        print(message_future.result())

for n in range(1, 10000):
    if n%4 == 0:
        data = json.dumps({ "flex": True });
    else:
        data = json.dumps({ "flex": False });

    # Data must be a bytestring
    data = data.encode('utf-8')
    # When you publish a message, the client returns a Future.
    message_future = publisher.publish(topic_path, data=data)
    message_future.add_done_callback(callback)
    #test
    time.sleep(1)

print('Published message IDs:')

# We must keep the main thread from exiting to allow it to process
# messages in the background.
while True:
    time.sleep(60)

sys.exit(1)
