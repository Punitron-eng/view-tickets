<template>
  <VueDatePicker v-model="date" range auto-apply :enable-time-picker="false" multi-calendars
    :monthChangeOnScroll="false" hide-input-icon :format="formatDate" :dark="darkModeVal" :min-date="minDate" />
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
import { DARKMODE } from '@/store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, onMounted, computed, watch, defineEmits, defineProps } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns';
const emits = defineEmits(['dateEmit'])
const props = defineProps(['filterId', 'custom_date'])
const minDate = ref(new Date(2017, 0, 1))
const date = ref();
onMounted(() => {
  const startDate = new Date(props.custom_date.selectedDate.split(" ")[0]);
  const endDate = new Date(props.custom_date.selectedDate.split(" ")[1]);
  date.value = [startDate, endDate];
});
const formatDate = (date) => {
  if (date.length === 2) {
    return format(new Date(date[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(date[1]), 'dd-MM-yyyy'); // this is for we get the warning about vueDateRangePicker's prop name as inputValue
  } else {
    return;
  }
}
watch(() => date.value, (newvalue) => {
  const newData = {
    date: newvalue,
    filterId: props.filterId
  }
  emits('dateEmit', newData)
})

</script>

<style lang="scss">
.dp__button {
  display: none !important;
}

.dp--menu-wrapper {
  @media screen and (max-width:455px) {
    left: 0 !important;
  }
}
</style>
