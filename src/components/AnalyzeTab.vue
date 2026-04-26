<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAnalysisStore } from '@/stores/analysis'
import VideoPreview from '@/components/VideoPreview.vue'

const props = defineProps({
  tul: { type: Object, default: null },
})

const { t } = useI18n()
const store = useAnalysisStore()
const { isAnalyzing, lastResult, error } = storeToRefs(store)
const hasTul = computed(() => !!props.tul)

const sourceType = ref('upload')
const sourceUrl = ref('')

function start() {
  if (!props.tul) return
  store.runAnalysis({
    tulId: props.tul.id,
    source: { type: sourceType.value, url: sourceUrl.value },
  })
}
</script>

<template>
  <div class="analyze-tab">
    <div class="controls">
      <div class="d-flex align-center mb-3 ga-3">
        <v-radio-group v-model="sourceType" inline hide-details :disabled="!hasTul" class="flex-grow-1">
          <v-radio :label="t('sourceUpload')" value="upload" />
          <v-radio :label="t('sourceWebcam')" value="webcam" />
          <v-radio :label="t('sourceUrl')" value="url" />
        </v-radio-group>
        <v-btn color="primary" :loading="isAnalyzing" :disabled="!hasTul" @click="start">
          {{ t('runAnalysis') }}
        </v-btn>
      </div>
      <v-text-field
        v-if="sourceType === 'url'"
        v-model="sourceUrl"
        :label="t('videoUrl')"
        placeholder="https://..."
        :disabled="!hasTul"
        density="compact"
        class="mb-3"
        hide-details
      />
    </div>

    <VideoPreview class="video" />

    <v-alert v-if="error && hasTul" type="error" class="mt-3">{{ error }}</v-alert>

    <v-card v-if="lastResult && hasTul" class="mt-3">
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

<style scoped>
.analyze-tab {
  height: 100%;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.controls {
  flex-shrink: 0;
}
.video {
  flex: 1 1 0;
  min-height: 0;
}
</style>
