<script setup>
import WalletRecharge from './components/WalletRecharge.vue'
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { CREDITWALLET } from '@/store/domestic/admin-pages/credit-wallet/constants';
import { creditWalletVariables, filterModal } from './creditWallet.js';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
const store = useStore();
const toast = useToast();
const route = useRouter();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = creditWalletVariables;
const getPaginatorStartValue = computed(() => store.getters[`${CREDITWALLET.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${CREDITWALLET.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${CREDITWALLET.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${CREDITWALLET.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${CREDITWALLET.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${CREDITWALLET.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${CREDITWALLET.NAME}/getDtData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${CREDITWALLET.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${CREDITWALLET.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${CREDITWALLET.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${CREDITWALLET.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${CREDITWALLET.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${CREDITWALLET.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${CREDITWALLET.NAME}/getVendorValues`]);
// dataVariables.value.getWidgetTitle = computed(() => store.getters[`${CREDITWALLET.NAME}/getWidgetTitle`]);
// dataVariables.value.getWidgetValues = computed(() => store.getters[`${CREDITWALLET.NAME}/getWidgetValues`]);
const storeId = computed(() => store.getters[`${CREDITWALLET.NAME}/sendStoreId`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = 'Credit Transactions';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isUniversalSearchAvail = false;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isWidgetAvail = false;
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
provide('storeName', CREDITWALLET);
onMounted(async () => {
    // await dataTableFncs.getAllWidgetTitleData();
    document.body.classList.add('dt-wrapper-outer');
    document.body.classList.add('credit-wallet');
    store.commit(`${CREDITWALLET.NAME}/clearAllFilter`);
    // dataVariables.value.isActionColumn = true;
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
    dataVariables.value.moduleName = 'credit_wallet';
    if (route.currentRoute.value.name == 'AdminCredit') {
        dataVariables.value.subTabName = 'credit';
        dataVariables.value.selectedTabName = 'credit';
    } else if (route.currentRoute.value.name == 'AdminWallet') {
        dataVariables.value.subTabName = 'wallet';
        dataVariables.value.selectedTabName = 'wallet';
    }
    dataVariables.value.syncDateName = 'transaction_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(CREDITWALLET.NAME);
});
const formatDate = async () => {
    // await store.dispatch(`${CREDITWALLET.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
    await store.dispatch(`${CREDITWALLET.NAME}/getDateRange`, { [dataVariables.value.syncDateName]: dataTableFncs.changeDateFormatPayload() });

};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${CREDITWALLET.NAME}/getSelectedRow`, val);
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
    <!-- <WalletRecharge v-if="$route.name == 'AdminCredit'" /> -->
    <!-- {{ route.currentRoute.params }} -->
    <!-- <div class="widget-overlay" v-if="dataVariables.isDivVisible" /> -->
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
                    :is-order-id-modal-avail="dataVariables.isOrderIdModalAvail"
                    :haveAccess="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'tracking')"
                    :haveAccessOrderDetail="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'order_details')"
                    :haveAccessParcel="checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'edit_parcel')"
                    :weightUpdateAvail="dataVariables.isWeightUpdateAvail"
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
@import './creditWallet.scss';
</style>
