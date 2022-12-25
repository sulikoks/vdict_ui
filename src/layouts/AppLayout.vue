<template>
<v-app id="inspire">
<!--  <v-system-bar>-->
<!--    <v-spacer></v-spacer>-->

<!--    <v-icon>mdi-square</v-icon>-->

<!--    <v-icon>mdi-circle</v-icon>-->

<!--    <v-icon>mdi-triangle</v-icon>-->
<!--  </v-system-bar>-->

  <v-app-bar>
    <v-app-bar-nav-icon @click="state.drawer = !state.drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Vocabulary Bank</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer
      v-model="state.drawer"
      temporary
  >
    HelloWorld
  </v-navigation-drawer>

  <v-main class="bg-grey-lighten-2">
    <slot></slot>
  </v-main>
</v-app>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({ drawer: false })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
