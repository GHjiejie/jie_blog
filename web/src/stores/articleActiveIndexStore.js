import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useArticleActiveIndexStore = defineStore('articleActiveIndexStore', ()=>{
    const activeIndex=ref(-1);
    const setActiveIndex = (index) => {
        activeIndex.value = index;
    }
    return {
        activeIndex,
        setActiveIndex
    }
});

// 暴露出去
export default useArticleActiveIndexStore;
