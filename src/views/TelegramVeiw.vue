<template>
  <div class="group">
    <div class="container">
      <div class="row">
        <div class="col-3" @click="showSetting = false">
          <div :class="`group-list ${showModal ? 'scroll-hid' : ''}`">
            <div
              class="group-list-box"
              v-for="item of courses"
              :key="item._id"
              @click="subCourse(item._id, item.name, item.count)"
            >
              <img :src="`${url}/${item.image}`" alt="" />
              <div class="group-list-box-right">
                <h3>{{ item.name }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </div>

            <!-- modal right -->

            <div :class="`group-list-modal ${showModal ? 'show' : ''}`">
              <div class="modal-top">
                <img
                  @click="showModal = !showModal"
                  src="../assets/icons/arrow.svg"
                  alt=""
                />
                <div>
                  <h3>{{ name }}</h3>
                  <p>{{ count }} ta o'quvchi</p>
                </div>
                <button
                  class="learn-btn"
                  @click="toggle = true"
                  v-if="user.admin"
                >
                  +
                </button>
              </div>
              <div class="modal-body">
                <div
                  :class="`modal-body-box ${
                    item._id == toggleChat ? 'active' : ''
                  }`"
                  v-for="item of groups"
                  :key="item._id"
                  @click="selectChat(item._id)"
                >
                  <div :style="`background-color: ${item.color};`">
                    <span>{{ item.name.substring(0, 1) }}</span>
                  </div>
                  <h3>{{ item.name }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="d-center">
            <div v-if="!showText" class="default">
              Xabar yozishni boshlash uchun chatni tanlang.
            </div>
          </div>
          <div
            class="group-course"
            v-if="showText"
            :style="{
              background: `url(${url}/${user.chatfon}) no-repeat`,
              'background-size': '75vw calc(100vh - 90px)',
            }"
          >
            <img
              src="../assets/icons/setting.svg"
              alt=""
              class="group-course-setting"
              
              @click="showSetting = !showSetting"
            />
            <div class="setting-box" v-if="showSetting">
              <span class="arrow-up"></span>
              <div @click="fonToggle = true">Fon rasmini o'zgartirish</div>
              <div @click="deleteFon">Fon rasmini o'chirish</div>
            </div>
            <div class="group-course-box" @click="showSetting = false">
              <div  class="send" v-for="item of chats" :key="item._id" >
                <img :src="`${url}/${item.user.image}`" alt="" />
                <div
                  :class="`send-box ${
                    item.user._id == user._id ? 'active' : ''
                  }`"
                >
                  <div class="arrow-left"></div>

                  <h2>{{ item.user.name }}</h2>
                  <p v-if="!item.file"><pre v-html="`${ processLinks(item.message) }`"></pre></p>
                  <div v-if="item.file">
                      <div v-if="item.file.fileType == 'image'" class="file-image">
                        <img style="margin-top: 8px" :src="`${url}/${item.file.fayl}`" alt="">
                        <pre style="font-family: 'Nunito'; white-space: pre-wrap; font-size: 16px" v-html="`${ processLinks(item.file.message) }`"></pre>
                      </div>
                      <div v-if="item.file.fileType == 'audio'" class="file-audio">
                        <audio controls>
                           <source :src="`${url}/${item.file.fayl}`" type="audio/mp3" />
                          {{ item.file.fileName }}
                        </audio>
                        <pre style="font-family: 'Nunito'; white-space: pre-wrap;" v-html="`${ processLinks(item.file.message) }`"></pre>
                      </div>
                      <div v-if="item.file.fileType == 'video'" class="file-audio">
                        <video  height="240" controls>
                          <source :src="`${url}/${item.file.fayl}`" type="video/mp4">
                      </video>
                        <pre style="font-family: 'Nunito'; white-space: pre-wrap;" v-html="`${ processLinks(item.file.message) }`"></pre>
                      </div>
                      <div v-if="item.file.fileType == 'application'" class="file-app">
                        
                        <a :href="`${url}/${item.file.fayl}`" download>
                          <div><img src="../assets/icons/file.svg" alt=""></div>
                          <span class="fileName">
                            <h4>{{ item.file.fileName }}</h4>
                            <p>{{ item.file.fileSize }} MB</p>
                          </span>
                        </a>
                        <pre style="margin-top: 10px; white-space: pre-wrap; font-family: 'Nunito'; font-size: 16px" v-html="`${ processLinks(item.file.message) }`"></pre>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="group-course-bottom" @click="showSetting = false">
              <form @submit.prevent="createMessage">
                <span @click="onFile">
                  <img src="../assets/icons/papel.png" alt="" />
                </span>
                <textarea
                  v-model="messag"
                  type="text"
                  placeholder="Xabar yozing..."
                  @keydown="handleKeyDown"
                  required ></textarea>
                <button>
                  <img src="../assets/icons/send.png" alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" v-if="fonToggle">
    <div class="modal-box">
      <button class="modal-close" @click="fonToggle = false">
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
      <h3 style="text-align: center">Fon rasimini o'zgartirish.</h3>

      <form action="" @submit.prevent="createFon">
        <div class="form-input">
          <label for="">Rasm tanlang</label>
          <input
            class="file"
            type="file"
            id="fon"
            @change="handleFileChange"
            required
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">O'zgartirish</button>
          <button class="learn-btn bg-danger" @click="fonToggle = false">
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="modal" v-if="toggle">
    <div class="modal-box">
      <button class="modal-close" @click="toggle = false">
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
      <h3 style="text-align: center">Chat qo'shish</h3>

      <form action="" @submit.prevent="createGroup">
        <div class="form-input">
          <label for="">Chat nomi</label>
          <input
            class="file"
            type="text"
            v-model="text"
            required
            :placeholder="`${name} A1`"
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">Qo'shish</button>
          <button class="learn-btn bg-danger" @click="toggle = false">
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="show" class="error-toast" :style="`background-color: ${color};`">
    <div class="error-toast-content">
      <p style="color: white">{{ message }}</p>
      <button @click="hideErrorToast" class="toast-btn">
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
    </div>
  </div>

  
  <div class="file modal" v-show="selectedFileName">
    <div :class="`file-box ${selectedFileType == 'image'?'active':''}`">
        <h3>Fayl sifatida yuborish</h3>
        <div v-if="selectedFileType == 'image'">
          <img :src="selectedImage" alt="">
        </div>
        <div v-if="selectedFileType != 'image'">
        <span>
          <img v-if="selectedFileType == 'audio'" :class="`${selectedFileType == 'audio'?'gros':''}`" src="../assets/icons/play.svg" alt="">
          <img v-if="selectedFileType != 'audio'" src="../assets/icons/file.svg" alt="">
        </span>
        <div>
            <h1>{{ selectedFileName }}</h1>
            <p>{{ selectedFileSize }} MB</p>
        </div>
       </div>
       <form @submit.prevent="createMessage">
        <textarea autofocus="true" class="file-bottom-input" v-model="txt"></textarea>
       <section class="file-bottom">
           <input type="file" id="fileInput" ref="fileInput" @change="fileChange" style="display: none"/>
            <p  @click="cancelFile">Bekor qilish</p>
            <button>Yuborish</button>
       </section>
       </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      txt: "",
      fonToggle: false,
      showSetting: false,
      showModal: false,
      name: "",
      count: null,
      toggle: false,
      text: "",
      catId: "",
      color: "",
      show: false,
      message: "",
      showText: false,
      messag: "",
      groupId: "",
      toggleChat: "",
      image: null,
      selectedFileName: null,
      selectedFileSize: null,
      selectedFileType: null,
      selectedImage: null,
    };
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    courses() {
      return this.$store.getters.courses;
    },
    groups() {
      return this.$store.getters.groups;
    },
    user() {
      return this.$store.getters.users;
    },
    chats() {
      return this.$store.getters.chats || {};
    },
    fon() {
      return this.$store.getters.fon;
    },
  },
  methods: {
    processLinks(text) {
      if (text) {
        const linkPattern = /https?:\/\/\S+/g;
        const matches = text.match(linkPattern);
        if (matches) {
          return text.replace(linkPattern, (match) => {
            return `<a href="${match}"  target="_blank">${match}</a>`;
          });
        }
      }
      return text;
    },
    deleteFon() {
      try {
        axios.delete(`${this.url}/user/fon/${this.user._id}`);
        this.showSetting = false;
        this.color = "rgb(51, 255, 51)";
        this.showErrorToast("Fon default holatga qaytarildi");
      } catch (error) {
        console.log(error);
      }
    },
    handleFileChange(event) {
      this.image = event.target.files[0];
    },
    createFon() {
      try {
        const formData = new FormData();

        formData.append("image", this.image);

        axios.put(`${this.url}/user/fon/${this.user._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.fonToggle = false;
        this.showSetting = false;
        this.color = "rgb(51, 255, 51)";
        this.showErrorToast("Chat Foni moffaqiyatli o'zgartirildi.");
        this.$store.dispatch("getUser", this.user._id);
      } catch (error) {
        console.log("Xatolik yuz berdi.");
      }
    },
    handleKeyDown(event) {
      if (event.key === "Enter" && event.shiftKey) {
        console.log("");
      } else if (event.key === "Enter") {
        this.createMessage();
      }
    },
    cancelFile() {
      this.selectedFileName = null;
      this.selectedFileSize = null;
      this.selectedFileType = null;
      this.selectedImage = null;
      this.fileChange;
    },
    selectChat(id) {
      this.showText = true;
      this.groupId = id;
      this.$store.dispatch("getChat", id);
      this.toggleChat = id;
    },
    onFile() {
      document.getElementById("fileInput").click();
    },
    fileChange(event) {
      this.file = event.target.files[0];
      const fileInput = this.$refs.fileInput;
      const input = event.target;
      if (fileInput.files.length > 0) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.selectedImage = e.target.result;
          this.imageSelected = true;
        };

        reader.readAsDataURL(input.files[0]);

        const a = fileInput.files[0].type;
        this.selectedFileName = fileInput.files[0].name;
        this.selectedFileSize = fileInput.files[0].size;
        this.selectedFileSize = this.selectedFileSize / 1048576;
        this.selectedFileSize = this.selectedFileSize.toFixed(1);

        if (this.selectedFileSize == 0) {
          this.selectedFileSize = 0.07;
        }

        if (this.findWordInText(a, "image/") > -1) {
          this.selectedFileType = "image";
        } else if (this.findWordInText(a, "application/") > -1) {
          this.selectedFileType = "application";
        } else if (this.findWordInText(a, "video/") > -1) {
          this.selectedFileType = "video";
        } else if (this.findWordInText(a, "audio/") > -1) {
          this.selectedFileType = "audio";
        } else {
          console.log(a);
        }
        // Faylni qo'shimcha amallar bilan ishlatishingiz mumkin
      } else {
        this.selectedFileName = null;
        this.selectedFileSize = null;
      }
    },
    async createMessage() {
      try {
        const formData = new FormData();
        formData.append("groupId", this.groupId);
        formData.append("userId", this.user._id);
        formData.append("message", this.messag);

        if (this.file) {
          formData.append("type", this.selectedFileType);
          formData.append("fileName", this.selectedFileName);
          formData.append("message", this.txt);
          formData.append("file", this.file);
          formData.append("fileSize", this.selectedFileSize);
        }

        await axios.post(`${this.url}/chat`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.messag = "";
        this.selectedFileType = "";
        this.txt = "";
        this.selectedFileName = "";
        this.file = null;
        this.$store.dispatch("getChat", this.groupId);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    },
    showErrorToast(message) {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.hideErrorToast();
      }, 5000);
    },
    hideErrorToast() {
      this.show = false;
      this.message = "";
    },
    createGroup() {
      try {
        const formData = new FormData();
        formData.append("catId", this.catId);
        formData.append("name", this.text);

        axios.post(`${this.url}/group`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.color = "rgb(51, 255, 51)";
        this.showErrorToast("Chat moffaqiyatli qo'shildi.");
        this.text = "";
        this.toggle = false;
        this.$store.dispatch("getGroup", this.catId);
      } catch (error) {
        console.log("Xatolik yuz berdi.");
      }
    },
    subCourse(id, name, count) {
      this.catId = id;
      this.$store.dispatch("getGroup", id);
      this.showModal = true;
      this.name = name;
      this.count = count;
    },
    findWordInText(text, wordToFind) {
      const words = text.search(wordToFind);
      return words;
    },
    scrollToBottom() {
      if (document.body) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
    this.$store.dispatch("getCourse");
    this.$store.dispatch("getGroup");
    this.$store.dispatch("getUser", this.user._id);
    document.querySelector(".file-bottom-input").focus();
  },
};
</script>

<style lang="scss">
@import "../styles/page/gruop.scss";
</style>