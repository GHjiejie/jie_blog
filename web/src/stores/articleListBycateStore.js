import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
const useArticleListBycateStore = defineStore("articleListBycateStore", () => {
const articleListBycategoryName = ref([]);

const getArticleListBycategoryName = async (tagName) => {
     const res = await axios.get(`/web/blog/tag/${tagName}`);
     if (res.data.code !== 200) {
        return {
            code: res.data.code,
            message: res.data.message,
        };
    } else {
        if(articleListBycategoryName){
            articleListBycategoryName.value = [];
        }
        articleListBycategoryName.value = res.data.data;
        return {
            code: res.data.code,
            message: res.data.message,
            data: res.data.data,
        };
    }
}

return {
    articleListBycategoryName,
    getArticleListBycategoryName,
};
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

export default useArticleListBycateStore;