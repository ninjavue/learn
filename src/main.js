import  { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTheMask from 'vue-the-mask'
import VueCookies from 'vue-cookies'
import EmojiPicker from 'vue-emoji-picker';
createApp(App).use(VueCookies, {
    expires: '1m'
}).use(store).use(EmojiPicker).use(VueTheMask).use(router).mount('#app')
