<script setup>
import { dataTableFilterVariables } from './datatableFilter';
import { computed, watch, onMounted, defineProps, defineEmits, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import DateTimeRangePicker from '@/components/itl-common-features/itl-date-range-picker/dataTable-dateRange/DateTimeRangePicker.vue';
import TieredMenu from 'primevue/tieredmenu';
const props = defineProps(['col', 'items', 'isCustomizeColumnAvail']);
const emit = defineEmits(['filter', 'selectedColumn', 'filterValue']);
const route = useRoute();
const dataVariables = dataTableFilterVariables;
// const getCheckboxItems = computed(() => {
//     if (dataVariables.value.checkboxSearchInput) {
//         if (props.col.isSearchAvail) {
//             return props.col.values.filter((value) => {
//                 return value.value.toLowerCase().includes(dataVariables.value.checkboxSearchInput.toLowerCase());
//             });
//         } else {
//             return props.col.values.filter((value) => {
//                 return value.name.toLowerCase().includes(dataVariables.value.checkboxSearchInput.toLowerCase());
//             });
//         }
//     }
//     return props.col.values;
// });
// watch(
//     () => dataVariables.value.filteredValue,
//     (val) => {
//         if (!route.params.tabs) {
//             emit('filterValue', val);
//             if (props.col.isFilterType != 4) {
//                 toggleApplyBtn();
//             }
//         }
//     }
// );
// watch(
//     () => dataVariables.value.minMax.min,
//     (val) => {
//         const applyButton = document.querySelector('.store-filter-button-apply');
//         const clearButton = document.querySelector('.store-filter-button-clear');
//         if (Object.keys(dataVariables.value.minMax).length > 1 && val && dataVariables.value.minMax.max) {
//             applyButton.classList.remove('apply-button-disable');
//             clearButton.classList.remove('clear-button-disable');
//         } else {
//             applyButton.classList.add('apply-button-disable');
//             clearButton.classList.add('clear-button-disable');
//         }
//     }
// );
// watch(
//     () => dataVariables.value.minMax.max,
//     (val) => {
//         const applyButton = document.querySelector('.store-filter-button-apply');
//         const clearButton = document.querySelector('.store-filter-button-clear');
//         if (Object.keys(dataVariables.value.minMax).length > 1 && val && dataVariables.value.minMax.min) {
//             applyButton.classList.remove('apply-button-disable');
//             clearButton.classList.remove('clear-button-disable');
//         } else {
//             applyButton.classList.add('apply-button-disable');
//             clearButton.classList.add('clear-button-disable');
//         }
//     }
// );
// onBeforeMount(() => (dataVariables.value.filteredValue = []));
onMounted(() => {
    // dataVariables.value.filteredValue = [];
    // // dataVariables.value.minMax.min = null;
    // // dataVariables.value.minMax.max = null;
    // dataVariables.value.checkboxSearchInput = '';
    // showFilter();
    emit('selectedColumn', props.col);
});
// const setFilter = (filterData) => {
//     const data = {
//         type: filterData.type,
//     };
//     switch (filterData.type) {
//         case 'dateRange':
//             data[props.col.field] = filterData;
//             emit('filter', data);

//             updateDate(5);
//             break;
//         case 'multiSelect':
//             data[filterData.field] = dataVariables.value.filteredValue;
//             emit('filter', data);
//             break;
//         case 'radio':
//             data[filterData.field] = dataVariables.value.filteredValue;
//             emit('filter', data);
//             break;
//         case 'search':
//             data[filterData.field] = dataVariables.value.filteredValue;
//             emit('filter', data);
//             break;
//     }
// };
// const setMinMaxInput = (filterData) => {
//     const data = {
//         type: filterData.type,
//         [filterData.field]: dataVariables.value.minMax,
//     };
//     emit('filter', data);
// };
// const updateDate = (filterType) => {
//     if (filterType === 1) {
//         return;
//     } else {
//         var applyButton = document.querySelector('.store-filter-button-apply');
//         applyButton.dispatchEvent(new Event('click'));
//     }
// };
// const showFilter = () => {
//     if (props.col.isFilterType == 1 && props.col.filterValue) {
//         dataVariables.value.filteredValue = props.col.filterValue.id.map((value, index) => {
//             return value + ',' + props.col.filterValue.value[index];
//         });
//     }
//     if (props.col.isFilterType == 2 && props.col.filterValue) {
//         dataVariables.value.filteredValue = props.col.filterValue;
//     }
//     if (props.col.isFilterType == 3 && props.col.filterValue) {
//         // dataVariables.value.filteredValue = props.col.filterValue.id[0] + ',' + props.col.filterValue.value[0];
//         dataVariables.value.filteredValue = props.col.filterValue;
//     }
//     if (props.col.isFilterType == 4 && props.col.filterValue) {
//         dataVariables.value.minMax = { ...props.col.filterValue };
//     }
//     if (props.col.isFilterType == 5 && props.col.filterValue.value.length !== 0) {
//         dataVariables.value.startDate = props.col.filterValue.value.split(' ');
//     }
//     if (props.col.isFilterType == 6 && props.col.filterValue) {
//         dataVariables.value.filteredValue = props.col.filterValue.id.map((value, index) => {
//             return value + ',' + props.col.filterValue.value[index];
//         });
//     }
// };
// const toggleApplyBtn = () => {
//     const applyButton = document.querySelector('.store-filter-button-apply');
//     const clearButton = document.querySelector('.store-filter-button-clear');
//     if (dataVariables.value.filteredValue.length != 0) {
//         applyButton.classList.remove('apply-button-disable');
//         clearButton.classList.remove('clear-button-disable');
//     } else {
//         applyButton.classList.add('apply-button-disable');
//         clearButton.classList.add('clear-button-disable');
//     }
// };
// const getLogisticIcon = (logisticLogo) => {
//     const imagePath = new URL(`../../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
//     const logisticLogoPath = imagePath.split('/');
//     const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
//     if (logisticLogoLastPart == 'undefined') {
//         const defaultImagePath = new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
//         return defaultImagePath;
//     } else {
//         return imagePath;
//     }
// };
// const validateNumber = (e) => {
//     // debugger;
//     const charCode = !e.charCode ? e.which : e.charCode;
//     const input = e.target.value + String.fromCharCode(charCode);
//     if (input === '.') {
//         e.preventDefault();
//         return false;
//     }
//     // const pastedText = (e.clipboardData || window.clipboardData).getData('text');
//     // console.log('containsLink(pastedText) =>', containsLink(pastedText))
//     // if (containsLink(pastedText)) {
//     //     e.preventDefault();
//     //     return false;
//     // }
//     // Allow numbers with up to three decimal places
//     if (!/^\d*\.?\d{0,3}$/.test(input)) {
//         e.preventDefault();
//         return false;
//     }
//     return true;
// };
// const containsLink = (text) => {
//     const urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
//     return urlPattern.test(text);
// };
// const tempTest = ref(true);
</script>
<template>
    <!-- <div v-if="!tempTest">
        <div v-if="props.col.isFilterType === 1">
            <div v-if="props.col.isSearchAvail" :class="'serch-box-outer position-relative ' + props.col.field">
                <img src="@/assets/images/store-order-search.svg" class="search-icon" />
                <InputText type="text" id="search" v-model="dataVariables.checkboxSearchInput" class="p-column-filter" :placeholder="`Search`" />
            </div>
            <div class="checkbox-outer-section">
                <div v-for="item in getCheckboxItems" :key="item" class="field-checkbox">
                    <CheckboxView
                        :inputId="item.id + 'filter'"
                        v-model="dataVariables.filteredValue"
                        @change="setFilter({ field: props.col.field, type: 'multiSelect' })"
                        :name="props.col.field + '[]'"
                        :value="!props.col.isIconAvail ? item.id + ',' + item.value : item.id + ',' + item.name"
                    />
                    <img v-if="props.col.isIconAvail" :src="getLogisticIcon(item.logistics_logo)" alt="Logistic Image" class="margin-right" />
                    <label v-if="props.col.isIconAvail" :for="item.id + 'filter'" class="cursor-pointer">{{ item.name }}</label>
                    <label v-else :for="item.id + 'filter'" class="cursor-pointer">{{ item.value }}</label>
                </div>
            </div>
        </div>
        <div v-if="props.col.isFilterType === 2" :class="'input-popover position-relative ' + props.col.field">
            <img src="@/assets/images/store-order-search.svg" class="search-icon" />
            <InputText
                type="text"
                v-model.trim="dataVariables.filteredValue"
                class="p-column-filter"
                :placeholder="`Search...`"
                @change="setFilter({ field: props.col.field, type: 'search' })"
                @keyup.enter="updateDate(dataVariables.filteredValue != '' ? 0 : 1)"
            />
        </div>
        <div v-if="props.col.isFilterType === 3">
            <div v-for="(item, index) in props.col.values" :key="index" class="field-radiobutton">
                <input type="radio" class="radio-width" :id="item.id" :name="props.col.field" :value="item.id" v-model="dataVariables.filteredValue" @change="setFilter({ field: props.col.field, type: 'radio' })" />

                <label class="radio-mt" :for="item.id">{{ item.value }}</label>
            </div>
        </div>
        <div v-if="props.col.isFilterType === 4" class="min-max-outer-section">
            <InputText
                type="text"
                @paste="validateNumber"
                v-model.trim="dataVariables.minMax.min"
                class="p-column-filter min-section mb-bottom no-arrows"
                placeholder="Min amount"
                @change="setMinMaxInput({ field: props.col.field, type: 'minMax' })"
                @keypress="validateNumber"
                id="filterMinAmount"
            />
            <InputText
                type="text"
                @paste="validateNumber"
                v-model.trim="dataVariables.minMax.max"
                class="p-column-filter max-section no-arrows"
                placeholder="Max amount"
                @change="setMinMaxInput({ field: props.col.field, type: 'minMax' })"
                @keypress="validateNumber"
                id="filterMinAmount"
            />
        </div>
        <div v-if="props.col.isFilterType === 5" class="min-max-outer-section" :class="'date-range-picker-section_' + props.col.field">
            <div class="outer-dateranger-picker" style="width: 210px">
                <DateTimeRangePicker @updateDate="setFilter" :start-date="dataVariables.startDate" :inline="true">
                    <template #sort>
                        <div>
                            <div class="filter-header">{{ props.col.header }}</div>
                        </div>
                    </template>
                    <template #pin-column v-if="props.isCustomizeColumnAvail">
                        <div class="column-setting-outer">
                            <TieredMenu :model="props.items" />
                        </div>
                    </template>
                </DateTimeRangePicker>
            </div>
        </div>
        <div v-if="props.col.isFilterType === 8" class="no-filter-section">
            <TieredMenu :model="props.items[0].items" />
        </div>
    </div>
    <div v-else> -->
        <div class="no-filter-section">
            <TieredMenu :model="props.items[0].items" />
        </div>
    <!-- </div> -->
</template>
<style lang="scss">
@import './datatableFilter.scss';
</style>
