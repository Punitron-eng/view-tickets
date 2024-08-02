<template>
    <div>
        <canvas :id="props.id"
            :style="{ maxHeight: props.height ? props.height + 'px' : 'auto', maxWidth: props.width ? props.width + 'px' : 'auto' }"></canvas>
    </div>
</template>
<script setup>
import Chart from 'chart.js/auto';
import { onMounted, defineProps, watch, computed } from 'vue';
import { jsonData } from './DummyData';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useStore } from 'vuex';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['type', 'id', 'borderColor', 'tempData', 'tension', 'height', 'backgroundColor', 'data2backgroundColor', 'axesVisible', 'width', 'line2', 'data2', 'data2tension', 'data2borderColor', 'legendDisplay']);
// Watch for changes in props.tempData and update the chart accordingly
// watch(() => props.tempData, () => {
//  const ctx = document.getElementById(props.id);
//  getChart(ctx, props.tempData);
// });
watch(() => [props.tempData, darkModeVal.value], ([newTempData, newDarkMode], [oldTempData, oldDarkMode]) => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, newTempData, newDarkMode);
});
onMounted(() => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, props.tempData, darkModeVal.value);
});
const getChart = (ctx, data, darkmode) => {
    const datasetLine1 = {
        label: '',
        data: data.map((res) => res.values), // this is the Data array for the chart
        fill: true,
        borderColor: props.borderColor,
        tension: props.tension,
        backgroundColor: props.backgroundColor,
        pointStyle: 'none',
        pointRadius: 5, // Adjust the radius of the actual data points
        pointHoverRadius: 8, // Adjust the hover radius for better visibility
        circumference: 180,
        rotation: 270
    };
    // const datasets = !props.line2
    //     ? [datasetLine1]
    //     : [datasetLine1, {
    //           label: 'Average',
    //           data: [0, 5, 5, 5, 6, 7],
    //           fill: true,
    //           borderColor: 'yellow',
    //           borderColor: props.data2borderColor,
    //           tension: props.data2tension,
    //           backgroundColor: props.data2backgroundColor,
    //           pointStyle: 'none',
    //           pointRadius: 0,
    //           circumference:180,
    //          rotation:270
    //       }];
    const datasets = [datasetLine1]
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
        new Chart(ctx, {
            type: props.type ? props.type : 'doughnut',
            data: {
                labels: data.map((res) => res.labels), // this is the Labels for the chart
                datasets,
            },
            options: {
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += " " + context.formattedValue + "%";;
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            color: darkmode ? '#a1a1a9' : '#3c4249',
                            font: {
                                size: 12
                            },
                        },
                        display: props.legendDisplay ? props.legendDisplay : false,
                    },
                },
                scales: {
                    x: {
                        display: props.axesVisible,
                        ticks: {
                            padding: 20,
                            color: darkmode ? '#a1a1a9' : '#3c4249',
                        },
                        grid: {
                            color: darkmode ? '#4f4f50' : '#E5E7EB',
                        },
                    },
                    y: {
                        display: props.axesVisible,
                        ticks: {
                            padding: 20,
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
</script>
