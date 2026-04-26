<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AnalyzeTab from '@/components/AnalyzeTab.vue'
import TulInfoTab from '@/components/TulInfoTab.vue'

defineProps({
  tul: { type: Object, default: null },
})

const { t } = useI18n()
const tab = ref('analyze')
</script>

<template>
  <v-card class="panel-card d-flex flex-column">
    <div class="px-4 pt-3 pb-2">
      <h2 class="text-h5 font-weight-medium">{{ tul ? tul.name : '&nbsp;' }}</h2>
    </div>
    <v-tabs v-model="tab">
      <v-tab value="analyze" class="text-body-1">{{ t('tabAnalyze') }}</v-tab>
      <v-tab value="info" class="text-body-1">{{ t('tabInfo') }}</v-tab>
    </v-tabs>
    <v-divider />
    <v-window v-model="tab" class="panel-window">
      <v-window-item value="analyze">
        <AnalyzeTab :tul="tul" />
      </v-window-item>
      <v-window-item value="info">
        <TulInfoTab :tul="tul" />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
.panel-card {
  height: 100%;
  overflow: hidden;
}
.panel-window {
  flex: 1 1 0;
  overflow: hidden;
}
:deep(.v-window__container),
:deep(.v-window-item--active) {
  height: 100%;
}
</style>
