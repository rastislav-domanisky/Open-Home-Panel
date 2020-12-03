<template>
  <div class="left_bar_widget">
    <bar-btn option="apps"></bar-btn>
    <bar-btn option="volume"></bar-btn>
    <bar-btn option="settings"></bar-btn>
  </div>
</template>

<script>
import BarBtn from "../buttons/BarBtn";

export default {
  components: {
    "bar-btn": BarBtn
  }
}
</script>

<style scoped>
.left_bar_widget {
    position: absolute;
    left: 0;
    top: 100px;
    width: 80px;
    height: 300px;
    display: block;
    box-shadow: 3px 0px 5px rgba(255, 255, 255, 0.6);
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
}
</style>
