# Open Home Panel

Smart home controller for Raspberry Pi

## Dependencies

* Raspberry Pi OS Lite
* Internet connection
* Raspberyy Pi 7 inch touchscreen
* Open Home Panel sever

## Download Release
[Download latest release](https://github.com/rastislav-domanisky/Open-Home-Panel/releases/tag/v1)

##### Make bootable SD-CARD
https://www.raspberrypi.org/software/
or
https://www.balena.io/etcher/

##### Configuration

edit config file: /home/pi/ohp/ohp-server/config.json
check [ohp-server documentation](https://github.com/rastislav-domanisky/ohp-server)
* default password = "openhomepanel"
* default PIN = "1234"
* add [Open Weather Map](https://openweathermap.org/1) API key

##### Temperature sensor
[Documentation](https://pypi.org/project/w1thermsensor/)