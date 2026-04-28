<script setup>
import { useI18n } from 'vue-i18n'
import BeltStrip from '@/components/BeltStrip.vue'

defineProps({
  tul: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})
defineEmits(['select'])

const { t } = useI18n()
</script>

<template>
  <v-card
    :variant="selected ? 'tonal' : 'elevated'"
    :color="selected ? 'primary' : undefined"
    :elevation="selected ? 2 : 1"
    hover
    @click="$emit('select', tul)"
  >
    <div class="d-flex align-center">
      <BeltStrip :belt="tul.belt" />
      <div class="px-3 py-2 flex-grow-1">
        <div class="text-subtitle-1 font-weight-medium">{{ tul.name }}</div>
        <div class="text-caption text-medium-emphasis">
          {{ tul.rank }} · {{ tul.movements }} {{ t('movements') }}
        </div>
      </div>
    </div>
  </v-card>
</template>
