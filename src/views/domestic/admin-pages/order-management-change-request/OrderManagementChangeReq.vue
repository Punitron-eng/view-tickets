<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import { ORDERMANAGEMENTREQ } from '@/store/domestic/admin-pages/order-management-change-request/constants';
import { orderManagementVariables, filterModal } from './orderManagementChangeReq.js';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import { checkUserType } from '@/util/commonHandlers';
const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = orderManagementVariables;
const getPaginatorStartValue = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getDtData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${ORDERMANAGEMENTREQ.NAME}/getVendorValues`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = 'Order Management Change Request';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isActionColumn = false;
    dataVariables.value.dtGlobalSearch = 'search';
    dataTableFncs.closeAllOverlay();
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
provide('placeholder', ' Search by AWB No.');
onMounted(async () => {
    document.body.classList.add('crp-request-wrapper');
    dataVariables.value.selectedTabName = 'update_address';
    store.commit(`${ORDERMANAGEMENTREQ.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await formatDate();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getDataTableData();
    }
    if (checkUserType('admin') || checkUserType('subadmin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }

    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
});

onBeforeUnmount(() => {
    document.body.classList.remove('dt-wrapper-outer');

    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'update_order';
    dataVariables.value.syncDateName = 'order_last_update_date';
    dataVariables.value.selectedTabName = 'update_address';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(ORDERMANAGEMENTREQ.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${ORDERMANAGEMENTREQ.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${ORDERMANAGEMENTREQ.NAME}/getSelectedRow`, val);
provide('storeName', ORDERMANAGEMENTREQ);
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
</script>
<template>
    <div class="widget-overlay" v-if="dataVariables.isDivVisible" />
    <div class="wrapper mt-0">
        <div class="page-header-section" :class="dataVariables.isWidgetAvail ? '' : 'mb-3'">
            <DTPageHeader :headerText="dataVariables.selectedTabHeading" />
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

.crp-request-wrapper .p-datatable-wrapper {
    min-height: 50vh;
    max-height: 65vh;
}
</style>
