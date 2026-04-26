<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  tul: { type: Object, default: null },
})

const { t } = useI18n()
</script>

<template>
  <div class="tul-info-tab">
    <template v-if="tul">
      <p class="text-caption text-medium-emphasis mb-4">
        {{ tul.rank }} · {{ tul.movements }} {{ t('movements') }}
      </p>
      <v-divider class="mb-4" />
      <p class="text-body-1">{{ tul.meaning }}</p>
    </template>
    <p v-else class="text-body-2 text-medium-emphasis">{{ t('selectTulForInfo') }}</p>
  </div>
</template>

<style scoped>
.tul-info-tab {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
}
</style>
