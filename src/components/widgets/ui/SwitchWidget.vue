<template>
  <div class="switch_widget">
    <div class="d-btn" v-on:click="remove">
      <img :src="img" alt="delete" class="d-img" />
    </div>
    <p class="h">{{ swData["name"] }}</p>
    <div class="ohp_switch" @click="onChangeEventHandler">
      <div class="ohp_switch_circle" :class="{ active: swState }"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      swState: this.swData["state"],
      img: "",
    };
  },
  props: ["swData", "id"],
  methods: {
    remove() {
      axios
        .post(
          "http://" + this.serverIp + ":3000/delete_switch",
          {},
          {
            headers: {
              "API-KEY": "openhomepanel123",
              "Content-Type": "application/json",
            },
            params: {
              index: this.id,
            },
          }
        )
        .then(
          () => {
            this.$router.go();
          },
          () => {
            console.log("Cannot delete switch");
          }
        );
    },
    onChangeEventHandler: function () {
      let newState;
      if (this.swState == false) {
        newState = true;
      } else {
        newState = false;
      }
      //Start
      axios
        .post(
          "http://" + this.serverIp + ":3000/switch",
          {},
          {
            headers: {
              "API-KEY": "openhomepanel123",
            },
            params: {
              index: this.id,
              state: newState,
            },
          }
        )
        .then(
          (response) => {
            this.swState = newState;
            console.log(response.data);
          },
          (response) => {
            console.log("switch: " + response.data);
          }
        );

      //End
    },
  },
  beforeMount() {
    this.img = require("../../../assets/images/icon_delete.svg");
  },
};
</script>

<style scoped>
.switch_widget {
  width: 220px;
  height: 140px;
  background: #353941;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.3),
    3px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: center;
}

.h {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  line-height: 8px;
  margin-bottom: 30px;
  display: block;
}

.ohp_switch {
  width: 80px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.3),
    2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.3),
    inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
}

.ohp_switch_circle {
  width: 25px;
  height: 25px;
  border-radius: 30px;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  top: 5px;
  float: left;
  background: #ffffff;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.3),
    2px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 360px;
}

.active {
  float: right;
}

.d-btn {
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 180px;
  z-index: 2;
  display: block;
  margin-bottom: -30px;
  border-radius: 360px;
  width: 30px;
  height: 30px;
}

.d-btn:active {
  background-color: rgba(255, 255, 255, 0.3);
  outline: none;
}

.d-img {
  margin-top: 5px;
}
</style>