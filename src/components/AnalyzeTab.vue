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
const { isAnalyzing } = storeToRefs(store)
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
