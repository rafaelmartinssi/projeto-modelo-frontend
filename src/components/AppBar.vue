<script setup lang="ts">
import { useMainStore } from "@/store";
const main = useMainStore();
</script>
<template>
  <v-app-bar app fixed elevation="0" color="base">
    <div class="ml-6 text-primary font-weight-bold text-subtitle-1">
      Olá, {{ main.user.nome.split(" ")[0].toUpperCase() }}
    </div>
    <v-spacer></v-spacer>
    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          variant="plain"
          class="text-body-2 mr-2 font-weight-bold"
          >Configurações
          <template #prepend>
            <v-icon size="15" color="primary" icon="fas fa-gear"></v-icon>
          </template>
        </v-btn>
      </template>
      <v-list></v-list>
    </v-menu>
    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          variant="plain"
          class="text-body-2 mr-2 font-weight-bold"
          >Notificações
          <template #prepend>
            <v-icon size="15" color="primary" icon="far fa-bell"></v-icon>
          </template>
        </v-btn>
      </template>
      <v-list></v-list>
    </v-menu>
    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          variant="plain"
          class="text-body-2 mr-2 font-weight-bold"
          >Meu perfil
          <template #prepend>
            <v-icon
              size="15"
              color="primary"
              icon="far fa-circle-user"
            ></v-icon>
          </template>
        </v-btn>
      </template>
      <v-list :lines="false">
        <v-list-item
          density="compact"
          @click="$router.push({ name: 'account' })"
        >
          <template v-slot:prepend>
            <v-icon size="14" class="mr-4" icon="far fa-circle-user"></v-icon>
          </template>
          <v-list-item-title>Meu perfil</v-list-item-title>
        </v-list-item>
        <v-list-item
          density="compact"
          @click="$router.push({ name: 'account' })"
        >
          <template v-slot:prepend>
            <v-icon
              size="14"
              class="mr-4"
              icon="fas fa-arrow-right-from-bracket"
            ></v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<style scoped lang="scss">
.v-btn {
  opacity: 1;
}
</style>
