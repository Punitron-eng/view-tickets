<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { PUSHPULLSCANLIST } from '@/store/domestic/admin-pages/push-pull-scan-list/constants';
import { pushPullScanListVariable, filterModal } from './pushPullScanList';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = pushPullScanListVariable;
const getPaginatorStartValue = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getBillingData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getVendorValues`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getWidgetTitle`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/getWidgetValues`]);
const storeId = computed(() => store.getters[`${PUSHPULLSCANLIST.NAME}/sendStoreId`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = 'Push Pull Scan List';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isUniversalSearchAvail = false;
    dataVariables.value.isUniversalDateAvail = false;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    dataVariables.value.processType = '154';
    dataVariables.value.dtGlobalSearch = 'search';
    dataVariables.value.isWidgetAvail = false;
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
    document.body.classList.add('push-pull-scan-list');
    store.commit(`${PUSHPULLSCANLIST.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await getStoreDetails();
    // await formatDate();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getDataTableData();
    }
    if (checkUserType('admin') || checkUserType('subadmin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }

    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
});

const getStoreDetails = async () => {
    await store.dispatch(`${PUSHPULLSCANLIST.NAME}/getStoreDetails`);
    dataVariables.value.dropdownStoreDetails = store.getters[`${PUSHPULLSCANLIST.NAME}/sendStoreDetails`];
    if (dataVariables.value.dropdownStoreDetails?.length > 0) {
        dataVariables.value.selectedSetting = dataVariables.value.dropdownStoreDetails[0].id;
    } else {
        dataVariables.value.selectedSetting = '';
    }
};
onBeforeUnmount(() => {
    // document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'push_pull_scan';
    // dataVariables.value.syncDateName = 'order_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(PUSHPULLSCANLIST.NAME);
});

const actionModal = async (data) => {
    const tempData = {
        rowId: data.rowId,
        storeId: storeId.value,
    };
    await store.dispatch(`${PUSHPULLSCANLIST.NAME}/getAbandonedModalData`, tempData);
    await store.dispatch(`${PUSHPULLSCANLIST.NAME}/getProductDetails`, tempData);
    dataVariables.value.productDetails = store.getters[`${PUSHPULLSCANLIST.NAME}/sendProductDetails`].all_product_data_array;
    dataVariables.value.abandonedModalData = store.getters[`${PUSHPULLSCANLIST.NAME}/sendAbandonedModalData`];
    if (dataVariables.value.abandonedModalData.status == 'success') {
        dataVariables.value.showActionModal = data.isModalVisible;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.abandonedModalData.html_message, life: 3000 });
        return;
    }
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${PUSHPULLSCANLIST.NAME}/getSelectedRow`, val);
provide('storeName', PUSHPULLSCANLIST);
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
        <div class="page-header-section mb-3">
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
                    :is-order-id-modal-avail="dataVariables.isOrderIdModalAvail"
                    :haveAccess="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'tracking')"
                    :haveAccessOrderDetail="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'order_details')"
                    :haveAccessParcel="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'edit_parcel')"
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
// @import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';;
@import '../../../../components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';
@import './pushPullScanList.scss';
</style>
