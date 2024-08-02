<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { CPVIEWORDER } from '@/store/channel-partner/view-order/constants';
import { cpViewOrderVariables, filterModal } from './viewOrder.js';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import DomesticIntlDropdown from '@/components/itl-common-features/domestic-intl-dropdown/DomesticIntlDropdown.vue';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = cpViewOrderVariables;
const getPaginatorStartValue = computed(() => store.getters[`${CPVIEWORDER.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${CPVIEWORDER.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${CPVIEWORDER.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${CPVIEWORDER.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${CPVIEWORDER.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${CPVIEWORDER.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${CPVIEWORDER.NAME}/getDtData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${CPVIEWORDER.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${CPVIEWORDER.NAME}/getUpdatedColumns`]);

dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${CPVIEWORDER.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${CPVIEWORDER.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${CPVIEWORDER.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${CPVIEWORDER.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${CPVIEWORDER.NAME}/getVendorValues`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = 'View Order';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isUniversalSearchAvail = false;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isActionColumn = false;
    dataTableFncs.closeAllOverlay();
    dataVariables.value.processType = '155';
});
watch(
    () => dataVariables.value.savedFiltervalue,
    () => dataTableFncs.showSelectedSaveFilter()
);
watch([() => dataVariables.value.modalShow, () => dataVariables.value.showDeleteFilter, () => dataVariables.value.isVendorModalVisible], ([modalShow, showDeleteFilter, isVendorModalVisible]) => {
    if (modalShow || showDeleteFilter || isVendorModalVisible) {
        dataTableFncs.addClassToBody();
    } else {
        dataTableFncs.removeClassFromBody();
    }
});
watch(
    () => dataVariables.value.dataTableData,
    () => {
        dataTableFncs.getCurrentRoutes();
    }
);

watch(
    () => savedFilteredList.value,
    (value) => {
        dataVariables.value.savedFilterData = value;
    }
);
const newref = ref();
const getTempColumn = (columns) => {
    newref.value = columns;
};
provide('dataTabelColumnData', newref);
onMounted(async () => {
    document.body.classList.add('view-order-wrapper');
    store.commit(`${CPVIEWORDER.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await formatDate();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await Promise.all([dataTableFncs.getDataTableData(), dataTableFncs.getDataTableDataCount()]); // using promise all to wait for both promises to resolve
    }
    if (checkUserType('admin') || checkUserType('subadmin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }

    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
});

onBeforeUnmount(() => {
    document.body.classList.remove('dt-wrapper-outer');
    document.body.classList.remove('view-order-wrapper');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'cp_order';
    dataVariables.value.syncDateName = 'order_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(CPVIEWORDER.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${CPVIEWORDER.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${CPVIEWORDER.NAME}/getSelectedRow`, val);
provide('storeName', CPVIEWORDER);
onMounted(() => {
    dataVariables.value.toast = toast;
    emitter.on('clearBtnFilter', (data) => {
        dataTableFncs.clearFilter(data);
    });
    emitter.on('updateFilterData', (data) => {
        dataTableFncs.UpdateSaveFilterData(data);
    });
    emitter.on('deleteSaveFilter', (selectedFilterData) => {
        dataTableFncs.showDeleteFilterPopup(selectedFilterData);
    });
    emitter.on('checkPinId', (pinID) => {
        dataTableFncs.checkPin(pinID);
    });
    emitter.on('removeSaveFilter', () => {
        dataTableFncs.removeSaveFilter();
    });
    emitter.on('updateWeightData', (payload) => {
        dataTableFncs.weightUpdateApi(payload);
    });
});
const getCurrentDeliveryType = async (dataValue) => {
    store.dispatch(`${CPVIEWORDER.NAME}/getDeliveryTypeData`, dataValue);
    store.commit(`${CPVIEWORDER.NAME}/clearAllFilter`);
    store.commit(`${CPVIEWORDER.NAME}/resetReverseOrderData`);
    store.commit(`${CPVIEWORDER.NAME}/setResetSavedFilteredData`);
    if (dataValue == '1') {
        dataVariables.value.moduleName = 'cp_order_intl';
    } else {
        dataVariables.value.moduleName = 'cp_order';
    }
    if (dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.removeSaveFilter();
    } else {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
        await dataTableFncs.getDataTableData();
    }
    await dataTableFncs.getSaveFilterData();
};
</script>
<template>
    <div class="widget-overlay" v-if="dataVariables.isDivVisible" />
    <div class="wrapper mt-0">
        <div class="page-header-section" :class="dataVariables.isWidgetAvail ? '' : 'mb-3'">
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <DomesticIntlDropdown @get-current-delivery-type="getCurrentDeliveryType" />
                </template>
            </DTPageHeader>
        </div>
        <div class="section-container view-billing-page-outer-section">
            <div class="section-tabs">
                <DataTable
                    :handlePageChange="dataTableFncs.handlePageChange"
                    :is-show-checkbox="dataVariables.isShowCheckbox"
                    :row-data="dataVariables.dataTableData.data"
                    :filter-modal-data="filterModalData"
                    @clear-value="dataTableFncs.clearFilter"
                    @filter="dataTableFncs.setFilterValue"
                    :isHeaderLoad="dataVariables.isHeaderLoad"
                    :isSkeleton="dataVariables.isSkeletonShow"
                    @export-value="setExportValue"
                    :totalrecord="dataVariables.totalRecords"
                    :paginator-start="getPaginatorStartValue"
                    :paginator-last="getPaginatorLastValue"
                    @custom-column="dataTableFncs.editColumns"
                    @vendor-modal-visible="vendorModalVisible"
                    @applyfilter-data="dataTableFncs.getAppliedFilterData"
                    :page-size="dataVariables.pageSize"
                    @column-position="dataTableFncs.setColumnPosition"
                    :isCustomizeColumnAvail="dataVariables.isCustomizeColumnAvail"
                    :isShowCheckbox="dataVariables.isShowCheckbox"
                    :isActionColumn="dataVariables.isActionColumn"
                    @table-row-id="dataTableFncs.tableRowId"
                    @default-column-payload="dataTableFncs.defaultCustomizeSize"
                    @get-temp-column="getTempColumn"
                >
                    <template #header-left-side>
                        <HeaderLeftSide class="ml-2" />
                    </template>
                </DataTable>
            </div>
        </div>
    </div>

    <VendorModalDatatable
        v-show="dataVariables.isVendorModalVisible"
        @vendorData="dataTableFncs.setFilter"
        @close-modal="dataVariables.isVendorModalVisible = false"
        @reset-vendor="dataTableFncs.resetvendor"
        :vendor-store="dataVariables.getMappedFilterValue.vendor_name"
        :remove-check="dataVariables.removeCheck"
        :getVendorValues="dataVariables.getVendorValues"
        :getVendorModalPayload="getVendorModalPayload"
        :getVendorDataStatus="getVendorDataStatus"
        @search-vendor-name="dataTableFncs.searchByVendorName"
    />
</template>
<style lang="scss">
@import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';
@import './viewOrder.scss';
</style>
