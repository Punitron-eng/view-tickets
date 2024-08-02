<template>
  <div :id="props.id" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['tempData', 'id', 'legendDisplay']);

const makeFunnel = (tempData) => {
  var myChart = echarts.init(document.getElementById(props.id));

  // Convert percentage strings to numeric values
  const numericValues = tempData.map(item => parseInt(item.values));
  console.log(numericValues, "this is the funnel values ")
  // Draw the funnel chart
  myChart.setOption({
    legend: {
      data: ["Display", "Click", "Visit", "Consulting", "Order"]
    },
    title: {
      text: '',
    },
    color: ['#2848c0', '#376bcb', '#5fb7e5', '#add9f0', '#24d21d'],
    tooltip: {
      trigger: 'item',
      formatter: '<b>{b}</b> <br />{c}',
    },
    series: [
      {
        name: '',
        type: 'funnel',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        label: {
          show: props?.legendDisplay || false,
          position: 'center',
          formatter: '{c}',
        },
        data: [
          { value: numericValues[0], name: 'Checkout Initiated ' },
          { value: numericValues[1], name: 'Logged In' },
          { value: numericValues[2], name: ' Address Screen ' },
          { value: numericValues[3], name: 'Payment Screen ' },
          { value: numericValues[4], name: 'Purchased' },
        ],
      },
    ],
  });
};

watch(() => props.tempData, () => {
  makeFunnel(props.tempData);
});

onMounted(() => {
  makeFunnel(props.tempData);
});
</script>

<style lang="scss">
#SaleFunnel {
  // width: 70% !important;
}
</style>
<!-- <style lang="scss">
@media screen and (max-width:1280px) {
  #SaleFunnel {
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width:767px) {
      // left: -40px
      padding: 0;
      top: 20px;
      width: 100% !important;
      max-width: 100% !important;
    }

    @media screen and (max-width:767px) {
      canvas {
        left: -45px !important;
        // min-width: max-content !important;
      }
    }

    div {
      max-width: 80%;

      @media(max-width:767px) {
        max-width: 100%;
        width: 100% !important;
      }
    }
  }
}
</style> -->