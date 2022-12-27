<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="state.selectedSource"
          :items="
            state.selectItems.filter(
              (l) => l.code !== state.selectedTarget.code
            )
          "
          item-title="state"
          item-value="abbr"
          label="Select"
          return-object
          single-line
          @update:modelValue="switchLanguage"
        ></v-select>
      </v-col>

      <v-col class="flex-grow-0 pt-4">
        <v-btn
          icon="mdi-swap-horizontal"
          color="grey"
          @click="exchangeLanguages"
        ></v-btn>
      </v-col>

      <v-col>
        <v-select
          v-model="state.selectedTarget"
          :items="
            state.selectItems.filter(
              (l) => l.code !== state.selectedSource.code
            )
          "
          item-title="state"
          item-value="abbr"
          label="Select"
          return-object
          single-line
          @update:modelValue="switchLanguage"
        ></v-select>
      </v-col>
    </v-row>
    <v-text-field
      class="ml-n4 mr-n4 mb-4"
      v-model="state.inputSource"
      label="Write here..."
      :color="state.inputColor"
      :loading="state.loading"
      append-inner-icon="mdi-clipboard-arrow-down"
      single-line
      hide-details
      clearable
      autofocus
      @change.passive="translate"
      @input="valueChanged"
      @click:append-inner="pastText"
      @click:clear="clearText"
    >
    </v-text-field>
    <v-text-field
      class="ml-n4 mr-n4 mb-4"
      :model-value="state.inputTarget"
      append-inner-icon="mdi-clipboard-arrow-up-outline"
      color="grey"
      label="Translation..."
      readonly
      single-line
      hide-details
      @change.passive="translate"
      @input="valueChanged"
      @click:append-inner="copyText"
    >
    </v-text-field>

    <div class="mb-4 text-h6">HISTORY</div>
    <v-list-item
      class="v-list-item--link border-b-sm"
      v-for="(item, i) in state.history"
      :key="i"
      :title="item.resultSource"
      :subtitle="item.resultTarget"
      theme="light"
      variant="plain"
      lines="one"
      @click="chooseHistoryItem(item)"
    >
      <template v-slot:append>
        <v-icon
          class="v-icon--clickable"
          icon="mdi-close"
          @click.prevent="deleteHistoryItem(item)"
        ></v-icon>
      </template>
    </v-list-item>

    <v-snackbar v-model="state.showedCopy" :timeout="1500" color="success">
      Transition copied
    </v-snackbar>
    <v-snackbar v-model="state.showedPast" :timeout="1500">
      Nothing to paste
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import translator from "../core/translator";
import kvstorage from "../core/kvstorage";

const state = reactive({
  loading: false,
  showedCopy: false,
  showedPast: false,
  selectedSource: { state: "Detect", code: "auto" },
  selectedTarget: { state: "English", code: "en" },
  selectItems: [
    { state: "Russian", code: "ru" },
    { state: "Japanese", code: "ja" },
    { state: "English", code: "en" },
  ],
  inputColor: "", // 'success'
  inputSource: "",
  inputTarget: "",
  history: [],
});

const def = kvstorage.getLastLanguages();
if (def?.source && def?.target) {
  state.selectedSource = def.source;
  state.selectedTarget = def.target;
}

function switchLanguage() {
  saveLanguagesSettings();
  translate().then();
}
function exchangeLanguages() {
  if (state.selectedSource.code === "auto") return;
  const prev = state.selectedSource;
  state.selectedSource = state.selectedTarget;
  state.selectedTarget = prev;
  saveLanguagesSettings();
  translate().then();
}
function saveLanguagesSettings() {
  kvstorage.saveLastLanguages({
    source: state.selectedSource,
    target: state.selectedTarget,
  });
}

async function pastText() {
  const text = await navigator.clipboard.readText();
  if (text.length) {
    state.inputSource = text.slice(0, 30);
    translate().then();
  } else {
    state.showedPast = true;
  }
}
async function copyText() {
  state.showedCopy = true;
  await navigator.clipboard.writeText(state.inputTarget);
}

function clearText() {
  state.inputSource = "";
  state.inputTarget = "";
  valueChanged();
}

function valueChanged() {
  state.inputColor = "";
}

function chooseHistoryItem(item) {
  deleteHistoryItem(item);
  state.inputTarget = item.resultTarget;
  state.inputSource = item.resultSource;
  addHistoryItem(item);
}
function addHistoryItem(item) {
  if (item.resultTarget === item.resultSource) return;
  state.history.unshift(item);
}
function deleteHistoryItem(item) {
  state.history = state.history.filter((i) => i !== item);
}

async function translate() {
  try {
    if (!state.inputSource || state.loading) return;
    state.loading = true;
    state.inputColor = "success";
    state.inputSource = state.inputSource.toLowerCase();

    translator.sourceLang = state.selectedSource.code;
    translator.targetLang = state.selectedTarget.code;
    const result = await translator.translate(state.inputSource);
    state.inputTarget = result.toLowerCase();

    addHistoryItem({
      resultSource: state.inputSource,
      resultTarget: result.toLowerCase(),
    });
  } catch (e) {
    state.inputColor = "error";
    state.inputTarget = "Error, Sorry :(";
  } finally {
    state.loading = false;
  }
}
</script>

<style></style>
