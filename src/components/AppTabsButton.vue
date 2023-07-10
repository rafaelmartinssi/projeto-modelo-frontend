<script setup lang="ts">
import { ref } from "vue";

export interface Tab {
  id: string;
  title: string;
}

const tab = ref(null);

const props = defineProps<{
  tabs: Tab[];
}>();
</script>
<template>
  <v-tabs v-model="tab">
    <v-tab
      v-for="item in props.tabs"
      :key="item.id"
      rounded="lg"
      color="primary"
      density="compact"
      class="text-body-1 font-weight-bold mr-1 text-primary"
      hide-slider
      :value="item.id"
    >
      {{ item.title }}
    </v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item v-for="item in props.tabs" :key="item.id" :value="item.id">
      <v-sheet elevation="1" class="mt-4 rounded-lg py-5 px-15">
        <slot :name="`tab:${item.id}`"></slot>
      </v-sheet>
    </v-window-item>
  </v-window>
</template>
<style scoped lang="scss">
.v-tab--selected {
  background: #0033fc !important;
  color: #ffffff !important;
}
</style>
