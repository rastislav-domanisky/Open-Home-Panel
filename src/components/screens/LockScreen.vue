<template>
  <div class="lock_screen">
      <div class="circles">
          <div class="circle" v-for="circle in pin.length" :key="circle" :class="{circledisabled: isDisabled(circle)}"></div>
      </div>
      <div class="k-board-area">
          <div class="k-borad-row">
              <div class="btn" v-on:click="inputFun('1')">1</div>
              <div class="btn" v-on:click="inputFun('2')">2</div>
              <div class="btn" v-on:click="inputFun('3')">3</div>
          </div>
          <div class="k-borad-row">
              <div class="btn" v-on:click="inputFun('4')">4</div>
              <div class="btn" v-on:click="inputFun('5')">5</div>
              <div class="btn" v-on:click="inputFun('6')">6</div>
          </div>
          <div class="k-borad-row">
              <div class="btn" v-on:click="inputFun('7')">7</div>
              <div class="btn" v-on:click="inputFun('8')">8</div>
              <div class="btn" v-on:click="inputFun('9')">9</div>
          </div>
          <div class="k-borad-row">
              <div class="btn" v-on:click="inputClear()">C</div>
              <div class="btn" v-on:click="inputFun('0')">8</div>
              <div class="btn btn-enter" v-on:click="inputFun('e')" :class="{unlocked: !isLocked, locked: isLocked}">
                  Enter
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        pin: "",
        lock_img: "",
        unlock_img: "",
        isLocked: true,
        input: "",
    };
  },
  created() {
    axios
      .get("http://"+this.serverIp+":3000/get_pin", {
        headers: {
          "API-KEY": "openhomepanel123",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.value = response.data;
          this.pin = response.data.toString();
        },
        () => {
          console.log("cannot load pin");
          this.pin = "";
        }
      );
  },
  methods: {
      inputCheck() {
          if(this.input == this.pin) {
              this.isLocked = false;
              setTimeout(() => {
                  this.$router.push({path: '/home'});
              }, 1000);
          }
          if(this.input.length >= this.pin.length) {
              this.inputClear();
          }
      },
      inputFun(num) {
          if(this.pin.length >= this.input.length) {
              this.input +=num;
          }
          this.inputCheck();
      },
      inputClear() {
          this.input = "";
      },
      getId(id) {
          console.log(id);
      },
      isDisabled(circle) {
        if(circle>this.input.length) {
            return true;
        } else {
            return false;
        }
      }
  },
  beforeMount() {
      this.lock_img = require('../../assets/images/icon_lock.svg');
      this.unlock_img = require('../../assets/images/icon_unlock.svg');
  }
};
</script>

<style scoped>
.lock_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

.circles {
    margin-top: 50px;
    width: 100%;
}

.circle {
    width: 20px;
    height: 20px;
    background: #FFF;
    border-radius: 360px;
    display: inline-block;
    margin: 10px;
}

.circledisabled{
    background: #7f8c8d;
}

.btn {
    width: 70px;
    height: 70px;
    border-radius: 360px;
    background: #FFF;
    display: inline-block;
    text-align: center;
    font-size: 1.7em;
    color: #2A2E37;
    font-weight: bold;
    line-height: 70px;
    margin-left: 15px;
    margin-right: 15px;
}

.btn-enter {
    font-size: 1.2em;
}

.btn:active {
    background: #2A2E37;
    color: #FFF;
    box-shadow: #FFF 1px 1px 5px;
}

.unlocked {
    background: #2ecc71;
}

.locked {
    background: #e74c3c;
}


.l-img {
    width: 30px;
    margin: 20px;
}

.k-board-area {
    margin-top: 30px;
    width: 100%;
    height: 300px;
}

.k-borad-row {
    margin-top: 15px;
    margin-bottom: 15px;
}


</style>