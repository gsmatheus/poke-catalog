import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vfmPlugin from 'vue-final-modal'

import '../src/design/app.scss'

createApp(App)
  .use(router)
  .use(vfmPlugin)
  .mount('#app')
