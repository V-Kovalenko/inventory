<script setup>

import SkeletonLoader from "@/components/SkeletonSideBar.vue";
</script>

<template>
  <div class="side-bare">
    <div class="side-bare__container">
      <div class="side-bare__header">
        <img src="@/assets/images/Img-sideBare.png" alt="img" class="side-bare__img">
      </div>
      <div class="side-bare__content">
        <SkeletonLoader/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/colors";
.side-bare{
  display: flex;
  border: 1px solid $main-color;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  &__container {
    display: grid;
    max-width: 14.75rem;
  }
  &__header{

  }
  &__img {
    margin-bottom: 1rem;
  }
  &__content {

  }
}
</style>