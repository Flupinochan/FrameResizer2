<template>
  <v-form ref="form" validate-on="invalid-input">
    <v-container class="d-flex flex-column ga-4">
      <InputSection />
      <OutputSection />
      <BorderSection />
      <ResizeSection />
      <v-btn
        block
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="submit"
        >実行</v-btn
      >
    </v-container>
  </v-form>

  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="400"
      :prepend-icon="dialogType === 'success' ? '$successImage' : '$errorImage'"
      :title="dialogType === 'success' ? 'Success' : 'Error'"
      :text="dialogMessage"
    >
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import BorderSection from "./components/BorderSection.vue";
import InputSection from "./components/InputSection.vue";
import OutputSection from "./components/OutputSection.vue";
import ResizeSection from "./components/ResizeSection.vue";
import { ConvertBatchRequest } from "./main";
import { useBorderStore } from "./stores/border";
import { useInputPathsStore } from "./stores/inputPaths";
import { useOutputPathStore } from "./stores/outputPath";
import { useResizeStore } from "./stores/resize";

const form = ref();
const loading = ref(false);

type DialogType = "success" | "error";

const dialog = ref(false);
const dialogType = ref<DialogType>("success");
const dialogMessage = ref("");

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

  loading.value = true;

  try {
    const request: ConvertBatchRequest = {
      sourceImagePaths: [...toRaw(inputPathsStore.paths)],
      outputDirectoryPath: outputPathStore.path,
      outputHeight:
        resizeStore.isFeatureEnabled && resizeStore.targetDimension === "height"
          ? resizeStore.targetSize
          : undefined,
      outputWidth:
        resizeStore.isFeatureEnabled && resizeStore.targetDimension === "width"
          ? resizeStore.targetSize
          : undefined,
      borderSize: borderStore.isFeatureEnabled
        ? borderStore.thickness
        : undefined,
      borderColor: borderStore.isFeatureEnabled ? borderStore.color : undefined,
    };

    await window.electron.execConvertImages(request);

    dialogType.value = "success";
    dialogMessage.value = "Image conversion was successful";
    dialog.value = true;
  } catch (error) {
    dialogType.value = "error";
    dialogMessage.value = `Image conversion failed: ${error}`;
    dialog.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
