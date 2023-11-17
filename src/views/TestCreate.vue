<template>
  <div class="test-create">
    <div class="container" style="position: relative">
      <form class="row" @submit.prevent="QuesSub">
        <div class="col-2">
          <div class="kahoot-scroll">
            <div
              class="kahoot-box"
              v-for="(item, i) of questions"
              :key="i"
              @click="oneQues(item._id)"
            >
              <span @click="deleteQuestion(item._id)" class="kahoot-trash">
                <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  stroke="none"
                  stroke-width="0"
                  aria-labelledby="label-1c62ede3-12d7-4080-b5c8-65f2d5e6526a"
                  aria-hidden="true"
                  class="sc-jSUZER eTaWgc"
                >
                  <title id="label-1c62ede3-12d7-4080-b5c8-65f2d5e6526a">
                    Delete
                  </title>
                  <path
                    d="M9,24 C9,25.103 9.897,26 11,26 L21,26 C22.103,26 23,25.103 23,24 L23,12 L9,12 L9,24 Z M11,14 L21,14 L21.001,24 L11,24 L11,14 Z M19,9 L25,9 L25,11 L7,11 L7,9 L13,9 L13,7 L19,7 L19,9 Z M13,16 L13,22 L15,22 L15,16 L13,16 Z M17,16 L17,22 L19,22 L19,16 L17,16 Z"
                    style="fill: rgb(110, 110, 110)"
                  ></path>
                </svg>
              </span>
              <div class="kahoot-box-text">{{ i + 1 }}. Quiz</div>
              <div
                :class="`kahoot-box-box ${
                  btnClick == item._id ? 'active' : ''
                }`"
                @click="btnClick = item._id"
              >
                <div>{{ item.question }}...</div>
                <div class="circle">20</div>
                <div class="row">
                  <div class="ans"><span v-if="item.toggle"></span></div>
                  <div class="ans"><span v-if="item.toggle2"></span></div>
                  <div class="ans"><span v-if="item.toggle3"></span></div>
                  <div class="ans"><span v-if="item.toggle4"></span></div>
                </div>
              </div>
            </div>
            <div class="kahoot-box" @click="isEdit = false">
              <div class="kahoot-box-text">
                {{ questions.length + 1 }}. Quiz
              </div>
              <div
                :class="`kahoot-box-box ${
                  btnClick == 'default' ? 'active' : ''
                }`"
                @click="btnClick = 'default'"
              >
                <div>
                  {{
                    question ? question.substring(0, 20) + "..." : "Question"
                  }}
                </div>
                <div class="circle">20</div>
                <div class="row">
                  <div class="ans"><span v-if="toggle"></span></div>
                  <div class="ans"><span v-if="toggle2"></span></div>
                  <div class="ans"><span v-if="toggle3"></span></div>
                  <div class="ans"><span v-if="toggle4"></span></div>
                </div>
              </div>
            </div>
          </div>

          <button class="kahoot-btn">Add question</button>
        </div>
        <div class="col-10" v-if="!isEdit">
          <div class="kahoot-form">
            <div class="test-title">
              <span v-if="question">{{ 150 - question.length }}</span>
              <input
                maxlength="150"
                v-model="question"
                placeholder="Start typing your question"
                type="text"
                class="question"
              />
            </div>
            <div class="row">
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${text1 ? 'box-answer' : ''}`"
                  :style="`background-color: ${text1 ? color1 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color1};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path></svg
                    ></span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="text1"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 1"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - text1.length }}</span>
                    <div
                      v-if="text1"
                      @click="`${(toggle = !toggle)}`"
                      :class="`answer-btn ${toggle ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="toggle" />
                      <span tabindex="-1" class="icon" v-if="toggle">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${text2 ? 'box-answer' : ''}`"
                  :style="`background-color: ${text2 ? color2 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color2};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="text2"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 2"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - text2.length }}</span>
                    <div
                      v-if="text2"
                      @click="`${(toggle2 = !toggle2)}`"
                      :class="`answer-btn ${toggle2 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="toggle2" />
                      <span tabindex="-1" class="icon" v-if="toggle2">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${text3 ? 'box-answer' : ''}`"
                  :style="`background-color: ${text3 ? color3 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color3};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="text3"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 3 (optional)"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - text3.length }}</span>
                    <div
                      v-if="text3"
                      @click="`${(toggle3 = !toggle3)}`"
                      :class="`answer-btn ${toggle3 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="toggle3" />
                      <span tabindex="-1" class="icon" v-if="toggle3">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${text4 ? 'box-answer' : ''}`"
                  :style="`background-color: ${text4 ? color4 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color4};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="text4"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 4 (optional)"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - text4.length }}</span>
                    <div
                      v-if="text4"
                      @click="`${(toggle4 = !toggle4)}`"
                      :class="`answer-btn ${toggle4 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="toggle" />
                      <span tabindex="-1" class="icon" v-if="toggle4">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10" v-if="isEdit">
          <div class="kahoot-form">
            <div class="test-title">
              <span v-if="question">{{ 150 - question.length }}</span>
              <input
                maxlength="150"
                v-model="ques.question"
                placeholder="Start typing your question"
                type="text"
                class="question"
              />
            </div>
            <div class="row">
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  class="answer-box"
                  :style="`background-color: ${answer1 ? color1 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color1};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path></svg
                    ></span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="answer1"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 1"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - answer1.length }}</span>
                    <div
                      v-if="answer1"
                      @click="`${(ques.toggle = !ques.toggle)}`"
                      :class="`answer-btn ${ques.toggle ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="ques.toggle" />
                      <span tabindex="-1" class="icon" v-if="ques.toggle">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  class="answer-box"
                  :style="`background-color: ${answer2 ? color2 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color2};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="answer2"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 2"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - answer2.length }}</span>
                    <div
                      v-if="answer2"
                      @click="`${(ques.toggle2 = !ques.toggle2)}`"
                      :class="`answer-btn ${ques.toggle2 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="ques.toggle2" />
                      <span tabindex="-1" class="icon" v-if="ques.toggle2">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${answer3 ? 'box-answer' : ''}`"
                  :style="`background-color: ${answer3 ? color3 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color3};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="answer3"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 3 (optional)"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - answer3.length }}</span>
                    <div
                      v-if="answer3"
                      @click="`${(ques.toggle3 = !ques.toggle3)}`"
                      :class="`answer-btn ${ques.toggle3 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="ques.toggle3" />
                      <span tabindex="-1" class="icon" v-if="ques.toggle3">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div
                  data-functional-selector="question-answer"
                  data-mapped-index="0"
                  :class="`answer-box ${answer4 ? 'box-answer' : ''}`"
                  :style="`background-color: ${answer4 ? color4 : ''}`"
                >
                  <div class="small" :style="`background-color: ${color4};`">
                    <span
                      class="sc-eDvSVe htLrRN card-icon__icon"
                      data-functional-selector="icon"
                      style="
                        display: flex;
                        vertical-align: middle;
                        width: 40px;
                        height: 40px;
                      "
                    >
                      <svg
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
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div style="width: 80%; text-align: start">
                    <textarea
                      v-model="answer4"
                      maxlength="100"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      class="text-kahoot"
                      placeholder="Add answer 4 (optional)"
                    >
                    </textarea>
                    <span class="bag">{{ 100 - answer4.length }}</span>
                    <div
                      v-if="answer4"
                      @click="`${(ques.toggle4 = !ques.toggle4)}`"
                      :class="`answer-btn ${ques.toggle4 ? 'active' : ''}`"
                    >
                      <input type="hidden" v-model="ques.toggle" />
                      <span tabindex="-1" class="icon" v-if="ques.toggle4">
                        <img
                          src="//assets-cdn.kahoot.it/builder/v2/assets/check-icon-fe2a6a3d.svg"
                          alt="checkmark"
                          class="sc-dubCtV fglqvl"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      toggle: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      items: [1, 2, 3, 4],
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      color1: "rgb(226, 27, 60)",
      color2: "rgb(19, 104, 206)",
      color3: "rgb(216, 158, 0)",
      color4: "rgb(38, 137, 12)",
      question: "",
      isEdit: false,
      btnClick: "default",
      catId: "",
    };
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    questions() {
      return this.$store.getters.questions;
    },
    ques() {
      return this.$store.getters.question;
    },
    answer1() {
      return this.$store.getters.answer1;
    },
    answer2() {
      return this.$store.getters.answer2;
    },
    answer3() {
      return this.$store.getters.answer3;
    },
    answer4() {
      return this.$store.getters.answer4;
    },
  },
  methods: {
    submitPin() {
      location.href = `qrcode/${this.catId}`;
    },
    oneQues(id) {
      this.$store.dispatch("getOneQues", id), (this.isEdit = true);
    },
    deleteQuestion(id) {
      this.$store.dispatch("deleteQues", id);
    },
    async QuesSub() {
      try {
        const formData = new FormData();
        formData.append("catId", this.catId);
        formData.append("question", this.question);
        formData.append("answer1", this.text1);
        formData.append("answer2", this.text2);
        formData.append("answer3", this.text3);
        formData.append("answer4", this.text4);
        formData.append("toggle", this.toggle);
        formData.append("toggle2", this.toggle2);
        formData.append("toggle3", this.toggle3);
        formData.append("toggle4", this.toggle4);

        await axios.post("http://localhost:4000/question", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$store.dispatch("getUserQues", this.catId);
        this.question = "";
        this.text1 = "";
        this.text2 = "";
        this.text3 = "";
        this.text4 = "";
        this.toggle = false;
        this.toggle2 = false;
        this.toggle3 = false;
        this.toggle4 = false;
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
  },
  mounted() {
    this.catId = this.$route.params.id;
    this.$store.dispatch("getUserQues", this.catId);
  },
};
</script>

<style lang="scss">
@import "../styles/kahoot.scss";
</style>