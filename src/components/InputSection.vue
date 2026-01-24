<template>
  <BaseSection title="入力ファイル">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-btn block @click="handleOpenFileDialog" prepend-icon="$fileImage"
            >ファイル選択</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            @click="handleOpenDirectoryDialog"
            prepend-icon="$folderImage"
            >フォルダ選択</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet border rounded max-height="140" class="overflow-y-auto">
            <template v-if="inputPathsStore.inputPaths.length === 0">
              <div class="text-medium-emphasis text-body-2 pa-2">InputPath</div>
            </template>

            <v-list v-else density="compact">
              <v-list-item
                v-for="(path, index) in inputPathsStore.inputPaths"
                :key="index"
              >
                <v-list-item-title class="text-body-3">
                  {{ path }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </BaseSection>
</template>

<script setup lang="ts">
import { useInputPathsStore } from "../stores/inputPaths";
import { useOutputPathStore } from "../stores/outputPath";
import { handleOpenPathDialog } from "../utils/dialogHandler";
import BaseSection from "./BaseSection.vue";

const inputPathsStore = useInputPathsStore();
const outputPathsStore = useOutputPathStore();

async function handleOpenFileDialog() {
  await handleOpenPathDialog(
    () => window.electron.openFileDialog(),
    inputPathsStore,
    outputPathsStore,
  );
}

async function handleOpenDirectoryDialog() {
  await handleOpenPathDialog(
    () => window.electron.openDirectoryDialog(true),
    inputPathsStore,
    outputPathsStore,
  );
}

// TODO(metalmental): startInのdirectory記憶
// function saveHandle(){}
// TODO(metalmental): ドラッグ&ドロップ対応
// function dragoverDrop(){}
</script>

<style scoped></style>
