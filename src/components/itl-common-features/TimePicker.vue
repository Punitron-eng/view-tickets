<template>
    <VueDatePicker v-model="time" time-picker :is-24="false" @update:model-value="setTime" :dark="darkModeVal"
        placeholder="Select Time" :timezone="{ emitTimezone: 'UTC' }" />
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, watch, computed, defineExpose } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import { DARKMODE } from '@/store/dark-mode/constants';

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const store = useStore();
const emit = defineEmits(['getTime'])
const { defaultValue } = defineProps(['defaultValue'])
const time = ref(defaultValue ? { hours: defaultValue.hours, minutes: defaultValue.minutes } : null
);

watch(() => defaultValue, (newValue) => {
    time.value = newValue
    console.log(newValue, "this is the time picker ")
})

const setTime = () => {
    console.log(time.value)
    emit('getTime', time.value)
}

const clearTime = () => {
    time.value = null;
};

defineExpose({ clearTime });
</script>