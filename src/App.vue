<template>
  <v-form ref="form" validate-on="invalid-input">
    <v-container class="d-flex flex-column ga-4">
      <InputSection />
      <OutputSection />
      <BorderSection />
      <ResizeSection />
      <v-btn block color="primary" @click="submit">実行</v-btn>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BorderSection from "./components/BorderSection.vue";
import InputSection from "./components/InputSection.vue";
import OutputSection from "./components/OutputSection.vue";
import ResizeSection from "./components/ResizeSection.vue";
import { useBorderStore } from "./stores/border";
import { useInputPathsStore } from "./stores/inputPaths";
import { useOutputPathStore } from "./stores/outputPath";
import { useResizeStore } from "./stores/resize";

const form = ref();
const inputPathsStore = useInputPathsStore();
const outputPathStore = useOutputPathStore();
const borderStore = useBorderStore();
const resizeStore = useResizeStore();

async function submit() {
  if (inputPathsStore.paths.length === 0) {
    console.error("入力パスが設定されていません");
    return;
  }

  if (outputPathStore.path === "") {
    console.error("出力パスが設定されていません");
    return;
  }

  if (!borderStore.isFeatureEnabled && !resizeStore.isFeatureEnabled) {
    console.error("枠線 or リサイズ設定を有効化してください");
    return;
  }
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }

  console.log("submit");
}
</script>

<style scoped></style>
