<script setup>
import FilterTypes from '../itl-filter-type/FilterTypes.vue';
import { filterVariables } from './MoreFilter.js';
import { computed, defineProps, defineEmits, onBeforeMount } from 'vue';

const props = defineProps(['filterColumn', 'filterFields', 'getMappedFilters', 'moreFilterColumn']);
const emits = defineEmits(['tempFilterValue', 'clearAllFilterValue', 'closeModal']);
// dark mode
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
const store = useStore();
const toast = useToast();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
// dark mode ends here

const moreFilterVariable = filterVariables;
const filteredColumns = computed(() => props.filterColumn.filter((column) => column.isFilterAvailable === true && column.is_visible === true && column.isFilterType != 7 && column.isFilterType != 8));

onBeforeMount(() => {
    moreFilterVariable.value.defaultFilterSelected = filteredColumns.value[0].field;
    const defaultFilterItem = filteredColumns.value.find((filter) => filter.field === moreFilterVariable.value.defaultFilterSelected);
    if (defaultFilterItem) {
        moreFilterVariable.value.filterType = defaultFilterItem;
        moreFilterVariable.value.selectedFilterClass = moreFilterVariable.value.filterType.field;
    }
});

const showFilters = (filterType) => {
    moreFilterVariable.value.filterType = filterType;
    moreFilterVariable.value.filter = '';
    moreFilterVariable.value.selectedFilterClass = moreFilterVariable.value.filterType.field;
};

const setFilter = (data) => (moreFilterVariable.value.filter = data);

// more filter apply button function
const applyFilter = () => {
    let amountValidation = moreFilterVariable.value.filter.type == 'minMax' && Number(moreFilterVariable.value.filter.amount.min) < Number(moreFilterVariable.value.filter.amount.max);
    if (moreFilterVariable.value.filter.type != 'minMax') {
        amountValidation = true;
    }
    if (moreFilterVariable.value.filter !== '' && amountValidation) {
        emits('tempFilterValue', moreFilterVariable.value.filter);
        closeModal();
    } else {
        moreFilterVariable.value.handleDateError = true;
        if (moreFilterVariable.value.filter.type == 'minMax') {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Min amount should be less than max amount', life: 3000 });
        }
        return;
    }
};
// more filter apply button function

// more filter clear button function
const clearAllFilter = () => {
    if (props.filterFields.some((field) => props.getMappedFilters[field] !== '')) {
        moreFilterVariable.value.clearFilterValue = 0;
        emits('clearAllFilterValue');
        closeModal();
    } else {
        return;
    }
};
// more filter clear button function

// more filter modal close function
const closeModal = () => {
    emits('closeModal', false);
    moreFilterVariable.value.filter = '';
};
// more filter modal close function

// more filter date select function
const customLabel = () => {
    moreFilterVariable.value.filter = '';
    moreFilterVariable.value.handleDateError = false;
};
// more filter date select function
</script>

<template>
    <div class="filter-popup-body">
        <div class="tab-modal-content-left">
            <ul class="nav nav-tabs tabs-left d-md-block">
                <li v-for="(filter, index) in filteredColumns" :key="index" :class="filter.field === moreFilterVariable.selectedFilterClass ? 'active' : ''">
                    <div class="selected-option" @click="showFilters(filter)">
                        {{ filter.header }}
                        <div v-if="filter.field === moreFilterVariable.selectedFilterClass" class="selected-items">
                            <img v-if="!darkModeVal" src="@/assets/images/more-filter-arrow.svg" alt="Right Arrow" />
                            <img v-else src="@/assets/images/dark-mode/dark-more-filter-arrow.svg" alt="Right Arrow" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tab-modal-content-right">
            <div class="tab-content accordion-container">
                <FilterTypes :filter-column="moreFilterVariable.filterType" :clear-filter-value="moreFilterVariable.clearFilterValue" :handle-date-error="moreFilterVariable.handleDateError" @tempFilterValue="setFilter" @custom-label="customLabel" />
            </div>
        </div>
    </div>
    <div class="filter-popup-footer text-right">
        <button class="cancle-btn helvetica-medium gray-700" @click="clearAllFilter()">Reset All</button>
        <button class="apply-btn helvetica-medium" @click="applyFilter()">Apply</button>
    </div>
</template>

<style lang="scss">
@import './MoreFilter.scss';
</style>
