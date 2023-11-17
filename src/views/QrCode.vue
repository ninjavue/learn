<template>
  <div class="dark-blue">
    <div class="container">
      <div class="game-pin">
        <button class="pinstart">Start</button>
        <div class="pincode">
          <p>Join at www.learn.com or with the Learn app</p>
          <h1>{{ pin.gameStart }}</h1>
          <vue-qrcode
            :value="`http://localhost:8080/kahoot-game-start/${pin.gameStart}`"
            @change="onDataUrlChange"
          />
        </div>
        <div class="waiting">Waiting for players...</div>
      </div>
    </div>
  </div>
</template>
  <script>
import VueQrcode from "vue-qrcode";

export default {
  data() {
    return {
      dataUrl: null,
      num: 24509859,
    };
  },
  components: {
    VueQrcode,
  },
  computed: {
    pin() {
      return this.$store.getters.pin;
    },
  },
  methods: {
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl;
    },
  },
  mounted() {
    this.$store.dispatch("getPin", this.$route.params.id);
  },
};
</script>

<style lang="scss">
@import "../styles/page/qrcode.scss";
</style>