<template>
  <div class="kahoot-create" style="background-color: #410099">
    <div class="container">
      <div class="row">
        <div :class="`col-2 ${toggleBtn ? 'kahoot-left' : ''}`">
          <div class="kahoot-create-left">
            <div class="d-center">
              <div></div>
              <button class="toggle-btn" @click="toggleBtn = !toggleBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>

            <div class="kahoot-scroll create-scroll">
              <div
                class="all-kahoot"
                v-for="(item, index) of kahoot"
                :key="index"
                :style="`background-color: ${item.bgcolor};`"
                @click="sub(item._id)"
              >
                <h3>
                  {{ index + 1
                  }}<span :style="`${toggleBtn ? 'display: none;' : ''}`"
                    >.</span
                  >
                </h3>
                <h3
                  :class="`${toggleBtn ? 'dn-kahoot' : ''}`"
                  :style="`background-color: ${item.bgcolor};`"
                  @click="sub(item._id)"
                >
                  {{ item.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div :class="`col-10 ${toggleBtn ? 'kahoot-right' : ''}`">
          <div class="kahoot-create-box">
            <audio controls loop class="audio">
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
            <div class="kahoot-create-box-join" @click="join">
              <h1>O'yinga qo'shilish</h1>
            </div>
            <div class="kahoot-create-box-join bg-yellow" @click="startGame">
              <h1>O'yinni boshlash</h1>
            </div>

            <div
              @click="togleModal = true"
              :class="`kahoot-create-box-left ${togleModal ? 'large' : ''}`"
            >
              <button
                v-if="togleModal"
                class="kahoot-close-modal"
                @click="togleModal = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
              <h1>Yangi o'yin qo'shish</h1>
              <form @submit.prevent="saveTitle">
                <div class="kahoot-forms">
                  <label for="">Kahoot title</label>
                  <span>{{ 20 - title.length }}</span>
                  <input
                    maxlength="20"
                    v-model="title"
                    type="text"
                    placeholder="Create Kahoot title"
                    required
                  />
                </div>
                <div class="d-center">
                  <div></div>
                  <button class="learn-btn ml-a">Create</button>
                </div>
              </form>
            </div>
            <div
              @click="toggleModal = true"
              :class="`kahoot-create-box-right ${toggleModal ? 'large' : ''}`"
            >
              <button
                v-if="toggleModal"
                class="kahoot-close-modal"
                @click="toggleModal = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
              <h1>Word yoki Pdf</h1>
              <form @submit.prevent="saveTitle">
                <div class="kahoot-forms">
                  <label for="">Kahoot title</label>
                  <span>{{ 20 - title.length }}</span>
                  <input
                    maxlength="20"
                    v-model="title"
                    type="text"
                    placeholder="Create Kahoot title"
                    required
                  />
                  <input type="file" accept=".doc,.docs,.pdf" required />
                </div>
                <div class="d-center">
                  <div></div>
                  <button class="learn-btn ml-a">Create</button>
                </div>
              </form>
            </div>
          </div>
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
      toggleBtn: false,
      toggleModal: false,
      togleModal: false,
      audioToggle: false,
      title: "",
      id: "",
    };
  },

  computed: {
    user() {
      return this.$store.getters.users;
    },
    url() {
      return this.$store.getters.url;
    },
    kahoot() {
      return this.$store.getters.kahoot;
    },
  },

  methods: {
    sub(id) {
      window.location.href = `/kahoot-game/${id}`;
    },
    delKahoot(id) {
      this.$store.dispatch("deleteKahoot", id);
      this.$store.dispatch("getAllKahoot");
    },
    join() {
      window.location.href = "/kahoot-pin";
    },
    startGame() {
      window.location.href = "/kahoot-start";
    },
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
    saveTitle() {
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("userId", this.user._id);

        axios.post(`${this.url}/kahoot`, formData).then((res) => {
          this.$store.dispatch("getAllKahoot");
          this.id = res.data._id;
          this.togleModal = false;
          this.title = "";
        });
      } catch (error) {
        console.log("Xatolik yuz berdi: ", error);
      }
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.toggleModal = false;
        this.togleModal = false;
      }
    },
  },

  mounted() {
    this.$store.dispatch("getAllKahoot");
    document.addEventListener("click", this.clickOutside);
  },

  unmounted() {
    document.removeEventListener("click", this.clickOutside);
  },
};
</script>
  
  <style lang="scss">
@import "../styles/kahoot.scss";
</style>
  