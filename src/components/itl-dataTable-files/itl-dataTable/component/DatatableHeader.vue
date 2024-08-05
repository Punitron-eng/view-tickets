<script setup lang="ts">
import DtTab from '../DtTab.vue';
import CustomizeColumn from '../CustomizeColumn.vue';
import { dataTableVariables as dataVariables } from '../commonVariable';
import { dataTableVariables as dataTableConsts } from '../dataTable';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { defineProps, computed, inject, watch } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
import ExportButton from './ExportButton.vue';
import SearchInput from './SearchInput.vue';
import DateTimeRangePicker from '../../../itl-common-features/itl-date-range-picker/dataTable-dateRange/DateTimeRangePicker.vue';
import BottomSheet from '../../../itl-common-features/itl-bottomSheet/BottomSheet.vue';
import DataTableLi from '../../itl-dataTable-li/dataTableLi.vue';
const storeName = inject('storeName');
const store = useStore();
const { hideAndShowColumn, getCustomizeColumnSize, computedSplitValues, toggleFreezSelectedColumn } = defineProps(['hideAndShowColumn', 'getCustomizeColumnSize', 'computedSplitValues', 'toggleFreezSelectedColumn']);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getViewFiltered = computed(() => store.getters[`${storeName.NAME}/getViewSavedFilteredData`]);
const formatSaveFilterName = computed(() => {
    let tempSaveFilterName = '';
    // if (dataVariables.value.showSelectedFilter.length >= 5) {
    //     tempSaveFilterName = dataVariables.value.showSelectedFilter.slice(0, 4) + '...';
    // } else if (dataVariables.value.showSelectedFilter.length && dataVariables.value.showSelectedFilter.length < 8) {
    //     tempSaveFilterName = dataVariables.value.showSelectedFilter;
    // } else {
    tempSaveFilterName = dataVariables.value.showSelectedFilter;
    // }
    return tempSaveFilterName;
});

const handleExport = () => {
    if (dataVariables.value.router.currentRoute.path.includes('tickets')) {
        dataTableFncs.newExportData('Export_Data');
    } else {
        dataTableFncs.exportData('Export_Data');
    }
};

const isobjectLabel = (value) => {
    if (typeof value === 'object' && value !== null) {
        if ('label' in value && value.label.length > 0 && value != undefined) {
            return true;
        }
    }
};
function isObjectForCheckbox(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
            return true;
        }
    }
    return false;
}
function isObjectForMinMax(value) {
    if (typeof value === 'object' && value !== null) {
        if ('min' in value || 'max' in value) {
            return true;
        }
    }
    return false;
}
function isObjectForRadio(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && !Array.isArray(value.id)) {
            return true;
        }
    }
    return false;
}
interface FormattedDataItem {
    [key: string]: any; // This allows for any string key with any value
    type: string; // This is a fixed property with a string value
}

const formatFilterData = (data: any): FormattedDataItem[] => {
    const formattedData: FormattedDataItem[] = [];
    for (const key in data) {
        if (key != 'id' && key != 'name' && key != 'is_pinned') {
            if (key.length > 0 && typeof data[key] === 'string') {
                formattedData.push({
                    [key]: data[key],
                    type: 'search',
                });
            } else if (isobjectLabel(data[key])) {
                formattedData.push({
                    [key]: data[key],
                    type: 'dateRange',
                });
            } else if (isObjectForMinMax(data[key])) {
                formattedData.push({
                    [key]: data[key],
                    type: 'minMax',
                });
            } else if (isObjectForCheckbox(data[key])) {
                formattedData.push({
                    [key]: data[key],
                    type: 'multiSelect',
                });
            } else if (isObjectForRadio(data[key])) {
                formattedData.push({
                    type: 'dropdownRadio',
                    [key]: data[key],
                });
            }
        }
    }
    return formattedData;
};

// const formatFilterData = (data: any): FormattedDataItem[] => {
//     const formattedData: FormattedDataItem[] = [];
//     for (const key in data) {
//         if (key != 'id' && key != 'name' && key != 'is_pinned') {
//             if (key.length > 0 && typeof data[key] === 'string') {
//                 formattedData.push({
//                     [key]: data[key],
//                     type: 'search',
//                 });
//             } else if (isobjectLabel(data[key])) {
//                 formattedData.push({
//                     [key]: data[key],
//                     type: 'dateRange',
//                 });
//             } else if (isObjectForMinMax(data[key])) {
//                 formattedData.push({
//                     [key]: data[key],
//                     type: 'minMax',
//                 });
//             } else if (isObjectForCheckbox(data[key])) {
//                 formattedData.push({
//                     [key]: data[key],
//                     type: 'multiSelect',
//                 });
//             }
//         }
//     }
//     return formattedData;
// };

watch(
    () => getViewFiltered.value,
    async (value) => {
        if (
            (dataVariables.value.router.currentRoute.params.id && dataVariables.value.saveFilterEditId == null) ||
            (dataVariables.value.router.currentRoute.params.id && dataVariables.value.router.currentRoute.params.id == dataVariables.value.saveFilterEditId)
        ) {
            const selectedSaveFilter = value.find((saveFilter) => saveFilter.id == dataVariables.value.router.currentRoute.params.id);
            const data = {
                id: selectedSaveFilter.id,
                filterArr: formatFilterData(selectedSaveFilter),
                name: selectedSaveFilter.name,
            };
            await dataTableFncs.applySaveFilterData(data);
        }
    }
);
</script>
<template>
    <div class="datatable-custom-features datatable-heading-size">
        <div class="features-outer">
            <div class="features-left-side">
                <div class="flex items-center justify-start gap-2">
                    <slot name="DataTable-header-left-side"> </slot>
                    <div v-if="dataVariables.isUniversalSearchAvail" class="search-outer">
                        <SearchInput @orderSearch="(searchTerm) => dataTableFncs.orderSearchData(searchTerm)" />
                    </div>
                </div>
                <div class="flex gap-2 right-side-gap">
                    <div v-if="dataVariables.isUniversalDateAvail" class="datepicker-outer">
                        <DateTimeRangePicker @updateDate="dataTableFncs.updateDate" :start-date="computedSplitValues" :inline="false"></DateTimeRangePicker>
                    </div>
                    <div v-if="dataVariables.isUniversalFilterAvail" class="cursor-pointer more-filter flex items-center nest-hub-max-outer-filter" @click="dataTableFncs.openModalFilter('filterModal')">
                        <img v-if="!darkModeVal" src="@/assets/images/more-filter.svg" class="more-filter-icon" />
                        <img v-else src="@/assets/images/dark-mode/dark-more-filter.svg" class="more-filter-icon" />
                        <span class="filters nest-hub-max-inner-filter">Filters</span>
                    </div>
                    <div v-if="dataVariables.isCustomizeColumnAvail" class="customize-column-main-section customise-column-left-side">
                        <CustomizeColumn
                            :columns="dataTableConsts.defaultColumns"
                            :size="getCustomizeColumnSize"
                            :toggleFreezSelectedColumn="toggleFreezSelectedColumn"
                            :hideAndShowColumn="hideAndShowColumn"
                            :tempHeaderLoad="dataVariables.showSkeletonInCustomizeColumn"
                        />
                    </div>
                    <div class="more-features-button" @click="dataTableFncs.moreFeatureShowHide()">
                        <img v-if="!darkModeVal" src="@/assets/images/down-arrow.svg" />
                        <img v-else src="@/assets/images/dark-mode/dark-down-arrow.svg" />
                    </div>
                    <div class="header-slots">
                        <div class="leftslot">
                            <slot name="header-left-side"> </slot>
                        </div>
                    </div>
                </div>
            </div>
            <!--Bottom Sheet  -->
            <div class="bottomsheet-outer bottom-sheet-wrapper" :class="dataVariables.modalShow == true ? 'modal-show-div' : ''">
                <div class="backdrop" @click="dataTableFncs.removeBackdrop()"></div>
                <div class="bottom-sheet">
                    <div class="bottomsheet-title">Filters</div>

                    <div class="bottomsheet-list">
                        <ul>
                            <slot name="bottomsheet-top"> </slot>

                            <BottomSheet v-if="dataVariables.isExportBtnAvail" :linkName="'Export'" :imageName="'export-arrow'" @bottomExport="handleExport"> </BottomSheet>
                            <li>
                                <div class="features-right-side">
                                    <div class="select-filter-outer-section">
                                        <div class="filter-dropdown border-none" @click="dataTableFncs.openModalFilter('viewSaveFilterModal')">
                                            <img v-if="!darkModeVal" src="@/assets/images/store-order-view-details.svg" alt="view save filter" />
                                            <img v-else src="@/assets/images/dark-mode/dark-store-order-view-details.svg" alt="view save filter" />
                                            <span class="view-saveFilter w-fit">View : </span>
                                            <span class="view-saveFilter-text">{{ formatSaveFilterName || 'None' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <slot name="bottomsheet"></slot>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-feature-section">
            <div v-if="dataVariables.isSaveFilterAvail" class="features-right-side">
                <div class="select-filter-outer-section">
                    <div class="filter-dropdown" @click="dataTableFncs.openModalFilter('viewSaveFilterModal')">
                        <img v-if="!darkModeVal" src="@/assets/images/store-order-view-details.svg" alt="view save filter" />
                        <img v-else src="@/assets/images/dark-mode/dark-store-order-view-details.svg" alt="view save filter" />
                        <span class="view-saveFilter lg:ml-2">View : </span>
                        <span class="view-saveFilter-text">{{ formatSaveFilterName || 'None' }}</span>
                    </div>
                </div>
            </div>
            <div v-if="dataVariables.isCustomizeColumnAvail" class="customize-column-main-section customise-column-right-side">
                <CustomizeColumn
                    :columns="dataTableConsts.defaultColumns"
                    :size="getCustomizeColumnSize"
                    :toggleFreezSelectedColumn="toggleFreezSelectedColumn"
                    :hideAndShowColumn="hideAndShowColumn"
                    :tempHeaderLoad="dataVariables.showSkeletonInCustomizeColumn"
                />
            </div>
            <div class="rightslot">
                <slot name="header-right-side"></slot>
            </div>
            <ExportButton v-if="dataVariables.isExportBtnAvail" :exportData="handleExport" :darkModeVal="darkModeVal" :isLoading="dataVariables.isExportLoading" />
        </div>
    </div>
    <div class="mx-[18px] dt-li-filter mb-1">
        <DataTableLi
            :filter-with-scroller="true"
            :hideSaveUpdateBtn="true"
            :check-field="dataVariables.filterFields"
            @clearAllFilters="dataTableFncs.resetAllFilters"
            @clearOneFilter="dataTableFncs.clearFilter"
            @saveNewFilters="dataTableFncs.saveEditFiltersDatatable"
        />
    </div>
</template>
<style lang="scss">
.header-slots-bottom-sheet,
.leftslot,
.rightslot {
    display: none;

    @media screen and (max-width: 991px) {
        display: flex !important;
    }
}

.header-slots,
.leftslot,
.rightslot {
    display: flex;

    @media screen and (max-width: 991px) {
        display: none !important;
    }
}

.filter-dropdown {
    @media screen and (max-width: 991px) {
        width: 100% !important;
    }
}
</style>
