<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAnalysisStore } from '@/stores/analysis'
import ScoreRing from '@/components/ScoreRing.vue'

const { t } = useI18n()
const store = useAnalysisStore()
const { lastResult, error } = storeToRefs(store)

const expanded = ref(false)
const hasResult = computed(() => !!lastResult.value)
const overallOutOf100 = computed(() =>
  hasResult.value ? Math.round((lastResult.value.overall / 9) * 100) : null,
)
</script>

<template>
  <v-card
    class="analysis-result"
    :class="{ 'is-expanded': expanded }"
    elevation="6"
  >
    <v-alert v-if="error" type="error" density="compact" rounded="0" class="mb-0">
      {{ error }}
    </v-alert>

    <div class="summary d-flex align-center justify-end pa-2 ga-1">
      <ScoreRing :score="overallOutOf100" :size="88" />
      <v-btn
        v-if="hasResult"
        icon
        variant="text"
        size="x-small"
        :title="expanded ? t('collapse') : t('expand')"
        @click="expanded = !expanded"
      >
        <v-icon :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-up'" size="20" />
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-if="expanded && hasResult" class="details">
        <v-divider />
        <div class="details-body px-4 py-3 d-flex ga-4">
          <div class="breakdown-col">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>{{ t('criterion') }}</th>
                  <th>{{ t('scoreLabel') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in lastResult.breakdown" :key="row.key">
                  <td>{{ row.label }}</td>
                  <td>{{ row.score }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div class="pointers-col flex-grow-1">
            <div class="text-overline text-medium-emphasis mb-1">{{ t('pointers') }}</div>
            <ul class="ml-4">
              <li v-for="p in lastResult.pointers" :key="p" class="text-body-2">{{ p }}</li>
            </ul>
          </div>
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.analysis-result {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
}
.analysis-result.is-expanded {
  width: 50%;
  max-height: 50vh;
  overflow-y: auto;
}
.details-body {
  align-items: flex-start;
}
</style>
