<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { VIEWORDER } from '@/store/domestic/view-order/constants';
import { DARKMODE } from '@/store/dark-mode/constants';
import { viewOrderVariables, filterModal, mounted1, mounted2, getManifestData } from './viewOrder';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import getImg from '../../../util/getImg';
import DataTableWithScroller from './components/DataTableWithScroller.vue';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const route = useRoute();
const filterModalData = filterModal;
const dataVariables = viewOrderVariables;

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getVendorDataStatus = computed(() => store.getters[`${VIEWORDER.NAME}/getVendorStatus`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${VIEWORDER.NAME}/getBillingData`]);
const savedFilteredList = computed(() => store.getters[`${VIEWORDER.NAME}/getViewSavedFilteredData`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${VIEWORDER.NAME}/getExportStatus`]);
const getPaginatorLastValue = computed(() => store.getters[`${VIEWORDER.NAME}/getPaginatorLastValue`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${VIEWORDER.NAME}/getWidgetTitle`]); // for the widget Title
const getVendorModalPayload = computed(() => store.getters[`${VIEWORDER.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${VIEWORDER.NAME}/getAllFilterData`]);
const getPaginatorStartValue = computed(() => store.getters[`${VIEWORDER.NAME}/getPaginatorStartValue`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${VIEWORDER.NAME}/getWidgetValues`]); // for the widget value
dataVariables.value.getVendorValues = computed(() => store.getters[`${VIEWORDER.NAME}/getVendorValues`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${VIEWORDER.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${VIEWORDER.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${VIEWORDER.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${VIEWORDER.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${VIEWORDER.NAME}/getSavedDatatableResponse`]);
const storeId = computed(() => store.getters[`${VIEWORDER.NAME}/sendStoreId`]);

onMounted(() => {
    mounted1();
    dataVariables.value.dtGlobalSearch = 'search';
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isWidgetAvail = true;
});

watch(
    () => dataVariables.value.selectedTabName,
    async (value) => {
        dataVariables.value.isShowCheckbox = true;
        if (value === 'manifest') {
            dataVariables.value.dataTableSideBar = true;
            const payload = { limit: 10, start: 0, type: 1, vendor_id: 7214, search_manfest_id: '' };
            const result = await getManifestData(payload);
            if (result.status === 'success') {
                dataVariables.value.dataTableManifestData = result.temp_all_order_data_array;
            } else {
                toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 3000 });
            }
        } else {
            dataVariables.value.dataTableSideBar = false;
        }
    }
);
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
    () => route.params.tabs,
    async (value) => {
        if(value != 'store-order') dataVariables.value.isWidgetAvail = false;
        else dataVariables.value.isWidgetAvail = true;
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
    await mounted2(store, VIEWORDER, savedFilteredList);
    await dataTableFncs.getAllWidgetTitleData(); // for the widgets
});
onBeforeUnmount(() => {
    // document.body.classList.remove('connect-plus-notification-billing-outer');
    document.body.classList.remove('view-order-domestic');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'order';
    dataVariables.value.syncDateName = 'order_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(VIEWORDER.NAME);
});

const isTabActive = (index) => index === dataVariables.value.activeTabIndex;

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${VIEWORDER.NAME}/getSelectedRow`, val);
provide('storeName', VIEWORDER);
onMounted(() => {
    dataVariables.value.toast = toast;
    emitter.on('clearBtnFilter', (data) => {
        dataTableFncs.clearFilter(data);
    });
    emitter.on('clearGroupFilter', (data) => {
        dataTableFncs.clearGroupFilter(data);
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
const actionModal = async (data) => {
    const tempData = {
        rowId: data.rowId,
        storeId: storeId.value,
    };
    await store.dispatch(`${VIEWORDER.NAME}/getStoreModalData`, tempData);
    await store.dispatch(`${VIEWORDER.NAME}/getProductDetails`, tempData);
    dataVariables.value.productDetails = store.getters[`${VIEWORDER.NAME}/sendProductDetails`].all_product_data_array;
    dataVariables.value.storeModalData = store.getters[`${VIEWORDER.NAME}/sendStoreModalData`];
    if (dataVariables.value.storeModalData.status == 'success') {
        dataVariables.value.showActionModal = data.isModalVisible;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.storeModalData.html_message, life: 3000 });
        return;
    }
};
</script>
<template>
    <div class="widget-overlay" v-if="dataVariables.isDivVisible"></div>
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
                            <template #dataTable-left-side-section v-if="dataVariables.dataTableSideBar">
                                <DataTableWithScroller borderClass="noBorder"> </DataTableWithScroller>
                            </template>
                            <template #DataTable-header-left-side v-if="dataVariables.selectedTabName === 'manifest'">
                                <button @click="() => (dataVariables.dataTableSideBar = !dataVariables.dataTableSideBar)" class="mr-2">
                                    <img :src="getImg('menifest-menu-btn', darkModeVal)" />
                                </button>
                            </template>
                        </DataTable>
                    </div>
                </TabPanel>
                <!-- <StoreOrderModal /> -->
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
@import './viewOrder.scss';
</style>
