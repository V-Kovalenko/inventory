<script setup>

</script>

<template>
<div class="skeleton-footer">
  <div class="skeleton-footer__container">
    <div class="skeleton-footer__item"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/colors";
.skeleton-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $main-color;
  height: 4.5rem;
  border-radius: 0.8rem;
  padding: 0 1rem;
  max-width: 65rem;
  border: 1px solid $bg-color;
  &__container {
    width: 100%;
  }
  &__item {
    background-color: $bg-color;
    height: 2.25rem;
    border-radius: 0.5rem;
    width: 100%;

  }
}
</style>