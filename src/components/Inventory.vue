<script setup>
import {onMounted, ref, watch} from "vue";
import ModalWindow from "@/components/ModalWindow.vue";
import useItemsInventory from "@/stores/items-inventory";
// ...new Array(22).fill({id: null, url: null, count: null})
let id = 0 // id каждого элемента
const items = ref([
  {id: id++, url: new URL('@/assets/images/image-green.svg', import.meta.url), count: 1},
  {id: id++, url: new URL('@/assets/images/image-red.svg', import.meta.url), count: 1},
  {id: id++, url: new URL('@/assets/images/image-blue.svg', import.meta.url), count: 1},
  ...new Array(22).fill({id: null, url: null, count: null}),

])

/*--начальные  данные-->>>> */

//
// const resetItems = ref([
//   {id: id++, url: new URL('@/assets/images/image-green.svg', import.meta.url), count: 1},
//   {id: id++, url: new URL('@/assets/images/image-red.svg', import.meta.url), count: 1},
//   {id: id++, url: new URL('@/assets/images/image-blue.svg', import.meta.url), count: 1},
// ])
/*--начальные  данные--<<<< */

const dragIndex = ref(null) // здесь будет лежать индекс элемента который перетягиваем
const onDragStar = (e, item, index) => {  //  данные элемента который тянем
  dragIndex.value = index
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('item', index.toString()) // добавляем индекс элемента, который тянем
}
const onDrugDrop = (e) => {
  e.preventDefault()
  const itemIndex = parseInt(e.dataTransfer.getData('item')) // получаем индекс элемента
  const targetItemIndex = Array.from(e.target.parentNode.children).indexOf(e.target); // получаем индекс элемента на который буем менять
  const temp = items.value[itemIndex] // идет переприсваивание данных элементов
  items.value[itemIndex] = items.value[targetItemIndex] // идет переприсваивание данных элементов
  items.value[targetItemIndex] = temp // идет переприсваивание данных элементов
  dragIndex.value = null
  window.localStorage.setItem('DROP', JSON.stringify(items.value)) // сохраняем в локалсторе, для сохранения позиции элементов поле перезагрузки страницы
}
// onMounted(() => {  // монтируем актуальные данные пи загрузки страницы
//     items.value = JSON.parse(localStorage.getItem('DROP'))
// })
/*--Reset on init date-- >>>>*/
// const getReset = () => {
//   items.value = resetItems.value
//   window.localStorage.setItem('RESET', JSON.stringify(resetItems.value))
// }
// onMounted(() => {
//   items.value = JSON.parse(localStorage.getItem('RESET'))
// })
/*--Reset on init date-- <<<<*/

const toggleModalWindow = ref(false)
const getToggleModalWindow = () => { // закрыть модальное окно
  toggleModalWindow.value = !toggleModalWindow.value
}

const currentItem = ref(null)
const getItemsInventory = (item) => {
  currentItem.value = item
}
const functions = (item) => {
  getItemsInventory(item)
  getToggleModalWindow()
}
console.log('currentItem: ', currentItem)
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
          @click="functions(item)"
      >

        <div class="inventory__item-card">
          <img :src="item.url" alt="">
          <span class="inventory__count-element" v-if="item.count">{{ item.count }}</span>
        </div>

      </div>

      <ModalWindow
          @emitClose="getToggleModalWindow"
          v-show="toggleModalWindow"
          :itemInventory="currentItem"
          class="inventory__modal-window"

      />
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/colors";

.inventory {
  position: relative;

  &__container {
    border: 1px solid $main-color;
    display: grid;
    grid-template-columns: repeat(5, 6.75rem);
    grid-template-rows: repeat(5, 6.75em);
    max-width: 33.75rem;

  }

  &__item {
    border: 1px solid $main-color;
    position: relative;
    display: flex;
    justify-content: center;


  }
  &__item-card {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__count-element {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    border-top: 2px solid $main-color;
    border-left: 2px solid $main-color;
    border-radius: 50% 10% 0 0;
    position: absolute;
    bottom: 0;
    right: 0;
    color: #c7c3c3;
  }
  &__modal-window {


  }
}
</style>

