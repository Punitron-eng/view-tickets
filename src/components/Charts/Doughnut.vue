<template>
    <!-- Add a unique key to force re-creation of the chart component -->
    <div :key="chartKey" :class="customWidth ? 'Doughnut' : ''">
        <canvas :id="props.id"
            :style="{ maxHeight: props.height ? props.height + 'px' : 'auto', maxWidth: props.width ? props.width + 'px' : 'auto' }"></canvas>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, defineProps, ref, watch, computed } from 'vue';
import { jsonData } from './DummyData';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useStore } from 'vuex';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['type', 'id', 'customWidth', 'borderColor', 'tempData', 'tension', 'height', 'backgroundColor', 'data2backgroundColor', 'axesVisible', 'width', 'line2', 'data2', 'data2tension', 'data2borderColor', 'legendDisplay']);

// Add a ref for the unique key
const chartKey = ref(0);

onMounted(() => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, props.tempData, darkModeVal.value);
});

const doughnutLabel = {
    id: 'doughnutLabel',
    beforeDatasetsDraw(chart, args, pluginOption) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.fillStyle = props.borderColor;
        ctx.fillText('Dummy', xCoor, yCoor);
    },
};

const getChart = (ctxs, data, darkmode) => {
    const datasetLine1 = {
        label: 'Orders',
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
                data: [0, 5, 5, 5, 6, 7],
                fill: true,
                borderColor: 'yellow',
                borderColor: props.data2borderColor,
                tension: props.data2tension,
                backgroundColor: props.data2backgroundColor,
                pointStyle: 'none',
                pointRadius: 0,
            },
        ];

    const DoughnutChart = Chart.getChart(ctxs);
    if (DoughnutChart) {
        DoughnutChart.data.labels = data.map((res) => res.labels);
        DoughnutChart.data.datasets = datasets;
        DoughnutChart.options.plugins.legend.labels.color = darkmode ? '#a1a1a9' : '#3c4249';
        DoughnutChart.update();
    } else {
        new Chart(ctxs, {
            type: props.type ? props.type : 'doughnut',
            data: {
                labels: data.map((res) => res.labels),
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
                                    label += ' : ';
                                }
                                if (context.parsed.y !== null) {
                                    label += " " + context.formattedValue;
                                }
                                return (" " + label);
                            }
                        }
                    },
                    doughnutLabel,
                    legend: {
                        position: 'right',
                        labels: {
                            useBorderRadius: true,
                            borderRadius: 0,
                            usePointStyle: true,
                            font: {
                                size: 16,
                            },
                            color: darkmode ? '#a1a1a9' : '#3c4249'
                        },
                        display: props.legendDisplay ? props.legendDisplay : false,
                    },
                    doughnutLabel: {
                        labels: [
                            {
                                color: darkmode ? '#a1a1a9' : '#3c4249',
                                position: 'outside',
                                font: {
                                    size: 16,
                                },
                                fontStyle: 'bold',
                            },
                        ],
                    },
                },
                scales: {
                    x: {
                        display: props.axesVisible,

                    },
                    y: {
                        display: props.axesVisible,
                    },
                },
            },
        });
    }
};

// Watch for changes in props.tempData and update the chart accordingly
watch(() => [props.tempData, darkModeVal.value], ([newTempData, newDarkMode], [oldTempData, oldDarkMode]) => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, props.tempData, newDarkMode);
});
</script>

<style lang="scss">
.Doughnut {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 767px) {
        min-width: 270px;
    }
}
</style>
