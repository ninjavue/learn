<template>
  <div class="kahoot-generate">
    <div class="container">
      <h1 class="kahoot-generate-text">Sizdagi barcha o'yinlar</h1>
      <div class="row d-center">
        <div
          class="col-2"
          v-for="item of kahoot"
          :key="item._id"
          @click="submitPin(item._id)"
        >
          <div
            class="kahoot-generate-box"
            :style="`background-color: ${item.bgcolor};`"
          >
            <h1>{{ item.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    kahoot() {
      return this.$store.getters.kahoot;
    },
  },
  methods: {
    submitPin(id) {
      location.href = `kahoot-game/qrcode/${id}`;
    },
  },
  mounted() {
    this.$store.dispatch("getAllKahoot");
  },
};
</script>

<style lang="scss">
.d-center {
  justify-content: center;
  align-items: center;
}
.kahoot-generate {
  background: #25076b;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100vw calc(100vh - 80px);
  min-height: calc(100vh - 84px);
  &-text {
    text-align: center;
    font-family: "Nunito";
    font-size: 26px;
    padding-top: 30px;
    margin-bottom: 30px;
    color: white;
  }
  &-box {
    width: 96%;
    height: 120px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #1368ce;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.15) 0px -0.25rem 0px 0px inset;
    color: white;
    font-family: "Nunito";
    margin-top: 20px;
    &:hover {
      transform: translateY(-10px);
      transition: transform 0.5s;
    }
    & h1 {
      font-size: 26px;
    }
  }
}
</style>