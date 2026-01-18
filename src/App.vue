<template>
  <v-container>
    <InputSection />
    <OutputSection />
    <BorderSection />
    <ResizeSection />
  </v-container>
</template>

<script setup lang="ts">
import BorderSection from "./components/BorderSection.vue";
import InputSection from "./components/InputSection.vue";
import OutputSection from "./components/OutputSection.vue";
import ResizeSection from "./components/ResizeSection.vue";
</script>

<style scoped></style>
