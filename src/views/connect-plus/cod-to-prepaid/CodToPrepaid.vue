<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import { CODTOPREPAID } from '@/store/connect-plus/cod-to-prepaid/constants';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { codToPrepaidVariables, filterModal } from './codToPrepaid';
import { checkUserType } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = codToPrepaidVariables;
const getVendorDataStatus = computed(() => store.getters[`${CODTOPREPAID.NAME}/getVendorStatus`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${CODTOPREPAID.NAME}/getExportStatus`]);
const savedFilteredList = computed(() => store.getters[`${CODTOPREPAID.NAME}/getViewSavedFilteredData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${CODTOPREPAID.NAME}/getBillingData`]);
// dataVariables.value.getWidgetTitle = computed(() => store.getters[`${CODTOPREPAID.NAME}/getWidgetTitle`]);
const getPaginatorLastValue = computed(() => store.getters[`${CODTOPREPAID.NAME}/getPaginatorLastValue`]);
const getVendorModalPayload = computed(() => store.getters[`${CODTOPREPAID.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${CODTOPREPAID.NAME}/getAllFilterData`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${CODTOPREPAID.NAME}/getVendorValues`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${CODTOPREPAID.NAME}/getWidgetValues`]);
const getPaginatorStartValue = computed(() => store.getters[`${CODTOPREPAID.NAME}/getPaginatorStartValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${CODTOPREPAID.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${CODTOPREPAID.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${CODTOPREPAID.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${CODTOPREPAID.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${CODTOPREPAID.NAME}/getSavedDatatableResponse`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = 'COD to Prepaid';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.processType = '152';
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
onMounted(async () => {
    // document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('cod-to-prepaid-dt');
    store.commit(`${CODTOPREPAID.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await formatDate();
    // await dataTableFncs.getDataTableData();
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
    // document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'cod_to_prepaid';
    dataVariables.value.syncDateName = 'order_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(CODTOPREPAID.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${CODTOPREPAID.NAME}/getDateRange`, { [dataVariables.value.syncDateName]: dataTableFncs.changeDateFormatPayload() });
    // await store.dispatch(`${CODTOPREPAID.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${CODTOPREPAID.NAME}/getSelectedRow`, val);
provide('storeName', CODTOPREPAID);
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
                    :productDetails="dataVariables.productDetails"
                    @table-row-id="dataTableFncs.tableRowId"
                    @action-modal="actionModal"
                    :action-column-width="dataVariables.actionColumnWidth"
                    :weightUpdateAvail="dataVariables.isWeightUpdateAvail"
                    @default-column-payload="dataTableFncs.defaultCustomizeSize"
                    @get-temp-column="getTempColumn"
                >
                </DataTable>
            </div>
        </div>
    </div>

    <DeleteConfirmationModal />
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
@import './codToPrepaid.scss';
</style>
