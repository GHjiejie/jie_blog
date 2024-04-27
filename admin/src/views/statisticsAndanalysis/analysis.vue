<template>
    <div id="main" ref="mainRef"></div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import * as echarts from 'echarts';
const mainRef = ref(null);

// 页面初始化
onMounted(() => {
    let myChart = echarts.init(mainRef.value);
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
});

</script>
<style scoped lang="scss">
#main {
    width: 600px;
    height: 600px;
}
</style>