<template>
  <v-app id="inspire">
    <v-app-bar class="text-start">
      <v-app-bar-nav-icon
        @click="state.drawer = !state.drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>&#128513 VDictionary</v-toolbar-title>
      <v-btn icon @click="$router.push({ name: 'SearchWord' })">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <Navigation :state="state"></Navigation>

    <v-main class="bg-grey-lighten-2">
      <slot></slot>
    </v-main>
    <ReloadPrompt />
  </v-app>
</template>

<script setup>
import { reactive } from "vue";
import ReloadPrompt from "../components/ReloadPrompt.vue";
import Navigation from "../components/Navigation.vue";

const state = reactive({ drawer: false });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
