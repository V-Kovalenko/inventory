<script setup>
import { onMounted, ref} from "vue";
import ModalWindow from "@/components/ModalWindow.vue";
/*--начальные  данные-->>>> */
let id = 0 // id каждого элемента
const items = ref([
  {id: id++, url: new URL('@/assets/images/image-green.svg', import.meta.url), count: 11},
  {id: id++, url: new URL('@/assets/images/image-red.svg', import.meta.url), count: 21},
  {id: id++, url: new URL('@/assets/images/image-blue.svg', import.meta.url), count: 31},
  ...new Array(22).fill({id: null, url: null, count: null}),
])

/*--начальные  данные--<<<< */
const dragIndex = ref(null)
const onDragStar = (e, item, index) => {  //  данные элемента который тянем
  dragIndex.value = index
  const dataToTransfer = {item: item.count, index}
  const jsonData = JSON.stringify(dataToTransfer);
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('item', jsonData.toString()) // добавляем индекс элемента, который тянем
}
let transferredData
const onDrugDrop = (e) => {
  e.preventDefault()
  const itemIndex = e.dataTransfer.getData('item') // получаем индекс элемента
  transferredData = JSON.parse(itemIndex);
  const targetItemIndex = Array.from(e.target.parentNode.children).indexOf(e.target); // получаем индекс элемента на который буем менять
  const temp = items.value[transferredData.index] // идет переприсваивание данных элементов
  items.value[transferredData.index] = items.value[targetItemIndex] // идет переприсваивание данных элементов
  items.value[targetItemIndex] = temp // идет переприсваивание данных элементов
  dragIndex.value = null
  window.localStorage.setItem('DROP', JSON.stringify(items.value)) // сохраняем в локалсторе, для сохранения позиции элементов поле перезагрузки страницы
}
const setItemsToLocalStorage = () => { //функция для обновления LocalStorage
  window.localStorage.setItem('DROP', JSON.stringify(items.value))
}

onMounted(() => {  // монтируем актуальные данные пи загрузки страницы
  const parsedItems = JSON.parse(localStorage.getItem('DROP'))
  if (parsedItems) {
    items.value = parsedItems
  }
})
const toggleModalWindow = ref(true) //начальное значение модального окна
const getToggleModalWindow = () => { // закрыть модальное окно
  toggleModalWindow.value = !toggleModalWindow.value
}

const currentItem = ref('') // Элементы, которые передаем в модальное окно
const getItemsInventory = (item) => { // фун., получения данных элементов
  currentItem.value = item
}
const functions = (item) => {  //функ. получения данных и функ. закрыть - открыть модальное окно
  getItemsInventory(item)
  getToggleModalWindow()
}

const deleteCount = (it, it2) => { // удаление count из items
  let resultCount
  if (currentItem.value.count > 0 && currentItem.value.count >= parseInt(it.value) && it.value) {
    resultCount = currentItem.value.count - parseInt(it.value)
  } else {
    resultCount = currentItem.value.count
  }
  it.value = '' // обнуляем Input
  it2.value = !it2.value // закрываем выбор кнопок отмена или подтвердить

  currentItem.value.count = resultCount
  setItemsToLocalStorage()
}

const getReset = () => {
  const reset = ref(
      [
        {id: id++, url: new URL('@/assets/images/image-green.svg', import.meta.url), count: 11},
        {id: id++, url: new URL('@/assets/images/image-red.svg', import.meta.url), count: 21},
        {id: id++, url: new URL('@/assets/images/image-blue.svg', import.meta.url), count: 31},
        ...new Array(22).fill({id: null, url: null, count: null}),

      ]
  )
  items.value = reset.value
  setItemsToLocalStorage()

}
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


      >

        <div class="inventory__item-card"
             @dragstart.prevent
             @click="functions(item)"
        >
          <img :src="item.url" alt="" class="inventory__img">
          <span class="inventory__count-element" v-if="item.count">{{ item.count }}</span>
        </div>

      </div>

      <ModalWindow
          @close="getToggleModalWindow"
          :itemInventory="currentItem"
          :initToggleModal="toggleModalWindow"
          @deleteCount="deleteCount"
          :toggleModalWindow="toggleModalWindow"
      />
    </div>
    <button @click="getReset" class="inventory__reset">reset</button>
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
    border-radius: 5px;

  }

  &__item {
    border: 1px solid $main-color;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;

  }

  &__item-card {

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

  &__reset {
    position: absolute;
    background: linear-gradient(0deg, #4D4D4D, #4D4D4D),
    linear-gradient(0deg, #262626, #262626);
    color: white;
    top: 0;
  }

  &__img {
    //pointer-events: inherit;
  }
}

</style>