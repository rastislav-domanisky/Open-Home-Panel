<template>
  <div class="temperature_widget">
    <p class="h">Temperature</p>
    <p class="current_temp">{{ temp }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      temp: "",
    };
  },
  methods: {
    getTemp() {
      axios.get("http://"+this.serverIp+":3000/get_temp", {
        headers: {
          "API-KEY": "openhomepanel123"
        }
      }).then(
          (response) => {
            this.temp = response.data;
          },
          () => {
            this.temp = "--";
          }
        );
    }
  },
  mounted() {
    this.getTemp();
    //this.$options.timer = window.setTimeout(this.getTemp, 60000);
  },
  beforeUnmount() {
    //window.clearTimeout(this.$options.timer);
  },
};
</script>

<style scoped>
.temperature_widget {
  position: relative;
  background: #353941;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.3),
    3px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 220px;
  height: 130px;
  display: inline-block;
  vertical-align: top;
}

.h {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  line-height: 8px;
}

.current_temp {
  font-style: normal;
  font-weight: bold;
  font-size: 38px;
  color: #ffffff;
  line-height: 20px;
}
</style>