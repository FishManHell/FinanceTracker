import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import { router } from '@/shared/config/router/router';
import App from './app/App.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });

const authStore = useAuthStore(pinia);
authStore.restoreSession();

app.use(router);

app.mount('#app');
