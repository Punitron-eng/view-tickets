<template>
    <div class="max-w-[100vw] md:max-w-[302px] bg-[#fff] dark:bg-[#313131] dt-scroller">
        <div class="flex flex-wrap items-center justify-between py-2 px-4 gap-2 border-r border-light-500 dark:border-dark-300">
            <div class="flex text-[16px]">
                Manifest
            </div>
            <div class="flex gap-2 items-center">
                <div>
                    <BaseDropdown @listen-dropdown-change="(el) => changeDropdown(el)" :options="Dropdown"
                        twClasses="w-[130px] line-height-[normal]" :defaultValue="1" :another-val="false" />
                </div>
                <div class="flex items-center gap-2 relative">
                    <button @click="toggle">
                        <img v-if="!darkModeVal" src="@/assets/images/manifest-store-order-mobile-menu.svg" />
                        <img v-else src="@/assets/images/dark-mode/dark-manifest-store-order-mobile-menu.svg" />
                    </button>
                    <OverlayPanel ref="op" appendTo="self">
                        <div v-for="index in overlayPanel" class="py-1">
                            <button class="flex items-center gap-2">
                                <img :src="getImg(index.img)" />{{ index.value }}
                            </button>
                        </div>
                    </OverlayPanel>
                </div>
            </div>
            <div class="w-full">
                <input v-model="dataVariables.manifestSearch" @input="searchManifest()" type="search"
                    placeholder="Search"
                    class="w-full rounded-md px-2 h-[32px] bg-[#f1f3f5] dark:bg-[#424242]  text-sm" />
            </div>
        </div>
        <div @scroll="handleScroll" class="w-[100vw] md:w-[302px] !max-h-[300px] overflow-y-auto border-r border-light-500 dark:border-dark-300">
            <table>
                <thead class="text-[#2d2d2d] text-sm bg-[#edf5ff]">
                    <tr>
                        <th class="py-2 flex items-center">
                            <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                                class="hover:cursor-pointer w-[16px] h-[16px] mr-[8px]" />
                        </th>
                        <th v-for="id in ColoumnKey" :key="id.field" class="py-2 text-left">
                            {{ id.header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dataVariables.dataTableManifestData" :key="item.loop_manifest_id">
                        <td>
                            <input @change="callDataTableFnc" type="checkbox" :value="item" v-model="selectedId"
                                class="hover:cursor-pointer w-[16px] h-[16px]" />
                        </td>
                        <td v-for="id in ColoumnKey" :key="id.field">
                            <div class="flex items-center gap-2" v-if="lazyLoading">
                                <SkeletonView height="1rem" width="3.4rem" />
                            </div>
                            <div v-else>
                                {{ item[id.field] }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex md:hidden items-center justify-center mt-4">
            <BaseButton name="Continue" class="w-[88px] px-4"
                @click="() => dataVariables.dataTableSideBar = !dataVariables.dataTableSideBar" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import getImg from '../../../../util/getImg';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
import { getManifestData } from '../viewOrder';
import { viewOrderVariables } from '../viewOrder';
import BaseDropdown from '../../../../components/base/BaseDropdown.vue';
import BaseButton from '../../../../components/base/BaseButton.vue';

const store = useStore();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

type ColumnDataType = {
    field: string;
    header: string;
};

const selectedId = ref<string[]>([]);
const lazyLoading = ref<boolean>(false);
const op = ref<any>(null);
const toast = useToast();
const currentCount = ref<number>(0);

const toggle = (event) => {
    op.value.toggle(event);
};

const overlayPanel = [
    { value: "Print Label", img: "mainfest-store-print-invoice" },
    { value: "Print Manifest", img: "manifest-store-print" },
    { value: "Print PickList", img: "manifest-store-print-invoice" },
    { value: "Print invoice", img: "manifest-store-print-invoice" }
];

const ColoumnKey: ColumnDataType[] = [
    {
        field: 'loop_itl_manifest_date',
        header: 'Product',
    },
    {
        field: 'loop_manifest_id',
        header: 'QTY',
    },
    {
        field: 'loop_manifest_id_count',
        header: 'SKU',
    }
];

const props = defineProps({
    borderClass: {
        type: String,
        default: '',
    },
});

const Dropdown = [
    { id: 1, value: "Pending" },
    { id: 2, value: "Complete" }
];

const dataVariables = viewOrderVariables;

const isAllSelected = computed(() => {
    return dataVariables.value.dataTableManifestData.length > 0 && selectedId.value.length === dataVariables.value.dataTableManifestData.length;
});

async function toggleSelectAll(event) {
    if (event.target.checked) {
        selectedId.value = dataVariables.value.dataTableManifestData.map(item => item);
    } else {
        selectedId.value = [];
    }
    await callDataTableFnc();
}

watch(selectedId, (newValue, oldValue) => {
    console.log(newValue, "selectedId");
});

const handleScroll = async (event) => {
    const element = event.target;
    console.log(element.scrollHeight, Math.floor(element.scrollTop), element.clientHeight, Math.ceil(element.scrollTop))
    if ((element.scrollHeight - Math.floor(element.scrollTop) === element.clientHeight) || (element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight)) {
        lazyLoading.value = true;

        const payload = { limit: 10, start: currentCount.value, type: 1, vendor_id: 7214, search_manfest_id: '' };
        const result = await getManifestData(payload);
        if (result.status === 'success') {
            dataVariables.value.dataTableManifestData = [...dataVariables.value.dataTableManifestData, ...result.temp_all_order_data_array];
            currentCount.value += 10;
            lazyLoading.value = false;
        } else {
            lazyLoading.value = false;
            toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 3000 });
        }
    }
}

const callDataTableFnc = async () => {
    const res = selectedId.value.map((el) => {
        return el.loop_manifest_id;
    });
    await dataTableFncs.getDataTableData({ foo: res });
}

const changeDropdown = async (el) => {
    await dataTableFncs.getDataTableData({ filter_manifest_pending_complete: el.id });
}

const searchManifest = async () => {
    const payload = { limit: 10, start: 0, type: 1, vendor_id: 7214, search_manfest_id: dataVariables.value.manifestSearch };
    const result = await getManifestData(payload);
    if (result.status === 'success') {
        dataVariables.value.dataTableManifestData = result.temp_all_order_data_array;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 3000 });
    }
}
</script>

<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

.dt-with-scroller {
    tr:focus {
        outline: none !important;
    }
}

.dt-scroller {
    .p-dropdown-items-wrapper {
        width: auto !important;
    }

    .p-overlaypanel {
        left: -115px !important;
        right: 0px !important;
        top: 32px !important;
        width: 150px !important;
    }

    tr {
        border-radius: 4px !important;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead {
        position: sticky;
        top: 0;
        font-size: 12px;
        background-color: #edf5ff;
        z-index: 1;
    }

    th,
    td {
        padding: 6px 14px !important;

        // color: #2d2d2d;
        @include theme() {
            color: theme-get('black-900');
        }

        box-sizing: border-box;
    }

    th {
        // background-color: #edf5ff;
        height: 32px;

        @include theme() {
            background: theme-get('dt-table-head');
        }
    }

    // tbody tr:nth-child(even) {
    //     background-color: #f9f9f9;
    // }
}
</style>
