<template>
  <BaseSection title="入力ファイル">
    <v-row>
      <v-col cols="6">
        <v-btn block>ファイル選択</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block>フォルダ選択</v-btn>
      </v-col>
    </v-row>
  </BaseSection>
</template>

<script setup lang="ts">
import BaseSection from "./BaseSection.vue";
</script>

<style scoped></style>
