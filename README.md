# Jaguar XF Canbus Decoding/linux integration

This project is designed to replace the integrated touchscreen in the X250 Jaguar XF. This app is designed to be used with an android auto
 wrapper (I recommend [intelligent auto](https://github.com/rsjudka/intelligent-auto))
 
 The latest video can be found here [XF CAN example](https://youtu.be/o7TGF2G8eGw)

## Hardware

* [RaspberryPi](https://amzn.to/2YzyQFy)
* [Waveshare dual CAN hat](https://www.amazon.co.uk/gp/product/B087RJ6XGG/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=moderndaymods-21&creative=6738&linkCode=as2&creativeASIN=B087RJ6XGG&linkId=662e77515a6937152bd372c51583c015)
* [Pi Cooler](https://thepihut.com/collections/raspberry-pi-cases/products/xl-raspberry-pi-4-heatsink)
* [Tall case](https://www.amazon.co.uk/gp/product/B06XT1JKLQ/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B06XT1JKLQ&linkId=95302a60fbd83f0d1ab4686599abd6f5)
* [USB-C Power Adapter](https://www.amazon.co.uk/gp/product/B076DYMV8N/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B076DYMV8N&linkId=0c85fe20d4c1a169f672971b6eac8dd8)
* [Display](https://www.amazon.co.uk/gp/product/B014WKCFR4/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B014WKCFR4&linkId=ce6127af5a1139aa3a3460b834504d73)
* [Power Cable](https://www.amazon.co.uk/gp/product/B07RN3KCC6/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B07RN3KCC6&linkId=fbb2b3f0efb9a041bc7c39654bcdfa8f)
* [Display Micro USB power](https://www.amazon.co.uk/gp/product/B07L1HDW4P/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B07L1HDW4P&linkId=0fa35a25e9de8b1ec861b8e5339552fa)
* [Long Screen Cable](https://www.amazon.co.uk/gp/product/B00XW2NCKS/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B00XW2NCKS&linkId=ab6fa66d9e313e1bc88254b478a3d73e)
* [OBD Socket](https://www.amazon.co.uk/gp/product/B07LG2GD9R/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B07LG2GD9R&linkId=597523c3c786725a344a7d24af97c762)
* [SD Card](https://www.amazon.co.uk/gp/product/B06XFSZGCC/ref=as_li_tl?ie=UTF8&tag=moderndaymods-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B06XFSZGCC&linkId=80c96523b944947f7c4ab73af5d3bcb3)


## Installing

install the Waveshare can hat


Boot up the pi, install can utils

```
sudo apt-get -y install can-utils libsocketcan2 libsocketcan-dev
```

modify /boot/config.txt add this to the end

```
#CAN bus controllers
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=23
dtoverlay=mcp2515-can1,oscillator=16000000,interrupt=25
```

Reboot

Bring up the can0 interface

```
sudo /sbin/ip link set can0 up type can bitrate 125000 //highspeed can for engine comms is 500000 baud
sudo /sbin/ip link set can0 up type can bitrate 500000
```

To allow the CAN channels to come up on boot, modify rc.local

```sudo nano /etc/rc.local```

Paste before the end

```
sudo /sbin/ip link set can0 up type can bitrate 125000
sudo /sbin/ip link set can0 up type can bitrate 500000
```

## Wiring the connector

To communicate to the canbus through the obd2 port, you need to solder two connections to the obd plug, one will go on pin 3 (CAN High) the other will go to pin 11 (CAN Low), these then wire to the corresponding terminal on the piHAT, ensure the polarity is correct and the pins are correct.

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

## Launching the app

With both can channels up and active, navigate to the ```/install``` folder, in here will be a file called jag-hu.AppImage, to run type in the terminal ```./jag-hu.AppImage```

## Built using

https://github.com/sebi2k1/node-can

## everything is done at your own risk
