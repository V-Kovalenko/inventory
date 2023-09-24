<script setup>

</script>

<template>
  <div class="skeleton-loader">
    <div class="skeleton-loader__item skeleton-loader__item_1"></div>
    <div class="skeleton-loader__item skeleton-loader__item_2"></div>
    <div class="skeleton-loader__item skeleton-loader__item_3"></div>
    <div class="skeleton-loader__item skeleton-loader__item_4"></div>
    <div class="skeleton-loader__item skeleton-loader__item_5"></div>
    <div class="skeleton-loader__item skeleton-loader__item_6"></div>
    <div class="skeleton-loader__item skeleton-loader__item_7"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/colors";
.skeleton-loader {
  display: grid;
  grid-auto-rows: 0.5rem;
  gap: 2rem;
  max-width: 13rem;


  &__item {
    //background-color: #3C3C3C;
    background-color: $main-color;
    border-radius: 0.625rem;
    display: grid;
    justify-self: center;

  }

  &__item_1 {
    width: 11.875rem;
    height: 1.625rem;
  }
  &__item_2 {
    width: 9.6875rem;
  }
  &__item_3 {
    width:11.875rem;
  }
  &__item_4 {
    width: 10.625rem;
  }
  &__item_5 {
    width: 10rem;
  }
  &__item_6 {
    width: 8.75rem;
  }
  &__item_7 {
    width: 5rem;
  }
}

//.item1 {
//  max-width: 11.875rem;
//  height: 1.625rem;
//  //margin-bottom: 12rem;
//
//}
//.item2 {
//  width: 9.6875rem;
//  height: 1rem;
//  //background-color: red;
//}
//.item3 {
//  width: 9.6875rem;
//  height: 1rem;
//}
</style>