<template>
  <div class="container">
    <div class="course-view">
      <div class="d-center" @click="showEmoji = false">
        <h1>{{ title }} darslari</h1>
        <button
          style="z-index: 1"
          class="learn-btn"
          v-if="users.admin"
          @click="toggleCourse = !toggleCourse"
        >
          Video qo'shish
        </button>
      </div>
      <div v-if="lessons.length == 0" class="error">
        <div class="sky container">
          <h2>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h2>
          <div class="grass"></div>
          <img class="blumen" src="../assets/images/d.png" alt="" />
          <img class="bulut" src="../assets/images/bulut.png" alt="" />
          <img class="bulut" src="../assets/images/bulut.png" alt="" />
          <img class="bulut three" src="../assets/images/bulut.png" alt="" />
          <img class="plane" src="../assets/images/samaliyot.png" alt="" />
        </div>
        <div class="field">
          <h2>{{ title }} darslari bo'yicha videolar qo'shilmagan.</h2>
          <button @click="rock">Orqaga</button>
        </div>
      </div>
      <div class="row" v-if="lessons.length > 0">
        <div class="col-8" @click="showEmoji = false">
          <div class="course-view-box" @click="showEmoji = false">
            <div class="course-view-video">
              <iframe
                @click="showEmoji = false"
                width="560"
                height="315"
                :src="`${lesson.iframe}?modestbranding=1&autoplay=1&loop=1`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="course-view-title" @click="show">
              {{ lesson.title }}
            </div>
          </div>
        </div>
        <div class="col-4" @click="showEmoji = false">
          <div class="course-table">
            <div
              v-for="(lesson, i) of lessons"
              :key="lesson._id"
              @click="singleLesson(lesson._id, i)"
              :class="`course-table-box ${btnClass == i ? 'active' : ''}`"
            >
              <div class="row">
                <div class="col-6">
                  <img
                    class="course-table-img"
                    :src="`${url}/${lesson.image}`"
                    :alt="`${lesson.title}`"
                  />
                </div>
                <div class="col-6">
                  <div class="course-view-text">
                    {{ lesson.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="comment">
            <h3 @click="showEmoji = false" v-if="comments">
              {{ comments.length }} ta fikr bildirilgan.
            </h3>
            <form @submit.prevent="commentSave">
              <input
                v-model="comment"
                type="text"
                class="comment-input"
                placeholder="Fikir bildirish."
                required
              />
              <div class="emoji">
                <img
                  @click="showEmoji = !showEmoji"
                  src="../assets/icons/emoji.svg"
                  alt="emoji"
                />
                <div :class="`emoji-box ${showEmoji ? 'show' : ''}`">
                  <div
                    class="emoji-all"
                    v-for="(item, i) of emojis"
                    :key="i"
                    @click="selectEmoji(i)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="comment-send"
                v-if="comment.length > 0"
              >
                Yuborish
              </button>
              <button
                type="button"
                class="comment-send"
                v-if="comment.length == 0"
                style="background-color: darkgrey; cursor: default"
                disabled
              >
                Yuborish
              </button>
            </form>
            <div class="comment-box" @click="showEmoji = false">
              <div
                :class="`comment-sz ${
                  users._id == item.user._id ? 'active' : ''
                }`"
                v-for="item of comments"
                :key="item._id"
              >
                <span class="date">
                  {{ item.createdAt.replaceAll("-", ".").substring(0, 10) }}
                </span>
                <span class="dot" v-if="users._id == item.user._id">
                  <img src="../assets/icons/dot.svg" alt="dot" />
                </span>
                <img
                  v-if="item.user.image != 'undefined'"
                  :src="`${url}/${
                    item.user.image[0]
                      ? item.user.image[0]
                      : 'images/avatar.jpg'
                  }`"
                  alt=""
                  class="comment-img"
                />
                <img
                  v-if="item.user.image == 'undefined'"
                  :src="`${url}/images/avatar.jpg`"
                  alt=""
                  class="comment-img"
                />
                <div>
                  <div
                    class="comment-name"
                    v-if="item.user.image != 'undefined'"
                  >
                    {{ item.user.name }}
                  </div>
                  <div
                    class="comment-name"
                    v-if="item.user.image == 'undefined'"
                  >
                    Nomalum foydalanuvchi.
                  </div>
                  <div class="comment-desc">
                    {{ item.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="toggleCourse">
    <div class="modal-box">
      <button class="modal-close" @click="toggleCourse = false">
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
      <h3 style="text-align: center">Add a new lesson</h3>

      <form action="" @submit.prevent="saveLesson">
        <div class="form-input">
          <label for="">Lesson Name</label>
          <input v-model="name" type="text" required />
        </div>
        <div class="form-input">
          <label for="">Iframe the course on youtube</label>
          <textarea rows="10" cols="30" v-model="iframe"> </textarea>
        </div>
        <div class="form-input">
          <label for="">Picture about the lesson</label>
          <input
            class="file"
            type="file"
            id="avatar"
            @change="handleFileChange"
            required
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">Add Lesson</button>
          <button class="learn-btn bg-danger" @click="toggleCourse = false">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showEmoji: false,
      comment: "",
      btnClass: 0,
      toggleCourse: false,
      title: "",
      userId: "",
      name: "",
      text: "",
      course: {
        image: null,
      },
      user: {
        _id: "",
      },
      categoryId: "",
      emojis: [
        "👍",
        "👌",
        "😘",
        "😂",
        "😭",
        "❤️",
        "😍",
        "😎",
        "🤓",
        "🧐",
        "✊",
        "🤲",
        "🤝",
        "🙏",
        "👌",
        "👏",
        "👨",
        "👩‍🦰",
      ],
    };
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    lessons() {
      return this.$store.getters.lessons;
    },
    lesson() {
      return this.$store.getters.lesson;
    },
    users() {
      return this.$store.getters.users;
    },
    comments() {
      return this.$store.getters.comments;
    },
  },
  methods: {
    rock() {
      window.history.back();
    },
    show() {
      this.showEmoji = false;
    },
    selectEmoji(i) {
      this.comment += this.emojis[i];
    },
    commentSave() {
      try {
        const formData = new FormData();
        formData.append("lessonId", this.lesson._id);
        formData.append("userId", this.users._id);
        formData.append("comment", this.comment);
        axios.post(`${this.url}/comment`, formData, {
          "Content-Type": "multipart/form-data",
        });
        this.comment = "";
        this.showEmoji = false;
        this.$store.dispatch("getComment", this.lesson._id);
      } catch (error) {
        console.log("Xatolik yuz berdi..");
      }
    },
    singleLesson(id, i) {
      this.btnClass = i;
      this.$store.dispatch("getOneLesson", id);
      this.$store.dispatch("getComment", id);
      this.showEmoji = false;
    },
    handleFileChange(event) {
      this.course.image = event.target.files[0];
    },
    async saveLesson() {
      try {
        const formData = new FormData();
        formData.append("image", this.course.image);
        formData.append("title", this.name);
        formData.append("iframe", this.iframe);
        formData.append("userId", this.user._id);
        formData.append("categoryId", this.categoryId);
        await axios.post(`${this.url}/product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.toggleCourse = false;
        this.$store.dispatch("getLesson", this.categoryId);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    },
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.title = this.$route.params.name;
    this.categoryId = this.$route.params.id;
    this.$store.dispatch("getLesson", this.categoryId);
    this.$store.dispatch("getComment", this.lesson._id);
    let user = this.$cookies.get("user");
    if (user) {
      this.user = user[0];
    } else {
      this.user = {};
    }
  },
};
</script>

<style lang="scss">
@import "../styles/page/course.scss";
</style>