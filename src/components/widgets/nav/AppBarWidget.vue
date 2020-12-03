<template>
  <div class="app_bar_widget">
    <h1 class="h_title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  created() {
    this.title = this.$router.currentRoute.value.name;
  }
};
</script>

<style scoped>
.app_bar_widget {
  width: 440px;
  height: 60px;
  display: block;
  box-shadow: 0px 3px 5px rgba(255, 255, 255, 0.6);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: auto;
  margin-right: auto;
}

.h_title {
  margin: 0;
  font-weight: normal;
  font-size: 25px;
  line-height: 60px;
  color: #ffffff;
}
</style>
