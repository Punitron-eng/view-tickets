<script setup>
import { filterTypeVariables } from './FilterTypes.js';
import { format } from 'date-fns';
import { watch, defineProps, defineEmits, onMounted } from 'vue';
import StartDate from '../itl-date-range-picker/StartDate.vue';
import EndDate from '../itl-date-range-picker/EndDate.vue';

const filterTypeVariable = filterTypeVariables;
const props = defineProps(['filterColumn', 'clearFilterValue', 'handleDateError']);
const emits = defineEmits(['tempFilterValue', 'customLabel']);

watch(
    () => props.filterColumn,
    () => {
        showAppliedFilters();
    }
);
watch(
    () => props.clearFilterValue,
    (val) => {
        if (val === 0) {
            filterTypeVariable.value.filteredValue = [];
        }
    }
);
watch(
    () => props.handleDateError,
    (val) => {
        filterTypeVariable.value.isSelectedDate = val;
    }
);
// showing date filter error

onMounted(() => {
    filterTypeVariable.value.filteredValue = '';
    // showAppliedFilters();
    showFilter();
});

const setFilter = (filterData) => {
    const data = {
        type: filterData.type,
    };
    switch (filterData.type) {
        case 'multiSelect':
            data[filterData.field] = filterTypeVariable.value.filteredValue;
            emits('tempFilterValue', data);
            break;
        case 'radio':
            data[filterData.field] = filterTypeVariable.value.filteredValue;
            emits('tempFilterValue', data);
            break;
        case 'search':
            data[filterData.field] = filterTypeVariable.value.filteredValue;
            emits('tempFilterValue', data);
            break;
    }
};

// const multiSelect = () => {
//     if (filterTypeVariable.value.check) {
//         return props.filterColumn.values.map((val) => {
//             return val.id + ',' + val.value;
//         });
//     }
//     return filterTypeVariable.value.filteredValue;
// };

const setMinMaxInput = (filterData) => {
    if (filterTypeVariable.value.minMax.min && filterTypeVariable.value.minMax.max) {
        const data = {
            type: filterData.type,
            [filterData.field]: filterTypeVariable.value.minMax,
        };
        emits('tempFilterValue', data);
    } else {
        return;
    }
};

const showFilter = () => {
    if (props.filterColumn.isFilterType == 1 && props.filterColumn.filterValue) {
        filterTypeVariable.value.filteredValue = props.filterColumn.filterValue.id.map((value, index) => {
            return value + ',' + props.filterColumn.filterValue.value[index];
        });
    }
    if (props.filterColumn.isFilterType == 2 && props.filterColumn.filterValue) {
        filterTypeVariable.value.filteredValue = props.filterColumn.filterValue;
    }
    if (props.filterColumn.isFilterType == 3 && props.filterColumn.filterValue) {
        filterTypeVariable.value.filteredValue = props.filterColumn.filterValue;
    }
    if (props.filterColumn.isFilterType == 4 && props.filterColumn.filterValue) {
        filterTypeVariable.value.minMax = { ...props.filterColumn.filterValue };
    }
    if (props.filterColumn.isFilterType == 5 && props.filterColumn.filterValue.value.length !== 0) {
        // filterTypeVariable.value.startDate = props.filterColumn.filterValue.value.split(' ');

        filterTypeVariable.value.pRanges.forEach((column) => {
            if (column.id == props.filterColumn.filterValue.id || column.id == (props.filterColumn.filterValue.id == '' ? 'all' : '')) {
                filterTypeVariable.value.selectDefaultDate = column.id;
                setDateOption(column.range, column.label, props.filterColumn.field);
                if (props.filterColumn.filterValue.id === 'custom_range') {
                    filterTypeVariable.value.customDateField = props.filterColumn.field;
                    filterTypeVariable.value.isCustomizeDate = true;
                    const tempDate = props.filterColumn.filterValue.value;
                    const getDateArrayFormat = tempDate.split(' ');
                    filterTypeVariable.value.defaultStartDate = getDateArrayFormat[0];
                    filterTypeVariable.value.defaultEndDate = getDateArrayFormat[1];
                }
                return filterTypeVariable.value.selectDefaultDate;
            }
        });
    }
    if (props.filterColumn.isFilterType == 6 && props.filterColumn.filterValue) {
        filterTypeVariable.value.filteredValue = props.filterColumn.filterValue.id.map((value, index) => {
            return value + ',' + props.filterColumn.filterValue.value[index];
        });
    }
};

const setDateOption = (value, label, field) => {
    filterTypeVariable.value.isSelectedDate = false;
    filterTypeVariable.value.getSelectedDate = label;
    if (label !== 'Custom Range') {
        filterTypeVariable.value.isCustomizeDate = false;
        const startDate = new Date(value[0]);
        const endDate = new Date(value[1]);
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        const tempData = {
            selectedDate: formattedStartDate + ' ' + formattedEndDate,
            selectedLabel: label.replace(/\s+/g, '_').toLowerCase(),
            label: label,
        };
        const data = {
            type: 'dateRange',
            [field]: tempData,
        };
        emits('tempFilterValue', data);
    } else {
        filterTypeVariable.value.isCustomizeDate = true;
        return;
    }
};

const setCustomizeDate = (label, field) => {
    filterTypeVariable.value.isCustomizeDate = true;
    filterTypeVariable.value.customDateLable = label;
    filterTypeVariable.value.customDateField = field;
    emits('customLabel');
};

const getCustomStartDate = (date) => {
    filterTypeVariable.value.defaultStartDate = '';
    filterTypeVariable.value.customStartDate = '';
    const tempStartDate = new Date(date);
    const formattedStartDate = format(tempStartDate, 'yyyy-MM-dd');
    filterTypeVariable.value.customStartDate = formattedStartDate;
    filterTypeVariable.value.defaultStartDate = date;
    filterTypeVariable.value.customEndDate = filterTypeVariable.value.customEndDate ? filterTypeVariable.value.customEndDate : filterTypeVariable.value.defaultEndDate;
    if (filterTypeVariable.value.customStartDate !== '' && filterTypeVariable.value.customEndDate !== '') {
        dateError();
        sendDatePlayload();
    }
};

const getCustomEndDate = (date) => {
    filterTypeVariable.value.defaultEndDate = '';
    filterTypeVariable.value.customEndDate = '';
    const tempEndDate = new Date(date);
    const formattedEndDate = format(tempEndDate, 'yyyy-MM-dd');
    filterTypeVariable.value.customEndDate = formattedEndDate;
    filterTypeVariable.value.defaultEndDate = date;
    filterTypeVariable.value.customStartDate = filterTypeVariable.value.customStartDate ? filterTypeVariable.value.customStartDate : filterTypeVariable.value.defaultStartDate;
    if (filterTypeVariable.value.customStartDate !== '' && filterTypeVariable.value.customEndDate !== '') {
        sendDatePlayload();
    }
};

const sendDatePlayload = () => {
    const tempData = {
        selectedDate: filterTypeVariable.value.customStartDate + ' ' + filterTypeVariable.value.customEndDate,
        selectedLabel: 'custom_range',
        label: 'Custom Range',
    };
    // const tempData = {
    //     selectedDate: filterTypeVariable.value.customStartDate + ' ' + filterTypeVariable.value.customEndDate,
    //     selectedLabel: filterTypeVariable.value.customDateLable.replace(/\s+/g, '_').toLowerCase(),
    //     label: filterTypeVariable.value.customDateLable,
    // };
    const startDate = new Date(filterTypeVariable.value.customStartDate);
    const endDate = new Date(filterTypeVariable.value.customEndDate);
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    if (startTime === endTime || startDate < endDate) {
        filterTypeVariable.value.showDateError = false;
        const data = {
            type: 'dateRange',
            [filterTypeVariable.value.customDateField]: tempData,
        };
        emits('tempFilterValue', data);
    } else {
        filterTypeVariable.value.showDateError = true;
        emits('customLabel');
        return;
    }
};

const dateError = () => {
    const startDate = new Date(filterTypeVariable.value.customStartDate);
    const endDate = new Date(filterTypeVariable.value.customEndDate);
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    if (startTime === endTime || startDate < endDate) {
        filterTypeVariable.value.showDateError = false;
    } else {
        filterTypeVariable.value.showDateError = true;
    }
};
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
const showAppliedFilters = () => {
    filterTypeVariables.value.filteredValue = [];
    filterTypeVariables.value.isCustomizeDate = false;
    filterTypeVariables.value.defaultStartDate = '';
    filterTypeVariables.value.defaultEndDate = '';
    filterTypeVariable.value.customStartDate = '';
    filterTypeVariable.value.customEndDate = '';
    filterTypeVariables.value.showDateError = false;
    showFilter();
    if (props.filterColumn.isFilterType == 5) {
        filterTypeVariable.value.pRanges.forEach((column) => {
            if (column.id == props.filterColumn.filterValue.id || column.id == (props.filterColumn.filterValue.id == '' ? 'all' : '')) {
                filterTypeVariable.value.selectDefaultDate = column.id;
                setDateOption(column.range, column.label, props.filterColumn.field);
                if (props.filterColumn.filterValue.id === 'custom_range') {
                    filterTypeVariable.value.isCustomizeDate = true;
                    const tempDate = props.filterColumn.filterValue.value;
                    const getDateArrayFormat = tempDate.split(' ');
                    filterTypeVariable.value.defaultStartDate = getDateArrayFormat[0];
                    filterTypeVariable.value.defaultEndDate = getDateArrayFormat[1];
                }
                return filterTypeVariable.value.selectDefaultDate;
            }
        });
    }
};
const validateNumber = (e) => {
    const charCode = !e.charCode ? e.which : e.charCode;
    const input = e.target.value + String.fromCharCode(charCode);

    // Allow numbers with up to three decimal places
    if (!/^\d*\.?\d{0,3}$/.test(input)) {
        e.preventDefault();
        return false;
    }
    return true;
};
</script>

<template>
    <div v-if="props.filterColumn !== null">
        <div class="tab-content-container">
            <div class="tab-title poppins-font">{{ props.filterColumn.header }}</div>
            <div v-if="props.filterColumn.isFilterType === 1">
                <div v-if="props.filterColumn.isSearchAvail || (!props.filterColumn.isSearchAvail && !props.filterColumn.isIconAvail)" class="checkbox-list">
                    <div class="custom-checkbox" v-for="(item, index) in props.filterColumn.values" :key="index">
                        <input
                            type="checkbox"
                            :id="item.value"
                            class="custom-control-input styled-checkbox more-filter-styled-checkbox"
                            v-model="filterTypeVariable.filteredValue"
                            @change="setFilter({ field: props.filterColumn.field, type: 'multiSelect' })"
                            :value="item.id + ',' + item.value"
                        />
                        <label :for="item.value" class="custom-control-label">{{ item.value }}</label>
                    </div>
                </div>
                <div v-else class="checkbox-list">
                    <div class="custom-checkbox" :class="props.filterColumn.field == 'awb_no' ? 'more-shipping-outer' : ''" v-for="(item, index) in props.filterColumn.values" :key="index">
                        <input
                            type="checkbox"
                            :id="item.name"
                            class="custom-control-input styled-checkbox more-filter-styled-checkbox"
                            v-model="filterTypeVariable.filteredValue"
                            @change="setFilter({ field: props.filterColumn.field, type: 'multiSelect' })"
                            :value="item.id + ',' + item.name"
                        />
                        <label :for="item.name" class="custom-control-label order-3">{{ item.name }}</label>
                        <img :src="getLogisticIcon(item.logistics_logo)" alt="Logistic Image" class="margin-right image-position order-2" />
                    </div>
                </div>
            </div>

            <div v-if="props.filterColumn.isFilterType === 2">
                <div class="order-id-input-field">
                    <img src="@/assets/images/store-order-search.svg" alt="Search" class="input-field-search-icon" />
                    <input type="text" class="form-control" :placeholder="`Search ${props.filterColumn.header}`" v-model.trim="filterTypeVariable.filteredValue" @change="setFilter({ field: props.filterColumn.field, type: 'search' })" />
                </div>
            </div>

            <div v-if="props.filterColumn.isFilterType === 3">
                <div class="radio-list">
                    <div class="custom-radio helvetica-regular gray-700" v-for="(item, index) in props.filterColumn.values" :key="index">
                        <input type="radio" name="item" :id="item.id" class="custom-radio-input" :value="item.id" v-model="filterTypeVariable.filteredValue" @change="setFilter({ field: props.filterColumn.field, type: 'radio' })" />
                        <label :for="item.id" class="custom-radio-label">{{ item.value }}</label>
                    </div>
                </div>
            </div>

            <div v-if="props.filterColumn.isFilterType === 4">
                <input
                    type="text"
                    @keypress="validateNumber"
                    placeholder="Min Amount"
                    v-model="filterTypeVariable.minMax.min"
                    class="form-control amount-padding no-arrows"
                    @change="setMinMaxInput({ field: props.filterColumn.field, type: 'minMax' })"
                />
                <input
                    type="text"
                    @keypress="validateNumber"
                    placeholder="Max Amount"
                    v-model="filterTypeVariable.minMax.max"
                    class="form-control amount-padding no-arrows"
                    @change="setMinMaxInput({ field: props.filterColumn.field, type: 'minMax' })"
                />
            </div>

            <div v-if="props.filterColumn.isFilterType === 5">
                <div class="radio-list">
                    <div class="custom-radio helvetica-regular gray-700" v-for="(value, index) in filterTypeVariable.pRanges" :key="index">
                        <div @click="setDateOption(value.range, value.label, props.filterColumn.field)">
                            <input type="radio" name="item" :id="value.label" class="custom-radio-input" :value="value.id" v-model="filterTypeVariable.selectDefaultDate" />
                            <label v-if="value.label !== 'Custom Range'" :for="value.label" class="custom-radio-label">{{ value.label }}</label>
                            <label v-else :for="value.label" class="custom-radio-label" @click="setCustomizeDate(value.label, props.filterColumn.field)">{{ value.label }}</label>
                        </div>
                    </div>
                </div>
                <div v-if="filterTypeVariable.isCustomizeDate">
                    <div class="margin-left">
                        <StartDate class="custom-date-picker" :defaultDate="filterTypeVariable.defaultStartDate" @start-date="getCustomStartDate" />
                        <EndDate class="custom-date-picker" :defaultDate="filterTypeVariable.defaultEndDate" @end-date="getCustomEndDate" />
                        <div v-if="filterTypeVariable.showDateError" class="date-error">Start date cannot be greater than end date.</div>
                    </div>
                </div>
                <div v-if="filterTypeVariable.isSelectedDate && filterTypeVariable.getSelectedDate !== 'Custom Range'" class="date-error">Please select date.</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './FilterTypes.scss';
</style>
