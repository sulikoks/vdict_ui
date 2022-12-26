<template>
  <div class="mt-n14 mb-n14">
    <v-text-field
      v-model="state.text"
      color="success"
      :loading="state.loading"
      @change.passive="translate"
    ></v-text-field>

    <template v-if="state.resultTarget">
      <div class="text-h4">{{ state.resultSource }}</div>
      <div class="text-h5">{{ state.resultTarget }}</div>
    </template>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import translator from "../core/translator";

const state = reactive({
  loading: false,
  text: "",
  resultSource: "",
  resultTarget: "",
});

async function translate() {
  try {
    const result = await translator.translate(state.text);
    state.resultSource = state.text.toLowerCase();
    state.resultTarget = result.toLowerCase();
  } catch (e) {
    state.resultSource = state.text.toLowerCase();
    state.resultTarget = "Error, Sorry :(";
  }
}
</script>

<style></style>
