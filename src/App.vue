<template>
  <HeaderItem />
  <router-view />
</template>
<script>
import HeaderItem from "./components/lib/HeaderItem.vue";
export default {
  components: { HeaderItem },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
@import "./styles/app.scss";

nav {
  padding: 30px;
  margin-left: auto;
  display: flex;
  gap: 30px;
  a {
    text-decoration: none;
    background-image: linear-gradient(#222b40, #222b40),
      linear-gradient(transparent, transparent),
      linear-gradient(#ff8500, #ff8500);
    background-size: 20px 2px, 100% 2px, 0 2px;
    background-position: calc(20px * -1) 100%, 100% 100%, 0 100%;
    background-repeat: no-repeat;
    transition: background-size 0.5s linear, background-position 2s linear;
    &:hover {
      color: #ff8500;
      background-size: 20px 2px, 0 2px, 100% 2px;
      background-position: calc(100% + 20px) 100%, 100% 100%, 0 100%;
    }
    &.router-link-exact-active {
      color: #ff8500;
      background-size: 20px 2px, 0 2px, 100% 2px;
      background-position: calc(100% + 20px) 100%, 100% 100%, 0 100%;
    }
  }
}

body {
  &::-webkit-scrollbar {
    width: 10px;
    letter-spacing: 0.02em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #adadad;
    outline: 1px solid #708090;
    border-radius: 8px;
  }
}
</style>
