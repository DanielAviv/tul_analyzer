<script setup>
import { useI18n } from 'vue-i18n'
import TulCard from '@/components/TulCard.vue'

defineProps({
  tuls: { type: Array, required: true },
  selectedId: { type: String, default: null },
  collapsed: { type: Boolean, default: false },
})
defineEmits(['select', 'update:collapsed'])

const { t } = useI18n() // still needed for collapse/expand button titles
</script>

<template>
  <v-sheet
    rounded
    elevation="2"
    class="selector d-flex flex-column"
    :class="{ 'selector--collapsed': collapsed }"
  >
    <div class="header d-flex align-center" :class="collapsed ? 'justify-center px-1' : 'px-3'">
      <span v-if="!collapsed" class="flex-grow-1" />
      <v-btn
        icon
        variant="text"
        size="small"
        :title="collapsed ? t('expand') : t('collapse')"
        @click="$emit('update:collapsed', !collapsed)"
      >
        <v-icon :icon="collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
      </v-btn>
    </div>
    <v-divider v-if="!collapsed" />
    <div v-if="!collapsed" class="list pa-2">
      <div class="d-flex flex-column ga-2">
        <TulCard
          v-for="tul in tuls"
          :key="tul.id"
          :tul="tul"
          :selected="tul.id === selectedId"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>
.selector {
  width: 320px;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.2s ease;
}
.selector--collapsed {
  width: 48px;
}
.header {
  flex-shrink: 0;
  height: 48px;
}
.list {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
}
</style>
