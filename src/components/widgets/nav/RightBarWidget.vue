<template>
  <div class="right_bar_widget">
    <bar-btn option="switches"></bar-btn>
    <bar-btn option="brightness"></bar-btn>
    <bar-btn option="lock"></bar-btn>
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
.right_bar_widget {
    position: absolute;
    right: 0;
    top: 100px;
    width: 80px;
    height: 300px;
    display: block;
    box-shadow: -3px 0px 5px  rgba(255, 255, 255, 0.6);
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
}
</style>
