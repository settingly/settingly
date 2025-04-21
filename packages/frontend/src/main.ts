import './assets/main.css';

import { createApp } from 'vue';
import { createPinia, storeToRefs } from 'pinia';
import { createHead } from '@unhead/vue/client';
import * as Sentry from '@sentry/vue';
import App from './App.vue';
import router from './router';
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
import { usePocketbaseStore } from './stores/usePocketbaseStore';

const app = createApp(App);

app.use(createPinia());
app.use(createHead());

app.use(
  VueUmamiPlugin({
    websiteID: import.meta.env.VITE_UMAMI_WEBSITE_ID,
    scriptSrc: 'https://eu.umami.is/script.js',
    router,
    allowLocalhost: true,
  }),
);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [],
});

app.use(router);

app.mount('#app');
