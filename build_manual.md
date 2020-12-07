# Open Home Panel 
Custom build manual

### Dependencies:
* Raspberry Pi 3
* Raspberry Pi 7 inch touchscreen
* Internet connection
* digital therm sensor


### Installation

[Downlaod Raspberry Pi Images](https://www.raspberrypi.org/software/)
make bootable SD-CARD with Raspberry Pi OS Lite (only CLI)
connect raspberry to Ethernet

```bash
sudo raspi-config
```
	- GPU memory = 128
	- password = openhomepanel
	- enable GPIO
	- enable SSH
	- enable 1-wire
	- disable/enable Underscan/Overscan (remove black bars on screen sides) !!!
	- autologin to console
	- WLAN setup
reboot

- setup static IP for Raspberry Pi on your Wi-Fi router (recomended) 

- rotate screen (not required)
```bash
sudo nano /boot/config.txt
```
add line to end: **lcd_rotate=2**
reboot

Update & Upgrade system
```bash
sudo apt-get update
sudo apt-get upgrade
```
create project folder in user (pi) home directory
```bash
mkdir ohp
cd ohp
```
install git
```bash
sudo apt-get install git
```
Download ohp-server
```bash
git clone https://github.com/rastislav-domanisky/ohp-server.git
```
read [OHP-server manual](https://github.com/rastislav-domanisky/ohp-server)

install Node.js
```bash
sudo apt-get install nodejs npm
```

download [Open Home Panel](https://github.com/rastislav-domanisky/Open-Home-Panel) to "ohp" project directory
```bash
git clone https://github.com/rastislav-domanisky/Open-Home-Panel.git
cd Open-Home-Panel
```
update npm
```bash
sudo npm install -g npm
```
install npm dependencies
```bash
sudo npm install
```
build project
```bash
npm run build
```
```bash
sudo apt-get install xserver-xorg-video-all xserver-xorg-input-all \
     xserver-xorg-core xinit x11-xserver-utils
```
```bash
sudo apt-get install chromium-browser
sudo apt-get install unclutter
```
Create autostart.sh file in project directory (/home/pi/ohp/)
```bash
nano autostart.sh
```
add text
```
#!/bin/sh
xset s 0 0
xset s off
xset s noblank
xset -dpms

unclutter -idle 0 &
chromium-browser http://localhost:80 \
    --start-fullscreen --kiosk --incognito --noerrdialogs \ 
    --disable-translate --no-first-run --fast --fast-start \
    --disable-infobars --disable-features=TranslateUI \
    --disk-cache-dir=/dev/null --password-store=basic --overscroll-history-navigation=0 --disable-features="TouchpadOverscrollHistoryNavigation"
```
Create file .bash_profile
```bash
nano /home/pi/.bash_profile
```
add text
```bash
startx
```
Create file .xinitrc
```bash
nano /home/pi/.xinitrc
```
add text
```bash
bash /home/pi/ohp/autostart.sh
```
Install web server
```bash
sudo apt-get install apache2
sudo rm /var/www/html/index.html
sudo cp -a /home/pi/ohp/Open-Home-Panel/dist/. /var/www/html/
sudo cp /home/pi/ohp/ohp-server/ohp-server.service /etc/systemd/system/ohp-server.service
sudo systemctl start ohp-server.service
sudo systemctl enable ohp-server.service
sudo service apache2 start
sudo update-rc.d apache2 enable
```

If you dont have touchscreen ... you can use web browser... but you have to change property in /var/www/http/js/app.js

find: 
```javascript
Fn.config.globalProperties.serverIp = "localhost"
```
and change "localhost" to raspberry ip adress

or you can do it before build Open-Home-Panel in /home/pi/ohp/Open-Home-Panel/src/main.js
