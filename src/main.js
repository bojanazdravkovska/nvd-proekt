import { createApp, ref } from 'vue'
import { router } from './routes';
import './style.css'
import 'flowbite';
import App from './App.vue'

const sharedState = {
    rating: ref(0),
  };

createApp(App)
.use(router)
.provide('sharedState', sharedState)
.mount('#app')
