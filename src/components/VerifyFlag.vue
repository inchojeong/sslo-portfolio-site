<script setup>
import { showVerify } from '../utils/verify';
defineProps({ note: String });
</script>

<template>
  <span v-if="showVerify && note" class="verify" :title="note">확인 필요</span>
</template>
