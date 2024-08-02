<template>
    <div :class="customeWidth ? 'Bar' : ''">
        <canvas :id="props.id"
            :style="{ maxHeight: props.height ? props.height + 'px' : 'auto', maxWidth: props.width ? props.width + 'px' : 'auto' }"></canvas>
    </div>
</template>

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
    'tempData',
    'tension',
    'height',
    'backgroundColor',
    'data2backgroundColor',
    'axesVisible',
    'width',
    'line2',
    'data2',
    'data2tension',
    'data2borderColor',
    'legendDisplay',
    'data1Label',
]);
const apiData = ref(props.tempData);
onMounted(() => {
    const ctx = document.getElementById(props.id);
    const dataToSend = apiData ? apiData.value : [];
    getChart(ctx, dataToSend, darkModeVal.value);
});

watch(
    () => [props.tempData, darkModeVal.value],
    ([newTempData, newDarkMode], [oldTempData, oldDarkMode]) => {
        apiData.value = newTempData;
        const ctx = document.getElementById(props.id);
        const dataToSend = apiData ? apiData.value : [];
        getChart(ctx, dataToSend, newDarkMode);
    }
);
const getChart = (ctx, data, darkmode) => {
    const datasetLine1 = {
        label: props?.data1Label || 'Sessions',
        data: data.map((res) => res.values),
        fill: true,
        borderColor: props.borderColor,
        tension: props.tension,
        backgroundColor: props.backgroundColor,
        pointStyle: 'none',
        pointRadius: 0,
    };

    const datasets = !props.line2
        ? [datasetLine1]
        : [
            datasetLine1,
            {
                label: 'Average',
                data: data.map((res) => res.average),
                fill: true,
                borderColor: props.data2borderColor,
                tension: props.data2tension,
                backgroundColor: props.data2backgroundColor,
                pointStyle: 'none',
                pointRadius: 0,
            },
        ];
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
        const barChart = new Chart(ctx, {
            type: props.type ? props.type : 'bar',

            data: {
                labels: data.map((res) => res.labels),
                datasets,
            },

            options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                },

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
                            color: darkmode ? '#a1a1a9' : '#3c4249',
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
</script>

<style lang="scss">
.Bar {
    @media screen and (max-width: 380px) {
        min-width: 260px;
        // min-height: 350px;
    }
}
</style>
