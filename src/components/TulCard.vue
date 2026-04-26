<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  tul: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})
defineEmits(['select'])

const { t } = useI18n()
</script>

<template>
  <v-card
    :variant="selected ? 'tonal' : 'outlined'"
    :color="selected ? 'primary' : undefined"
    hover
    @click="$emit('select', tul)"
  >
    <div class="d-flex align-center">
      <div class="belt-strip">
        <div class="belt-base" :style="{ background: tul.belt.base }" />
        <div
          v-if="tul.belt.stripe"
          class="belt-stripe"
          :style="{ background: tul.belt.stripe }"
        />
        <div v-if="tul.belt.dan" class="belt-ticks">
          <span
            v-for="i in tul.belt.dan"
            :key="i"
            class="belt-tick"
            :style="{ background: tul.belt.tick }"
          />
        </div>
      </div>
      <div class="px-3 py-2 flex-grow-1">
        <div class="text-subtitle-1 font-weight-medium">{{ tul.name }}</div>
        <div class="text-caption text-medium-emphasis">
          {{ tul.rank }} · {{ tul.movements }} {{ t('movements') }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.belt-strip {
  position: relative;
  width: 10px;
  align-self: stretch;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
.belt-base {
  position: absolute;
  inset: 0;
}
.belt-stripe {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 35%;
  transform: translateY(-50%);
}
.belt-ticks {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.belt-tick {
  display: block;
  width: 70%;
  height: 2px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
}
</style>
