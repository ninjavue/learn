<template>
  dskfjlkj
  <div class="game" v-for="item of game" :key="item._id">
    <h1>{{ item.question }}</h1>

    <div class="row">
      <div class="col-6">
        <button class="game-answer-btn">
          <span
            class="sc-eDvSVe htLrRN card-icon__icon"
            data-functional-selector="icon"
            style="
              display: flex;
              vertical-align: middle;
              width: 40px;
              height: 40px;
            "
            ><svg
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              stroke-width="1.3px"
              aria-labelledby="label-89bc1752-cfe1-4cdf-a03d-af24ad0ad9ee"
              aria-hidden="true"
              class="sc-jSUZER eTaWgc"
              style="paint-order: stroke"
            >
              <title id="label-89bc1752-cfe1-4cdf-a03d-af24ad0ad9ee">
                Icon
              </title>
              <path
                d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z"
                style="fill: inherit"
              ></path>
            </svg>
          </span>
          {{ item.answer.answer1 }}
        </button>
      </div>
      <div class="col-6">
        <button class="game-answer-btn two">
          <span
            class="sc-eDvSVe htLrRN card-icon__icon"
            data-functional-selector="icon"
            style="
              display: flex;
              vertical-align: middle;
              width: 40px;
              height: 40px;
            "
            ><svg
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              stroke-width="1.3px"
              aria-labelledby="label-f6de29db-7c21-442a-aded-abef757d05d3"
              aria-hidden="true"
              class="sc-jSUZER eTaWgc"
              style="paint-order: stroke"
            >
              <title id="label-f6de29db-7c21-442a-aded-abef757d05d3">
                Icon
              </title>
              <path
                d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z"
                style="fill: inherit"
              ></path></svg
          ></span>
          {{ item.answer.answer2 }}
        </button>
      </div>
      <div class="col-6">
        <button class="game-answer-btn three">
          <span
            class="sc-eDvSVe htLrRN card-icon__icon"
            data-functional-selector="icon"
            style="
              display: flex;
              vertical-align: middle;
              width: 40px;
              height: 40px;
            "
            ><svg
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              stroke-width="1.3px"
              aria-labelledby="label-0a210619-0894-468e-8a39-50160d4f19bd"
              aria-hidden="true"
              class="sc-jSUZER eTaWgc"
              style="paint-order: stroke"
            >
              <title id="label-0a210619-0894-468e-8a39-50160d4f19bd">
                Icon
              </title>
              <path
                d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z"
                style="fill: inherit"
              ></path></svg
          ></span>

          {{ item.answer.answer3 }}
        </button>
      </div>
      <div class="col-6">
        <button class="game-answer-btn vier">
          <span
            class="sc-eDvSVe htLrRN card-icon__icon"
            data-functional-selector="icon"
            style="
              display: flex;
              vertical-align: middle;
              width: 40px;
              height: 40px;
            "
            ><svg
              viewBox="0 0 32 32"
              focusable="false"
              stroke="rgba(0, 0, 0, 0.15)"
              stroke-width="1.3px"
              aria-labelledby="label-cbf0da31-e0e8-40ce-adbc-c8c818e6fe5f"
              aria-hidden="true"
              class="sc-jSUZER eTaWgc"
              style="paint-order: stroke"
            >
              <title id="label-cbf0da31-e0e8-40ce-adbc-c8c818e6fe5f">
                Icon
              </title>
              <path
                d="M7,7 L25,7 L25,25 L7,25 L7,7 Z"
                style="fill: inherit"
              ></path></svg
          ></span>
          {{ item.answer.answer4 }}
        </button>
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
    game() {
      return this.$store.getters.game;
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getNewGame", this.$route.params.gameStart);
  },
};
</script>

<style lang="scss">
@import "../styles/page/game.scss";
</style>