<template>
    <div>
        <canvas :id="props.id"
            :style="{ maxHeight: props.height ? props.height + 'px' : 'auto', maxWidth: props.width ? props.width + 'px' : 'auto' }"></canvas>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, defineProps, computed, watch } from 'vue';
import { jsonData } from './DummyData';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useStore } from 'vuex';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const props = defineProps(['type', 'id', 'borderColor', 'tempData', 'tension', 'height', 'backgroundColor', 'data2backgroundColor', 'axesVisible', 'width', 'line2', 'data2', 'data2tension', 'data2borderColor', 'legendDisplay']);

onMounted(() => {
    console.log(props.tempData, 'props.tempData', props.id, 'props.id')
    const ctx = document.getElementById(props.id);
    getChart(ctx, props.tempData, darkModeVal);
});
watch(() => darkModeVal.value, (newVal, oldVal) => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, props.tempData, newVal);
});
const getChart = (ctx, data, darkmode) => {
    const datasetLine1 = {
        label: 'Sessions',
        type: 'line',
        data: props.tempData.map((res) => res.average),
        borderColor: props.borderColor,
        tension: props.tension,
        backgroundColor: props.borderColor,
        pointStyle: 'none',
        pointRadius: 0,
    };

    const datasets = [
        datasetLine1,
        {
            label: 'Average ',
            type: 'bar',
            data: props.tempData.map((res) => res.values),
            fill: true,
            borderColor: 'yellow',
            borderColor: props.data2borderColor,
            tension: props.data2tension,
            backgroundColor: props.data2backgroundColor,
            pointStyle: 'none',
            pointRadius: 0,
        },
    ];

    // Get the existing chart instance if available
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        // Update the existing chart with new data
        existingChart.data.labels = data.map((res) => res.labels);
        existingChart.data.datasets = datasets;
        existingChart.options.scales.x.ticks.color = darkmode ? '#a1a1a9' : '#3c4249';
        existingChart.options.scales.y.ticks.color = darkmode ? '#a1a1a9' : '#3c4249';
        existingChart.options.scales.x.grid.color = darkmode ? '#4f4f50' : '#E5E7EB';
        existingChart.options.plugins.legend.labels.color = darkmode ? '#a1a1a9' : '#3c4249';
        existingChart.options.scales.y.grid.color = darkmode ? '#4f4f50' : '#E5E7EB';
        existingChart.update(); // Update the chart
    } else {
        // debugger
        new Chart(ctx, {
            // type: props.type ? props.type : 'bar',

            data: {
                labels: props.tempData.map((res) => formatLabel(res.labels)),
                datasets,
            },

            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 4 / 3,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += " " + context.formattedValue;
                                }
                                return (" " + label);
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        align: 'start',
                        labels: {
                            usePointStyle: true,
                            color: darkmode ? '#a1a1a9' : '#3c4249'
                        },
                        display: props.legendDisplay ? props.legendDisplay : false,
                    },
                },

                scales: {
                    x: {
                        display: props.axesVisible,
                        ticks: {
                            color: darkmode ? '#a1a1a9' : '#3c4249',
                        },
                        grid: {
                            color: darkmode ? '#4f4f50' : '#E5E7EB',
                        },
                    },
                    y: {
                        display: props.axesVisible,
                        ticks: {
                            color: darkmode ? '#a1a1a9' : '#3c4249',
                        },
                        grid: {
                            color: darkmode ? '#4f4f50' : '#E5E7EB',
                        },
                    },
                },
            },
        });

    }
};

const formatLabel = (label) => {
    // Add line breaks after every 12 characters
    const breaks = label.match(/.{1,6}/g);
    if (breaks) {
        return breaks
    }
    return label;
};
</script>
