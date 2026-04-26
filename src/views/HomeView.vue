<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { TULS } from '@/data/tuls'
import TulCard from '@/components/TulCard.vue'
import AnalyzePanel from '@/components/AnalyzePanel.vue'

const { t } = useI18n()

const selectedId = ref(null)
const selected = computed(() => TULS.find((t) => t.id === selectedId.value) ?? null)

function selectTul(tul) {
  selectedId.value = tul.id
}
</script>

<template>
  <v-container fluid class="px-md-12 px-sm-8 px-4 py-6 fill-height">
    <v-row class="fill-height">
      <v-col cols="12" md="8" class="d-flex flex-column">
        <AnalyzePanel :tul="selected" class="flex-grow-1" />
      </v-col>

      <v-col cols="12" md="4">
        <h2 class="text-h6 mb-3">{{ t('pickTul') }}</h2>
        <v-sheet rounded border class="tul-list pa-2">
          <div class="d-flex flex-column ga-2">
            <TulCard
              v-for="tul in TULS"
              :key="tul.id"
              :tul="tul"
              :selected="tul.id === selectedId"
              @select="selectTul"
            />
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tul-list {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}
</style>
