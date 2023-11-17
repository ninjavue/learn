<template>
  <div class="home">
    <h1 class="title" style="color: white">Darslarimiz</h1>
    <div class="text">
      Tajribali o'qituvchilarimizdan dunyoning turli tillarida gaplashish va
      yangi maqsadlarga erishish uchun yuqori sifatli ta'lim oling.
    </div>
  </div>
  <div class="row mb-80" style="justify-content: center">
    <div class="col-3" v-for="course of courses" :key="course._id">
      <div class="course-box">
        <router-link
          :to="`/view-course/${
            course.name + `/` + course._id + `/` + course.userId
          }`"
        >
          <div class="course-box-img klean">
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    url() {
      return this.$store.getters.url;
    },
    courses() {
      return this.$store.getters.courses;
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getCourse");
  },
};
</script>

<style lang="scss">
@import "../styles/page/home.scss";
</style>