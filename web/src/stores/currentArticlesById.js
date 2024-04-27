import {defineStore} from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

const useCurrentArticlesByIdStore = defineStore('currentArticlesByIdStore', ()=>{
    const currentArticlesById=ref({});
    const getCurrentArticlesById = async(id) => {
        const res = await axios.get(`/web/blog/${id}`);
        currentArticlesById.value = res.data;
        return currentArticlesById.value;
    }
    return {
        currentArticlesById,
        getCurrentArticlesById
    }
},
// 使用持久化存储
{
    persist: {
        enabled: true,
        // If you want to store the state in the localStorage
        storage: window.localStorage,
    },
}
);

export default useCurrentArticlesByIdStore;