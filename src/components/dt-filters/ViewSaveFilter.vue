<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import InputSwitch from 'primevue/inputswitch';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { DARKMODE } from '../../store/dark-mode/constants';
import SaveUpdateFilterModal from './SaveUpdateFilterModal.vue';
import DeleteSaveFilterModal from '@/components/itl-dataTable-files/itl-dataTable/modal/DeleteSaveFilterModal.vue';
import { computed, ref, defineEmits, onBeforeMount, onUnmounted, inject } from 'vue';
import { dataTableVariables as commonVariable, dataTableVariables } from '../itl-dataTable-files/itl-dataTable/commonVariable';

const store = useStore();
const visibleObj = ref();
const route = useRoute();
const checked = ref(false);
const filterInput = ref('');
const emitter = useEmitter();
const updateFilterData = ref();
const updateFilterCheck = ref(false);
const storeName: any = inject('storeName');
const emits = defineEmits(['deleteSaveFilter', 'updatefilterfunData', 'applySaveFilter']);
const getViewFiltered = computed(() => store.getters[`${storeName.NAME}/getViewSavedFilteredData`]); // this is filter list 3rd array in response
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const filteredSaveFilterArray = computed(() => {
    if (filterInput.value) {
        return getViewFiltered.value.filter((saveFilter) => {
            return saveFilter.name.toLowerCase().includes(filterInput.value.toLowerCase());
        });
    }
    getViewFiltered.value.map((element) => {
        for (const keys in element) {
            if (element[keys] === '') {
                delete element[keys];
            }
        }
    });
    return getViewFiltered.value;
});

const deleleFilter = (filterData: any) => {
    const data = {
        filterId: filterData.id,
        filterName: filterData.name,
        filterData: filterData,
    };
    emitter.emit('deleteSaveFilter', data);
};
const openModalFilter = (id: string, name: any, filters: any) => {
    updateFilterCheck.value = true;
    updateFilterData.value = { name, filters, updateFilterCheck };
    store.dispatch(`${storeName.NAME}/updateOpenModal`, id);
    const res = store.getters[`${storeName.NAME}/getOpenModal`];
    visibleObj.value = res;
};
let datafilter9 = ['address_confirmation', 'order_confirmation'];
const checkFilterType9 = (filterData) => {
    for (const key in filterData) {
        if (datafilter9.includes(key)) {
            return true;
        }
    }
    return false;
};
onUnmounted(() => {
    updateFilterCheck.value = false;
});
onBeforeMount(() => {
    const res = store.getters[`${storeName.NAME}/getOpenModal`];
    visibleObj.value = res;
});
const tempDataFilterFun = (data: any) => {
    emits('updatefilterfunData', data);
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
function isObjectForGroupCheckbox(value) {
    if (typeof value === 'object' && value !== null) {
        if (typeof value[Object.keys(value)[0]] === 'object' && value[Object.keys(value)[0]] !== null && !Array.isArray(value[Object.keys(value)[0]]) && Array.isArray(value[Object.keys(value)[0]].id)) {
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
            } else if (isObjectForGroupCheckbox(data[key])) {
                formattedData.push({
                    [key]: data[key],
                    type: 'mutipleArraySelectCheckbox',
                });
            }
        }
    }
    return formattedData;
};

const sendFilterNameKey = (filterData: any, id: string) => {
    const data = {
        id: id,
        filterArr: formatFilterData(filterData),
        name: filterData.name,
    };

    const checkGlobalSearchId = Object.keys(filterData).some((key) => key.includes(dataTableVariables.value.dtGlobalSearchId));

    if (checkGlobalSearchId) {
        store.commit(`${storeName.NAME}/setOrderInput`, filterData[dataTableVariables.value.dtGlobalSearchId]);
        commonVariable.value.orderSearch = filterData[dataTableVariables.value.dtGlobalSearchId];
        emits('applySaveFilter', data);
    }
    emits('applySaveFilter', data);
    store.commit(`${storeName.NAME}/setOpenModalFalse`, 'viewSaveFilterModal');
};
const formateKey = (key: any) => {
    if (key == 'awb') return 'Logistics';
    else if (key == 'dt_status') return 'Status';
    else return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
};
const formatSelectedData = (value: any) => {
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
const checkpin = (filterData: any) => {
    const newPinValue = filterData.is_pinned == '0' ? '1' : '0';
    let data = {
        isUpdate: false,
        filterName: filterData.name,
        filterArr: filterData,
        is_pinned: newPinValue,
    };
    emitter.emit('checkPinId', data);
};
const removeSaveFilter = () => {
    emitter.emit('removeSaveFilter');
};
const clearBox = () => {
    filterInput.value = '';
};
const convertTagFormat = (key) => {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
</script>
<template>
    <div class="view-filters-section">
        <div class="view-filter-input flex justify-between gap-4 md:gap-0 items-center">
            <div class="relative">
                <img src="../../assets/images/save-filter-search.svg" class="save-filter-search" />
                <InputText v-model="filterInput" id="save-filter-input" class="form-control" placeholder="Filter name" />
                <i v-if="filterInput" class="pi pi-times text-[#808B98] mt-[10px] text-sm right-2 absolute hover:cursor-pointer" @click="clearBox"></i>
            </div>
            <div v-if="route.params.id" class="removeFilter text-blue-600 hover:cursor-pointer" @click="removeSaveFilter()">Remove Filter</div>
        </div>
        <div class="view-filter-body" v-if="filteredSaveFilterArray.length <= 0">
            <div>
                <div class="no-record-outer flex flex-col gap-2 justify-center items-center h-[200px] w-[300px] md:w-auto">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
        </div>
        <div class="view-filter-body" v-else>
            <div class="view-filter-data" v-for="(filter, index) in filteredSaveFilterArray" :key="index">
                <div class="filter-name-div">
                    <div class="filter-pin hover:cursor-pointer" v-if="filter.is_pinned == 0" @click="checkpin(filter)">
                        <img class="w-[19px]" v-if="!darkModeVal" src="../../assets/images/column-pin-icon.svg" />
                        <img class="w-[19px]" v-else src="../../assets/images/dark-mode/dark-column-pin-icon.svg" />
                    </div>
                    <div v-else class="filter-pin hover:cursor-pointer" @click="checkpin(filter)">
                        <img class="w-[19px]" v-if="!darkModeVal" src="../../assets/images/SFpin.svg" />
                        <img class="w-[19px]" v-else src="../../assets/images/dark-mode/dark-SFpin.svg" />
                    </div>
                    <div class="filter-name" @click="sendFilterNameKey(filter, filter.id)">
                        {{ filter.name }}
                    </div>
                </div>
                <div class="applied-filter">
                    <div class="flex gap-2 flex-wrap items-center">
                        <!-- <div v-for="(value, key) in filter" :key="key" :class="value != '' ? 'block' : 'hidden'">
                            <div class="filter-list-li flex items-center bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px]" v-if="key != 'id' && key != 'name' && key != 'is_pinned'">
                                <div>{{ formateKey(key) }} : {{ formatSelectedData(value) }}</div>
                            </div>
                        </div> -->
                        <div v-for="(column, index) in commonVariable.dataTableColumns" :key="index" :class="column.isFilterType !== 8 && filter[column.field] ? 'block' : 'hidden'">
                            <div v-if="filter[column.field] && column.isFilterType < 8" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                                <div>{{ column.header }} : {{ formatSelectedData(filter[column.field]) }}</div>
                            </div>
                            <div v-if="column.isFilterType == 9 && filter[column.field]" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                                <div v-for="(value, key) in filter[column.field]" :key="key" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                                    <div>{{ convertTagFormat(key) }} : {{ formatSelectedData(value) }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="filter[commonVariable.dtGlobalSearch]" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max filterLiSearch">
                            <div>Search : {{ filter[commonVariable.dtGlobalSearch] }}</div>
                        </div>
                        <!-- <div v-if="checkFilterType9(filter)" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                            <div v-for="(value, key) in datafilter9" :key="key" :class="filter[value] !== '' ? 'flex' : 'hidden'" class="items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                                <div>{{ formateKey(value) }} : {{ formatSelectedData(filter[value]) }}</div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="filter-actions">
                    <ul>
                        <li class="hover:cursor-pointer hidden">
                            <InputSwitch v-model="checked" />
                        </li>
                        <li>
                            <div v-if="!darkModeVal" class="w-[16px] h-[16px]">
                                <img v-if="$route.params.id == filter.id" class="margin-right w-[16px] h-[16px]" src="@/assets/images/save-filter-tick.svg" alt="checked" />
                            </div>
                            <div v-else class="w-[16px] h-[16px]">
                                <img v-if="$route.params.id == filter.id" class="margin-right w-[16px] h-[16px]" src="@/assets/images/dark-mode/dark-save-filter-tick.svg" alt="checked" />
                            </div>
                        </li>
                        <li class="hover:cursor-pointer" @click="openModalFilter('saveUpdateModal', filter.name, filter)">
                            <img v-if="!darkModeVal" src="../../assets/images/save-filter-edit.svg" />
                            <img v-else src="../../assets/images/dark-mode/dark-save-filter-edit.svg" />
                        </li>
                        <li @click="deleleFilter(filter)" class="hover:cursor-pointer">
                            <img v-if="!darkModeVal" src="../../assets/images/save-filter-delete-icon.svg" />
                            <img v-else src="../../assets/images/dark-mode/dark-save-filter-delete-icon.svg" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <DialogView id="update-modal" :draggable="false" dismissableMask v-model:visible="visibleObj.saveUpdateModal" modal header="">
        <SaveUpdateFilterModal typeOfModal="UpdateModal" :showSaveUpdateFilterModal="true" :propsData="updateFilterData" :updated-from="false" @updatefilterfunData="tempDataFilterFun" @closeModal="visibleObj.saveUpdateModal = false" />
    </DialogView>
    <DeleteSaveFilterModal />
</template>
<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#view-save-filter-modal {
    @media (min-width: 1280px) {
        max-width: 1232px;
        width: 1232px;
        min-height: fit-content;
        background: #fff;
    }

    @media (min-width: 768px) and (max-width: 1279px) {
        max-width: 720px;
        width: 720px;
    }

    &.p-dialog {
        .p-dialog-content {
            padding: 0;
        }

        .p-dialog-header {
            padding: 16px 24px 15px 24px;

            @include theme() {
                border-bottom: 1px solid theme-get('modal-header-border-bottom');
            }
        }
    }

    .p-dialog-header-icons {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 16px;
        height: 16px;

        .p-link {
            box-shadow: none !important;
        }

        .p-dialog-header-icon {
            color: black;
            background-color: transparent !important;
            width: 16px;
            height: 16px;
            top: 0px !important;

            .p-icon {
                width: 16px;
                height: 16px;
            }
        }
    }

    .view-filters-section {
        padding: 24px 24px 50px;
        max-height: 500px;
        // overflow-y: auto;

        @media (max-width: 767px) {
            padding: 0;

            .view-filter-input {
                margin: 16px;
            }
        }

        .view-filter-input {
            position: relative;

            .save-filter-search {
                position: absolute;
                left: 12px;
                top: 9px;
            }
        }

        .p-inputtext:enabled:focus {
            box-shadow: none;
        }

        .p-inputtext {
            &.form-control {
                width: 320px;
                height: 34px;

                @include theme() {
                    border: 1px solid theme-get('input-border-clr');
                }

                padding: 9px 30px 9px 38px !important;
                border-radius: 4px;

                @media (max-width: 767px) {
                    width: 180px;
                }
            }
        }

        .view-filter-body {
            padding-top: 16px;

            @media (max-width: 767px) {
                padding-top: 0;
            }

            .view-filter-data {
                display: flex;
                align-items: flex-start;
                padding: 12px 16px 12px 24px;

                @media (max-width: 767px) {
                    padding: 16px;
                    display: block;
                    position: relative;
                }

                .py-\[16px\] {
                    padding-top: 0;
                    padding-bottom: 0;
                }

                &.view-filter-active {
                    background: #f7faff;
                }

                .filter-name-div {
                    display: flex;
                    align-items: flex-start;
                    gap: 0 16px;

                    @media (min-width: 1280px) {
                        max-width: 297px;
                        min-width: 297px;
                        padding-right: 16px;
                        word-break: break-all;
                    }

                    @media (min-width: 768px) and (max-width: 1200px) {
                        width: 35%;
                        padding-right: 16px;
                    }

                    @media (max-width: 767px) {
                        margin-bottom: 12px;
                        max-width: 70%;
                    }

                    .filter-pin {
                        width: 16px;
                        min-width: 16px;
                        max-width: 16px;

                        @media (max-width: 767px) {
                            margin-top: 2px;
                        }
                    }

                    .filter-name {
                        font-family: $interRegular;
                        font-size: 13px;
                        cursor: pointer;

                        @include theme() {
                            color: theme-get('black-800');
                        }
                    }
                }

                .applied-filter {
                    @media (min-width: 1280px) {
                        width: 780px;
                    }

                    @media (min-width: 768px) and (max-width: 1200px) {
                        width: 50%;
                        padding-right: 16px;
                    }
                }

                .filter-actions {
                    margin-left: auto;

                    @media (max-width: 767px) {
                        position: absolute;
                        top: 18px;
                        right: 16px;
                    }

                    @media (min-width: 768px) and (max-width: 1200px) {
                        width: 15%;
                    }

                    .p-focus {
                        background-color: none !important;
                    }

                    .p-inputswitch {
                        width: 28px;
                        height: 16px;
                    }

                    .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
                        background: #006af4;
                    }

                    .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
                        transform: translateX(10px);
                    }

                    .p-inputswitch.p-focus .p-inputswitch-slider {
                        box-shadow: none;
                    }

                    .p-inputswitch .p-inputswitch-slider:before {
                        width: 14px;
                        height: 14px;
                        left: 1px;
                        margin-top: -7px;
                    }

                    ul {
                        display: flex;
                        align-items: center;
                        gap: 0 16px;

                        li {
                            height: 16px;
                        }
                    }
                }
            }
        }
    }
}

.darkTheme #view-save-filter-modal {
    background-color: #3d3d3d !important;
}

.darkTheme #view-save-filter-modal .p-dialog-header-icons .p-dialog-header-icon {
    color: #dfdfdf;
}
</style>
