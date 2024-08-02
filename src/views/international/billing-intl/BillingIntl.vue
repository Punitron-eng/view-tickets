<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { BILLINGINTL } from '@/store/international/billing-intl/constants';
import { billingIntlVariable, filterModal, getSyncDateName } from './billingIntl';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';

const store = useStore();
const toast = useToast();
const route = useRoute();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = billingIntlVariable;
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const getVendorDataStatus = computed(() => store.getters[`${BILLINGINTL.NAME}/getVendorStatus`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${BILLINGINTL.NAME}/getBillingData`]);
const savedFilteredList = computed(() => store.getters[`${BILLINGINTL.NAME}/getViewSavedFilteredData`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${BILLINGINTL.NAME}/getExportStatus`]);
const getPaginatorLastValue = computed(() => store.getters[`${BILLINGINTL.NAME}/getPaginatorLastValue`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${BILLINGINTL.NAME}/getWidgetTitle`]); // for the widget Title
const getVendorModalPayload = computed(() => store.getters[`${BILLINGINTL.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${BILLINGINTL.NAME}/getAllFilterData`]);
const getPaginatorStartValue = computed(() => store.getters[`${BILLINGINTL.NAME}/getPaginatorStartValue`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${BILLINGINTL.NAME}/getWidgetValues`]); // for the widget value
dataVariables.value.getVendorValues = computed(() => store.getters[`${BILLINGINTL.NAME}/getVendorValues`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${BILLINGINTL.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${BILLINGINTL.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${BILLINGINTL.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${BILLINGINTL.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${BILLINGINTL.NAME}/getSavedDatatableResponse`]);
const storeId = computed(() => store.getters[`${BILLINGINTL.NAME}/sendStoreId`]);

onMounted(() => {
    dataVariables.value.isTabsPresent = true;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isWidgetAvail = true;
    dataVariables.value.dtGlobalSearch = 'search';
    dataTableFncs.closeAllOverlay();
});
watch(
    () => dataVariables.value.savedFiltervalue,
    () => dataTableFncs.showSelectedSaveFilter()
);
watch(
    () => route.params.tabs,
    (value) => {
        dataVariables.value.subTabName = '';
        actionColumnAvail(value);
        const checkTabChangeFromMenu = store.getters[`${BILLINGINTL.NAME}/getTabChangeInfo`];
        if (checkTabChangeFromMenu) {
            const tabValue = value.replace(/-/g, '_');
            const data = commonDtVariables.value.scrollableTabs.find((item) => item.value === tabValue);
            dataTableFncs.getActiveTab(data);
        }
        getSyncDateName();
    }
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
    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('checkout-store');
    const tabs = [
        { name: 'Shipping Charges', value: 'shipping_charges' },
        { name: 'Bill Summary', value: 'invoice' },
        { name: 'Credit Receipt', value: 'credit_receipt' },
        { name: 'Bad Debt', value: 'bad_debt' },
    ];
    dataVariables.value.scrollableTabs = topHeader.user_type == 3 ? tabs.filter((tab) => tab.value !== 'bad_debt') : tabs;
    dataTableFncs.getSelectedTabOnLoad();
    getSyncDateName();
    store.commit(`${BILLINGINTL.NAME}/clearAllFilter`);
    actionColumnAvail(dataVariables.value.router.currentRoute.params.tabs);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();

    await formatDate();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getDataTableData();
    }
    if (checkUserType('subadmin') || checkUserType('admin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }
    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
    await dataTableFncs.getAllWidgetTitleData(); // for the widgets
});
onBeforeUnmount(() => {
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'billing_intl';
    dataTableFncs.getCurrentRoutes();
    getSyncDateName();
    await dataTableFncs.getCurrentModuleStoreName(BILLINGINTL.NAME);
});
const actionColumnAvail = (tab) => {
    if (tab == 'remittance' || tab == 'credit-receipt' || tab == 'bad-debt' || tab == 'invoice') {
        dataVariables.value.isActionColumn = false; // for now action column is set to false
    } else {
        dataVariables.value.isActionColumn = false;
    }
};

const formatDate = async () => {
    await store.dispatch(`${BILLINGINTL.NAME}/getDateRange`, { [dataVariables.value.syncDateName]: dataTableFncs.changeDateFormatPayload() });
};
const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${BILLINGINTL.NAME}/getSelectedRow`, val);
provide('storeName', BILLINGINTL);
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
const isTabActive = (index) => index === dataVariables.value.activeTabIndex;
const actionModal = async (data) => {
    const tempData = {
        rowId: data.rowId,
        storeId: storeId.value,
    };
    await store.dispatch(`${BILLINGINTL.NAME}/getStoreModalData`, tempData);
    await store.dispatch(`${BILLINGINTL.NAME}/getProductDetails`, tempData);
    dataVariables.value.productDetails = store.getters[`${BILLINGINTL.NAME}/sendProductDetails`].all_product_data_array;
    dataVariables.value.storeModalData = store.getters[`${BILLINGINTL.NAME}/sendStoreModalData`];
    if (dataVariables.value.storeModalData.status == 'success') {
        dataVariables.value.showActionModal = data.isModalVisible;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.storeModalData.html_message, life: 3000 });
        return;
    }
};
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
                <TabPanel v-for="(tab, index) in dataVariables.scrollableTabs" :key="tab.id" :header="tab.label">
                    <div v-if="isTabActive(index)">
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
                            <template #bottomsheet-top>
                                <li class="toggle-btn">
                                    <HeaderLeftSide />
                                </li>
                            </template>
                        </DataTable>
                    </div>
                </TabPanel>
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
@import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';
@import '../../domestic/return-flow/returnFlow.scss';
</style>
