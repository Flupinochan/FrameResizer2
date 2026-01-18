<template>
  <v-card variant="outlined" class="pa-5">
    <h2 class="text-h6 mb-4">{{ title }}</h2>
    <slot />
  </v-card>
</template>

<script setup lang="ts">
defineProps({ title: String });
</script>

<style scoped></style>
