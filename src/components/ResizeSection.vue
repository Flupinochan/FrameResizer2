<template>
  <BaseSection
    title="リサイズ設定"
    :show-switch="true"
    v-model:switch-value="isEnabled"
  >
    <v-container>
      <!-- リサイズ基準選択 -->
      <v-row class="align-center">
        <v-col cols="12">
          <v-radio-group
            v-model="resizeBasis"
            :disabled="!isEnabled"
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
            v-model.number="resizeValue"
            type="number"
            :min="1"
            suffix="px"
            :disabled="!isEnabled"
          />
        </v-col>
      </v-row>
    </v-container>
  </BaseSection>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseSection from "./BaseSection.vue";

const isEnabled = ref(false);
const resizeBasis = ref<"width" | "height">("width");
const resizeValue = ref<number>(708);
</script>

<style scoped></style>
