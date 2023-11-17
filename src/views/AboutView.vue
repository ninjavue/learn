<template>
  <div class="translate">
    <h1>Tarjimon</h1>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="translate-box">
            <div class="translate-box-top">
              <select>
                <option value="">English</option>
                <option value="">Deutsch</option>
                <option value="">Polisch</option>
                <option value="">Turkisch</option>
                <option value="">Uzbekisch</option>
                <option value="">Korean</option>
              </select>
            </div>
            <textarea
              v-model="text"
              @input="textareaHeight"
              ref="textarea"
              maxlength="5000"
            >
            </textarea>
            <span class="limit">{{ text.length }}/5 000</span>
          </div>
        </div>
        <div class="col-6">
          <div class="translate-box">
            <div class="translate-box-top ml-20">
              <select>
                <option value="">Uzbekisch</option>
                <option value="">English</option>
                <option value="">Deutsch</option>
                <option value="">Polisch</option>
                <option value="">Turkisch</option>
                <option value="">Korean</option>
              </select>
            </div>
            <div class="result">
              {{ text }}
              <button @click="textCopy" class="text-copy">
                <img src="../assets/icons/copy.svg" alt="" />
                <span> Copy Text </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--CourseItem component -->
      <CourseItem />
    </div>
  </div>
</template>

<script>
import CourseItem from "@/components/CourseItem.vue";

export default {
  data() {
    return {
      text: "",
    };
  },

  methods: {
    textareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight - 20 + "px";
    },
    textCopy() {
      // Matnni klonlash va nusxalash
      const textArea = document.createElement("textarea");
      textArea.value = this.text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    },
  },

  components: { CourseItem },
};
</script>

<style lang="scss">
@import "../styles/page/about.scss";
</style>
