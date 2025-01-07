<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="tsx">
const a = ref<string>('12345')
console.log(a)
</script>
