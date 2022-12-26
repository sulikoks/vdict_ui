<template>
  <div>
    <div class="mt-n12 text-h5">Word set list</div>
    <v-list-item
      class="text-start"
      v-for="wordSet in state.wordSetList"
      :key="wordSet.id"
      :title="wordSet.name"
      :subtitle="wordSet.description"
    >
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <span class="text-h5">{{ wordSet.emoji }}</span>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-delete"
          variant="text"
          @click="deleteWordSet(wordSet)"
        ></v-btn>
      </template>
    </v-list-item>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import kvstorage from "../core/kvstorage";

const state = reactive({
  wordSetList: [],
});

updateWordSetList();
function updateWordSetList() {
  state.wordSetList = kvstorage.getWordSetList();
}

function deleteWordSet(wordSet) {
  kvstorage.deleteWordSet(wordSet);
  updateWordSetList();
}
</script>

<style></style>
