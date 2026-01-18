import { createApp } from "vue";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");

// テーマ検知
window.electron.onThemeChanged((isDark: boolean) => {
  vuetify.theme.global.name.value = isDark ? "dark" : "light";
});
