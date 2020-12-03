<template>
  <div class="settings_screen">
    <app-bar-widget></app-bar-widget>
    <left-bar-widget></left-bar-widget>
    <right-bar-widget></right-bar-widget>
    <div class="content">
      <div v-if="this.isLoaded">
        <div v-show="this.isError">Cannot load settings</div>
        <h2 class="s-heading">Temperature sensor</h2>
        <div class="s-area">
          <label for="units-list">Units:</label>
          <select
            name="temp-units"
            id="temp-units"
            class="s-s"
            v-model="settings['temp-sensor']['units']"
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
          <br />
        </div>
        <div class="s-divider"></div>
        <h2 class="s-heading">Open Weather Map</h2>
        <div class="s-area">
          <label for="units-list">Units:</label>
          <select
            name="owm-units"
            id="owm-units"
            class="s-s"
            v-model="settings['OWM']['units']"
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
          <br />
          <label for="owm_city">City:</label>
          <input
            type="text"
            name="owm-city"
            class="s-s s-input-text"
            v-model="settings['OWM']['city']"
            v-on:click="openKeyboard(['OWM', 'city'])"
          />
        </div>
        <div class="s-divider"></div>
        <button class="save-btn" v-on:click="save">Save</button>
      </div>
      <div v-else>
        <spinner-widget></spinner-widget>
      </div>
    </div>
    <virtual-keyboard v-show="keyboardOpen"></virtual-keyboard>
  </div>
</template>

<script>
import axios from "axios";
import VirtualKeyboard from "../widgets/ui/VirtualKeyboard";

export default {
  components: {
    "virtual-keyboard": VirtualKeyboard,
  },
  data() {
    return {
      isLoaded: false,
      isError: false,
      needSave: true,
      settings: {},
      keyboardOpen: false,
    };
  },
  methods: {
    save: function () {
      this.upload();
    },
    closeVirtualKeyboard() {
      this.keyboardOpen = false;
    },
    upload: function () {
      axios
        .post("http://"+this.serverIp+":3000/update_settings", this.settings, {
          headers: {
            "API-KEY": "openhomepanel123",
            "Content-Type": "application/json",
          },
        })
        .then(
          (response) => {
            console.log(response.data);
            this.$router.push({ path: "/home" });
          },
          () => {
            console.log("update: Cannot update settings");
          }
        );
    },
    openKeyboard(value) {
      this.emitter.emit("boardValue", value);
      this.keyboardOpen = true;
    },
  },
  created() {
    axios
      .get("http://"+this.serverIp+":3000/get_settings", {
        headers: {
          "API-KEY": "openhomepanel123",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response.data);
          this.settings = response.data;
          this.isLoaded = true;
          this.isError = false;
        },
        () => {
          console.log("getSettings: Cannot load settings");
          this.isLoaded = true;
          this.isError = true;
        }
      );
  },
  beforeUnmount() {
    this.emitter.off("close-virtual-keyboard", this.closeVirtualKeyboard);
  },
  mounted() {
    this.emitter.on("close-virtual-keyboard", (text) => {
      this.settings[text[1][0]][text[1][1]] = text[0];
      this.closeVirtualKeyboard();
    });
  }
};
</script>

<style scoped>
.settings_screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

.content {
  width: 510px;
  height: 360px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 30px;
  overflow-x: hidden;
  overflow-y: visible;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: grey;
}

::-webkit-scrollbar-thumb {
  background: #fff;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
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
  margin-right: -380px;
  margin-top: 20px;
}

.save-btn:active {
  color: #27ae60;
  background: #2a2e37;
}

.s-heading {
  color: #fff;
  font-weight: bold;
  font-size: 1.5em;
}

label {
  color: #fff;
  font-weight: 300;
  margin-right: 20px;
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

.s-input-text {
  outline: none;
  background: #2a2e37;
  border: solid 2px #fff;
  padding: 7px;
  color: #fff;
  width: 200px;
}

.s-area {
  text-align: left;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.s-s {
  margin-top: 10px;
  margin-bottom: 10px;
}

.s-divider {
  width: 80%;
  height: 2px;
  background: #fff;
  opacity: 0.5;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
</style>