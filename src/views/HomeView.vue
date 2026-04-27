<script setup>
import { computed, ref } from 'vue'
import { TULS } from '@/data/tuls'
import TulSelector from '@/components/TulSelector.vue'
import AnalyzePanel from '@/components/AnalyzePanel.vue'
import AnalysisResult from '@/components/AnalysisResult.vue'

const selectedId = ref(null)
const selected = computed(() => TULS.find((t) => t.id === selectedId.value) ?? null)
const selectorCollapsed = ref(false)

function selectTul(tul) {
  selectedId.value = tul.id
}
</script>

<template>
  <v-container fluid class="px-md-12 px-sm-8 px-4 py-6 fill-height">
    <div class="layout d-flex flex-row fill-height ga-4">
      <TulSelector
        v-model:collapsed="selectorCollapsed"
        :tuls="TULS"
        :selected-id="selectedId"
        @select="selectTul"
      />
      <div class="content d-flex flex-column flex-grow-1 ga-4">
        <AnalyzePanel :tul="selected" class="flex-grow-1" />
        <AnalysisResult />
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.layout {
  width: 100%;
  min-width: 0;
}
.content {
  min-width: 0;
  position: relative;
}
</style>
