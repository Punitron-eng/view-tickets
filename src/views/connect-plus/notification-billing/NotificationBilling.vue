<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { NOTIFICATIONBILLING } from '@/store/connect-plus/notification-billing/constants';
import { checkoutStoreVariable, filterModal } from './notificationBilling';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
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
const dataVariables = checkoutStoreVariable;
const getPaginatorStartValue = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getBillingData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getVendorValues`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getWidgetTitle`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${NOTIFICATIONBILLING.NAME}/getWidgetValues`]);
onMounted(() => {
    dataVariables.value.selectedTabHeading = 'Notification Billing';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.changeActionColumn = false;
    dataVariables.value.processType = '135';
    dataVariables.value.dtGlobalSearch = 'search_awb_no';
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
provide('placeholder', 'Search by Coupon Name');
onMounted(async () => {
    // await dataTableFncs.callDtTabs();
    await dataTableFncs.getAllWidgetTitleData();
    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('notification-billing');
    store.commit(`${NOTIFICATIONBILLING.NAME}/clearAllFilter`);
    dataVariables.value.isActionColumn = false;
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
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.syncDateName = 'order_date';
    dataVariables.value.moduleName = 'notification_billing';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(NOTIFICATIONBILLING.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${NOTIFICATIONBILLING.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${NOTIFICATIONBILLING.NAME}/getSelectedRow`, val);
provide('storeName', NOTIFICATIONBILLING);
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
            <DTWidgets />
        </div>
        <div class="section-container view-billing-page-outer-section">
            <div class="section-tabs">
                <!-- @action-modal="dataTableFncs.actionModal" -->
                <!-- :haveAccess="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'tracking')"
                    :haveAccessOrderDetail="false" -->
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
                    :action-column-width="dataVariables.actionColumnWidth"
                    :is-order-id-modal-avail="dataVariables.isOrderIdModalAvail"
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
@import './notificationBilling.scss';
</style>
