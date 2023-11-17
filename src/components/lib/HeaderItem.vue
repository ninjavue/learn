<template>
  <div class="header">
    <div class="container">
      <div class="header-box">
        <router-link @click="toggleProfile = false" to="/" class="logo"
          >Learn!</router-link
        >

        <nav @click="toggleProfile = false">
          <router-link to="/">Bosh Sahifa</router-link>
          <router-link to="/about">Tarjimon</router-link>
          <router-link to="/tg-group">Chatlar</router-link>
          <router-link to="/kahoot-create">Kahoot!</router-link>
        </nav>
        <div class="profile" v-if="user._id" @click="toggleProfile = true">
          <img class="profile-avatar" :src="`${url}/${users.image}`" alt="" />
        </div>
        <!-- hide profile -->

        <div :class="`profile-box ${toggleProfile ? 'active' : ''}`">
          <button
            @click="toggleProfile = !toggleProfile"
            class="profile-box-close"
          ></button>
          <div class="views" style="padding: 0 20px">
            <div
              class="profile view"
              v-if="user._id"
              @click="toggleProfile = true"
            >
              <img
                class="profile-avatar"
                :src="`${url}/${users.image}`"
                alt=""
              />
            </div>
            <div style="margin-left: 10px">
              <h3 style="font-family: 'Nunito'; font-weight: 600">
                {{ users.name }}
              </h3>
              <p>{{ users.admin ? "Admin" : "Foydalanuvchi" }}</p>
            </div>
          </div>
          <div class="profile-menu">
            <h3 style="margin-bottom: 20px">Profil</h3>
            <div>Telefon: {{ users.phone }}</div>
          </div>
          <div class="profile-menu mt">
            <h3 style="margin-bottom: 20px">Sozlamalar</h3>
            <div @click="togglePhoto = !togglePhoto">Rasmni o'zgartirish</div>
            <div>Profil sozlamalari</div>
            <div>Parolni o'zgartirish</div>
            <div @click="logOutSetting">Chiqish</div>
          </div>
          <div class="profile-menu mt" v-if="users.admin">
            <h3 style="margin-bottom: 20px">Admin</h3>
            <router-link to="/users" @click="toggleProfile = !toggleProfile"
              >Barcha Foydalanuvchilar</router-link
            >
          </div>
        </div>
        <button class="learn-btn" @click="btnModal = true" v-if="!user._id">
          Ro'yhatdan o'tish
        </button>
        <button
          class="learn-sigin"
          @click="btnLogin = true"
          v-if="!user._id"
          style="color: #ff8500"
        >
          Kirish
        </button>
      </div>
    </div>
  </div>

  <!-- modal -->

  <div class="modal" v-if="btnModal">
    <div class="modal-box">
      <button class="modal-close" @click="btnModal = false"></button>
      <h3 style="text-align: center">Ro'yhatdan o'tish</h3>

      <form action="" @submit.prevent="save">
        <div class="form-input">
          <label for="">F.I.O</label>
          <input
            v-model="name"
            type="text"
            placeholder="Familiya Ism"
            required
          />
        </div>
        <div class="form-input">
          <label for="">Telefon raqamingiz</label>
          <input
            v-model="phone"
            type="text"
            v-mask="'+### (##) ###-##-##'"
            placeholder="+998 (99) 123-45-67"
            required
          />
        </div>
        <div class="form-input">
          <label for="">Parol kiriting</label>
          <span @click="btnPass = true" v-if="!btnPass">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              />
            </svg>
          </span>
          <span @click="btnPass = false" v-if="btnPass"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
              />
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
              />
            </svg>
          </span>
          <input
            v-model="password"
            :type="`${btnPass ? 'password' : 'text'}`"
            placeholder="password"
            required
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">Saqlash</button>
          <button class="learn-btn bg-danger" @click="btnModal = false">
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- login modal -->

  <div class="modal" v-if="btnLogin">
    <div class="modal-box">
      <button class="modal-close" @click="btnLogin = false"></button>
      <h3 style="text-align: center">Kirish</h3>

      <form action="" @submit.prevent="loginSave">
        <div class="form-input">
          <label for="">Telefon raqamingiz.</label>
          <input
            v-model="phone"
            type="text"
            v-mask="'+### (##) ###-##-##'"
            placeholder="+998 (99) 123-45-67"
            required
          />
        </div>
        <div class="form-input">
          <label for="">Parol</label>
          <span @click="btnPass = true" v-if="!btnPass"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              />
            </svg>
          </span>
          <span @click="btnPass = false" v-if="btnPass"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
              />
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
              />
            </svg>
          </span>
          <input
            v-model="password"
            :type="`${btnPass ? 'password' : 'text'}`"
            placeholder="password"
            required
          />
        </div>
        <div class="btn-group">
          <button class="learn-btn">Kirish</button>
          <button class="learn-btn bg-danger" @click="btnLogin = false">
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- change profile foto -->

  <div class="modal" v-if="togglePhoto">
    <div class="modal-box">
      <button class="modal-close" @click="togglePhoto = false"></button>
      <h3 style="text-align: center">Change Photo</h3>

      <form action="" @submit.prevent="createUser">
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
          <button class="learn-btn">Change photo</button>
          <button class="learn-btn bg-danger" @click="togglePhoto = false">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Log Out modal -->

  <div class="modal" v-if="toggleLog">
    <div class="modal-box">
      <button class="modal-close" @click="toggleLog = false"></button>
      <h3
        style="
          text-align: center;
          margin-bottom: 20px;
          color: rgb(234, 102, 102);
        "
      >
        Haqiqatdan ham tizimdan chiqmoqchisizmi?
      </h3>
      <div style="display: flex">
        <button
          class="learn-btn"
          style="margin-left: auto; margin-right: 20px"
          @click="logOut"
        >
          Ha
        </button>
        <button class="learn-btn bg-danger" @click="toggleLog = false">
          Yo'q
        </button>
      </div>
    </div>
  </div>

  <!-- error-toast -->

  <div v-if="show" class="error-toast" :style="`background-color: ${color};`">
    <div class="error-toast-content">
      <p>{{ message }}</p>
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      toggleLog: false,
      togglePhoto: false,
      btnLogin: false,
      btnModal: false,
      btnPass: true,
      name: "",
      password: "",
      toggleProfile: false,
      phone: "",
      show: false,
      message: "",
      color: "",
      user: {
        _id: "",
        avatar: null,
      },
    };
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    logOutSetting() {
      this.toggleProfile = false;
      this.toggleLog = true;
    },
    logOut() {
      this.$cookies.remove("user");
      window.location.reload();
      this.showErrorToast("Mofaqiyatli tizimdan chiqdingiz!");
      this.color = "#8cf472";
    },
    handleFileChange(event) {
      this.user.avatar = event.target.files[0];
    },
    async createUser() {
      try {
        const formData = new FormData();
        formData.append("avatar", this.user.avatar);

        await axios.put(
          `http://localhost:4000/user/avatar/${this.user._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.showErrorToast("Photo created successfully!");
        this.color = "#8cf472";
        this.$store.dispatch("getUser", this.user._id);
        this.togglePhoto = false;
      } catch (error) {
        this.color = "rgb(254, 134, 134)";
        this.showErrorToast("Photo not created");
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
    loginSave() {
      try {
        const formData = new FormData();

        formData.append("phone", this.phone);
        formData.append("password", this.password);

        axios.post(`${this.url}/login`, formData).then((res) => {
          this.id = res.data._id;
          window.location.reload();

          let users = [];
          if (this.$cookies.isKey("user")) {
            users = this.$cookies.get("user");
          }
          users.push({
            _id: this.id,
          });
          this.$store.dispatch("getUser", this.user._id);
          this.$cookies.set("user", JSON.stringify(users));
        });
        this.btnLogin = false;
      } catch (error) {
        console.log(error);
      }
    },
    save() {
      // Ma'lumotlarni yig'ish
      const list = {
        name: this.name,
        phone: this.phone,
        password: this.password,
      };
      // Axios orqali POST so'rovini yuborish
      axios
        .post(`${this.url}/user`, list)
        .then((res) => {
          this.id = res.data._id;
          this.color = "#8cf472";
          const message = "User created successfully!";
          this.showErrorToast(message);
          this.btnModal = false;
          window.location.reload();
          this.btnLogin = true;
          this.name = "";
          this.phone = "";
          this.password = "";
          // Yuborish muvaffaqiyatli
          // Kerakli qarorlar
          let users = [];
          if (this.$cookies.isKey("user")) {
            users = this.$cookies.get("user");
          }
          users.push({
            _id: this.id,
          });
          this.$store.dispatch("getUser", this.user._id);
          this.$cookies.set("user", JSON.stringify(users));
        })
        .catch((error) => {
          this.color = "rgb(254, 134, 134)";
          if (error.response.status == 400) {
            this.showErrorToast("Bu telefon foydalanuchisi tizimda mavjud");
          } else {
            this.showErrorToast("Internal Server Error");
          }
          // Yuborishda xatolik yuz berdi
          // Xatolikni qayta ishlab chiqishingiz mumkin
        });
    },
  },

  mounted() {
    let user = this.$cookies.get("user");
    if (user) {
      this.user = user[0];
      this.$store.dispatch("getUser", this.user._id);
    } else {
      this.user = {};
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/header.scss";
</style>

