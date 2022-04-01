import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import $httpToastState from '@/methods/pushToastState'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '../public/css/reset.css'
import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('numeric', numeric)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

const app = createApp(App)
app.config.globalProperties.$httpToastState = $httpToastState
app.use(router)
app.use(VueAxios, axios)
app.use(AOS)
AOS.init()
app.component('Field', Field)
app.component('Form', Form)
app.component('ErrorMessage', ErrorMessage)
setLocale('zh_TW')
app.mount('#app')
