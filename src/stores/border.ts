import { defineStore } from "pinia";
import { ref } from "vue";

export const useBorderStore = defineStore("border", () => {
  const isFeatureEnabled = ref(true);
  const color = ref("#444444");
  const thickness = ref(1);

  return {
    isFeatureEnabled,
    color,
    thickness,
  };
});
