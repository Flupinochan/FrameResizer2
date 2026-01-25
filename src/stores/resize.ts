import { defineStore } from "pinia";
import { ref } from "vue";
import { ResizeDimension } from "../../types/resize";

export const useResizeStore = defineStore("resize", () => {
  const isFeatureEnabled = ref(false);
  const targetDimension = ref<ResizeDimension>("width");
  const targetSize = ref<number>(708);

  return {
    isFeatureEnabled,
    targetDimension,
    targetSize,
  };
});
