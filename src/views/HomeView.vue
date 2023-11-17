<template>
  <div class="box">
    <img src="../assets/images/raketa.webp" alt="" />
    <h1>BIZNING ONLAYN TIL KURSLARIMIZ BILAN YANGI MARRALARNI ZABT ETING</h1>
  </div>
  <div class="container">
    <div class="home">
      <h1 class="title">DARSLARIMIZ</h1>
      <div class="text">
        Tajribali o'qituvchilarimizdan dunyoning turli tillarida gaplashish va
        yangi maqsadlarga erishish uchun yuqori sifatli ta'lim oling.
      </div>

      <div class="row mb-80" style="justify-content: center">
        <div class="col-3" v-for="course of courses" :key="course._id">
          <div class="course-box">
            <button
              v-if="users.admin"
              class="course-box-trash"
              @click="deleteCourse(course._id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                />
              </svg>
            </button>
            <button
              v-if="users.admin"
              class="course-box-trash edit"
              @click="editCourse(course._id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </button>
            <router-link
              :to="`/view-course/${
                course.name + `/` + course._id + `/` + course.userId
              }`"
            >
              <div class="course-box-img">
                <img
                  loading="lazy"
                  :src="`${url}/${course.image}`"
                  class="object-cover w-full h-full"
                  alt="Ingliz tili"
                />
              </div>
              <div class="course-box-box">
                <div class="course-box-count">
                  <svg
                    viewBox="0 0 24 24"
                    class="text-darker"
                    width="16"
                    height="16"
                    astro-icon="bx:bxs-user"
                  >
                    <path
                      fill="currentColor"
                      d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                    ></path>
                  </svg>
                  <span>
                    {{ course.count }}
                    o'quvchi
                  </span>
                </div>

                <div class="course-box-title">
                  {{ course.name }}
                </div>
                <p class="course-box-text">
                  {{ course.text }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-3" v-if="users.admin">
          <div class="course-box" @click="toggleCourse = !toggleCourse">
            <div class="course-box-img">
              <img
                loading="lazy"
                src="../assets/icons/course.png"
                class="object-cover w-full h-full"
                alt="Ingliz tili"
              />
            </div>
            <div class="course-box-box">
              <div class="course-box-count">
                <svg
                  viewBox="0 0 24 24"
                  class="text-darker"
                  width="16"
                  height="16"
                  astro-icon="bx:bxs-user"
                >
                  <path
                    fill="currentColor"
                    d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                  ></path>
                </svg>
                <span> unknown </span>
              </div>

              <div class="course-box-title">Create course</div>
              <p class="course-box-text">Add a new course.</p>
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
      <h3 style="text-align: center">Add a new course</h3>

      <form action="" @submit.prevent="saveCourse">
        <div class="form-input">
          <label for="">Course Name</label>
          <input v-model="name" type="text" required />
        </div>
        <div class="form-input">
          <label for="">Course Text</label>
          <input v-model="text" type="text" required />
        </div>
        <div class="form-input">
          <label for="">Photo</label>
          <input
            class="file"
            type="file"
            id="avatar"
            @change="handleFileChange"
            required
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">Add Course</button>
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
      toggleCourse: false,
      name: "",
      text: "",
      course: {
        image: null,
      },
      user: {
        _id: "",
      },
    };
  },

  computed: {
    url() {
      return this.$store.getters.url;
    },
    courses() {
      return this.$store.getters.courses;
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    editCourse(id) {
      console.log(id);
    },
    deleteCourse(id) {
      this.$store.dispatch("deleteCoruses", id);
    },
    handleFileChange(event) {
      this.course.image = event.target.files[0];
    },
    async saveCourse() {
      try {
        const formData = new FormData();
        formData.append("image", this.course.image);
        formData.append("name", this.name);
        formData.append("text", this.text);
        formData.append("userId", this.user._id);
        await axios.post(`${this.url}/category`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.toggleCourse = false;
        this.$store.dispatch("getCourse");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getCourse");
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
@import "../styles/page/home.scss";
</style>