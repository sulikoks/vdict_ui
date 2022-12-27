<template>
  <div>
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
          ></v-select>
        </v-col>

        <v-col class="flex-grow-0">
          <v-btn
            icon="mdi-swap-horizontal"
            color="grey"
            @click="switchLanguages"
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
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
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
  selectedSource: { state: "Detect", code: "auto" },
  selectedTarget: { state: "English", code: "en" },
  selectItems: [
    { state: "Russian", code: "ru" },
    { state: "Japanese", code: "ja" },
    { state: "English", code: "en" },
  ],
  loading: false,
  text: "",
  resultSource: "",
  resultTarget: "",
});

function switchLanguages() {
  if (state.selectedSource.code === "auto") return;
  const prev = state.selectedSource;
  state.selectedSource = state.selectedTarget;
  state.selectedTarget = prev;
}

async function translate() {
  try {
    translator.sourceLang = state.selectedSource.code;
    translator.targetLang = state.selectedTarget.code;
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
