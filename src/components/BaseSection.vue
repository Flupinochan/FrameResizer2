<template>
  <v-card variant="outlined" class="pa-5">
    <div class="d-flex align-center">
      <h2 class="text-h6">{{ title }}</h2>
      <v-switch
        v-if="showSwitch"
        v-model="localSwitchValue"
        hide-details
        class="ml-4"
      />
    </div>
    <slot />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface BaseSectionProps {
  title: string;
  switchValue?: boolean;
  showSwitch?: boolean;
}

const props = defineProps<BaseSectionProps>();

const emit = defineEmits<{
  (e: "update:switchValue", value: boolean): void;
}>();

const localSwitchValue = computed({
  get: () => props.switchValue ?? false,
  set: (val: boolean) => emit("update:switchValue", val),
});
</script>

<style scoped>
.v-card {
  min-height: 0 !important;
}
::v-deep(.v-switch .v-selection-control) {
  min-height: 0 !important;
}
</style>
