<template>
    <div class="chart">
        <div class="funnelChart">
            <canvas :id="props.id"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted,defineProps } from 'vue';
import { jsonData } from './DummyData.ts';
import { LinearScale, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
onMounted(() => {
    const ctx = document.getElementById(props.id);
    getChart(ctx, jsonData.data4);
});
const props =defineProps(['id','backgroundColor','legendDisplay','tempData'])

const getChart = (ctx) => {
    Chart.register(
        // ChartDataLabels,
        FunnelController,
        TrapezoidElement,
        LinearScale,
        CategoryScale
    );

    new Chart(ctx, {
        type: 'funnel',
        data: {
            labels: props.tempData.map((res) => res.labels),
            datasets: [
                {
                    data: props.tempData.map((res) => res.values),
                    backgroundColor: props.backgroundColor?props.backgroundColor:'blue',
                },
            ],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        usePointStyle: true,
                    },
                    display: props.legendDisplay?props.legendDisplay:false,
                },
                // datalabels: {
                //   display: true,
                //   color: 'black',
                //   formatter: function (value, context) {
                //     return context.chart.data.labels[context.dataIndex];
                //   },
                // },
            },
        },
    });
};
</script>
