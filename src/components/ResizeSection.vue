<template>
  <BaseSection
    title="リサイズ設定"
    :show-switch="true"
    v-model:switch-value="resizeStore.isFeatureEnabled"
  >
    <v-container>
      <!-- リサイズ基準選択 -->
      <v-row class="align-center">
        <v-col cols="12">
          <v-radio-group
            color="primary"
            v-model="resizeStore.targetDimension"
            :disabled="!resizeStore.isFeatureEnabled"
            inline
            hide-details
          >
            <v-radio label="Width" value="width" class="mr-4" />
            <v-radio label="Height" value="height" />
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- サイズ入力 -->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.number="resizeStore.targetSize"
            type="number"
            :min="1"
            suffix="px"
            :disabled="!resizeStore.isFeatureEnabled"
          />
        </v-col>
      </v-row>
    </v-container>
  </BaseSection>
</template>

<script setup lang="ts">
import { useResizeStore } from "../stores/resize";
import BaseSection from "./BaseSection.vue";

const resizeStore = useResizeStore();
</script>

<style scoped></style>
