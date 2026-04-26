<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAnalysisStore } from '@/stores/analysis'

const props = defineProps({
  tul: { type: Object, default: null },
})

const { t } = useI18n()

const sourceType = ref('upload')
const sourceUrl = ref('')

const store = useAnalysisStore()
const { isAnalyzing, lastResult, error } = storeToRefs(store)

const hasTul = computed(() => !!props.tul)

function start() {
  if (!props.tul) return
  store.runAnalysis({
    tulId: props.tul.id,
    source: { type: sourceType.value, url: sourceUrl.value },
  })
}
</script>

<template>
  <div>
    <template v-if="hasTul">
      <h2 class="text-h5 mb-1">{{ tul.name }}</h2>
      <p class="text-body-2 text-medium-emphasis mb-4">
        {{ tul.rank }} · {{ tul.movements }} {{ t('movements') }}
      </p>
    </template>
    <template v-else>
      <h2 class="text-h5 mb-1 text-medium-emphasis">{{ t('selectPrompt') }}</h2>
      <p class="text-body-2 text-medium-emphasis mb-4">&nbsp;</p>
    </template>

    <v-card class="mb-4">
      <v-card-title>{{ t('input') }}</v-card-title>
      <v-card-text>
        <v-radio-group v-model="sourceType" inline :disabled="!hasTul">
          <v-radio :label="t('sourceUpload')" value="upload" />
          <v-radio :label="t('sourceWebcam')" value="webcam" />
          <v-radio :label="t('sourceUrl')" value="url" />
        </v-radio-group>
        <v-text-field
          v-if="sourceType === 'url'"
          v-model="sourceUrl"
          :label="t('videoUrl')"
          placeholder="https://..."
          :disabled="!hasTul"
        />
        <v-btn color="primary" :loading="isAnalyzing" :disabled="!hasTul" @click="start">
          {{ t('runAnalysis') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <v-alert v-if="error && hasTul" type="error" class="mb-4">{{ error }}</v-alert>

    <v-card v-if="lastResult && hasTul">
      <v-card-title>{{ t('score') }}: {{ lastResult.overall }} / 9</v-card-title>
      <v-card-text>
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
        <h3 class="text-subtitle-1 mt-4 mb-2">{{ t('pointers') }}</h3>
        <ul class="ml-4">
          <li v-for="p in lastResult.pointers" :key="p">{{ p }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>
