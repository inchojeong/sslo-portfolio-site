<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <a class="skip-link" href="#main">본문 바로가기</a>
  <AppHeader />
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <AppFooter />
</template>
