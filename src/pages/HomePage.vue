<script setup>

import SideBar from "@/components/SideBar.vue";
import Inventory from "@/components/Inventory.vue";
import SkeletonFooter from "@/components/SkeletonFooter.vue";
import Test from "@/components/Test.vue";
</script>

<template>
  <div class="home-page">
    <div class="home-page__sideBare">
      <SideBar/>
    </div>
    <div class="home-page__inventory">
        <Test/>
<!--      <Inventory/>-->
    </div>
    <div class="home-page__skeleton-footer">
      <SkeletonFooter/>
    </div>

  </div>


</template>

<style scoped lang="scss">
.home-page {
  display: grid;
  grid-template-areas:
"sideBare inventory"
"skeleton-footer skeleton-footer";
  gap: 1rem;
  justify-content: center;
  &__sideBare {
    grid-area: sideBare;
  }
  &__inventory {
    grid-area: inventory;
    position: relative;
  }

  &__skeleton-footer {
    grid-area: skeleton-footer;
  }
}
</style>