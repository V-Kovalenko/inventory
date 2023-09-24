<script setup>
import {ref, watch} from "vue";
let id = 0
const items = ref([
  {id: id++, name: 'It1', list: 1},
  {id: id++, name: 'It2', list: 1},
  {id: id++, name: 'It3', list: 1},
    ...new Array(22).fill({id: null, name: null, list: null})
])

const dragIndex = ref(null)
const onDragStar = (e, item, index) => {
  dragIndex.value = index
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('item', index.toString())
}
const onDrugDrop = (e) => {
  e.preventDefault()
  const itemIndex = parseInt(e.dataTransfer.getData('item'))
  const targetItemIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
  const temp = items.value[itemIndex]
  items.value[itemIndex] = items.value[targetItemIndex]
  items.value[targetItemIndex] = temp
  dragIndex.value = null

}
watch(items.value, () => {
  console.log(items.value)
})
</script>

<template>
  <div class="inventory">
    <div class="inventory__container"
         @drop="onDrugDrop($event)"
         @dragenter.prevent
         @dragover.prevent

    >
      <div
          v-for="(item, index) in items" class="inventory__item"
          :key="index"
          @dragstart="onDragStar($event, item, index)"
          draggable="true"
      >{{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/colors";

.inventory {


  &__container {
    border: 1px solid $main-color;
    display: grid;
    grid-template-columns: repeat(5, 6.75rem);
    grid-template-rows: repeat(5, 6.75em);
    max-width: 33.75rem;
  }

  &__item {
    border: 1px solid $main-color;
  }
}
</style>

