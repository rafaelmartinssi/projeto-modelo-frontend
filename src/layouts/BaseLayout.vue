<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import AppMenu from "@/components/AppMenu.vue";
</script>
<template>
  <v-app color="base">
    <AppMenu />
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style scoped lang="scss"></style>
