<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import AppTabs, { type Tab } from "@/components/AppTabs.vue";
import { useMainStore } from "@/store";
import { Password } from "@/store/types";
import services from "@/services";

const main = useMainStore();

const form = ref();
const alertSuccess = ref(false);
const alertError = ref(false);
const message = ref("");
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

interface State {
  password: Password;
}

const state = reactive<State>({
  password: {} as Password,
});

const onReset = () => {
  state.password = {} as Password;
};

const onSubmit = async () => {
  const confirm = await form.value.validate();
  if (confirm.valid) {
    const response = await services.user.changePassword(state.password);

    if (response.data.info.codigo === 0) {
      alertSuccess.value = true;
      onReset();
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

const tabs: Tab[] = [
  {
    id: "account",
    title: "Dados pessoais",
    icon: "fas fa-circle-user",
  },
  {
    id: "password",
    title: "Senhas",
    icon: "fas fa-key",
  },
];
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
    :timeout="10000"
  >
    {{ message }}
  </v-snackbar>
  <v-sheet class="h-100" color="base">
    <v-sheet
      height="60"
      color="base"
      class="text-primary font-weight-medium text-h4 mx-5 rounded-lg d-flex align-center"
    >
      Meu Perfil
    </v-sheet>
    <v-sheet class="mt-4 rounded-lg mx-5 pa-5">
      <AppTabs :tabs="tabs">
        <template #tab:account>
          <v-row class="text-subtitle-1 font-weight-bold text-medium-emphasis">
            <v-col class="pb-0" cols="12">
              Mantenha seu cadastro sempre atualizado.
            </v-col>
          </v-row>
          <v-row class="text-subtitle-2">
            <v-col class="pt-0" cols="12">
              Se qualquer informação estiver incorreta entre em contato com o
              administrador do sistema.
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col cols="12" sm="5">
              <div class="text-subtitle-2 font-weight-bold text-primary">
                Nome
              </div>
              <v-text-field
                v-model="main.user.nome"
                hide-details
                readonly
                class="rounded-lg bg-base pl-2 font-weight-medium"
                density="compact"
                variant="plain"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col cols="12" sm="5">
              <div class="text-subtitle-2 font-weight-bold text-primary">
                Email
              </div>
              <v-text-field
                v-model="main.user.email"
                hide-details
                readonly
                class="rounded-lg bg-base pl-2 font-weight-medium"
                density="compact"
                variant="plain"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col cols="12" sm="5">
              <div class="text-subtitle-2 font-weight-bold text-primary">
                CPF
              </div>
              <v-text-field
                v-model="main.user.cpf"
                hide-details
                readonly
                class="rounded-lg bg-base pl-2 font-weight-medium"
                density="compact"
                variant="plain"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col cols="12" sm="5">
              <div class="text-subtitle-2 font-weight-bold text-primary">
                Celular
              </div>
              <v-text-field
                v-model="main.user.telefone"
                hide-details
                readonly
                class="rounded-lg bg-base pl-2 font-weight-medium"
                density="compact"
                variant="plain"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4"> </v-col>
          </v-row>
        </template>
        <template #tab:password>
          <v-row class="text-subtitle-2">
            <v-col cols="12">
              * Todos os campos são de preenchimento obrigatório
            </v-col>
          </v-row>
          <v-form ref="form">
            <v-row class="mt-3">
              <v-col cols="12" sm="5">
                <div class="text-subtitle-2 font-weight-bold text-primary">
                  Senha atual
                </div>
                <v-text-field
                  v-model="state.password.senhaAtual"
                  type="password"
                  hide-details="auto"
                  placeholder="********"
                  hint="Digite a senha atual"
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
                  Nova senha
                </div>
                <v-text-field
                  v-model="state.password.novaSenha"
                  color="primary"
                  type="password"
                  placeholder="********"
                  hint="A senha deve conter mínimo de 8 caracteres"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  :rules="[(v: number) => !!v || 'Campo obrigatório']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4"> </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col cols="12" sm="5">
                <div class="text-subtitle-2 font-weight-bold text-primary">
                  Confirme a nova senha
                </div>
                <v-text-field
                  v-model="state.password.confirmeSenha"
                  type="password"
                  hide-details="auto"
                  variant="outlined"
                  placeholder="********"
                  hint="Confirme a senha digitada anteriormente"
                  density="compact"
                  color="primary"
                  :rules="[
                (v: number) => !!v || 'Campo obrigatório', 
                (v:string) => v === state.password.novaSenha || 'Nova senha não confere'
              ]"
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
        </template>
      </AppTabs>
    </v-sheet>
  </v-sheet>
</template>
<style scoped lang="scss"></style>
