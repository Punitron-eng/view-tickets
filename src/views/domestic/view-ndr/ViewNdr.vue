<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { VIEWNDR } from '@/store/domestic/view-ndr/constants';
import { viewNdrVariables, filterModal, staticTabs } from './viewNdr.js';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import EscalateModal from './modal/EscalateModal.vue';
import AttemptHistoryModal from './modal/AttemptHistoryModal.vue';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = viewNdrVariables;
const getVendorDataStatus = computed(() => store.getters[`${VIEWNDR.NAME}/getVendorStatus`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${VIEWNDR.NAME}/getBillingData`]);
const savedFilteredList = computed(() => store.getters[`${VIEWNDR.NAME}/getViewSavedFilteredData`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${VIEWNDR.NAME}/getExportStatus`]);
const getPaginatorLastValue = computed(() => store.getters[`${VIEWNDR.NAME}/getPaginatorLastValue`]);
const getVendorModalPayload = computed(() => store.getters[`${VIEWNDR.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${VIEWNDR.NAME}/getAllFilterData`]);
const getPaginatorStartValue = computed(() => store.getters[`${VIEWNDR.NAME}/getPaginatorStartValue`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${VIEWNDR.NAME}/getVendorValues`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${VIEWNDR.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${VIEWNDR.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${VIEWNDR.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${VIEWNDR.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${VIEWNDR.NAME}/getSavedDatatableResponse`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = staticTabs[0].name;
    dataVariables.value.isTabsPresent = true;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.changeCheckboxColumn = true;
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
onMounted(async () => {
    await dataTableFncs.getCurrentRoutes();
    dataVariables.value.scrollableTabs = staticTabs;
    dataVariables.value.selectedTabName = staticTabs[0].value;
    dataVariables.value.router.replace({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-') } });

    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('ndr');
    store.commit(`${VIEWNDR.NAME}/clearAllFilter`);
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
});
onBeforeUnmount(() => {
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'ndr';
    dataVariables.value.syncDateName = 'ndr_date';
    await dataTableFncs.getCurrentModuleStoreName(VIEWNDR.NAME);
    dataTableFncs.getCurrentRoutes();
});
const isTabActive = (index) => index === dataVariables.value.activeTabIndex;

const formatDate = async () => {
    await store.dispatch(`${VIEWNDR.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};
const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${VIEWNDR.NAME}/getSelectedRow`, val);
provide('storeName', VIEWNDR);
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
    <div class="wrapper mt-0">
        <div class="page-header-section mb-3">
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <div class="flex gap-4">
                        <EscalateModal />
                        <AttemptHistoryModal />
                    </div>
                </template>
            </DTPageHeader>
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
@import './viewNdr.scss';
</style>
