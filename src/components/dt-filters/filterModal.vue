<!--1 = checkbox                    / isSearchAvail for the search icon //  isIconAvail for the icon  multiSelect
    2 = search only search
    3 = radio button radio
    4 = min max  minMax
    5 = date range  dateRange
    6 = search wala drop down         
    9 = mutiple array select checkbox          -->
<template>
    <div class="h-4/5">
        <!-- header section  -->
        <div class="flex flex-col justify-between w-full header-div sticky top-0 z-[88]">
            <div class="flex justify-between items-center px-4 pt-4 md:pt-0">
                <div>
                    <p class="header">All Filters</p>
                </div>
                <div class="flex gap-2">
                    <button
                        class="bg-[#1279ff] px-[12px] py-[6px] w-[68px] text-[12px] text-white rounded-[6px]"
                        :class="{ 'hover:cursor-not-allowed': Object.values(dataVariables.searchFilterValidationResult).includes(false) }"
                        @click="applyFilter()"
                    >
                        Apply
                    </button>
                    <button @click="closeFilterModal('filterModal')">
                        <img :src="getImg('close-icon', darkModeVal)" />
                    </button>
                </div>
            </div>
            <div class="px-4">
                <dataTableLi :all-clear-button="true" class="py-[16px]" :filter-with-scroller="true" @clearOneFilter="dataTableList" ref="dataTableLiRef" />
            </div>
        </div>
        <!-- header section Ends here  -->
        <div class="flex flex-col main-container p-4 md:p-0 !max-h-[80vh] min-h-fit md:overflow-hidden overflow-auto">
            <div>
                <div class="left-filter-labels pt-3 hidden md:flex h-[82vh] w-[220px] flex-col gap-[2px] pl-4 border-r-[1px] dark:border-r-[#4d4d4d] fixed overflow-auto">
                    <div v-for="(id, keys) in newTempData" :key="keys">
                        <div v-if="id.isFilterType != 9" class="w-[168px] p-2 lists hover:cursor-pointer" :id="id.field" @click="handleActive(id.field)">
                            {{ id.header }}
                        </div>
                        <div v-else class="w-[168px] p-2 lists hover:cursor-pointer" @click="handleActiveFilter9(id.field)" :id="id.field">
                            <FilterDropdownHeading :tempData="id.values" header="Buyer Intended" />
                        </div>
                    </div>
                    <div v-if="groupNewTempData.length > 0" class="w-[168px] p-2 lists hover:cursor-pointer">
                        <FilterDropdownHeading :tempData="groupNewTempDataHeading" :header="dataVariables.groupByColumnHeading" class="font-interSemiBold" />
                    </div>
                </div>
                <div class="right-filter-content pt-3 flex flex-col pb-[28px] md:h-[80vh] md:overflow-auto overflow-hidden md:ml-[220px]">
                    <div
                        class="first:mt-[0px] last:border-none md:pl-[20px] md:px-3 md:pb-3 md:pt-2 md:mt-[24px] right-lists border-b-[1px] dark:border-b-[#4d4d4d]"
                        :class="fieldIdRefs[id.field]?.value ? ' mt-[2px]' : 'mt-[2px]'"
                        :id="id.field + '_list'"
                        v-for="(id, keys) in newTempData"
                        :key="keys"
                    >
                        <div class="flex justify-between items-center bg-[#f1f3f5] dark:bg-[#2d2d2d] md:bg-transparent px-4 md:px-0 py-2">
                            <span class="right-filter-header pl-[14px]">{{ id.header }}</span>
                            <img v-if="!fieldIdRefs[id.field]?.value" src="@/assets/images/drodown-arrow-down.svg" @click="showHide(id.field)" class="flex md:hidden" />
                            <img v-else src="@/assets/images/arrow-up.svg" @click="showHide(id.field)" class="flex md:hidden" />
                        </div>
                        <div
                            class="flex text-[13px] w-[80%] md:w-full pb-[20px] pt-[20px] md:pt-[0px]"
                            :class="(fieldIdRefs[id.field]?.value ? ' md:pb-[24px] mt-[12px]' : '  md:pb-[0px] mt-[0px]', id.isFilterType == 9 ? 'pl-[0px] mt-[0px]' : ' pl-[14px]')"
                        >
                            <div v-if="id.isFilterType == 1" :id="id.field" v-show="fieldIdRefs[id.field].value">
                                <DTCheckboxButton :id="id" :modalRefs="modalRefs[id.field]" />
                            </div>
                            <div v-if="id.isFilterType == 2" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                                <DTSearchInput v-model="modalRefs" :placeHolder="id?.placeholder || 'Search'" :id="id" />
                            </div>
                            <div v-if="id.isFilterType == 3" :id="id.field" v-show="fieldIdRefs[id.field].value">
                                <DTRadioButton v-model="modalRefs" :id="id" />
                            </div>
                            <div v-if="id.isFilterType == 4" :id="id.field" v-show="fieldIdRefs[id.field].value">
                                <DTMinMaxInput :modalRefs="modalRefs[id.field]" :id="id" @updateMinMax="updateMinMax" />
                            </div>
                            <div v-if="id.isFilterType == 5" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                                <div class="flex flex-wrap gap-1 items-center">
                                    <DTDatePicker v-model="modalRefs" :datefilter="datefilter" :id="id" :showCustomDate="showCustomDate" :changeDate="changeDate" />
                                </div>
                            </div>
                            <div v-if="id.isFilterType == 6" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                                <DTMultiSelect v-model="modalRefs" :id="id" />
                            </div>
                            <div v-if="id.isFilterType == 7" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                                <DTMultiSelectCheckbox v-model="modalRefs" :id="id" @update="ticketDepartmentApiCall" />
                            </div>
                            <div v-if="id.isFilterType == 9" :id="id.field" v-show="fieldIdRefs[id.field]?.value">
                                <DTMutiArrayCheckbox v-model="modalRefs[id.field]" :id="id" @get-group-checkbox-data="getGroupCheckboxData" />
                            </div>
                        </div>
                    </div>
                    <GroupCloumn v-if="groupNewTempData.length > 0" :groupByColumn="groupNewTempData" :fieldIdRefs="fieldIdRefs" v-model="modalRefs" :Heading="dataVariables.groupByColumnHeading" :showHide="showHide" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import getImg from '../../util/getImg';
import { useToast } from 'primevue/usetoast';
import GroupCloumn from './component/GroupColumn.vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import DTDatePicker from './component/DTDatePicker.vue';
import DTMinMaxInput from './component/DTMinMaxInput.vue';
import DTSearchInput from './component/DTSearchInput.vue';
import DTRadioButton from './component/DTRadioButton.vue';
import DTMultiSelect from './component/DTMultiSelect.vue';
import DTCheckboxButton from './component/DTCheckboxButton.vue';
import DTMutiArrayCheckbox from './component/DTMutiArrayCheckbox.vue';
import { endOfMonth, startOfMonth, subMonths, subDays } from 'date-fns';
import DTMultiSelectCheckbox from './component/DTMultiSelectCheckbox.vue';
import FilterDropdownHeading from './component/FilterDropdownHeading.vue';
import dataTableLi from '../itl-dataTable-files/itl-dataTable-li/dataTableLi.vue';
import { dataTableVariables as dataVariables } from '../itl-dataTable-files/itl-dataTable/commonVariable';
import { defineProps, ref, onBeforeMount, watch, defineEmits, inject, computed, reactive, onMounted, onUnmounted } from 'vue';
const fieldIdRefs = {};
const toast = useToast();
const store = useStore();
const modalRefs = ref({});
const newTempData = ref();
const groupNewTempData = ref();
const groupNewTempDataHeading = ref();
const showCustomDate = ref({});
const dataTableLiRef = ref(null);
const storeName = inject('storeName');
const props = defineProps(['visible', 'tempData']);
const DataTableColumns = inject('dataTabelColumnData');
import { useEmitter } from '@nguyenshort/vue3-mitt';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
const emitter = useEmitter();
const emit = defineEmits(['filterModalValue', 'singlefilterDelete']);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const isObjectEmpty = computed(() => {
    for (const key in modalRefs.value) {
        if (modalRefs.value.hasOwnProperty(key) && modalRefs.value[key] != null && modalRefs.value[key] !== '') {
            return false;
        }
    }
    return true;
});
onBeforeMount(async () => {
    newTempData.value = DataTableColumns.value.filter((res) => res.isFilterType !== 8 && res.isFilterType != null);
    makeShowHideRefs(newTempData.value);
    dependentFilter(); //added by bhavna
});
onMounted(() => {
    document.body.classList.add('filter-modal-open');
});
onUnmounted(() => {
    document.body.classList.remove('filter-modal-open');
});
//added by bhavna
const dependentFilter = async () => {
    if (modalRefs.value[dataVariables.value.dependentFilters[0]].value == '') {
        const targetValue = dataVariables.value.dependentFilters[1];
        const matchIndex = newTempData.value.findIndex((item) => item['field'] === targetValue);
        newTempData.value[matchIndex]['values'] = ref([]);
    } else if (modalRefs.value[dataVariables.value.dependentFilters[0]].value != '') {
        if (dataVariables.value.router.currentRoute.path.includes('tickets')) {
            await store.commit(`${storeName.NAME}/setTicketDepartmentId`, modalRefs.value[dataVariables.value.dependentFilters[0]].id);
        }
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
};
//added by bhavna
const triggerWatch = ref(false);
watch(
    () => DataTableColumns.value,
    () => {
        newTempData.value = DataTableColumns.value.filter((res) => res.isFilterType !== 8 && res.isFilterType != null);
        if (triggerWatch.value) {
            makeShowHideRefs(newTempData.value);
        }
        // if (!dataVariables.value.router.currentRoute.path.includes('tickets')) {
        //     makeShowHideRefs(newTempData.value);
        // }
    }
);
emitter.on('clearBtnFilter', (data) => {
    triggerWatch.value = true;
});
emitter.on('clearGroupFilter', (data) => {
    triggerWatch.value = true;
});
const updateMinMax = (data, field) => {
    modalRefs.value[field] = data;
};

// DataTable li Delete function
function dataTableList(data) {
    emit('singlefilterDelete', data);
}
// closing the filter modal
const closeFilterModal = (id) => {
    store.commit(`${storeName.NAME}/setOpenModalFalse`, id);
};
// formatting the date
const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-CA', options).format(date);
};
// transforming the date data
let datefilter = [
    { id: 'all', label: 'All', range: `${formatDate(new Date('2017-01-01'))} ${formatDate(new Date())}`, state: false },
    { id: 'today', label: 'Today', range: `${formatDate(new Date())} ${formatDate(new Date())}`, state: false },
    { id: 'yesterday', label: 'Yesterday', range: `${formatDate(subDays(new Date(), 1))} ${formatDate(subDays(new Date(), 1))}`, state: false },
    { id: 'last_7_days', label: 'Last 7 Days', range: `${formatDate(subDays(new Date(), 6))} ${formatDate(new Date())}`, state: false },
    { id: 'last_30_days', label: 'Last 30 Days', range: `${formatDate(subDays(new Date(), 29))} ${formatDate(new Date())}`, state: false },
    { id: 'this_month', label: 'This Month', range: `${formatDate(startOfMonth(new Date()))} ${formatDate(endOfMonth(new Date()))}`, state: false },
    { id: 'last_month', label: 'Last Month', range: `${formatDate(startOfMonth(subMonths(new Date(), 1)))} ${formatDate(endOfMonth(subMonths(new Date(), 1)))}`, state: false },
    { id: 'custom_range', label: 'Custom Range', range: `${formatDate(new Date())} ${formatDate(new Date())}`, state: false },
];
// filterValue transforming value
function transformDateData({ id, value, label }) {
    const tempDateFilter = [...datefilter];
    if (id === 'custom_range') {
        const index = tempDateFilter.findIndex((filter) => filter.id === 'custom_range');
        tempDateFilter[index].range = value;
        datefilter = tempDateFilter;
        return {
            selectedDate: value,
            selectedLabel: id,
            label,
        };
    }
    if (id != '') {
        const filteredDate = tempDateFilter.find((res) => res.id === id);
        return {
            selectedDate: filteredDate.range,
            selectedLabel: filteredDate.id,
            label: filteredDate.label,
        };
    }
}
// transforming the date data filter type 6
const transformDateDataFilterType6 = (data) => {
    return data.filterValue.id.length == 0 ? null : data.filterValue.id.map((id) => data.values.find((res) => res.id == id));
};
//  for the filter type 9
const checkFilter9 = (data) => {
    return data.length == 0 ? false : true;
};
const transformDateDataFilterType9 = (data, itemValue) => {
    const filterData = data.id.map((id, index) => {
        const value = data.value[index];
        const indexValue = data.index[index];
        return [`${id},${value},${indexValue}`, true];
    });
    return Object.fromEntries(filterData);
};
const getGroupCheckboxData = (data, field) => {
    modalRefs.value[field] = data;
};
//  show hide function in mobile screens
const makeShowHideRefs = () => {
    // assign the fieldIdRefs for the Mobile screens show and hide
    newTempData.value.forEach((item) => {
        fieldIdRefs[item.field] = ref(true);
    });
    // Filter out the groupByColumn from the NewTempData
    const filteredData = newTempData.value.filter((res) => !dataVariables.value.groupByColumn.includes(res.field));

    groupNewTempData.value = newTempData.value.filter((res) => dataVariables.value.groupByColumn.includes(res.field));
    // reassign the FilterValue to the NewTempData
    newTempData.value = filteredData;
    // reassign the FilterValue to the ModalRefs
    newTempData.value.forEach((item) => {
        if (item.isFilterType == 1) {
            modalRefs.value[item.field] = item.filterValue !== null ? Object.fromEntries(item.filterValue.id.map((id, index) => [`${id},${item.filterValue.value[index]}`, true])) : ref([]);
        } else if (item.isFilterType == 4) {
            modalRefs.value[item.field] =
                item.filterValue !== null && item.filterValue !== ''
                    ? ref(item.filterValue)
                    : ref({
                          min: '',
                          max: '',
                      });
        } else if (item.isFilterType == 5) {
            modalRefs.value[item.field] = item.filterValue !== null ? ref(transformDateData(item.filterValue)) : ref();
            showCustomDate.value[item.field] = ref(false);
        } else if (item.isFilterType == 6) {
            modalRefs.value[item.field] = transformDateDataFilterType6(item) != null ? ref(transformDateDataFilterType6(item)) : ref();
        } else if (item.isFilterType == 7) {
            // !Array.isArray(state.allFilterData.delivery_warehouse.value)
            modalRefs.value[item.field] = item.filterValue !== null && !Array.isArray(item.filterValue.value) ? ref(item.filterValue) : ref({ id: item.filterValue.id[0], value: item.filterValue.value[0] });
        } else if (item.isFilterType == 9) {
            // modalRefs.value[item.field] = checkFilter9(item.filterValue) ? ref(transformDateDataFilterType9(item.filterValue, item.values)) : ref({});
            const tempData = item.filterValue;
            const newData = {};

            for (const key in tempData) {
                if (tempData.hasOwnProperty(key)) {
                    const ids = tempData[key].id;
                    const values = tempData[key].value;
                    newData[key] = ids.map((id, index) => `${id},${values[index]}`);
                }
            }
            modalRefs.value[item.field] = item.filterValue !== null ? newData : ref([]);
        } else {
            modalRefs.value[item.field] = item.filterValue !== null ? ref(item.filterValue) : ref();
        }
    });
    groupNewTempDataHeading.value = groupNewTempData.value.map((item) => {
        modalRefs.value[item.field] = ref(item.filterValue ?? null);
        return { heading: item.header };
    });
};
// applying the filter fnction
const applyFilter = () => {
    try {
        if (!Object.values(dataVariables.value.searchFilterValidationResult).includes(false)) {
            const newArr = Object.entries(modalRefs.value).map(([key, value]) => ({ key, value }));
            const typeMapping = { 1: 'multiSelect', 2: 'search', 3: 'radio', 4: 'minMax', 5: 'dateRange', 6: 'multiSelect', 7: 'dropdownRadio', 9: 'mutipleArraySelectCheckbox' };
            const result = [];
            let temp = [];
            const newtemp = [];
            let minMax = false;
            newTempData.value = [...newTempData.value, ...groupNewTempData.value];

            newTempData.value.forEach((item) => {
                newArr.forEach(({ key, value }) => {
                    if (item.field === key && typeMapping[item.isFilterType] && value !== undefined) {
                        if (item.isFilterType == 4) {
                            if (value.min !== '' && value.max !== '') {
                                if (value.min == 0 || value.max == 0) {
                                    const tempData = { minmax: true };
                                    result.push(tempData);
                                } else if (Number(value.min) > Number(value.max)) {
                                    const tempData = { minValue: true };
                                    result.push(tempData);
                                } else {
                                    result.push({ type: typeMapping[item.isFilterType], [key]: value });
                                }
                            } else if ((value.min != '' && value.max == '') || (value.min == '' && value.max != '')) {
                                minMax = true;
                                toast.add({ severity: 'error', detail: 'Please Enter Min and Max Amount Both!', life: 3000 });
                            } else {
                                result.push({ type: typeMapping[item.isFilterType], [key]: value });
                            }
                        } else if (!item.isIconAvail && item.isFilterType == 6) {
                            if (Array.isArray(value)) {
                                const res = value.map((res) => `${res.id},${res.value}`);
                                temp.push(...res);
                                result.push({ type: typeMapping[item.isFilterType], [key]: temp });
                                temp = [];
                            }
                        } else if (item.isIconAvail && item.isFilterType == 6) {
                            if (Array.isArray(value)) {
                                const res = value.map((res) => `${res.id},${res.value}`);
                                newtemp.push(...res);
                                result.push({ type: typeMapping[item.isFilterType], [key]: newtemp });
                            }
                        } else if (item.isFilterType == 1) {
                            const filteredData = Object.entries(value).filter(([key, value]) => {
                                return value === true;
                            });
                            if (Array.isArray(Object.keys(value))) {
                                result.push({ type: typeMapping[item.isFilterType], [key]: filteredData.map((res) => res[0]) });
                            }
                        } else if (item.isFilterType == 9) {
                            const filteredData = value;
                            if (Array.isArray(Object.keys(value))) {
                                result.push({ type: typeMapping[item.isFilterType], [key]: filteredData });
                            }
                        } else {
                            result.push({ type: typeMapping[item.isFilterType], [key]: value });
                            if (key == dataVariables.value.dtGlobalSearchId) {
                                store.commit(`${storeName.NAME}/setOrderInput`, value);
                                dataVariables.value.orderSearch = value;
                            }
                        }
                    }
                });
            });

            const showToast = result.filter((Res) => Res.minValue);
            const showToastForMin = result.filter((Res) => Res.minmax);

            if (isObjectEmpty.value) {
                toast.add({ severity: 'error', detail: 'At least one filter should be applied.', life: 3000 });
                throw new Error('At least one filter should be applied.');
            } else if (showToast.length > 0) {
                toast.add({ severity: 'error', detail: 'Min amount should not be greater than max!', life: 3000 });
                throw new Error('Min amount should not be greater than max!');
            } else if (showToastForMin.length > 0) {
                toast.add({ severity: 'error', detail: 'Min amount or Max Amount should not be 0', life: 3000 });
                throw new Error('Min amount or Max Amount should not be 0');
            } else if (!minMax) {
                emit('filterModalValue', result);
                store.commit(`${storeName.NAME}/setOpenModalFalse`, 'filterModal');
            }
        }
    } catch (error) {
        console.error('An error occurred during the applyFilter process:', error);
        // Remove groupNewTempData from newTempData in case of an error
        newTempData.value = newTempData.value.filter((item) => !groupNewTempData.value.includes(item));
    }
};

// show hide function in mobile screens
const showHide = (id) => {
    fieldIdRefs[id].value = !fieldIdRefs[id].value;
};
// handle active label for the filters type 9
const handleActiveFilter9 = (id) => {
    Array.from(document.getElementsByClassName('lists')).forEach((element) => element.classList.remove('active-list'));
    const activeDiv = document.getElementById(id);
    activeDiv.classList.add('active-list');
    // handleRightActive(`${id}_list`); // for highlighting the active filter list on right side
    scrollToElement(`${id}_list`);
};
// handle active label for the filters
const handleActive = (id) => {
    Array.from(document.getElementsByClassName('lists')).forEach((element) => element.classList.remove('active-list'));
    const activeDiv = document.getElementById(id);
    activeDiv.classList.add('active-list');
    Array.from(document.getElementsByClassName('right-lists')).forEach((element) => element.classList.remove('active-list'));
    const activeDivRight = document.getElementById(id + '_list');
    activeDivRight.classList.add('active-list');
    // handleRightActive(`${id}_list`); // for highlighting the active filter list on right side
    // scrollToElement(`${id}_list`);
    const rightActiveDiv = document.getElementById(id + '_list');
    const scrollableContainer = document.querySelector('.right-filter-content');
    if (rightActiveDiv && scrollableContainer) {
        const elementPosition = rightActiveDiv.offsetTop - scrollableContainer.offsetTop;
        const offsetPosition = elementPosition - 24;
        if (rightActiveDiv.offsetTop === scrollableContainer.offsetTop) {
            scrollableContainer.style.marginTop = '24px';
        } else {
            scrollableContainer.style.marginTop = '';
        }
        scrollableContainer.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};
// showing th active filter list in right side
const handleRightActive = (id) => {
    // Array.from(document.getElementsByClassName('right-lists')).forEach((element) => element.classList.remove('right-active-list'));
    // const rightactiveDiv = document.getElementById(id);
    // rightactiveDiv?.classList.add('right-active-list');
    scrollToElement(`${id}_list`);
};
// scrolling to the active filter list in right side
const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
        // element.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'center', // Align the top of the element with the top of the visible area of the scrollable ancestor
        //     inline: 'nearest',
        // });
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
// for showing the custom date range
const changeDate = (id, field, selectedId) => {
    showCustomDate.value[field] = id == `custom_range_${field}`;
    const tempDateFilter = [...datefilter];
    if (selectedId != '') {
        if (selectedId === 'custom_range' && modalRefs.value[field]) {
            const filteredDate = tempDateFilter.find((res) => res.id === selectedId);
            modalRefs.value[field] = {
                selectedDate: modalRefs.value[field].selectedDate,
                selectedLabel: filteredDate.id,
                label: filteredDate.label,
            };
        } else {
            const filteredDate = tempDateFilter.find((res) => res.id === selectedId);
            modalRefs.value[field] = {
                selectedDate: filteredDate.range,
                selectedLabel: filteredDate.id,
                label: filteredDate.label,
            };
        }
    }
};
</script>
<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#filter-modal.p-dialog {
    @include theme() {
        background-color: theme-get('background') !important;
    }
}
#ticket_department {
    #filter-modal {
        background-color: transparent !important;
    }
}
#filter-modal {
    .p-dialog-header {
        display: none;
    }

    @media (min-width: 340px) and (max-width: 470px) {
        .header-div {
            padding-top: 0px;
            // position: fixed !important;
        }

        .main-container {
            //margin-top: 65px !important
        }
    }

    @media (min-width: 470px) {
        .header-div {
            padding-top: 16px;
            // position: fixed !important;
        }
    }

    .main-container {
        // min-height: 100vh;
        // margin-top: 85px;
        // background-color: #ffff !important;
        @include theme() {
            background-color: theme-get('background') !important;
        }

        @media (max-width: 767px) {
            // margin-top: 90px;
            height: 100vh;
        }

        .pi {
            font-size: 10px;
            padding-top: 3px;
        }
    }

    input[type='radio'],
    input[type='checkbox'] {
        cursor: pointer;
    }

    input[type='radio'] {
        transform: scale(1.1);
    }
}

#filter-modal_list {
    @include theme() {
        background-color: theme-get('background') !important;
    }
}

input[type='number'] {
    -moz-appearance: textfield;
}

.p-dropdown-header {
    height: 40px;
    padding: 0px !important;

    .p-dropdown-filter-container {
        input {
            padding: 8px 8px 8px 2rem;
        }
    }
}

.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon {
    left: 0.75rem !important;
}

.p-multiselect-panel .p-multiselect-header,
.p-inputtext,
.p-multiselect-items-wrapper,
.p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
    @include theme() {
        background-color: theme-get('background') !important;
    }
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus {
    background: transparent !important;
}

#filter-modal {
    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight {
        @include theme() {
            background-color: theme-get('multiselect-checkbox-bg') !important;
        }
    }

    .p-checkbox .p-checkbox-box .p-checkbox-icon {
        @include theme() {
            color: theme-get('multiselect-checkbox-tick') !important;
        }
    }

    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover,
    .p-dropdown:not(.p-disabled).p-focus {
        @include theme() {
            border-color: theme-get('border-black-400') !important;
        }
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
        @include theme() {
            background-color: theme-get('dt-mutiselect-focus');
        }
    }
}

#filter-modal .p-multiselect-panel .p-multiselect-header .p-multiselect-close:focus {
    box-shadow: none;
}

#filter-modal {
    .dp--menu-wrapper {
        z-index: 50 !important;
    }

    .p-multiselect-panel {
        .p-inputtext {
            padding: 0.25rem 0.75rem !important;
            padding-left: 1.75rem !important;
        }
    }
}

.left-filter-labels {
    height: calc(100% - 95px);
}

.header-div {
    @include theme() {
        background-color: theme-get('background');
    }
}

.main-container {
    font-family: $interRegular;
    font-size: 12px;

    @include theme() {
        color: theme-get('black-800');
    }
}

.amount-filter {
    .min-filter-input,
    .max-filter-input {
        background: transparent !important;

        @include theme() {
            border: 1px solid theme-get('border-black-500');
        }
    }
}

// #shipping_awb {
#filter-modal .p-inputtext {
    padding: 4px 8px !important;
}

// }
// .right-active-list {
//     border: 1px solid #cde2fd !important;
//     border-radius: 4px;
// }
// input start
.p-inputtext:enabled:focus {
    box-shadow: none !important;
}

// input end
#filter-modal {
    .p-multiselect-filter-icon {
        right: 0 !important;
        left: 0.5rem !important;
    }
}

#filter-modal {
    .p-multiselect-close {
        display: none;
    }
}

// multi select start
#filter-modal {
    .p-multiselect-item {
        white-space: normal;
        align-items: start;
    }

    .p-checkbox .p-checkbox-box {
        border-radius: 2px;
    }

    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
        border-color: transparent;
    }

    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
        background-color: blue;
        border: blue;
    }

    .p-multiselect-panel .p-component {
        position: relative !important;
    }

    .p-inputtext {
        border-radius: 4px;
    }

    .p-inputtext:enabled:hover {
        border-color: #dfdfdf;
    }

    .p-checkbox-box {
        .p-focus {
            @include theme() {
                border-color: theme-get('checkbox-color') !important;
            }
        }

        .p-highlight {
            @include theme() {
                border-color: theme-get('checkbox-color') !important;
                background-color: theme-get('checkbox-color') !important;
            }
        }
    }

    .p-checkbox {
        align-items: center !important;

        .p-highlight {
            @include theme() {
                border-color: theme-get('checkbox-color');
                background-color: theme-get('checkbox-color');
            }
        }

        .p-checkbox-box {
            width: 16px !important;
            height: 16px !important;
        }
    }

    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
        box-shadow: none !important;
        border-color: #dfdfdf;
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
        @include theme() {
            background-color: #d0d6dc;
        }
    }

    .p-multiselect:not(.p-disabled).p-focus {
        @include theme() {
            border: 1px solid theme-get('border-black-400') !important;
            border-color: theme-get('border-black-400') !important;
            box-shadow: none !important;
        }
    }

    .p-multiselect:not(.p-disabled):hover {
        @include theme() {
            border: 1px solid theme-get('border-black-400') !important;
            border-color: theme-get('border-black-400') !important;
        }
    }

    .p-multiselect-panel {
        min-width: 200px !important;
        max-width: 279px !important;
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item {
        @include theme() {
            color: theme-get('black-700') !important;
        }
    }

    .p-multiselect .p-multiselect-label {
        padding: 4px 0.5rem !important;
    }

    .p-multiselect {
        height: 32px !important;
    }

    .p-multiselect-panel .p-multiselect-header {
        height: 34px !important;
        padding: 20px !important;
    }

    .p-multiselect-panel .p-multiselect-items {
        padding: 0 0 !important;
    }

    .p-multiselect-panel {
        max-width: 226px !important;
        // height: 200px;
        // overflow: hidden;
        // }
    }

    .p-multiselect-items-wrapper {
        height: auto;
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
        // background-color: #dfdfdf;
        background-color: var(--light-400) !important;
    }

    .p-checkbox .p-checkbox-box.p-highlight {
        border-color: blue;
        background-color: blue;
    }

    .p-multiselect:not(.p-disabled):hover {
        border-color: #dfdfdf;
    }

    .p-multiselect:not(.p-disabled).p-focus {
        box-shadow: none;
        border-color: #dfdfdf;
    }
}

.darkTheme #filter-modal {
    .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
        background-color: var(--dark-400) !important;
    }
}

#filter-modal .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight {
    border-color: blue;

    svg {
        path {
            width: 16px;
            height: 16px;
        }
    }
}

#filter-modal .p-multiselect-panel .p-multiselect-header .p-multiselect-close:enabled:hover {
    background: transparent;
}

// multi select ends
#status,
#shipping_awb {
    .p-multiselect {
        border-radius: 4px !important;
        height: 32px !important;

        .p-multiselect-label {
            padding: 4px 12px !important;
        }
    }
}

.right-filter-header {
    font-family: $interSemiBold;
    font-size: 12px;
    text-transform: uppercase;

    @include theme() {
        color: theme-get('black-800') !important;
    }
}

.darkTheme .left-filter-labels .active-list {
    background-color: #212121 !important;
}

.left-filter-labels .active-list {
    background-color: #f1f3f5;
    font-family: $interSemiBold;
    border-radius: 4px;
    font-size: 13px;

    // color: #1d252b;
    @include theme() {
        color: theme-get('black-800');
    }
}

.right-filter-header {
    font-family: $interSemiBold;
    color: #1d252b;

    @include theme() {
        // color: theme-get('black-700')
    }

    font-size: 12px;
}

.right-filter-content {
    @media screen and (max-width: 767px) {
        width: 100%;
    }

    // border-bottom: 1px solid #e9ebef;
}

.p-dialog .p-dialog-header {
    padding: 16px 24px !important;
}

.p-dialog {
    @media screen and (max-width: 767px) {
        padding: 0px !important;
        max-height: 85vh !important;
    }
}

#filter-modal {
    .p-dialog-header {
        padding: 8px !important;

        @media screen and (max-width: 767px) {
            padding: 0px !important;
        }

        @include theme() {
            background-color: theme-get('background');
        }
    }

    .p-dialog-content {
        @include theme() {
            background-color: theme-get('background') !important;
        }
    }
}

#filter-modal {
    @media screen and (max-width: 767px) {
        .p-dialog-content {
            min-height: auto;
        }
    }
}

#filter-modal .p-dialog-header-icons {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 95 !important;

    .p-link {
        box-shadow: none !important;
    }

    .darkTheme .p-dialog-header-icon {
        color: #1d252b !important;
    }

    .p-dialog-header-icon {
        // color: black;
        @include theme() {
            color: theme-get('black-700');
        }

        background-color: transparent !important;

        .p-icon {
            width: 16px;
            height: 16px;
        }
    }
}

#filter-modal .p-dialog-content {
    padding: 0;
    overflow: hidden;

    @media screen and (max-width: 767px) {
        // padding: 16px;
    }
}

#filter-modal {
    .dp__input {
        background-color: transparent !important;

        @include theme() {
            border: 1px solid theme-get('border-black-400');
        }
    }

    .dp__instance_calendar {
        @include theme() {
            background-color: theme-get('background');
        }
    }
}

.header-div {
    position: relative;

    @include theme() {
        border-bottom: 1px solid theme-get('border-black-400');
    }
}

.header {
    font-size: 16px;
    font-family: $interSemiBold;
    margin: 0px;

    @include theme() {
        color: theme-get('black-800');
    }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.darkTheme .p-multiselect-panel {
    background: #3d3d3d;
    border: 1px solid #3d3d3d;
}

.darkTheme .p-multiselect-panel .p-multiselect-header {
    border-bottom: 1px solid #545b67;
    background: #3d3d3d;
}

.darkTheme .p-checkbox .p-checkbox-box {
    background: #3d3d3d;
}

.darkTheme#filter-modal .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
    background-color: #212121 !important;
}

.darkTheme#filter-modal .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
    background-color: #212121;
}

.darkTheme .p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container .p-inputtext {
    background: #212121;
}

.darkTheme#filter-modal .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight {
    border-color: #98c7fe;
}

.darkTheme#filter-modal .p-checkbox .p-checkbox-box.p-highlight {
    border-color: #1279ff;
    background-color: #98c7fe;
}

.darkTheme#filter-modal .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
    background-color: #98c7fe;
    border: #98c7fe;
}

// #filter-modal {
//     @media(min-width:768px){
//         .right-filter-content {
//             margin: 0;
//             margin-left: 220px;
//             padding: 0 25px;
//             .lists {
//                 margin: 0 24px;
//             }
//             .active-list {
//                 background: transparent;
//                 border: 1px solid #1279ff;
//                 border-radius: 4px;
//             }
//         }
//     }
// }
</style>
