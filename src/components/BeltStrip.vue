<script setup>
defineProps({
  belt: { type: Object, required: true },
})
</script>

<template>
  <div class="belt-strip">
    <div class="belt-base" :style="{ background: belt.base }" />
    <div
      v-if="belt.stripe"
      class="belt-stripe"
      :style="{ background: belt.stripe }"
    />
    <div v-if="belt.dan" class="belt-ticks">
      <span
        v-for="i in belt.dan"
        :key="i"
        class="belt-tick"
        :style="{ background: belt.tick }"
      />
    </div>
  </div>
</template>

<style scoped>
.belt-strip {
  position: relative;
  width: 10px;
  align-self: stretch;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 2px;
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
