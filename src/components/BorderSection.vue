<template>
  <BaseSection
    title="枠線設定"
    :show-switch="true"
    v-model:switch-value="borderStore.isFeatureEnabled"
  >
    <v-container>
      <!-- 色 -->
      <v-row>
        <v-col cols="12">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="borderStore.color"
                label="色"
                v-bind="props"
                :disabled="!borderStore.isFeatureEnabled"
                :rules="colorRule"
              />
            </template>
            <v-color-picker v-model="borderStore.color" />
          </v-menu>
        </v-col>
      </v-row>
      <!-- 太さ-->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.number="borderStore.thickness"
            label="太さ"
            type="number"
            :min="1"
            suffix="px"
            :disabled="!borderStore.isFeatureEnabled"
            :rules="thicknessRule"
          />
        </v-col>
      </v-row>
    </v-container>
  </BaseSection>
</template>

<script setup lang="ts">
import { useBorderStore } from "../stores/border";
import BaseSection from "./BaseSection.vue";

const borderStore = useBorderStore();

const colorRule = [
  (v: string) => !!v || "色を選択してください",
  (v: string) =>
    /^#[0-9A-F]{6}$/i.test(v) ||
    "有効なカラーコード(例: #FFFFFF)を入力してください",
];

const thicknessRule = [
  (v: number) => !!v || "太さを入力してください",
  (v: number) => v > 0 || "1以上の値を入力してください",
];
</script>
