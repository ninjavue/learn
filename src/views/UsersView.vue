<template>
  <div class="user-page">
    <div class="container">
      <h1
        style="
          color: white;
          text-align: center;
          padding-top: 40px;
          font-family: 'Nunito';
          font-weight: 600;
        "
      >
        Foydalanuvchilar
      </h1>
      <table class="user-table">
        <thead>
          <tr>
            <th style="text-align: center">№</th>
            <th>Rasm</th>
            <th>F.I.O</th>
            <th>Telefon</th>
            <th>User\Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) of users" :key="user._id">
            <td style="text-align: center">{{ i + 1 }}</td>
            <td>
              <img :src="`${url}/${user.image}`" alt="avatar" />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button @click="newAdmin(user._id)">
                {{ user.admin ? "Admin" : "User" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
    users() {
      return this.$store.getters.alluser;
    },
  },
  methods: {
    newAdmin(id) {
      this.$store.dispatch("changeUser", id);
    },
  },
  mounted() {
    this.$store.dispatch("getAllUser");
  },
};
</script>

<style lang="scss">
@import "../styles/page/users.scss";
</style>