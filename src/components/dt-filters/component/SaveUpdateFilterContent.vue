<script setup>
import { ref, defineProps, computed, defineModel, watch, inject } from 'vue';
import { useStore } from 'vuex';
import dataTableLiVue from '../../itl-dataTable-files/itl-dataTable-li/dataTableLi.vue';
import { DARKMODE } from '../../../store/dark-mode/constants';
import cloneDeep from 'lodash/cloneDeep'; // Import cloneDeep from lodash
import { dataTableVariables as commonVariable } from '../../itl-dataTable-files/itl-dataTable/commonVariable';

const storeName = inject('storeName');
const store = useStore();
const props = defineProps(['typeOfModal', 'updateFilterType', 'FilterArr']);
const emits = defineEmits(['removeSingleFilter', 'removeGroupFilter']);
const model = defineModel();
const newFilter = ref(cloneDeep(props?.FilterArr || {})); // Use cloneDeep for deep cloning
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

watch(
    () => props.FilterArr,
    (newValue) => {
        newFilter.value = cloneDeep(newValue); // Use cloneDeep to clone new value
    }
);
let datafilter9 = ['address_confirmation', 'order_confirmation'];
const checkFilterType9 = (filterData) => {
    for (const key in filterData) {
        if (datafilter9.includes(key)) {
            return true;
        }
    }
    return false;
};

const formateKey = (key) => {
    if (key === 'awb') return 'Logistics';
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
};

const getImg = (iconName, isDarkMode) => {
    if (iconName) {
        if (isDarkMode) {
            return new URL(`../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
    }
};
const formatSelectedData = (value) => {
    if (value && value != undefined) {
        if (value.min != undefined && value.min != null) {
            return value.min + ' to ' + value.max;
        }
        if (typeof value == 'object') {
            if (value.label && value.label.length > 0) {
                value = value.label;
            } else {
                value = value.value.join(',');
            }
        }
        const selectedData = value.split(',');

        if (selectedData.length > 2) {
            return `${selectedData[0]} & ${selectedData.length - 1} others`;
        } else {
            return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
        }
    }
};

const removeSingleFilter = (key) => {
    console.log(key, 'remove filter id');
    if (key == 'ticket_department') {
        if (commonVariable.value.router.currentRoute.path.includes('tickets')) {
            store.commit(`${storeName.NAME}/clearTicketDepartmentId`, '');
        }
        const updatedFilter = { ...newFilter.value };
        delete updatedFilter[key];
        delete updatedFilter.ticket_category;
        newFilter.value = updatedFilter;
        emits('removeSingleFilter', key);
        emits('removeSingleFilter', 'ticket_category');
    } else {
        const updatedFilter = { ...newFilter.value };
        delete updatedFilter[key];
        newFilter.value = updatedFilter;
        emits('removeSingleFilter', key);
    }
};
const removeGroupFilter = (objectKey, field) => {
    const updatedFilter = { ...newFilter.value };
    delete updatedFilter[field][objectKey];
    newFilter.value = updatedFilter;
    emits('removeGroupFilter', { objectKey, field });
};
const convertTagFormat = (key) => {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
</script>

<template>
    <div>
        <div class="filter-input">
            <label class="save-update-filter-label"> {{ props.typeOfModal === 'SaveModal' ? 'Filter Name' : 'Filter to update' }}</label>
            <InputText v-model="model" id="save-update-filter-input" class="w-[245px] md:w-[352px] h-[32px]" placeholder="Filter name" autofocus />
        </div>
        <div class="filters-section">
            <h5 class="filters-heading pb-[8px]">Filters</h5> 
            <div class="flex flex-wrap gap-[8px]" v-if="props.updateFilterType">
                <!-- <div v-for="(value, key) in newFilter" :key="key" :class="value === '' && key === 'id' && key === 'name' && key === 'is_pinned' ? 'none' : null">
                    <div v-if="value !== '' && key !== 'id' && key !== 'name' && key !== 'is_pinned'" class="flex items-center bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] w-fit gap-2">
                        <div>{{ formateKey(key) }} : {{ formatSelectedData(value) }}</div>
                        <img @click="removeSingleFilter(key)" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] pt-[2px] hover:cursor-pointer dark:w-[16px] dark:h-[16px]" />
                    </div>
                </div> -->
                <div v-for="(column, index) in commonVariable.dataTableColumns" :key="index" :class="column.isFilterType !== 8 && newFilter[column.field] ? 'block' : 'hidden'">
                    <div v-if="newFilter[column.field] && column.isFilterType < 8" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                        <div>{{ column.header }} : {{ formatSelectedData(newFilter[column.field]) }}</div>
                        <img @click="removeSingleFilter(column.field)" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] pt-[2px] hover:cursor-pointer dark:w-[16px] dark:h-[16px]" />
                    </div>
                    <div v-if="column.isFilterType == 9 && newFilter[column.field]" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                        <div v-for="(value, key) in newFilter[column.field]" :key="key" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                            <div>{{ convertTagFormat(key) }} : {{ formatSelectedData(value) }}</div>
                            <img @click="removeGroupFilter(key, column.field)" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                        </div>
                    </div>
                </div>
                <div v-if="newFilter[commonVariable.dtGlobalSearch]" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max filterLiSearch">
                    <div>Search : {{ newFilter[commonVariable.dtGlobalSearch] }}</div>
                    <img @click="removeSingleFilter(commonVariable.dtGlobalSearch)" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] pt-[2px] hover:cursor-pointer dark:w-[16px] dark:h-[16px]" />
                </div>
                <div v-if="newFilter.vendor_name" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                    <div>Vendor Name : {{ formatSelectedData(newFilter.vendor_name) }}</div>
                    <img @click="removeSingleFilter('vendor_name')" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] pt-[2px] hover:cursor-pointer dark:w-[16px] dark:h-[16px]" />
                </div>
                <!-- <div v-if="checkFilterType9(newFilter)" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                    <div v-for="(value, key) in datafilter9" :key="key" :class="newFilter[value] !== '' ? 'flex' : 'hidden'" class="items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                        <div>{{ formateKey(value) }}: {{ formatSelectedData(newFilter[value]) }}</div>
                        <img @click="removeSingleFilter(value)" :src="getImg('selected-list-close', darkModeVal)" alt="close-icon" class="pl-[6px] pt-[2px] hover:cursor-pointer dark:w-[16px] dark:h-[16px]" />
                    </div>
                </div> -->
            </div>
            <div v-else>
                <dataTableLiVue :filterWithScroller="false" :oneClearIcon="true" :saveUpdateChild="true" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../saveUpdateFilterModal.scss';
</style>
