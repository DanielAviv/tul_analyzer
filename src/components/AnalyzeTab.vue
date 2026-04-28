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
const sourceFile = ref(null)

const dialogOpen = ref(false)
const dialogSource = ref('upload')
const dialogUrl = ref('')
const dialogFile = ref(null)
const isDragging = ref(false)
const fileInput = ref(null)

const sourceOptions = computed(() => [
  { title: t('sourceUpload'), value: 'upload' },
  { title: t('sourceWebcam'), value: 'webcam' },
  { title: t('sourceUrl'), value: 'url' },
])

const currentSourceLabel = computed(
  () => sourceOptions.value.find((o) => o.value === sourceType.value)?.title ?? '',
)

function openDialog() {
  dialogSource.value = sourceType.value
  dialogUrl.value = sourceUrl.value
  dialogFile.value = sourceFile.value
  dialogOpen.value = true
}

function accept() {
  sourceType.value = dialogSource.value
  sourceUrl.value = dialogUrl.value
  sourceFile.value = dialogFile.value
  dialogOpen.value = false
}

function onFileInput(e) {
  dialogFile.value = e.target.files?.[0] ?? null
}

function onDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) dialogFile.value = file
}

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
    <div class="controls d-flex align-center mb-3 ga-3">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-video-outline"
        :disabled="!hasTul"
        @click="openDialog"
      >
        {{ t('sourceLabel') }}
      </v-btn>
      <v-btn color="primary" :loading="isAnalyzing" :disabled="!hasTul" @click="start">
        {{ t('runAnalysis') }}
      </v-btn>
    </div>

    <VideoPreview class="video" />

    <v-dialog v-model="dialogOpen" max-width="460">
      <v-card rounded="lg">
        <v-card-title class="pt-5 px-5 text-h6">{{ t('selectSource') }}</v-card-title>
        <v-card-text class="px-5 pt-3 pb-2">
          <v-select
            v-model="dialogSource"
            :items="sourceOptions"
            item-title="title"
            item-value="value"
            :label="t('sourceLabel')"
            variant="outlined"
            density="comfortable"
            hide-details
            class="mb-5"
          />

          <div
            v-if="dialogSource === 'upload'"
            class="file-drop-zone"
            :class="{ 'is-dragging': isDragging, 'has-file': !!dialogFile }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="fileInput.click()"
          >
            <input ref="fileInput" type="file" accept="video/*" hidden @change="onFileInput" />
            <v-icon
              size="36"
              class="mb-2"
              :color="isDragging ? 'primary' : undefined"
            >mdi-cloud-upload-outline</v-icon>
            <template v-if="dialogFile">
              <p class="text-body-2 font-weight-medium text-truncate" style="max-width: 100%">
                {{ dialogFile.name }}
              </p>
              <p class="text-caption text-medium-emphasis mt-1">{{ t('clickToReplace') }}</p>
            </template>
            <template v-else>
              <p class="text-body-2 font-weight-medium">{{ t('dropFileHere') }}</p>
              <p class="text-caption text-medium-emphasis mt-1">{{ t('orClickToBrowse') }}</p>
            </template>
          </div>

          <v-text-field
            v-if="dialogSource === 'url'"
            v-model="dialogUrl"
            :label="t('videoUrl')"
            placeholder="https://..."
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-link"
          />
        </v-card-text>

        <v-card-actions class="px-5 pb-5 pt-3">
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">{{ t('cancel') }}</v-btn>
          <v-btn color="primary" variant="flat" @click="accept">{{ t('accept') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

.file-drop-zone {
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
  background-color: rgba(0, 0, 0, 0.02);
  min-height: 160px;
}
.file-drop-zone:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background-color: rgba(var(--v-theme-primary), 0.03);
}
.file-drop-zone.is-dragging {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.06);
}
.file-drop-zone.has-file {
  border-style: solid;
  border-color: rgba(var(--v-theme-primary), 0.4);
}
</style>
