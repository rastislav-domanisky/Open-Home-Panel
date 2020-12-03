<template>
  <div class="bar_btn">
    <router-link :to="'/' + btnPath">
      <img :src="this.img" alt="BarBtn" class="bar_btn_icon">
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
      return {
        img: "",
        btnPath: "",
      }
  },
  props: ['option'],
  methods: {
    imgMaker: function() {
      this.img = require('../../../assets/images/icon_' + this.btnPath + '.svg');
    }
  },
  beforeMount() {
    if(this.$route.path != "/home" && this.option == "apps") {
      this.btnPath = "home";
    } else {
      this.btnPath = this.option;
    }
    this.imgMaker();
  }
}
</script>

<style scoped>
.bar_btn {
    background: #353941;
    box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.5);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 35px auto 35px auto;
}

.is_Active {
  background: #1d1f22;
}

.bar_btn_icon {
  width: 22.5px;
  height: 22.5px;
  margin-top: 12px;
}
</style>