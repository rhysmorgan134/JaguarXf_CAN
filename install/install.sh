#! /bin/bash

VALUE=$(sed '2q;d'  "/home/pi/.openauto/config/openauto_applications.ini")
COUNT=${VALUE:6:1}
COUNT=$(COUNT+1)
APP=$(cat <<-END
[Application_plh]
Name=jag
Path=/home/pi/Desktop/open
IconPath=/home/pi/Documents/JaguarXf_CAN/install/jag.jpg
Arguments=
Autostart=false
END
)

NEW="${APP/plh/$COUNT}"
echo -e $NEW >> "/home/pi/.openauto/config/openauto_applications.ini"
echo $COUNT
