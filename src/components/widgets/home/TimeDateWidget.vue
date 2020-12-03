<template>
  <div class="time_date_widget">
      <p class="h">Time and Date</p>
      <p class="current_time">{{ hours + " : " + minutes }}</p>
      <p class="current_date">{{ day +'.'+ month +'.'+ year }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hours: "",
            minutes: "",
            day: "",
            month: "",
            year: "",
        }
    },
    methods: {
        checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        getTime() {
            var today = new Date();
            this.hours = today.getHours();
            this.minutes = today.getMinutes();
            this.day = today.getDate();
            this.month = today.getMonth() +1;
            this.year = today.getFullYear();
            this.minutes = this.checkTime(this.minutes);
            this.$options.timer = window.setTimeout(this.getTime, 1000);
        },
    },
    beforeMount() {
        this.$options.timer = window.setTimeout(this.getTime, 1000);
    },
    beforeUnmount() {
        window.clearTimeout(this.$options.timer);
    }
}
</script>

<style scoped>
.time_date_widget {
  position: relative;
  background: #353941;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.3), 3px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 220px;
  height: 130px;
  display: inline-block;
  vertical-align:top;
}

.h {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 8px;
}

.current_time {
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  color: #FFFFFF;
  line-height: 8px;
}

.current_date {
  line-height: 10px;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #FFFFFF;
}
</style>