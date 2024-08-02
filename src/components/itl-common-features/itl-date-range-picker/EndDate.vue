<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format } from 'date-fns';
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps({
    disabledInput: {
        type: Boolean,
    },
    defaultDate: {
        default: new Date(),
    },
});

const emits = defineEmits(['endDate']);

const dateVariable = ref({
    date: props.defaultDate,
    minDate: new Date(2017, 0, 1),
});

watch(
    () => props.defaultDatedefaultDate,
    (val) => (dateVariable.value.date = val)
);

const formatDate = (date) => format(new Date(date), 'dd-MM-yyyy');

const setDate = (date) => emits('endDate', date);
</script>

<template>
    <div class="scroll-prevent">
        <VueDatePicker
            v-model="dateVariable.date"
            auto-apply
            :enable-time-picker="false"
            :disabled="props.disabledInput"
            @update:model-value="setDate"
            :format="formatDate"
            :min-date="dateVariable.minDate"
            prevent-min-max-navigation
            :monthChangeOnScroll="false"
            placeholder="Select End date"
        ></VueDatePicker>
    </div>
</template>

<style scoped lang="scss">
.dp__icon .dp__clear_icon .dp__input_icons {
    display: none !important;
}
</style>
