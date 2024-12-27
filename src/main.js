import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';


// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);


app.mount('#app');
