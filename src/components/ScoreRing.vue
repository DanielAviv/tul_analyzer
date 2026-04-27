<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { default: null },  // Number 0–100, or null for empty state
  size: { type: Number, default: 100 },
  strokeWidth: { type: Number, default: 10 },
})

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const isEmpty = computed(() => props.score === null)
const dashOffset = computed(() =>
  isEmpty.value
    ? circumference.value
    : circumference.value * (1 - Math.max(0, Math.min(100, props.score)) / 100),
)
const ringColor = computed(() =>
  isEmpty.value ? '#bdbdbd' : `hsl(${(props.score / 100) * 120}, 70%, 45%)`,
)
const displayText = computed(() =>
  isEmpty.value ? '- / -' : `${Math.round(props.score)}/100`,
)
const fontSize = computed(() => Math.round(props.size * 0.18))
</script>

<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <circle
      :cx="cx" :cy="cy" :r="radius"
      fill="none"
      stroke="#e0e0e0"
      :stroke-width="strokeWidth"
    />
    <circle
      :cx="cx" :cy="cy" :r="radius"
      fill="none"
      :stroke="ringColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      :transform="`rotate(-90 ${cx} ${cy})`"
    />
    <text
      :x="cx" :y="cy"
      text-anchor="middle"
      dominant-baseline="central"
      :font-size="fontSize"
      font-weight="600"
      fill="currentColor"
    >{{ displayText }}</text>
  </svg>
</template>
