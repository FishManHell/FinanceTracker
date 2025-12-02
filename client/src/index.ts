import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/shared/config/router/router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import PrimeVue from 'primevue/config';
import App from './app/App.vue';
import Aura from '@primeuix/themes/aura';
import Ripple from 'primevue/ripple';
import 'primeicons/primeicons.css';
import '@/app/styles/index.scss';

const app = createApp(App);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    }
  }
});
app.directive('ripple', Ripple);

const pinia = createPinia();
app.use(pinia);

const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount('#app');
