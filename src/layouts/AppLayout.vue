<template>
  <v-app id="inspire">
    <!--  <v-system-bar>-->
    <!--    <v-spacer></v-spacer>-->
    <!--    <v-icon>mdi-square</v-icon>-->
    <!--    <v-icon>mdi-circle</v-icon>-->
    <!--    <v-icon>mdi-triangle</v-icon>-->
    <!--  </v-system-bar>-->

    <v-app-bar class="text-start">
      <v-app-bar-nav-icon
        @click="state.drawer = !state.drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>&#128513 VDictionary</v-toolbar-title>
<!--      <v-spacer></v-spacer>-->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
<!--      <v-btn icon>-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn icon>-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>

    <v-navigation-drawer class="text-start" v-model="state.drawer" temporary>

      <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/78.jpg"
          title="John Leider"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pt-2 ml-2 mr-2">
          <v-btn block variant="flat">
            Logout
          </v-btn>
          <v-list-item class="mt-2 text-center" >v0.1.3</v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <slot></slot>
    </v-main>
    <ReloadPrompt />
  </v-app>
</template>

<script setup>
import { reactive } from "vue";
import ReloadPrompt from "../components/ReloadPrompt.vue";

const state = reactive({ drawer: false });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
