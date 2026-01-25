import { createApp } from "vue";

// Vuetify
import {
  mdiAlertCircleOutline,
  mdiCheckCircleOutline,
  mdiFileImage,
  mdiFolderImage,
} from "@mdi/js";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";
import colors from "vuetify/util/colors";

import { createPinia } from "pinia";
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      fileImage: mdiFileImage,
      folderImage: mdiFolderImage,
      successImage: mdiCheckCircleOutline,
      errorImage: mdiAlertCircleOutline,
    },
    sets: {
      mdi,
    },
  },
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
    VSwitch: {
      color: "primary",
    },
  },
});

const pinia = createPinia();

createApp(App).use(pinia).use(vuetify).mount("#app");

// テーマ検知
window.electron.onThemeChanged((isDark: boolean) => {
  vuetify.theme.global.name.value = isDark ? "dark" : "light";
});
