# Open Home Panel

Smart home controller for Raspberry Pi


![Fullstack React](https://github.com/rastislav-domanisky/Open-Home-Panel/blob/master/ohp_img1.JPG) <br>





## Dependencies

* Raspberry Pi OS Lite
* Internet connection
* [Raspberyy Pi 7 inch touchscreen](https://www.raspberrypi.org/products/raspberry-pi-touch-display/?resellerType=home)
* [Open Home Panel sever](https://github.com/rastislav-domanisky/Open-Home-Panel/releases/download/v1/ohp_img2.JPG)

## Download Release
[Download latest release](https://github.com/rastislav-domanisky/Open-Home-Panel/releases/tag/v1)

### Use mobile app
[OHP-Controller](https://github.com/rastislav-domanisky/OHP-Controller)

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

## Custom build
[Manual](https://github.com/rastislav-domanisky/Open-Home-Panel/blob/master/build_manual.md)
