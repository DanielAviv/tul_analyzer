<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAnalysisStore } from '@/stores/analysis'

const { t } = useI18n()
const store = useAnalysisStore()
const { lastResult, error } = storeToRefs(store)

const expanded = ref(false)
const hasResult = computed(() => !!lastResult.value)
const topPointers = computed(() => lastResult.value?.pointers?.slice(0, 2) ?? [])
const restPointers = computed(() => lastResult.value?.pointers?.slice(2) ?? [])
</script>

<template>
  <v-card class="analysis-result" :class="{ 'is-empty': !hasResult && !error, 'is-expanded': expanded }">
    <v-alert v-if="error" type="error" density="compact" rounded="0" class="mb-0">
      {{ error }}
    </v-alert>

    <div
      v-if="!hasResult && !error"
      class="empty d-flex align-center px-4 text-medium-emphasis"
    >
      <v-icon icon="mdi-chart-bar-stacked" class="mr-3" />
      <span class="text-body-2">{{ t('analysisEmpty') }}</span>
    </div>

    <template v-if="hasResult">
      <div class="summary d-flex align-center px-4 py-2 ga-4">
        <div class="score">
          <div class="text-overline text-medium-emphasis">{{ t('score') }}</div>
          <div class="text-h5 font-weight-medium">
            {{ lastResult.overall }}<span class="text-body-2 text-medium-emphasis"> / 9</span>
          </div>
        </div>
        <div class="top-pointers flex-grow-1">
          <div class="text-overline text-medium-emphasis">{{ t('pointers') }}</div>
          <ul class="ml-4 mb-0">
            <li v-for="p in topPointers" :key="p" class="text-body-2">{{ p }}</li>
          </ul>
        </div>
        <v-btn
          icon
          variant="text"
          size="small"
          :title="expanded ? t('collapse') : t('expand')"
          @click="expanded = !expanded"
        >
          <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
        </v-btn>
      </div>

      <v-expand-transition>
        <div v-if="expanded" class="details">
          <v-divider />
          <div class="px-4 py-3">
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
            <ul v-if="restPointers.length" class="ml-4 mt-3">
              <li v-for="p in restPointers" :key="p" class="text-body-2">{{ p }}</li>
            </ul>
          </div>
        </div>
      </v-expand-transition>
    </template>
  </v-card>
</template>

<style scoped>
.analysis-result {
  flex-shrink: 0;
  overflow-y: auto;
}
.analysis-result.is-expanded {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 50vh;
  z-index: 10;
}
.empty {
  height: 56px;
}
.top-pointers ul {
  list-style: disc;
}
</style>
