# Jaguar XF Canbus Decoding/linux integration

Project to track the decoding of can bus messages, this is to allow custom control and data to/from the in car modules

## Hardware

* [RaspberryPi](https://www.amazon.co.uk/gp/product/B07BDR5PDW/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B07BDR5PDW&linkCode=as2&tag=rhysmorgan134-21&linkId=d3404d6b50251166481d1b5ee8acb8a8)
* [PiCan2](https://www.amazon.co.uk/gp/product/B07GJKPQX4/ref=as_li_tl?ie=UTF8&tag=rhysmorgan134-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B07GJKPQX4&linkId=72ab539f4dad52e6d56cec02f436fdb4)
* [OBD Socket](https://www.amazon.co.uk/gp/product/B01F6YGBX4/ref=as_li_tl?ie=UTF8&tag=rhysmorgan134-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B01F6YGBX4&linkId=c17d8a2ecc203f06040a1289ccf2ce94)
* [official Pi Screen](https://www.amazon.co.uk/gp/product/B014WKCFR4/ref=as_li_tl?ie=UTF8&tag=rhysmorgan134-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B014WKCFR4&linkId=eea68be93280562ce100b096f32b65a2)


## Installing

install the Pi2CAN hat


Boot up the pi, install can utils

```
sudo apt-get -y install can-utils libsocketcan2 libsocketcan-dev
```

modify /boot/config.txt add this to the end

```
#CAN bus controllers
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
dtoverlay=spi-bcm2835-overlay
```

uncomment this row

```
dtparam=spi=on
```

Reboot

Bring up the can0 interface

```
sudo /sbin/ip link set can0 up type can bitrate 125000 //highspeed can for engine comms is 500000 baud
```

End with an example of getting some data out of the system or using it for a little demo

## Wiring the connector

To communicate to the canbus through the obd2 port, you need to solder two connections to the obd plug, one will go on pin 3 (CAN High) the other will go to pin 11 (CAN Low), these then wire to the corresponding terminal on the piHAT, ensure the polarity is correct and the pins are correct. You do not need to wire anything to the 12V and  ground on the board, or use the DB9 connector.

## Receiving data

With the pi booted up, and SSH'd into, plug the connector to the OBD port, run this command 

```
ifconfig
```

you should see an interface called can0, if not re run this command 

```
sudo /sbin/ip link set can0 up type can bitrate 125000
```

to test data run 

```
candump can0
```

if the headunit is powered on, you will now be flooded with messages, ctr+c will stop the program. you have now successfully connected. To begin decoding messages, run

```
cansniffer can0
```

after a few seconds this will only display messages with changing values, around 10-20, if you begin to press buttons, the message will pop up as the values have changed, it is now just a case of figuring out what means what. if you run the command 

```
cansniffer
```

it will display help of extra parameters you can use to help in decoding.

## Sample program

Included in the git is a sample program that contains a nodeJS script that prints out when the skip buttons have been pressed on the center control panel (where the cd slot is) and also the volume control. To run this, make sure you have nodeJS and npm installed https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/ navigate to the /samples/NodeJS_IoT/AudioControls/ folder ensure can0 is up, if not re run the command above, then run 
```
npm install
```

once complete run

```
node index.js
```

terminal should remain blank, when the button is pressed it should log that the skip button or volume buttons have been pressed.


## Built using

https://github.com/sebi2k1/node-can

## everything is done at your own risk
