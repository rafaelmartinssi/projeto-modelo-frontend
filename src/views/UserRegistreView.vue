<script lang="ts" setup>
import { ref } from "vue";
import AppCardDefault from "@/components/AppCardDefault.vue";
import services from "@/services";
import { User } from "@/store/types";
import { reactive } from "vue";

const form = ref();
const alertSuccess = ref(false);
const alertError = ref(false);
const message = ref("");

interface State {
  user: User;
}

const state = reactive<State>({
  user: {} as User,
});

const onSubmit = async () => {
  const confirm = await form.value.validate();
  console.log(confirm.valid);
  if (confirm.valid) {
    const response = await services.user.create(state.user);

    if (response.data.info.codigo === 0) {
      state.user = {} as User;
      alertSuccess.value = true;
      form.value.resetValidation();
    } else {
      alertError.value = true;
      message.value = response.data.info.descricao;
    }
  } else {
    return false;
  }
  return false;
};
</script>
<template>
  <v-snackbar
    v-model="alertSuccess"
    color="success"
    location="top right"
    :timeout="3000"
  >
    Dados salvos com sucesso.
  </v-snackbar>
  <v-snackbar
    v-model="alertError"
    color="error"
    location="top right"
    :timeout="3000"
  >
    {{ message }}
  </v-snackbar>
  <v-sheet class="h-100" color="base">
    <v-sheet
      height="60"
      color="base"
      class="text-primary font-weight-medium text-h4 mx-5 rounded-lg d-flex align-center"
    >
      Cadastro de usuário
    </v-sheet>
    <v-sheet class="mt-4 rounded-lg mx-5 pa-5">
      <v-row class="text-subtitle-2">
        <v-col cols="12">
          * Todos os campos são de preenchimento obrigatório
        </v-col>
      </v-row>
      <v-form ref="form">
        <v-row class="mt-3">
          <v-col cols="12" sm="5">
            <div class="text-subtitle-2 font-weight-bold text-primary">
              Nome
            </div>
            <v-text-field
              v-model="state.user.nome"
              hide-details="auto"
              placeholder="Ex: João Siva"
              density="compact"
              color="primary"
              variant="outlined"
              :rules="[(v: number) => !!v || 'Campo obrigatório']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4"> </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col cols="12" sm="5">
            <div class="text-subtitle-2 font-weight-bold text-primary">
              Email
            </div>
            <v-text-field
              v-model="state.user.email"
              hide-details="auto"
              placeholder="Ex: joao@gmail.com"
              density="compact"
              color="primary"
              variant="outlined"
              :rules="[(v: number) => !!v || 'Campo obrigatório']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4"> </v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="12" sm="5">
            <div class="text-subtitle-2 font-weight-bold text-primary">CPF</div>
            <v-text-field
              v-model="state.user.cpf"
              hide-details="auto"
              placeholder="Ex: 111.111.111-11"
              v-mask="'###.###.###-##'"
              density="compact"
              color="primary"
              variant="outlined"
              :rules="[(v: number) => !!v || 'Campo obrigatório']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4"> </v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="12" sm="5">
            <div class="text-subtitle-2 font-weight-bold text-primary">
              Celular
            </div>
            <v-text-field
              v-model="state.user.telefone"
              hide-details="auto"
              placeholder="Ex: (31)90000-0000"
              v-mask="'(##)#####-####'"
              density="compact"
              color="primary"
              variant="outlined"
              :rules="[(v: number) => !!v || 'Campo obrigatório']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4"> </v-col>
        </v-row>
      </v-form>
      <v-row class="mr-5 mt-4">
        <v-col cols="12">
          <v-btn
            size="x-large"
            color="primary"
            density="compact"
            class="text-h6 mr-5 rounded-lg"
            @click="onSubmit"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>
<style scoped lang="scss">
.v-slide-group-item--active {
  opacity: 0.87;
}

.v-card-title {
  border-bottom: 2px solid #363739;
}

.v-label {
  opacity: 1;
}

.border {
  border: 1px solid #f7f7f7;
}
</style>
