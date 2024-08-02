<template>
    <div v-for="(date, index) in datefilter" :key="date.id" class="flex gap-1 lg:w-[246px] w-[140px]"
        :class="date.id == 'custom_range' ? 'lg:w-[346px] md:items-center w-[200px] flex-col md:flex-row lg:gap-5' : ''">
        <div class="flex" @click="changeDate(date.id + '_' + id.field, id.field, date.id)">
            <!-- :value="{ selectedDate: date.range, selectedLabel: date.id, label: date.label }" -->
            <input type="radio" :id="date.id + '_' + id.field" :value="checkPreviousValue(date, datePicker[id.field])"
                v-model="datePicker[id.field]" :name="date.id + '_' + id.field" />
            <label :for="date.id + '_' + id.field" class="ml-2 hover:cursor-pointer">{{ date.label }}</label>
        </div>
        <div v-if="date.id + '_' + id.field == 'custom_range_' + id.field && showCustomDate[id.field]" class="relative">
            <MultiCalender @dateEmit="customRange" :filterId="id.field" :custom_date="datePicker[id.field]" />
        </div>
    </div>
</template>

<script setup>
import { defineModel } from 'vue';
import MultiCalender from '../../itl-common-features/itl-date-range-picker/dataTable-multi-calendars/MultiCalendars.vue';
const datePicker = defineModel();
const { id, datefilter, showCustomDate, changeDate } = defineProps(['id', 'datefilter', 'showCustomDate', 'changeDate']);
const checkPreviousValue = (date, isModalPresent) => {
    if (date.id === 'custom_range') {
        return isModalPresent ? { selectedDate: isModalPresent.selectedDate, selectedLabel: date.id, label: date.label } : { selectedDate: date.range, selectedLabel: date.id, label: date.label };
    } else {
        return { selectedDate: date.range, selectedLabel: date.id, label: date.label };
    }
};
const customRange = (date) => {
    const formattedDates = date.date.map((date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-CA', options).format(date);
    });
    datePicker.value[date.filterId].selectedDate = formattedDates.join(' ');
};
</script>
