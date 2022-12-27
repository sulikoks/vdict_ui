<template>
  <v-navigation-drawer class="text-start" v-model="state.drawer" temporary>

    <v-list-item title="John Leider">
      <template v-slot:prepend>
        <v-avatar color="transparent">
          <span class="text-h4">&#128169</span>
        </v-avatar>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          @click="$router.push({ name: 'Home' })"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-forum"
          title="About"
          @click="$router.push({ name: 'About' })"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pt-2 ml-2 mr-2">
        <v-btn block variant="flat">
          Logout
        </v-btn>
        <v-list-item class="mt-2 text-center" >v0.1.5</v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  state: Object
})
</script>

<style></style>
