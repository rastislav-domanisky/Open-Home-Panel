<template>
  <div class="apps_screen">
    <app-bar-widget></app-bar-widget>
    <left-bar-widget></left-bar-widget>
    <right-bar-widget></right-bar-widget>
    Apps will be available in the next release.
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.apps_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}
</style>