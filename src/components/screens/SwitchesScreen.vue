<template>
  <div class="switches_screen">
    <app-bar-widget></app-bar-widget>
    <left-bar-widget></left-bar-widget>
    <right-bar-widget></right-bar-widget>
    <button class="add-btn" v-on:click="add">Add</button>
    <div class="content">
      <div v-if="this.isLoaded">
        <div v-show="this.isError">Cannot load switches</div>
        <switch-widget
          v-for="(item, index) in switches"
          :id="index"
          :key="index"
          :swData="item"
        ></switch-widget>
      </div>
      <div v-else>
        <spinner-widget></spinner-widget>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchWidget from "../widgets/ui/SwitchWidget";
import axios from "axios";

export default {
  components: { "switch-widget": SwitchWidget },
  methods: {
    add: function () {
      this.$router.push({ path: "/add_switch" });
    },
    loadSwitches() {
      this.isLoaded = false;
      axios
      .get("http://"+this.serverIp+":3000/get_switches", {
        headers: {
          "API-KEY": "openhomepanel123",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.switches = response.data;
          this.isLoaded = true;
          this.isError = false;
        },
        () => {
          console.log("getSwitches: Cannot load switches");
          this.isLoaded = true;
          this.isError = true;
        }
      );
    }
  },
  data() {
    return {
      isLoaded: false,
      isError: false,
      switches: [],
    };
  },
  mounted() {
    this.emitter.on("reload-switches", () => {
      this.loadSwitches();
    });
  },
  created() {
    this.loadSwitches();
  },
};
</script>

<style scoped>
.switches_screen {
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

.add-btn {
  position: relative;
  background: #27ae60;
  border: solid 2px #27ae60;
  border-radius: 360px;
  width: 60px;
  height: 60px;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  outline: none;
  float: right;
  margin-right: 20px;
  margin-top: -45px;
}

.add-btn:active {
  color: #27ae60;
  background: #2a2e37;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: grey;
}

::-webkit-scrollbar-thumb {
  background: #FFF;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>