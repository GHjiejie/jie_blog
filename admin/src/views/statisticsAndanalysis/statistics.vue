<template>
    <div class="statistics">
        <p> <a href="www.ahjie.com">www.ahjie.com</a></p>
        <div id="pie" ref="PieRef"></div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
// import { ElMessage } from 'element-plus';
import axios from 'axios';
import * as echarts from 'echarts';
const PieRef = ref(null);

// 页面初始化
onMounted(async () => {
    const res = await axios.get('/api/blog');
    // 获取数据后，根据数据的tag来进行分类
    let tagObj = {};
    res.data.data.forEach(item => {
        if (tagObj[item.tag]) {
            tagObj[item.tag]++;
        } else {
            tagObj[item.tag] = 1;
        }
    });
    // console.log(tagObj);
    // 将对象的值和键分别存储到数组中
    let tagArr = [];
    let tagCountArr = [];
    for (let key in tagObj) {
        tagArr.push(key);
        tagCountArr.push(tagObj[key]);
    }


    let myChart = echarts.init(PieRef.value);
    myChart.setOption({

        title: {
            text: 'Jie的博客文章类别统计',
            subtext: '数据来自Jie的博客',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '文章类型',
                type: 'pie',
                radius: '55%',
                data: tagArr.map((item, index) => {
                    return {
                        value: tagCountArr[index],
                        name: item
                    }
                }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
});


</script>
<style scoped lang="scss">
.statistics {
    width: 100%;
    // margin: 0 auto;
    // background-color: red;
    display: flex;
    justify-content: center;
    // background-color: rgb(0, 0, 0);

}

p {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-style: italic;

    a {
        text-decoration: none;

        &:hover {
            color: #409EFF;

        }
    }
}


#pie {

    width: 80%;
    height: 80vh;
}
</style>