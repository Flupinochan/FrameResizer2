import { defineStore } from "pinia";
import { ref } from "vue";

export const useInputPathsStore = defineStore("inputPaths", () => {
  const paths = ref<string[]>([]);

  return {
    paths,
  };
});
