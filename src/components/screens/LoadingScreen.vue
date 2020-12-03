<template>
  <div class="loading_screen">
    <h1 class="heading">Open Home Panel</h1>
    <div class="progress_bar">
      <transition name="load" v-on:after-enter="enter">
        <div class="progress_indicator" v-show="ready"></div>
      </transition>
    </div>
  </div>
  <span class="author"> Author: Rastislav Domaniský </span>
  <span class="version"> version: 1.0 </span>
</template>

<script>
export default {
  data() {
    return {
      ready: false,
    };
  },
  methods: {
    enter: function () {
      this.$router.push({ path: "/home" });
    },
  },
  mounted() {
    this.ready = true;
  },
};
</script>

<style scoped>
.loading_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

span {
  color: #fff;
}

.heading {
  font-weight: bold;
  font-size: 50px;
  line-height: 68px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  margin-top: 15%;
}

.progress_bar {
  width: 300px;
  height: 15px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  background: #353941;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.3),
    2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.3),
    inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
}

.progress_indicator {
  width: 0%;
  height: 15px;
  background: #ffffff;
  border-radius: 30px;
}

.author {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 0.8em;
}

.version {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8em;
}

@keyframes loading-animation {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.load-enter-active {
  animation: loading-animation 4s forwards ease-in-out;
}
</style>
