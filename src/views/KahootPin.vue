<template>
  <div class="kahoot-pin">
    <audio controls autoplay loop class="audio">
      <source src="../assets/audio/music.mp3" type="audio/mp3" />
      Kahoot music.
    </audio>
    <button @click="audio" class="audio-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-volume-up-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
        />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
        />
        <path
          d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
        />
      </svg>
    </button>
    <div class="kahoot-pin-box">
      <form @submit.prevent="submitPin">
        <input
          v-model="pin"
          type="text"
          maxlength="7"
          required
          placeholder="Game PIN"
          :class="`${error && !toggle ? 'border-danger' : ''}`"
        />
        <button type="submit" @click="toggle = false">Enter</button>
      </form>
    </div>
    <div :class="`error-kahoot ${error && !toggle ? 'show-error' : ''}`">
      <p>This pin code is an error and try to check if it is correct!</p>
      <span @click="toggle = !toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      pin: "",
      toggle: false,
      errorTimeout: null,
    };
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    error() {
      return this.$store.getters.errorGame;
    },
  },
  methods: {
    audio() {
      let audio = document.querySelector(".audio");
      let audioBtn = document.querySelector(".audio-btn");
      if (!this.audioToggle) {
        audio.pause();
        this.audioToggle = !this.audioToggle;
        audioBtn.classList.add("audio-pause");
      } else {
        audio.play();
        this.audioToggle = !this.audioToggle;
        audioBtn.classList.remove("audio-pause");
      }
    },
    async submitPin() {
      this.$store.dispatch("getGame", this.pin);
    },
  },
  watch: {
    error(newError) {
      if (newError && this.errorTimeout === null) {
        this.errorTimeout = setTimeout(() => {
          console.log(this.error);
          this.error = "";
          console.log(this.error);
          this.errorTimeout = null;
        }, 5000);
      }
    },
  },
};
</script>
  
  <style lang="scss">
@import "../styles/kahoot.scss";
.error-message {
  color: rgb(232, 66, 66);
}
</style>
  