<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const rail = ref(true);

interface Item {
  title: string;
  icon: string;
  path: string;
}

const items: Item[] = [
  {
    title: "Dashbord",
    icon: "fas fa-chart-pie",
    path: "home",
  },
  {
    title: "Usuários",
    icon: "fas fa-user-group",
    path: "",
  },
  {
    title: "Cadastro usuário",
    icon: "fas fa-user-plus",
    path: "user-registre",
  },
];

const redirect = (path: string) => {
  rail.value = true;
  router.push({ name: path });
};
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
    <v-list :lines="rail ? false : 'one'" class="mt-2" nav>
      <v-list-item
        :density="rail ? 'compact' : 'default'"
        class="py-0 my-0"
        @click="rail = !rail"
      >
        <template v-slot:prepend>
          <v-icon class="ml-3 py-0 my-0" icon="fas fa-bars"></v-icon>
        </template>
        <v-list-item-title class="text-subtitle-1 py-0 my-0"
          >Menu</v-list-item-title
        >
      </v-list-item>
      <div class="text-caption text-center mb-3" v-if="rail">Menu</div>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item
          @click="redirect(item.path)"
          :class="$route.name === `${item.path}` ? 'active' : ''"
          class="py-0 my-0"
          :density="rail ? 'compact' : 'default'"
        >
          <template v-slot:prepend>
            <v-icon
              :class="$route.name === `${item.path}` ? 'active' : ''"
              class="ml-3 py-0 my-0"
              :icon="item.icon"
            ></v-icon>
          </template>
          <v-list-item-title
            :class="$route.name === `${item.path}` ? 'bold' : ''"
            class="text-subtitle-1 py-0 my-0"
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item>
        <div
          class="text-caption text-center mb-3"
          :class="$route.name === `${item.path}` ? 'bold' : ''"
          v-if="rail"
        >
          {{ item.title }}
        </div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped lang="scss">
.active {
  opacity: 1 !important;
}

.v-icon {
  opacity: 1;
}
</style>
