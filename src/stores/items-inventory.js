import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useItemsInventory = defineStore('ItemsInventory', () => {
    /*--начальные  данные-->>>> */
    let id = 0 // id каждого элемента
    const items = ref([
        {id: id++, name: 'It1', count: 1},
        {id: id++, name: 'It2', count: 1},
        {id: id++, name: 'It3', count: 1},
        ...new Array(22).fill({id: null, name: null, count: null})
    ])
    const resetItems = ref([
        {id: id = 0, name: 'It1', count: 1},
        {id: ++id, name: 'It2', count: 1},
        {id: ++id, name: 'It3', count: 1},
        ...new Array(22).fill({id: null, name: null, count: null})
    ])
    /*--начальные  данные--<<<< */
return {
    items, resetItems
}
})

export default useItemsInventory