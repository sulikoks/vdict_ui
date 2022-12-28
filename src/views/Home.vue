<template>
  <div class="pt-4">
    <div class="text-h5 text-center">Word set list</div>
    <v-list-item
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
          icon="mdi-dots-horizontal"
          variant="text"
          :disabled="wordSet.id === 'DEFAULT'"
          @click="editWordSet(wordSet)"
        ></v-btn>
      </template>
    </v-list-item>

    <v-dialog
      v-model="state.dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="position-fixed my-right-4 my-bottom-4"
          color="success"
          flat
          icon="mdi-plus"
          v-bind="props"
          @click="createNewWordSet"
        ></v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeWordSetEditor">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ state.edited ? "Edit word set" : "New word set" }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              :disabled="!state.formValidated && state.saveDisabled"
              @click="saveWordSet"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form ref="form" v-model="state.formValidated" lazy-validation>
          <v-text-field
            class="mt-4"
            v-model="state.editedWordSet.emoji"
            label="Emoji or symbol"
            clearable
            :rules="[required, emojiOrLetter]"
          ></v-text-field>
          <v-text-field
            class="mt-4"
            v-model="state.editedWordSet.name"
            label="Name"
            clearable
            autofocus
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            class="mt-4"
            v-model="state.editedWordSet.description"
            label="Description"
            clearable
            :rules="[required]"
          ></v-text-field>
        </v-form>
        <div v-if="state.edited" class="mt-4 d-flex justify-center">
          <v-btn color="red" @click="deleteWordSet(state.editedWordSet)"
            >Delete word set</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ServiceWordSet } from "../services";
import { required, emojiOrLetter } from "../utils";

const form = ref(null);
const state = reactive({
  wordSetList: [],
  dialog: false,
  edited: false,
  formValidated: false,
  saveDisabled: false,
  editedWordSet: {},
});

updateWordSetList();
function updateWordSetList() {
  state.wordSetList = ServiceWordSet.getWordSetList();
}

function closeWordSetEditor() {
  state.dialog = false;
  state.edited = false;
  state.saveDisabled = false;
  state.editedWordSet = {};
}
function editWordSet(wordSet) {
  state.editedWordSet = wordSet;
  state.dialog = true;
  state.edited = true;
}
function createNewWordSet() {
  state.editedWordSet = ServiceWordSet.getEmptyWordSet();
}

function deleteWordSet(wordSet) {
  ServiceWordSet.deleteWordSet(wordSet);
  updateWordSetList();
  closeWordSetEditor();
}
async function saveWordSet() {
  const { valid } = await form.value.validate();
  if (!valid) {
    state.saveDisabled = true;
    return;
  }
  if (state.edited) {
    ServiceWordSet.deleteWordSet(state.editedWordSet);
  } else {
    state.editedWordSet.id = Date.now();
  }
  ServiceWordSet.saveWordSet(state.editedWordSet);
  updateWordSetList();
  closeWordSetEditor();
}
</script>

<style></style>
