<script setup lang="ts">
import { ref } from "vue";
const rail = ref(true);

interface Item {
  title: string;
  icon: string;
}

const items: Item[] = [
  {
    title: "Dashbord",
    icon: "fas fa-chart-pie",
  },
  {
    title: "Usuários",
    icon: "fas fa-users-line",
  },
];
</script>
<template>
  <v-navigation-drawer
    rail-width="80"
    :rail="rail"
    color="primary"
    app
    fixed
    permanent
  >
    <v-list class="mt-2" nav>
      <v-list-item density="compact" class="py-0 my-0" @click="rail = !rail">
        <template v-slot:prepend>
          <v-icon size="17" class="ml-3 py-0 my-0" icon="fas fa-bars"></v-icon>
        </template>
        <v-list-item-title class="text-subtitle-1 py-0 my-0"
          >Menu</v-list-item-title
        >
      </v-list-item>
      <div class="text-caption text-center" v-if="rail">Menu</div>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item class="py-0 my-0" density="compact">
          <template v-slot:prepend>
            <v-icon size="17" class="ml-3 py-0 my-0" :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title class="text-subtitle-1 py-0 my-0">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
        <div class="text-caption text-center" v-if="rail">{{ item.title }}</div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped lang="scss">
.v-list-item {
  opacity: 1 !important;
}
.v-icon {
  opacity: 1 !important;
}
</style>
