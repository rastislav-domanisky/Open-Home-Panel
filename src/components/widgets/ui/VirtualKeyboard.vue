<template>
  <div class="virtual-keyboard">
    <div class="k-row">
      <div class="k-text">{{ text }}</div>
    </div>
    <div class="k-row" v-show="!isNumbers">
      <div class="close" v-on:click="close()">X</div>
      <div class="k-btn" v-on:click="typeFun(letters[0])">{{ letters[0] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[1])">{{ letters[1] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[2])">{{ letters[2] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[3])">{{ letters[3] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[4])">{{ letters[4] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[5])">{{ letters[5] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[6])">{{ letters[6] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[7])">{{ letters[7] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[8])">{{ letters[8] }}</div>
      <div class="k-btn" v-on:click="typeFun(letters[9])">{{ letters[9] }}</div>
      <div class="k-btn backspace" v-on:click="backspace()">←</div>
    </div>
    <div class="k-row" v-show="isNumbers">
      <div class="k-btn num" v-on:click="typeFun('0')">0</div>
      <div class="k-btn num" v-on:click="typeFun('1')">1</div>
      <div class="k-btn num" v-on:click="typeFun('2')">2</div>
      <div class="k-btn num" v-on:click="typeFun('3')">3</div>
      <div class="k-btn num" v-on:click="typeFun('4')">4</div>
      <div class="k-btn num" v-on:click="typeFun('5')">5</div>
      <div class="k-btn num" v-on:click="typeFun('6')">6</div>
      <div class="k-btn num" v-on:click="typeFun('7')">7</div>
      <div class="k-btn num" v-on:click="typeFun('8')">8</div>
      <div class="k-btn num" v-on:click="typeFun('9')">9</div>
    </div>
    <div class="k-row">
      <div class="x">.</div>
      <div class="k-btn" v-on:click="typeFun(letters[10])">
        {{ letters[10] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[11])">
        {{ letters[11] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[12])">
        {{ letters[12] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[13])">
        {{ letters[13] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[14])">
        {{ letters[14] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[15])">
        {{ letters[15] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[16])">
        {{ letters[16] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[17])">
        {{ letters[17] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[18])">
        {{ letters[18] }}
      </div>
      <div class="k-btn enter" v-on:click="enter()">↵</div>
    </div>
    <div class="k-row">
      <div
        class="k-btn shift"
        :class="{ shiftEnabled: isUpper }"
        v-on:click="shift()"
      >
        ⇧
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[19])">
        {{ letters[19] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[20])">
        {{ letters[20] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[21])">
        {{ letters[21] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[22])">
        {{ letters[22] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[23])">
        {{ letters[23] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[24])">
        {{ letters[24] }}
      </div>
      <div class="k-btn" v-on:click="typeFun(letters[25])">
        {{ letters[25] }}
      </div>
      <div
        class="k-btn shift-r"
        :class="{ shiftEnabled: isUpper }"
        v-on:click="shift()"
      >
        ⇧
      </div>
    </div>
    <div class="k-row">
      <div class="k-btn numbers" v-on:click="showNumbers()">123</div>
      <div class="k-btn space" v-on:click="typeFun(' ')">space</div>
      <div class="k-btn" v-on:click="typeFun('.')">.</div>
      <div class="k-btn" v-on:click="typeFun(',')">,</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      isUpper: false,
      isNumbers: false,
      value: "",
    };
  },
  methods: {
    typeFun(value) {
      this.text += value;
    },
    backspace() {
      this.text = this.text.slice(0, -1);
    },
    enter() {
      this.close();
    },
    close() {
      this.emitter.emit("close-virtual-keyboard", [this.text, this.value]);
      this.text = "";
    },
    shift() {
      this.isUpper = !this.isUpper;
    },
    showNumbers() {
      this.isNumbers = !this.isNumbers;
    },
  },
  mounted() {
    this.emitter.on('boardValue', val => this.value = val);
  },
  computed: {
    letters() {
      let myLetters = [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
      ];
      if (this.isUpper) {
        return myLetters.map((x) => x.toUpperCase());
      }
      return myLetters;
    },
  },
};
</script>

<style scoped>
.virtual-keyboard {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 270px;
  display: block;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 10px;
}

.k-text {
  width: 70%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
  border: solid 1px #fff;
  line-height: 40px;
  text-align: left;
  font-size: 1em;
  font-weight: 200;
  padding-left: 10px;
  padding-right: 10px;
}

.k-row {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 5px;
  display: block;
}

.k-btn {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: 1.3em;
  line-height: 40px;
  border: solid #fff 1px;
}

.k-btn:active {
  background: transparent;
  color: #fff;
}

.shiftEnabled {
  background: transparent;
  color: #fff;
}

.backspace {
  width: 70px;
}

.space {
  width: 250px;
}

.enter {
  width: 80px;
}

.num {
  background: rgba(255, 250, 255, 0.5);
}

.shift {
  width: 50px;
}

.numbers {
  width: 60px;
}

.x {
  width: 20px;
  display: inline-block;
  height: 40px;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: 0em;
  line-height: 40px;
}

.shift-r {
  width: 70px;
}

.close {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: 1.3em;
  line-height: 40px;
  color: #fff;
  border: solid #fff 1px;
}
</style>