<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  lead: String,
  center: Boolean,
});
</script>

<template>
  <header class="sh" :class="{ 'sh--center': center }" v-reveal>
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="h2">{{ title }}</h2>
    <p v-if="lead" class="lead">{{ lead }}</p>
  </header>
</template>

<style scoped>
.sh { display: grid; gap: 14px; margin-bottom: 44px; }
.sh--center { text-align: center; justify-items: center; }
</style>
