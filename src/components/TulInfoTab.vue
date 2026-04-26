<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  tul: { type: Object, default: null },
})

const { t, tm, rt } = useI18n()

const meaning = computed(() =>
  props.tul ? t(`tul.${props.tul.id}.meaning`) : '',
)
const steps = computed(() => {
  if (!props.tul) return []
  const raw = tm(`tul.${props.tul.id}.steps`)
  return Array.isArray(raw) ? raw.map((s) => rt(s)) : []
})
</script>

<template>
  <div class="tul-info-tab">
    <template v-if="tul">
      <p class="text-caption text-medium-emphasis mb-3">
        {{ tul.rank }} · {{ tul.movements }} {{ t('movements') }}
      </p>

      <h3 class="text-subtitle-1 font-weight-medium mb-1">{{ t('meaningHeading') }}</h3>
      <p class="text-body-1 mb-4">{{ meaning }}</p>

      <h3 class="text-subtitle-1 font-weight-medium mb-2">{{ t('stepsHeading') }}</h3>
      <ol v-if="steps.length" class="steps ml-5">
        <li v-for="(step, i) in steps" :key="i" class="text-body-2 mb-1">{{ step }}</li>
      </ol>
      <p v-else class="text-body-2 text-medium-emphasis">{{ t('stepsEmpty') }}</p>
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
.steps {
  list-style: decimal;
}
</style>
