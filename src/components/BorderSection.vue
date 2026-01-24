<template>
  <BaseSection
    title="枠線設定"
    :show-switch="true"
    v-model:switch-value="isEnabled"
  >
    <v-container>
      <!-- 色 -->
      <v-row>
        <v-col cols="12">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="color"
                label="色"
                readonly
                v-bind="props"
                :disabled="!isEnabled"
              />
            </template>
            <v-color-picker v-model="color" />
          </v-menu>
        </v-col>
      </v-row>
      <!-- 太さ-->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.number="thickness"
            label="太さ"
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

const isEnabled = ref(true);
const color = ref("#444444");
const thickness = ref(1);
</script>
