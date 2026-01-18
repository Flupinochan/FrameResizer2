import { createApp } from "vue";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import colors from "vuetify/util/colors";
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: colors.blue.base,
        },
      },
      dark: {
        colors: {
          primary: colors.blue.base,
        },
      },
    },
  },
  defaults: {
    VCard: {
      border: "thin",
      rounded: "lg",
    },
    VBtn: {
      border: "thin",
      variant: "outlined",
      color: "primary",
    },
  },
});

createApp(App).use(vuetify).mount("#app");

// テーマ検知
window.electron.onThemeChanged((isDark: boolean) => {
  vuetify.theme.global.name.value = isDark ? "dark" : "light";
});
