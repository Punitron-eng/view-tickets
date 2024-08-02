<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { ABANDONEDCART } from '@/store/checkout/abandoned-cart/constants';
import { checkoutStoreVariable, filterModal } from './abandonedCart.js';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import StoreCartModal from './modal/StoreCartModal.vue';
const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = checkoutStoreVariable;
const getPaginatorStartValue = computed(() => store.getters[`${ABANDONEDCART.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${ABANDONEDCART.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${ABANDONEDCART.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${ABANDONEDCART.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${ABANDONEDCART.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${ABANDONEDCART.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${ABANDONEDCART.NAME}/getBillingData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${ABANDONEDCART.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${ABANDONEDCART.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${ABANDONEDCART.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${ABANDONEDCART.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${ABANDONEDCART.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${ABANDONEDCART.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${ABANDONEDCART.NAME}/getVendorValues`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${ABANDONEDCART.NAME}/getWidgetTitle`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${ABANDONEDCART.NAME}/getWidgetValues`]);
const storeId = computed(() => store.getters[`${ABANDONEDCART.NAME}/sendStoreId`]);

onMounted(() => {
    dataVariables.value.dtGlobalSearchId = 'cart_id';
    dataVariables.value.selectedTabHeading = 'Abandoned Checkout';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.changeActionColumn = true;
    dataVariables.value.changeCheckboxColumn = true;
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isActionColumn = true;
    dataVariables.value.processType = '154';
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
    await dataTableFncs.getAllWidgetTitleData();
    document.body.classList.add('checkout-aband');
    store.commit(`${ABANDONEDCART.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    if (checkUserType('vendor')) {
        await getStoreDetails();
    }
    await formatDate();
    // await dataTableFncs.getDataTableData();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await Promise.all([dataTableFncs.getDataTableData(), dataTableFncs.getDataTableDataCount()]); // using promise all to wait for both promises to resolve
    }
    if (checkUserType('admin') || checkUserType('subadmin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }

    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
});

const getStoreDetails = async () => {
    await store.dispatch(`${ABANDONEDCART.NAME}/getStoreDetails`);
    dataVariables.value.dropdownStoreDetails = store.getters[`${ABANDONEDCART.NAME}/sendStoreDetails`];
    if (dataVariables.value.dropdownStoreDetails?.length > 0) {
        dataVariables.value.selectedSetting = dataVariables.value.dropdownStoreDetails[0].id;
    } else {
        dataVariables.value.selectedSetting = '';
    }
};
onBeforeUnmount(() => {
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'checkout_abandoned';
    dataVariables.value.syncDateName = 'order_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(ABANDONEDCART.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${ABANDONEDCART.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const actionModal = async (data) => {
    const tempData = {
        rowId: data.rowId,
        storeId: storeId.value,
    };
    await store.dispatch(`${ABANDONEDCART.NAME}/getAbandonedModalData`, tempData);
    await store.dispatch(`${ABANDONEDCART.NAME}/getProductDetails`, tempData);
    dataVariables.value.productDetails = store.getters[`${ABANDONEDCART.NAME}/sendProductDetails`].all_product_data_array;
    dataVariables.value.abandonedModalData = store.getters[`${ABANDONEDCART.NAME}/sendAbandonedModalData`];
    if (dataVariables.value.abandonedModalData.status == 'success') {
        dataVariables.value.showActionModal = data.isModalVisible;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.abandonedModalData.html_message, life: 3000 });
        return;
    }
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${ABANDONEDCART.NAME}/getSelectedRow`, val);
provide('storeName', ABANDONEDCART);
provide('placeholder', 'Search by Cart ID');
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
                    <template #bottomsheet v-if="checkUserType('vendor')">
                        <li class="p-0 m-0">
                            <HeaderLeftSide />
                        </li>
                    </template>
                </DataTable>
                <StoreCartModal />
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
@import './abandonedCart.scss';
</style>
./abandonedCart.js
