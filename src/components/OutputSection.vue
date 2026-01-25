<template>
  <BaseSection title="出力フォルダ">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-switch
            hide-details
            v-model="outputPathStore.isInputOutputSame"
            label="上書きする"
            @update:model-value="onSwitchChanged"
          />
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            @click="handleOpenDirectoryDialog"
            prepend-icon="$folderImage"
            :disabled="outputPathStore.isInputOutputSame"
            >フォルダ選択</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-sheet border rounded>
            <template v-if="outputPathStore.path === ''">
              <div class="text-medium-emphasis text-body-2 pa-2">
                OutputPath
              </div>
            </template>

            <v-list v-else density="compact">
              <v-list-item>
                <v-list-item-title class="text-body-3">
                  {{ outputPathStore.path }}
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
import BaseSection from "./BaseSection.vue";

const outputPathStore = useOutputPathStore();
const inputPathsStore = useInputPathsStore();

async function handleOpenDirectoryDialog() {
  const dirPath = await window.electron.openDirDialog();
  if (dirPath === "") return;

  outputPathStore.path = dirPath;
}

async function onSwitchChanged(isEnabled: boolean | null) {
  if (inputPathsStore.paths.length < 1 || !isEnabled) return;

  const dirPath = await window.electron.extractDirNameFromPath(
    inputPathsStore.paths[0],
  );
  outputPathStore.path = dirPath;
}
</script>

<style lang="scss" scoped>
::v-deep(.v-switch .v-selection-control) {
  min-height: 0 !important;
}
</style>
