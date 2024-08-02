<template>
    <div v-if="props.filterWithScroller" class="inline-filter-parent md:flex md:items-center gap-2">
        <div class="inline-filters-main flex items-center relative my-2 filter-outer-li" id="filter-outer-li">
            <div class="prev-icon-parent absolute w-[80px]">
                <img v-if="!arrivedState.left" class="cursor-pointer prev-icon-filter" @click="scroll('right')" :src="getImg('filter-prev-icon')" alt="Previous Icon" />
            </div>
            <div ref="scrollbarEle" :id="dynamicId" class="scroller-main flex gap-2 items-center overflow-x-scroll">
                <div v-for="(column, index) in commonVariable.dataTableColumns" :key="index" :class="column.isFilterType !== 8 && filterData[column.field] ? 'block' : 'hidden'">
                    <div v-if="filterData[column.field] && column.isFilterType < 8" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                        <div>{{ column.header }} : {{ formatSelectedData(filterData[column.field]) }}</div>
                        <img v-if="props.oneClearIcon" @click="removeSingleFilter(column.field)" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                    </div>
                    <div v-if="column.isFilterType == 9 && filterData[column.field]" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                        <div v-for="(value, key) in filterData[column.field]" :key="key" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                            <div>{{ convertTagFormat(key) }} : {{ formatSelectedData(value) }}</div>
                            <img v-if="props.oneClearIcon" @click="removeGroupFilter(key, column.field)" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                        </div>
                    </div>
                </div>
                <div v-if="filterData[commonVariable.dtGlobalSearch]" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max filterLiSearch">
                    <div>Search : {{ filterData[commonVariable.dtGlobalSearch] }}</div>
                    <img v-if="props.oneClearIcon" @click="removeSingleFilter('search')" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                </div>
                <div v-if="filterData.vendor_name" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                    <div>Vendor Name : {{ formatSelectedData(filterData.vendor_name) }}</div>
                    <img v-if="props.oneClearIcon" @click="removeSingleFilter('vendor_name')" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                </div>
                <!-- <div v-if="checkFilterType9(filterData)" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                    <div v-for="(value, key) in datafilter9" :key="key" :class="filterData[value] !== '' ? 'flex' : 'hidden'" class="items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                        {{ console.log('datatable li - key', key) }}
                        {{ console.log('datatable li- value', value) }}
                        <div>{{ formateKey(value) }}: {{ formatSelectedData(filterData[value]) }}</div>
                        <img v-if="props.oneClearIcon" @click="removeSingleFilter(value)"
                            :src="getImg('selected-list-close')" alt="close-icon"
                            class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                    </div>
                </div> -->
            </div>
            <div class="next-icon-parent w-[80px]">
                <img v-if="!arrivedState.right" class="cursor-pointer next-icon-filter" @click="scroll('left')" :src="getImg('filter-next-icon')" alt="Next Icon" />
            </div>
        </div>
        <!-- {{ !props.checkField.filter((field) => field == 'vendor_name').some((field) => filterData[field]) }} -->
        <div
            v-if="(props.checkField.some((field) => filterData[field]) && !filterData.vendor_name) || props.checkField.filter((field) => field != 'vendor_name').some((field) => filterData[field])"
            class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0"
        >
            <button @click="clearAllFilters()" v-if="props.allClearButton" class="flex items-center md:ml-[18px]">
                <img :src="getImg('dt-clear-filter')" />
                <span>Clear</span>
            </button>
            <div class="flex items-center" v-if="props.hideSaveUpdateBtn">
                <button v-if="!checked" @click="handleModal(route.params.id ? 'UpdateModal' : 'SaveModal')" type="button" class="save-update-filter-button px-2 dark:!bg-[#3d3d3d]">
                    <img class="mr-[4px]" src="@/assets/images/btn-filter-icon-inline-filters.svg" />
                    <span>{{ route.params.id ? 'Update' : 'Save' }}</span>
                </button>
            </div>
        </div>
    </div>
    <div v-if="!props.filterWithScroller" class="flex gap-2 flex-wrap items-center">
        <div v-for="(column, index) in commonVariable.dataTableColumns" :key="index" :class="column.isFilterType !== 8 && filterData[column.field] ? 'block' : 'hidden'">
            <div v-if="filterData[column.field] && column.isFilterType < 8" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                <div>{{ column.header }} : {{ formatSelectedData(filterData[column.field]) }}</div>
                <img v-if="props.oneClearIcon" @click="removeSingleFilter(column.field)" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
            </div>
            <div v-if="column.isFilterType == 9 && filterData[column.field]" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
                <div v-for="(value, key) in filterData[column.field]" :key="key" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                    <div>{{ convertTagFormat(key) }} : {{ formatSelectedData(value) }}</div>
                    <img v-if="props.oneClearIcon" @click="removeGroupFilter(key, column.field)" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
                </div>
            </div>
        </div>
        <div v-if="filterData[commonVariable.dtGlobalSearch]" class="flex items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max filterLiSearch">
            <div>Search : {{ filterData[commonVariable.dtGlobalSearch] }}</div>
            <img v-if="props.oneClearIcon" @click="removeSingleFilter('search')" :src="getImg('selected-list-close')" alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
        </div>
        <!-- <div v-if="checkFilterType9(filterData)" class="flex items-center gap-2 justify-end w-full pt-2 md:pt-0">
            <div v-for="(value, key) in datafilter9" :key="key" :class="filterData[value] !== '' ? 'flex' : 'hidden'" class="items-center dataTable-li bg-[#eaf3ff] dark:bg-[#4d4d4d] px-2 py-1 text-xs rounded-[4px] min-w-max">
                <div>{{ formateKey(value) }}: {{ formatSelectedData(filterData[value]) }}</div>
                <img v-if="props.oneClearIcon" @click="removeSingleFilter(value)" :src="getImg('selected-list-close')"
                    alt="close-icon" class="pl-[6px] hover:cursor-pointer w-[16px] h-[16px]" />
            </div>
        </div> -->
        <button @click="clearAllFilters()" v-if="props.allClearButton && filterData > 0" class="flex items-center">
            <img :src="getImg('dt-clear-filter')" />
            Clear
        </button>
    </div>
    <SaveUpdateFilterModal
        v-if="showModal"
        :typeOfModal="typeOfModal"
        :showSaveUpdateFilterModal="showModal"
        :propsData="updatedFilterData"
        :updated-from="true"
        @closeModal="showModal = false"
        @saveNewFilter="saveNewFilter"
        ref="updateFilterDataref"
    />
</template>

<script setup lang="ts">
import { Props } from './types';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useScroll } from '@vueuse/core';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { DARKMODE } from '../../../store/dark-mode/constants';
import SaveUpdateFilterModal from '../../../components/dt-filters/SaveUpdateFilterModal.vue';
import { ref, defineProps, computed, onMounted, onBeforeUnmount, onBeforeUpdate, defineEmits, inject, watch, watchEffect } from 'vue';
import { dataTableVariables } from '../itl-dataTable/dataTable';
import { dataTableVariables as commonVariable } from '../itl-dataTable/commonVariable';

const store = useStore();
const route = useRoute();
const emitter = useEmitter();
const updatedFilterData = ref({});
const dynamicId = ref<string>('');
const checked = ref<boolean>(false);
const scrollbarEle = ref<any>(null);
const scrollPosition = ref<number>(0);
const showModal = ref<Boolean>(false);
const storeName = inject('storeName');
const typeOfModal = ref<string | null>(null);
let { arrivedState } = useScroll(scrollbarEle);
const props = withDefaults(defineProps<Props>(), {
    filterWithScroller: false,
    allClearButton: true,
    oneClearIcon: true,
    hideSaveUpdateBtn: false,
    saveUpdateFilter: false,
    updateFilterData: {},
    checkField: [],
});
const emits = defineEmits(['clearAllFilters', 'clearOneFilter', 'saveNewFilters']);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const filterData = computed(() => store.getters[`${storeName.NAME}/getMappedFilterValue`]);
const filterDataKeys = Object.keys(filterData.value);

const updateFilterDataref = ref(null);
const checkClassPresent = () => {
    if (document.querySelectorAll('.dataTable-li').length > 0) {
        console.log('dataTable-li class present');
        // adjustTableHeight()
    } else {
        console.log('dataTable-li class not present');
    }
};
const convertTagFormat = (key) => {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const removeGroupFilter = (objectKey: any, field: any): void => {
    emitter.emit('clearGroupFilter', { objectKey, field });
};
const getViewFiltered = computed(() => store.getters[`${storeName.NAME}/getViewSavedFilteredData`]);

// setInterval(() => {
//     if (document.querySelectorAll('.dataTable-li').length > 0) {
//         console.log('dataTable-li class present')
//     } else {
//         console.log('dataTable-li class not present')
//     }
// }, 1000)
watch(
    () => [route.params.tabs, route.params.id],
    () => {
        arrivedState.left = true;
        arrivedState.right = true;
    }
);
watch(
    () => commonVariable.value.apiResponse,
    (newVal) => {
        if (newVal.status == 'success') {
            closeSaveUpdateModal();
        }
    }
);

let datafilter9 = ['address_confirmation', 'order_confirmation'];
const checkFilterType9 = (filterData) => {
    console.log('datatable li filterData', filterData);
    for (const key in filterData) {
        if (typeof filterData[key] === 'object' && !('min' in filterData[key]) && !('max' in filterData[key])) {
            return true;
        }
    }
    return false;
};
onMounted(() => {
    // adjustTableHeight()

    document.body.classList.add('inline-filters-present');
    let result = 'scroller-main-';
    result += (Math.random() + 1).toString(36).substring(7);
    dynamicId.value = result;
});

onBeforeUnmount(() => {
    document.body.classList.remove('inline-filters-present');
});
const scroll = (direction: string): void => {
    const scroller = document.getElementById(dynamicId.value);
    if (scroller) {
        if (direction == 'left') {
            scroller.scrollLeft += 200;
            scrollPosition.value = scroller.scrollLeft += 200;
        } else {
            scroller.scrollLeft -= 200;
            scrollPosition.value = scroller.scrollLeft -= 200;
        }
    }
};
const formateKey = (key: any) => {
    if (key == 'awb') return 'Logistics';
    else if (key == 'dt_status') return 'Status';
    else return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
};
const formatSelectedData = (value) => {
    if (value) {
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
const getImg = (iconName: string) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return undefined;
    }
};

const removeSingleFilter = (id: any): void => {
    if (id == 'search') {
        store.commit(`${storeName.NAME}/setOrderInput`, '');
        commonVariable.value.orderSearch = '';
    }
    // console.log(updateFilterDataref.value, id)
    emitter.emit('clearBtnFilter', id);
};
const clearAllFilters = (): void => {
    store.commit(`${storeName.NAME}/setOrderInput`, '');
    commonVariable.value.orderSearch = '';
    arrivedState.left = true;
    arrivedState.right = true;
    updatedFilterData.value = '';
    emits('clearAllFilters');
};
const handleModal = (param: string) => {
    typeOfModal.value = param;
    console.log(filterData.value, 'filterData');
    for (const keys in filterData.value) {
        if (filterData.value[keys] === '') {
            delete filterData.value[keys];
        }
    }
    if (typeOfModal.value === 'UpdateModal') {
        const selectedSaveFilter = getViewFiltered.value.find((saveFilter) => saveFilter.id == route.params.id);
        console.log(selectedSaveFilter);
        updatedFilterData.value = {
            name: selectedSaveFilter.name,
            filters: { ...filterData.value, id: selectedSaveFilter.id, name: selectedSaveFilter.name, is_pinned: selectedSaveFilter.is_pinned },
            updateFilterCheck: true,
        };
    } else {
        updatedFilterData.value = { filters: { ...filterData.value } };
    }
    showModal.value = true;
};
const saveNewFilter = async (updateType: any) => {
    emits('saveNewFilters', updateType);
};
const closeSaveUpdateModal = () => {
    showModal.value = false;
    updatedFilterData.value = '';
};
</script>
<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.inline-filter-parent {
    .scroller-main::-webkit-scrollbar {
        display: none !important;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scroller-main {
        // overflow: hidden !important;
        font-family: $interRegular;
        scroll-behavior: smooth;
        -ms-overflow-style: none !important;
        /* IE and Edge */
        scrollbar-width: none !important;
        /* Firefox */
    }

    .inline-filters-main {
        width: auto !important;
        min-width: 80% !important;
        max-width: 80% !important;

        @media screen and (max-width: 766px) {
            min-width: 100% !important;
            max-width: 100% !important;
        }

        @media screen and (min-width: 767px) and (max-width: 800px) {
            min-width: 68% !important;
            max-width: 68% !important;
        }

        @media screen and (min-width: 801px) and (max-width: 820px) {
            min-width: 70% !important;
            max-width: 70% !important;
        }

        @media screen and (min-width: 821px) and (max-width: 1024px) {
            min-width: 75% !important;
            max-width: 75% !important;
        }
    }

    .save-update-filter-button {
        width: 84px;
        height: 28px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #1279ff;
        border-radius: 6px;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        color: #1279ff;
        background-color: #ffffff;
    }

    .p-inputswitch {
        width: 2.8rem;
        height: 1.5rem;
    }

    .p-inputswitch-slider:before {
        width: 1rem;
        height: 1rem;
        left: 0.2rem;
        right: 0.2rem;
        margin-top: -0.5rem;
    }

    .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
        background: #0052cc !important;
    }

    .p-inputswitch.p-focus .p-inputswitch-slider {
        box-shadow: none !important;
    }

    .prev-icon-parent {
        margin-left: -2px;
        background-image: linear-gradient(to right, #fff 17%, rgba(255, 255, 255, 0) 109%);
    }

    .next-icon-parent {
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        right: 0;
        margin-right: -2px;
        background-image: linear-gradient(to left, #fff 18%, rgba(255, 0, 0, 0) 96%);
    }
}

.darkTheme .inline-filter-parent .prev-icon-parent {
    background-image: linear-gradient(to right, #313131 17%, rgb(121 121 121 / 0%) 109%);
}

.darkTheme .inline-filter-parent .next-icon-parent {
    background-image: linear-gradient(to left, #313131 18%, rgba(121 121 121 / 0%) 109%);
}

.inline-filters-present {
    .p-tooltip.p-tooltip-top .p-tooltip-arrow {
        border-bottom-color: #000;
    }

    .p-tooltip .p-tooltip-text {
        padding: 3px 10px 5px 10px;
        font-size: 12px;
        border-radius: 4px;
    }
}

.inline-filters-present {
    .p-tooltip.p-tooltip-top .p-tooltip-arrow {
        border-bottom-color: #000;
    }

    .p-tooltip .p-tooltip-text {
        padding: 3px 10px 5px 10px;
        font-size: 12px;
        border-radius: 4px;
    }
}
</style>
