<template>
    <div class="home">
        <div class="greet">
            <h1>{{ greeting }}</h1>
            <p>{{ message }}</p>
        </div>
        <canvas id="clockCanvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const greeting = ref('');
const message = ref('');

onMounted(() => {
    const canvas = document.getElementById('clockCanvas');
    const ctx = canvas.getContext('2d');

    // 设置画布尺寸
    canvas.width = 300;
    canvas.height = 300;

    function drawClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (hours < 12) {
            greeting.value = '早上好！';
            message.value = '当早晨到来的时候，它为我们带来了新的机遇和可能性。每一个清晨都代表着新的开始，一个全新的机会去追求你的梦想，去实现你的目标。无论过去发生了什么，清晨都是一张白纸，你可以书写自己想要的未来。所以，让我们努力奋斗，成就更美好的明天。'
        } else if (hours < 18) {
            greeting.value = '中午好！';
            message.value = '当中午到来的时候，这是一天的中间时刻。或许你已经度过了一段时间的工作，或者正在忙碌地处理事务。此时，请记得给自己加油鼓劲。坚持不懈，迎接挑战，因为你所付出的努力终将获得回报。不要放弃，你离成功又近了一步。'
        } else {
            greeting.value = '晚上好！';
            message.value = '当下午来临时，阳光洒在路上。或许你已感到有些疲倦，但请记住，你所做的一切都将会有所回报。坚持下去吧，相信自己的内在力量，相信明天一定会更好。成功需要耐心与毅力，而你正在朝着成功前行。'
        }

        // 清除上一次绘制的内容
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制立体时钟外框
        ctx.save();
        ctx.translate(150, 150);
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();

        // 绘制时钟中心点
        ctx.beginPath();
        ctx.arc(150, 150, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();

        // 绘制时钟刻度和数字
        for (let i = 1; i <= 12; i++) {
            ctx.save();
            ctx.translate(150, 150);
            ctx.rotate((i * 30 * Math.PI) / 180);
            ctx.beginPath();
            ctx.moveTo(0, -120);
            ctx.lineTo(0, -130);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.restore();

            // 绘制时钟数字
            ctx.save();
            ctx.translate(150, 150);
            ctx.rotate((i * 30 * Math.PI) / 180);
            ctx.translate(0, -100);
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i, 0, 0);
            ctx.restore();
        }

        // 绘制时针
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(((hours % 12) * 30 + minutes / 2) * (Math.PI / 180));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -60);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // 绘制分针
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((minutes * 6) * (Math.PI / 180));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -90);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // 绘制秒针
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((seconds * 6) * (Math.PI / 180));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -100);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
    }

    drawClock();

    // 每秒更新一次时钟
    setInterval(() => {
        drawClock();
    }, 1000);
});
</script>

<style scoped lang="scss">
.home {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80vh;

    .greet {
        width: 50%;
        // text-align: center;

        h1 {
            font-style: italic;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        p {
            font-style: italic;

            text-indent: 2rem;
            font-size: 0.9rem;
            line-height: 2rem;
            letter-spacing: 0.28rem;
        }
    }
}
</style>
