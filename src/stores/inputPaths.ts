import { defineStore } from "pinia";
import { ref } from "vue";

export const useInputPathsStore = defineStore("inputPaths", () => {
  const inputPaths = ref<string[]>([]);

  function addPath(path: string) {
    inputPaths.value.push(path);
  }

  function addPaths(paths: string[]) {
    inputPaths.value.push(...paths);
  }

  function clear() {
    inputPaths.value = [];
  }

  return {
    inputPaths,
    addPath,
    addPaths,
    clear,
  };
});
