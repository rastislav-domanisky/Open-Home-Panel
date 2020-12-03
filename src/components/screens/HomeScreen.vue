<template>
  <div class="home_screen">
    <app-bar-widget></app-bar-widget>
    <left-bar-widget></left-bar-widget>
    <right-bar-widget></right-bar-widget>
    <div class="dashboard">
      <time-date-widget></time-date-widget>
      <widget-divider></widget-divider>
      <temperature-widget></temperature-widget>
      <div class="horizontal_divider"></div>
      <weather-widget></weather-widget>
    </div>
  </div>
</template>

<script>
import TimeDateWidget from "../widgets/home/TimeDateWidget";
import TemperatureWidget from "../widgets/home/TemperatureWidget";
import WidgetDivider from '../widgets/home/WidgetDivider';
import WeatherWidget from "../widgets/home/WeatherWidget";

export default {
  components: {
    "time-date-widget": TimeDateWidget,
    "temperature-widget": TemperatureWidget,
    "widget-divider": WidgetDivider,
    "weather-widget": WeatherWidget
  },
}
</script>

<style scoped>
.home_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

.dashboard {
  width: 600px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 30px;
}

.horizontal_divider {
    height: 30px;
    width: 100px;
    display: block;
}
</style>