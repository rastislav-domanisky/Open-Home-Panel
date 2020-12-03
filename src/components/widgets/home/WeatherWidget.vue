<template>
  <div class="weather_widget" v-show="show">
    <div class="weather_area">
      <p class="h">{{wCity}}</p>
      <div class="w-left">
        <img :src='"http://openweathermap.org/img/w/" + wIcon +".png"' alt="" class="w_icon">
        <p class="w_main">{{wMain}}</p>
      </div>
      <div class="w_m">
        <p class="w_temp">{{wTemp}}</p>
      </div>
      <div class="w-right">
        <div class="w1">
          <p class="w_txt">Max temp:</p>
          <p class="w_txt">Min temp:</p>
          <p class="w_txt">Humidity:</p>
        </div>
        <div class="w2">
          <p class="w_txt">{{wMaxTemp}}</p>
          <p class="w_txt">{{wMinTemp}}</p>
          <p class="w_txt">{{wHumidity}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      wIcon: "",
      wMain: "",
      wTemp: "",
      wMaxTemp: "",
      wMinTemp: "",
      wHumidity: "",
      wCity: "",
      wMark: "",
      show: false,
    };
  },
  methods: {
    getAPIkey: function () {
        axios.get("http://"+this.serverIp+":3000/get_OWM_data", {
          headers: { 'API-KEY': "openhomepanel123" },
        })
        .then(
          (response) => {
            let data = response.data;
            this.getWeather(data);
            this.$options.timer = window.setTimeout(this.getAPIkey, 300000);
          },
          (response) => {
            console.log("get_OWM_data: " + response.data);
            this.show = false;
            this.$options.timer = window.setTimeout(this.getAPIkey, 10000);
          }
        );
    },

    getWeather: function (data) {
        if(data[0] == "metric") {
          this.wMark = " °C";
        } else {
          this.wMark = " °F";
        }
        axios.get(
          "http://api.openweathermap.org/data/2.5/weather?q="
          + data[1] + "&appid=" + data[2] + "&units=" + data[0]
        )
        .then(
          (response) => {
            let data = JSON.stringify(response.data);
            data = JSON.parse(data);
            this.wIcon = data["weather"][0]["icon"];
            this.wMain = data["weather"][0]["main"];
            this.wTemp = Math.round(data["main"]["temp"]) + this.wMark;
            this.wMaxTemp = Math.round(data["main"]["temp_max"]) + this.wMark;
            this.wMinTemp = Math.round(data["main"]["temp_min"]) + this.wMark;
            this.wHumidity = Math.round(data["main"]["humidity"]) + ' %';
            this.wCity = "Weather in " + data["name"];
            this.show = true;
          },
          (response) => {
            console.log("Weather data failed: " + response.data);
            this.show = false;
          }
        );
    },
  },
  beforeMount() {
    this.getAPIkey();
  },
  beforeUnmount() {
    window.clearTimeout(this.$options.timer);
  },
};
</script>

<style scoped>
.weather_widget {
  position: relative;
  background: #353941;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.3),
    3px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 500px;
  height: 150px;
  display: inline-block;
}

.h {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  line-height: 8px;
}

.w-left {
  display: inline-block;
  width: 100px;
  margin-top: -40px;
}

.w_icon {
  width: 80px;
}

.w_main {
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #FFFFFF;
  margin-top: -10px;
}

.w_m {
  display: inline-block;
  margin-left: 20px;
  margin-right: 40px;
  vertical-align: top;
  margin-top: -20px;
}

.w_temp {
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  display: block;
  color: #FFFFFF;
  height: 20px;
}

.w-right {
  display: inline-block;
  width: 180px;
  text-align: center;
}

.w1 {
  display: inline-block;
}

.w2 {
  display: inline-block;
  width: 60px;
}

.w_txt {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 10px;
  text-align: right;
  color: #FFFFFF;
}

.c {
  color: #FFF;
  font-weight: 200;
  font-size: 0.7em;
  display: block;
}

</style>