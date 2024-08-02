<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { RETURN } from '@/store/domestic/return-flow/constants';
import ViewDetailModal from './modal/ViewDetailModal.vue';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import HeaderRightSide from './components/HeaderRightSide.vue';
import { returnFlowVariables, filterModal } from './returnFlow';
import PageHeaderContent from './components/PageHeaderContent.vue';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import SelectCourierModal from '@/components/dt-filters/SelectCourierModal.vue';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkAccessRight, deepCheckAccessRight, checkUserType } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import { dataTableVariables as commonDtVariables } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable';

const store = useStore();
const route = useRoute();
const toast = useToast();
const emitter = useEmitter();

const filterModalData = filterModal;
const dataVariables = returnFlowVariables;
// const topHeader = JSON.parse(localStorage.getItem('top_header'));
const getVendorDataStatus = computed(() => store.getters[`${RETURN.NAME}/getVendorStatus`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${RETURN.NAME}/getBillingData`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${RETURN.NAME}/getExportStatus`]);
const savedFilteredList = computed(() => store.getters[`${RETURN.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${RETURN.NAME}/getVendorModalPayload`]);
const getPaginatorLastValue = computed(() => store.getters[`${RETURN.NAME}/getPaginatorLastValue`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${RETURN.NAME}/getAllFilterData`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${RETURN.NAME}/getVendorValues`]);
const getPaginatorStartValue = computed(() => store.getters[`${RETURN.NAME}/getPaginatorStartValue`]);
dataVariables.value.warehouseData = computed(() => store.getters[`${RETURN.NAME}/getStripWarehouseData`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${RETURN.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${RETURN.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${RETURN.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${RETURN.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${RETURN.NAME}/getSavedDatatableResponse`]);

onMounted(() => {
    dataVariables.value.isTabsPresent = true;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isActionColumn = true;
    dataVariables.value.changeActionColumn = true;
    dataVariables.value.changeCheckboxColumn = true;
    dataVariables.value.processType = '164';
    dataVariables.value.dtGlobalSearch = 'search_awb_no';
    dataTableFncs.closeAllOverlay();
});
watch(
    () => dataVariables.value.savedFiltervalue,
    () => dataTableFncs.showSelectedSaveFilter()
);
watch(
    () => route.params.tabs,
    async (value) => {
        dataVariables.value.isWeightUpdateAvail = value === 'rev-return-request';
        dataVariables.value.syncDateName = dataVariables.value.selectedTabName == 'rev_return_request' ? 'return_requested_date' : 'order_date';
        const checkTabChangeFromMenu = store.getters[`${RETURN.NAME}/getTabChangeInfo`];
        if (checkTabChangeFromMenu) {
            const tabValue = value.replace(/-/g, '_');
            const data = commonDtVariables.value.scrollableTabs.find((item) => item.value === tabValue);
            await dataTableFncs.getActiveTab(data);
        }
        await dataTableFncs.warehouseApi();
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
watch(
    () => dataVariables.value.subTabName,
    (value) => {
        dataVariables.value.changeActionColumn = value == 'rejected' ? false : true;
        dataVariables.value.isActionColumn = value == 'rejected' ? false : true;
        dataVariables.value.isShowCheckbox = true;
    }
);
const newref = ref();
const getTempColumn = (columns) => {
    newref.value = columns;
};
provide('dataTabelColumnData', newref);
provide('placeholder', 'Search by AWB No.');
onMounted(async () => {
    dataVariables.value.moduleName = 'reverse_order';
    await dataTableFncs.getCurrentModuleStoreName(RETURN.NAME);
    await dataTableFncs.callDtTabs();
    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('return-flow');
    store.commit(`${RETURN.NAME}/clearAllFilter`);
    dataVariables.value.syncDateName = dataVariables.value.selectedTabName == 'rev_return_request' ? 'return_requested_date' : 'order_date';
    await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    // store.commit(`${RETURN.NAME}/setStoreVariables`, dataVariables.value.storeFilterVariables)
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch(`${RETURN.NAME}/getPaginatorStart`, 0);
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
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(() => {
    dataTableFncs.getCurrentRoutes();
});
const isTabActive = (index) => index === dataVariables.value.activeTabIndex;
const formatDate = async () => {
    await store.dispatch(`${RETURN.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${RETURN.NAME}/getSelectedRow`, val);
provide('storeName', RETURN);
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
    emitter.on('removeSaveFilter', (pinID) => {
        dataTableFncs.removeSaveFilter();
    });
    emitter.on('updateWeightData', (payload) => {
        dataTableFncs.weightUpdateApi(payload);
    });
});
const actionModal = async (data) => {
    if (data.selectedAction.link) {
        window.open(data.selectedAction.link, '_blank');
    } else {
        let tempModalType = '';
        if (data.selectedAction.name == 'Pick Now') {
            dataVariables.value.showPickNowModal = true;
            dataVariables.value.skeletonDataValue = true;
            data['courierPriority'] = dataVariables.value.courierPriority;
            data['tabName'] = dataVariables.value.selectedTabName;
            data['changeCourierPriority'] = dataVariables.value.changeCourierPriority;
            data['appliedWeight'] = dataVariables.value.appliedWeight;
            data['shipLength'] = dataVariables.value.shipLength;
            data['shipWidth'] = dataVariables.value.shipWidth;
            data['shipHeight'] = dataVariables.value.shipHeight;
            data['deliveredId'] = 0;
            await store.dispatch(`${RETURN.NAME}/getPickNowDetails`, data);
            const result = store.getters[`${RETURN.NAME}/getPickNowDetails`];
            if (result.status == 'success') {
                dataVariables.value.skeletonDataValue = false;
            } else {
                dataVariables.value.skeletonDataValue = false;
            }
        } else if (data.selectedAction.name == 'Reject') {
            dataVariables.value.showRejectModal = true;
        } else if (data.selectedAction.name == 'Cancel') {
            dataVariables.value.showCancelModal = true;
            await getDataTableData();
        } else if (data.selectedAction.name == 'Edit') {
            dataVariables.value.showProductModel = true;
        } else {
            dataVariables.value.skeletonDataValue = true;
            dataVariables.value.showActionModal = true;
            data['selectedTab'] = dataVariables.value.selectedTabName;
            data['moduleName'] = 'reverse_order';
            const productData = {
                rowId: data.rowId,
                moduleName: 'reverse_order',
                selectedTab: dataVariables.value.selectedTabName,
            };
            await store.dispatch(`${RETURN.NAME}/getProductDetails`, productData);
            await store.dispatch(`${RETURN.NAME}/getViewDetails`, data);
            //  add the activity api
            await store.dispatch(`${RETURN.NAME}/getviewDetailModal`, productData);
            const result = store.getters[`${RETURN.NAME}/getViewDetails`];
            if (result.status == 'success') {
                dataVariables.value.skeletonDataValue = false;
            } else {
                dataVariables.value.toast.add({ severity: 'error', summary: 'Error', detail: result.html_message, life: 1000 });
            }
            if (dataVariables.value.selectedTabName == 'rev-return-request') {
                data['courierPriority'] = dataVariables.value.courierPriority;
                data['tabName'] = dataVariables.value.selectedTabName;
                data['changeCourierPriority'] = dataVariables.value.changeCourierPriority;
                data['appliedWeight'] = dataVariables.value.appliedWeight;
                data['shipLength'] = dataVariables.value.shipLength;
                data['shipWidth'] = dataVariables.value.shipWidth;
                data['shipHeight'] = dataVariables.value.shipHeight;
                data['deliveredId'] = 0;
                await store.dispatch(`${RETURN.NAME}/getPickNowDetails`, data);
            }
        }
    }
};
</script>
<template>
    <div class="widget-overlay" v-if="dataVariables.isDivVisible"></div>
    <div class="wrapper mt-0">
        <div class="page-header-section mb-3">
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <PageHeaderContent />
                </template>
            </DTPageHeader>
        </div>
        <div class="section-container view-billing-page-outer-section">
            <div class="section-tabs">
                <TabPanel v-for="(tab, index) in commonDtVariables.scrollableTabs" :key="tab.id" :header="tab.label">
                    <div v-if="isTabActive(index)">
                        {{ console.log(dataVariables.totalRecords, 'hello world') }}
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
                                <HeaderLeftSide />
                            </template>
                            <template #bottomsheet-top>
                                <li class="toggle-btn">
                                    <HeaderLeftSide />
                                </li>
                            </template>
                            <template #header-right-side>
                                <HeaderRightSide />
                            </template>

                            <template #return-dropDown v-if="dataVariables.subTabName == 'requested' && (checkAccessRight() ? true : deepCheckAccessRight('domestic', 'reverse_order', 'pick_now'))">
                                <div
                                    class="w-full gap-4 flex items-center justify-between md:!justify-end"
                                    :class="((checkUserType('admin') || checkUserType('subadmin')) && dataVariables.getVendorValues.id?.length == 1) || checkUserType('vendor') ? 'flex' : 'hidden'"
                                >
                                    <Dropdown
                                        id="return-flow-strip"
                                        v-model="dataVariables.selectedWareHouse"
                                        :options="dataVariables.warehouseData?.warehouseStripData?.data_arr"
                                        optionLabel="company_name"
                                        class="max-h-[32px] w-[70%] md:w-[208px] bg-transparent border-[#4c545d] rounded-[4px]"
                                        placeholder="Select Warehouse"
                                        filter
                                    >
                                    </Dropdown>
                                    <button @click="dataTableFncs.pickNowSubmitData" class="bg-[#1279ff] w-max min-w-[89px] md:max-h-[32px] text-[14px] text-center px-[8px] md:px-[16px] py-[4px] rounded-[4px]">
                                        <div v-if="dataVariables.isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                                        <span v-else> Pick Now </span>
                                    </button>
                                </div>
                            </template>
                        </DataTable>
                        <ViewDetailModal />
                        <SelectCourierModal v-model:visible="dataVariables.showPickNowModal" :skeletonData="dataVariables.skeletonDataValue" @pickclose-modal="dataTableFncs.closePickModal" :rowId="dataVariables.rowIdValue" />
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
// @import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';;
@import './returnFlow.scss';
</style>
