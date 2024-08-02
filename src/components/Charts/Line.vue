<script setup>
import Chart from 'chart.js/auto';
import { ref, onMounted, defineProps, watch, computed } from 'vue';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useStore } from 'vuex';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
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
    'data1Label'
]);
const LineData = ref(props.tempData);
// watch(() => props.tempData, (newValue, oldValue) => {
//     LineData.value = newValue;
//     const ctx = document.getElementById(props.id);
//     const dataToSend = LineData ? LineData.value : [];
//     getChart(ctx, dataToSend, darkModeVal.value);
// });
// watch(() => darkModeVal.value, (newValue, oldValue) => {
//     LineData.value = newValue;
//     const ctx = document.getElementById(props.id);
//     const dataToSend = LineData ? LineData.value : [];
//     getChart(ctx, dataToSend, darkModeVal.value);
// });
watch(() => [props.tempData, darkModeVal.value], ([newTempData, newDarkMode], [oldTempData, oldDarkMode]) => {

    LineData.value = newTempData;
    const ctx = document.getElementById(props.id);
    const dataToSend = LineData ? LineData.value : [];
    getChart(ctx, dataToSend, newDarkMode);
});
// watch(props.tempData, (newVal) => console.log(newVal, 'line watch'))
onMounted(() => {
    // LineData.value = props.tempData
    const ctx = document.getElementById(props.id);
    const dataToSend = LineData ? LineData.value : [];
    getChart(ctx, dataToSend, darkModeVal.value);
});
const getChart = (ctx, data, darkmode) => {
    // Define the first dataset
    const datasetLine1 = {
        label: props?.data1Label || 'Sales',
        data: data.map((res) => res.values),
        fill: true,
        borderColor: props.borderColor,
        tension: props.tension,
        backgroundColor: props.backgroundColor,
        pointStyle: props.pointer ? 'circle' : 'none',
        pointRadius: props.pointer ? 5 : 5,
    };

    // Define datasets array based on whether line2 is enabled
    const datasets = !props.line2
        ? [datasetLine1]
        : [
            datasetLine1,
            {
                label: 'Average',
                data: data.map((res) => res?.average || 0), // Sample data; replace this with your own data
                fill: true,
                borderColor: props.data2borderColor,
                backgroundColor: props.data2backgroundColor,
                borderWidth: props.data2borderWidth,
                tension: props.data2tension,
                pointStyle: props.pointer ? 'circle' : 'none',
                pointRadius: props.pointer ? 5 : 5,
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

        // Create a new chart instance
        const LineChart = new Chart(ctx, {
            type: props.type ? props.type : 'line',
            data: {
                labels: data.map((res) => res.labels),
                datasets,
            },

            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.formattedValue;
                                }
                                return (' ' + label);
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
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
                        grid: {
                            color: darkmode ? '#4f4f50' : '#E5E7EB',
                        },
                        ticks: {
                            color: darkmode ? '#a1a1a9' : '#3c4249',
                        },
                    },
                },
            },
        });
    }
};
</script>
<template>
    <div :class="customeWidth ? 'lineBar' : ''">
        <canvas class="LineGraph " :id="props.id"
            :style="{ maxHeight: props.height ? props.height : 'auto', maxWidth: props.width ? props.width : 'auto' }"></canvas>
    </div>
</template>
<style lang="scss">
.lineBar {
    width: 100%;

    @media screen and (max-width: 380px) {
        max-width: 260px !important;
    }
}
</style>
