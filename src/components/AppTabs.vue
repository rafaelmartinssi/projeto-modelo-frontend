<script setup lang="ts">
import { ref } from "vue";

export interface Tab {
  id: string;
  title: string;
  icon: string;
}

const tab = ref(null);

const props = defineProps<{
  tabs: Tab[];
}>();
</script>
<template>
  <v-tabs v-model="tab" color="primary">
    <v-tab
      v-for="item in props.tabs"
      :key="item.id"
      rounded="0"
      :prepend-icon="item.icon"
      class="text-h6 font-weight-bold text-disabled"
      :value="item.id"
    >
      {{ item.title }}
    </v-tab>
  </v-tabs>
  <v-divider></v-divider>
  <v-window v-model="tab">
    <v-window-item
      class="py-7"
      v-for="item in props.tabs"
      :key="item.id"
      :value="item.id"
    >
      <slot :name="`tab:${item.id}`"></slot>
    </v-window-item>
  </v-window>
</template>
<style scoped lang="scss">
.v-tab--selected {
  opacity: 1;
}
</style>
