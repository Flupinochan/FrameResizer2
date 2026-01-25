import { defineStore } from "pinia";
import { ref } from "vue";

export const useOutputPathStore = defineStore("outputPath", () => {
  const path = ref<string>("");
  const isInputOutputSame = ref<boolean>(true);

  return {
    path,
    isInputOutputSame,
  };
});
