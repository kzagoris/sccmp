import { getApp } from "./composables/FirebaseFunction"
import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { router } from "./router"
import { createPinia } from "pinia"
import { createI18n } from "vue-i18n"
import en from "./locales/en.json"
import { VueFire, VueFireAuth } from "vuefire"

const pinia = createPinia()
const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  allowComposition: true,
  messages: {
    en: en,
  },
})
const app = createApp(App)

const firebaseApp = getApp()

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(i18n)
app.use(pinia)
app.use(router)
app.mount("#app")
