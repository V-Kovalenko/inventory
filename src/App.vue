<script setup>

import HomePage from "@/pages/HomePage.vue";
</script>

<template>
  <div class="app">
    <RouterView/>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/colors";

.app {
  max-width: 1920px;
  background-color: $bg-color-app;
  min-height: 100vh;
  padding: 1rem;
  margin: 0 auto;
}
</style>
