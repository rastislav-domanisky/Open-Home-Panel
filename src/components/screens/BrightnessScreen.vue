<template>
  <div class="brightness_screen">
    <app-bar-widget></app-bar-widget>
    <left-bar-widget></left-bar-widget>
    <right-bar-widget></right-bar-widget>
    <div class="content">
      <spinner-widget v-show="!isLoaded" class="spinner"/>
      <h1 v-show="isLoaded">{{value + ""}}</h1>
      <input type="range"
      v-show="isLoaded"
      class="slider"
      name="myVolume"
      id="myVolume"
      v-model="value"
      step="1"
      min="15"
      max="255"
      >
      <button class="save-btn" v-on:click="setBrightness">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SpinnerWidget from '../widgets/ui/SpinnerWidget.vue'
export default {
  components: { SpinnerWidget },
  data() {
    return {
      isLoaded: false,
      value: 30,
    }
  },
  methods: {
    setBrightness() {
      axios
        .post("http://"+this.serverIp+":3000/brightness", {
          "brightness": parseInt(this.value)
        }, {
          headers: {
            "API-KEY": "openhomepanel123",
            "Content-Type": "application/json",
          },
        })
        .then(
          (response) => {
            console.log(response.data);
          },
          () => {
            console.log("volume: Cannot set brightness");
          }
        );
    }
  },
  created() {
    axios
      .get("http://"+this.serverIp+":3000/get_brightness", {
        headers: {
          "API-KEY": "openhomepanel123",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.value = response.data;
          this.isLoaded = true;
        },
        () => {
          console.log("get_volume: Cannot load volume");
          this.isLoaded = false;
        }
      );
  }
}
</script>

<style scoped>
.brightness_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

#myVolume {
  margin-top: 50px;
  width: 300px;
  background: #2A2E37;
}

.spinner {
  margin-top: 60px
}

h1 {
  color: #fff;
  font-size: 2em;
  font-weight: 200;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #fff;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #fff;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.save-btn {
  background: #27ae60;
  border: solid 2px #27ae60;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  outline: none;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.save-btn:active {
  color: #27ae60;
  background: #2a2e37;
}

.content {
  padding-top: 20px;
  width: 400px;
  height: 250px;
  background: #353941;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.3),
    3px 3px 5px rgba(0, 0, 0, 0.5);
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  margin-bottom: 10px;
  border-radius: 30px;
  text-align: center;
  border-radius: 20px;
}
</style>