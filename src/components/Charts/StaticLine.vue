<template>
    <div :class="customeWidth ? 'StaticlineBar' : ''">
        <canvas class="LineGraph" :id="props.id"
            :style="{ maxHeight: props.height ? props.height : 'auto', maxWidth: props.width ? props.width : 'auto' }"></canvas>
    </div>
</template>
<script setup>
import Chart from 'chart.js/auto';
import { onMounted, defineProps, ref, watch } from 'vue';
import { jsonData } from './DummyData';
const props = defineProps([
    'type',
    'id',
    'customeWidth',
    'borderColor',
    'pointer',
    'tempData',
    'borderWidth',
    'data2borderWidth',
    'backgroundColor',
    'tension',
    'height',
    'axesVisible',
    'width',
    'line2',
    'data2',
    'data2tension',
    'data2borderColor',
    'data2backgroundColor',
    'legendDisplay',
]);

const getChart = (ctx, data) => {

    const existingChart = Chart.getChart(ctx);
    const datasets = [
        {
            label: 'Sales',
            data: data.map((res) => res.values),
            fill: true,
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            borderWidth: props.borderWidth,
            tension: props.tension,
            pointStyle: props.pointer ? 'circle' : 'none',
            pointRadius: props.pointer ? 5 : 0,
        },
    ]


    if (existingChart) {
        // Update the existing chart with new data
        existingChart.data.labels = data.map((res) => res.labels);
        existingChart.data.datasets = datasets;
        existingChart.update(); // Update the chart
    } else {
        new Chart(ctx, {
            type: props.type ? props.type : 'line',

            data: {
                labels: data.map((res) => res.labels),
                datasets: datasets,
            },

            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 5 / 3,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true, // Use point style (circle) in legend labels
                        },
                        display: props.legendDisplay ? props.legendDisplay : false, // Hide the legend
                    },
                },
                scales: {
                    x: {
                        display: props.axesVisible, // Hide the x-axis labels
                    },
                    y: {
                        display: props.axesVisible, // Hide the y-axis labels
                    },
                },
            },
        });
    }
};

onMounted(() => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, jsonData.data1);
});

watch(() => props.borderColor, (newValue, oldValue) => {

    const ctx = document.getElementById(props.id);
    getChart(ctx, jsonData.data1);
});
</script>

<style lang="scss">
.StaticlineBar {
    width: 100%;

    @media screen and (max-width:380px) {
        min-width: 340px;
    }
}
</style>
