<template>
    <div class="canvas-container flex justify-center">
        <canvas ref="canvas" width="1000" height="1200" class="mt-8"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import rough from 'roughjs/bundled/rough.esm.js';

const props = defineProps({
    fileContents: Object
});

const canvas = ref(null);

const drawDirectoryStructure = () => {
    const ctx = canvas.value.getContext('2d');
    const rc = rough.canvas(canvas.value);
    const canvasWidth = canvas.value.width;
    let y = 20;
    const lineHeight = 40;
    const fileSpacing = 10;

    const drawGroup = (groupName, files) => {
        const groupTextWidth = ctx.measureText(groupName).width;
        const groupX = (canvasWidth - groupTextWidth - 20) / 2;
        rc.rectangle(groupX, y, groupTextWidth + 20, 30, { roughness: 0, stroke: 'blue' });
        ctx.fillStyle = 'blue'; // Изменение цвета текста
        ctx.fillText(groupName, groupX + 10, y + 20);
        y += lineHeight;

        let currentX = 20;

        Object.keys(files).forEach((fileName) => {
            const fileTextWidth = ctx.measureText(fileName).width;
            if (currentX + fileTextWidth + 20 > canvasWidth - 20) {
                currentX = 20; // Перенос на новую строку
                y += lineHeight;
            }
            rc.rectangle(currentX, y, fileTextWidth + 20, 30, { roughness: 0, stroke: 'teal', strokeWidth: 1, strokeLineDash: [4, 2] });
            ctx.fillStyle = 'orange'; // Изменение цвета текста
            ctx.fillText(fileName, currentX + 10, y + 20);
            currentX += fileTextWidth + 20 + fileSpacing;
        });

        y += lineHeight * 2; // Добавляем отступ между группами
    };

    Object.keys(props.fileContents).forEach((group) => {
        drawGroup(group, props.fileContents[group]);
        y += lineHeight; // Добавляем отступ между группами
    });
};

onMounted(() => {
    const ctx = canvas.value.getContext('2d');
    ctx.font = '12px Times New Roman';
    drawDirectoryStructure();
});
</script>

<style scoped>
.canvas-container {
    max-width: 100%;
    overflow-x: auto;
}
canvas {
    border: 1px solid #666;
    margin-top: 20px;
}
</style>
