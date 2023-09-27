<script setup>
import {computed, ref} from "vue";

const emit = defineEmits(['close', 'deleteCount'])

const props = defineProps({
  itemInventory: {
    type: Object,
    required: true,
  },
  initToggleModal: {
    type: Boolean,
    default: false
  },
  toggleModalWindow: {
    type: Boolean,
    required: true
  }
})

const sendEmit = () => {
  emit('close')
}
const sendEmitDeleteCount = () => {
  emit('deleteCount', inputState, toggleButtonDelete)
}
const modalStyles = computed(() => { // стили для плавного появления модального окна
  return [
    'modal-window',
    {
      'modal-window_close': props.toggleModalWindow
    }
  ]
})

const toggleButtonDelete = ref(false) // начальное значение кнопок
const changeToggleBtn = () => { // функция изменения состояния toggleButtonDelete
  toggleButtonDelete.value = !toggleButtonDelete.value
}


const inputState = ref('')
</script>
<!--:class="initToggleModal? 'modal-window': 'modal-window modal-window_close'"-->
<template>
  <div :class="modalStyles">
    <span @click="sendEmit" class="modal-window__close">X</span>

    <div class="modal-window__container">
      <div class="modal-window__header">
        <img :src="props.itemInventory.url" alt="img" class="modal-window__img">

      </div>
      <div class="modal-window__content content">
        <div class="content__item content__item_1"></div>
        <div class="content__item content__item_2"></div>
        <div class="content__item content__item_3"></div>
        <div class="content__item content__item_4"></div>
        <div class="content__item content__item_5"></div>
        <div class="content__item content__item_6"></div>
        <div class="content__item content__item_7"></div>
        <div class="content__buttons">
          <button v-if="!toggleButtonDelete" class="content__btn content__btn_delete" @click="changeToggleBtn">Удалить предмет</button>
          <div v-if="toggleButtonDelete" class="content__buttons-btn">
            <input type=number placeholder="Введите количество" class="content__input"
              v-model="inputState"
            >
            <button class="content__btn-cancel" @click="sendEmit">Отмена</button>
            <button class="content__btn content__btn-ok" @click="sendEmitDeleteCount">Подтвердить</button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/colors";

.modal-window {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  border: 1px solid $main-color;
  padding: 0 1rem;

  z-index: 11;
  background-color: rgba(60, 60, 60, 1);
  background-color: rgba(68, 68, 68, 1);
  background-color: rgba(51, 51, 51, 1);
  border-radius: 0 5px 0 0;
  min-height: 100%;

  transition: all 0.4s ease-in-out;
  opacity: 1;

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: white;
    cursor: pointer;
  }

  &__container {
    display: grid;
    max-width: 14.75rem;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #4D4D4D;
    margin-bottom: 20px;
  }

  &__img {
    margin-bottom: 1rem;
    width: 130px;
    height: 130px;
  }

  &__content {

  }
}

.modal-window_close {
  transform: translateX(100%);
  opacity: 0;
  position: absolute;
}

.content {
  display: grid;
  grid-auto-rows: 0.5rem;
  gap: 1rem;
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
  }

  &__item_3 {
    width: 11.875rem;
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

  &__btn {
    width: 200px;
    height: 39px;
    background: rgba(250, 114, 114, 1);
    border-radius: 8px;
    color: white;
  }
  &__btn_delete {
    margin-top: 3rem;

  }

  &__buttons {

  }

  &__buttons-btn {
    display: grid;
    grid-template-areas:
        'input input'
        'cancel ok';
  }

  &__btn-cancel {
    grid-area: cancel;
    width: 200px;
    height: 39px;
    border-radius: 8px;
    background-color: white;
    max-width: min-content;
    padding: 0 1rem;
  }

  &__btn-ok {
    grid-area: ok;
    max-width: min-content;
    padding: 0 1rem;
  }

  &__input {
    grid-area: input;
    background: linear-gradient(0deg, #4D4D4D, #4D4D4D),
    linear-gradient(0deg, #262626, #262626);
    width: 200px;
    height: 40px;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
}


</style>