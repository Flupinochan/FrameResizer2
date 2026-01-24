import { defineStore } from "pinia";
import { ref } from "vue";

export const useOutputPathStore = defineStore("outputPath", () => {
  const outputPath = ref<string>("");
  const isInputOutputSame = ref<boolean>(true);

  function setPath(path: string) {
    outputPath.value = path;
  }

  function clear() {
    outputPath.value = "";
  }

  function switchIsInputOutputSame() {
    isInputOutputSame.value = !isInputOutputSame.value;
  }

  return {
    outputPath: outputPath,
    setPath: setPath,
    isInputOutputSame,
    switchIsInputOutputSame,
    clear,
  };
});
