<template>
  <div class="add-switch-screen">
    <div class="space"></div>
    <spinner-widget v-show="!isLoaded" />
    <div v-show="isLoaded">
      <h1>Add switch</h1>
      <label for="switch-name">Name:</label>
      <input
        type="text"
        name="switch-name"
        class="s-s s-input-text"
        v-model.trim="sw_name"
        v-on:click="openKeyboard()"
      />
      <br />
      <label for="units-list">Pin:</label>
      <select name="sw-pins" id="sw-pins" class="s-s" v-model="sw_pin">
        <option v-for="item in pins" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <button class="save-btn" v-on:click="saveSwitch">Save</button>
      <button class="save-btn cancel-btn" v-on:click="cancel">Cancel</button>
    </div>
    <virtual-keyboard v-show="keyboardOpen"></virtual-keyboard>
  </div>
</template>

<script>
import axios from "axios";
import SpinnerWidget from "../widgets/ui/SpinnerWidget.vue";
import VirtualKeyboard from "../widgets/ui/VirtualKeyboard";
export default {
  components: { SpinnerWidget, "virtual-keyboard": VirtualKeyboard },
  data() {
    return {
      isLoaded: false,
      sw_name: "",
      sw_pin: 0,
      pins: [],
      keyboardOpen: false,
    };
  },
  methods: {
    cancel() {
      this.$router.push({ path: "/switches" });
    },
    saveSwitch() {
      if(this.sw_pin == 0|| this.sw_name.length == 0) {
        return;
      }
      axios
        .post("http://"+this.serverIp+":3000/add_switch", {}, {
          headers: {
            "API-KEY": "openhomepanel123",
            "Content-Type": "application/json",
          },
          params: {
            "name": this.sw_name,
            "pin": this.sw_pin
          }
        })
        .then(
          () => {
            this.$router.push({ path: "/switches" });
          },
          () => {
            console.log("Cannot create switch");
          }
        );
    },
    closeVirtualKeyboard() {
      this.keyboardOpen = false;
    },
    openKeyboard() {
      this.keyboardOpen = true;
    },
    getSwitches(pins) {
      axios
        .get("http://" + this.serverIp + ":3000/get_switches", {
          headers: {
            "API-KEY": "openhomepanel123",
            "Content-Type": "application/json",
          },
        })
        .then(
          (response) => {
            let switches = response.data;
            let usedPins = [];
            switches.forEach(sw => {
              usedPins.push(sw.pin);
            });
            this.pins = pins.filter((pin) => {
              return !usedPins.includes(pin);
            });
            this.isLoaded = true;
          },
          () => {
            console.log("Cannot load switches");
            this.isLoaded = false;
          }
        );
    },
  },
  created() {
    axios
      .get("http://" + this.serverIp + ":3000/get_pins", {
        headers: {
          "API-KEY": "openhomepanel123",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.getSwitches(response.data);
        },
        () => {
          console.log("Cannot load available pins");
          this.isLoaded = false;
        }
      );
  },
  beforeUnmount() {
    this.emitter.off("close-virtual-keyboard", this.closeVirtualKeyboard);
  },
  mounted() {
    this.emitter.on("close-virtual-keyboard", (text) => {
      this.sw_name = text[0];
      this.closeVirtualKeyboard();
    });
  },
};
</script>

<style scoped>
.add-switch-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

h1 {
  color: #fff;
}

label {
  color: #fff;
  font-weight: 300;
  margin-right: 20px;
}

.s-s {
  margin-top: 10px;
  margin-bottom: 10px;
}

.s-input-text {
  outline: none;
  background: #2a2e37;
  border: solid 2px #fff;
  padding: 7px;
  color: #fff;
  width: 200px;
}

option {
  background: #2a2e37;
  color: #fff;
  outline: none;
}

select {
  outline: none;
  border: solid 2px #fff;
  width: 150px;
  background: #2a2e37;
  padding: 7px;
  color: #fff;
  border-radius: 13px;
}

.space {
  margin-top: 100px;
}

.save-btn {
  background: #27ae60;
  border: solid 2px #27ae60;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  outline: none;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.save-btn:active {
  color: #27ae60;
  background: #2a2e37;
}

.cancel-btn {
  background: gray;
}
</style>