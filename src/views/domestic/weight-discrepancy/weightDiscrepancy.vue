<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import CommonConfirmationModal from './modal/DeleteConfirmationModal.vue';
import DeleteConfirmationModal from '@/components/common-modal-files/DeleteConfirmationModal.vue';

import RaiseDiscrepancy from './modal/raise-discrepancy/raiseDiscrepancy.vue';
import { WEIGHTDISCREPANCY } from '@/store/domestic/weight-discrepancy/constants';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { weightDiscrepancyVariables, filterModal } from './weightDiscrepancyVariable';
import DTWidgets from '@/components/itl-dataTable-files/itl-dataTable/component/DTWidgets.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import ViewDetail from './modal/view-detail/viewDetail.vue';
import HeaderRightSide from './components/HeaderRightSide.vue';

const store = useStore();
const toast = useToast();
const editModal = ref('');
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = weightDiscrepancyVariables;
// const topHeader = JSON.parse(localStorage.getItem('top_header'));
if (!checkUserType('admin') && !checkUserType('subadmin')) {
    dataVariables.value.actionColumnWidth = '195px';
}
// const allFilterData = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getAllFilterData`]);
const getVendorDataStatus = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getVendorStatus`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getExportStatus`]);
const savedFilteredList = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getViewSavedFilteredData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getBillingData`]);
dataVariables.value.getWidgetTitle = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getWidgetTitle`]);
const getPaginatorLastValue = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getPaginatorLastValue`]);
const getVendorModalPayload = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getAllFilterData`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getVendorValues`]);
dataVariables.value.getWidgetValues = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getWidgetValues`]);
const getPaginatorStartValue = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getPaginatorStartValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/getSavedDatatableResponse`]);

const getUpdatedRiseData = async () => {
    dataVariables.value.isRiseDiscrepancy = false;
    dataVariables.value.showActionModal = false;
    await dataTableFncs.getDataTableData();
};
onMounted(() => {
    dataVariables.value.selectedTabHeading = 'Weight Discrepancy';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isActionColumn = true;
    dataVariables.value.changeActionColumn = true;
    dataVariables.value.changeCheckboxColumn = true;
    dataVariables.value.processType = '152';
    dataVariables.value.dtGlobalSearch = 'search_awb_no';
    dataTableFncs.closeAllOverlay();
});

const actionModal = async (data) => {
    dataVariables.value.actionModelTypes = data.modelType;
    editModal.value = '';
    dataVariables.value.discrepancyRowData = data.rowId;
    await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, true);
    if (data.modelType === 'acceptDiscrepancy') {
        dataVariables.value.isAcceptDiscrepancy = true;
        dataVariables.value.isRiseDiscrepancy = false;
        dataVariables.value.isViewDetail = false;
    } else if (data.modelType === 'riseDiscrepancy') {
        const tempData = {
            rowId: data.rowId.row_id,
        };
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getProductDetails`, tempData);
        dataVariables.value.productDetails = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendProductDetails`];
        if (dataVariables.value.productDetails.status == 'Success') {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        } else {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        }
        dataVariables.value.isRiseDiscrepancy = true;
        dataVariables.value.isViewDetail = false;
    } else if (data.modelType === 'editDiscrepancy' || data.modelType === 'review') {
        const tempData = {
            rowId: data.rowId.row_id,
        };
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getEditDiscrepancyData`, tempData);
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getProductDetails`, tempData);
        editModal.value = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendEditDiscrepancyData`];
        dataVariables.value.productDetails = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendProductDetails`];
        if (dataVariables.value.productDetails.status == 'Success') {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        } else {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        }
        dataVariables.value.isRiseDiscrepancy = true;
        dataVariables.value.isViewDetail = false;
    } else if (data.modelType === 'vendorView') {
        dataVariables.value.isRiseDiscrepancy = false;
        dataVariables.value.isViewDetail = true;
        const tempData = {
            rowId: data.rowId.row_id,
        };
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getProductDetails`, tempData);
        dataVariables.value.productDetails = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendProductDetails`];
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getStoreDetails`, tempData);
        dataVariables.value.viewDetailsData = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendStoreDetails`];
        if (dataVariables.value.viewDetailsData.status == 'Success') {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        } else {
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSkeleton`, false);
        }
    } else {
        dataVariables.value.showActionModal = data.isModalVisible;
    }
    if (data.modelType != 'acceptDiscrepancy') {
        dataVariables.value.showActionModal = data.isModalVisible;
    }
};

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
provide('placeholder', 'Search by AWB No.');
onMounted(async () => {
    await dataTableFncs.getAllWidgetTitleData();
    // document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('weight-discrepancy');
    store.commit(`${WEIGHTDISCREPANCY.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    dataVariables.value.columnsOnlyForMasters.push('weight_dispute_date');
    document.querySelector('.p-datatable-thead').classList.add('hidden');
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
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
onBeforeUnmount(() => {
    // document.body.classList.remove('connect-plus-notification-billing-outer');
    dataVariables.value.columnsOnlyForMasters = ['vendor_name'];
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'weight_discrepancy';
    dataVariables.value.syncDateName = 'weight_discrepancy_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(WEIGHTDISCREPANCY.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};
const cancleDiscrepancy = () => (dataVariables.value.isAcceptDiscrepancy = false);
const acceptWeightDescrepency = async () => {
    dataVariables.value.isLoadingSubmit = true;
    const tempData = {
        rowId: dataVariables.value.discrepancyRowData.row_id,
        isAccept: 1,
    };
    await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getRiseDiscrepancyData`, tempData);
    const status = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendRiseDiscrepancyData`];
    dataVariables.value.isLoadingSubmit = false;
    if (status.status == 'Success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: status.html_message, life: 1000 });
        await dataTableFncs.getDataTableData();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: status.html_message, life: 1000 });
    }
    cancleDiscrepancy();
};
const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getSelectedRow`, val);
provide('storeName', WEIGHTDISCREPANCY);
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
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <div class="hidden lg:flex">
                        <HeaderRightSide />
                    </div>
                </template>
            </DTPageHeader>

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
                    :weightUpdateAvail="dataVariables.isWeightUpdateAvail"
                    @default-column-payload="dataTableFncs.defaultCustomizeSize"
                    @get-temp-column="getTempColumn"
                >
                    <template #bottomsheet>
                        <li v-if="checkUserType('admin') || checkUserType('subadmin')" class="p-0 m-0">
                            <HeaderRightSide />
                        </li>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
    <DialogView id="store-action" v-model:visible="dataVariables.showActionModal" :modal="true" :draggable="false" dismissableMask style="z-index: 9999; max-width: 100vw">
        <RaiseDiscrepancy
            v-if="dataVariables.isRiseDiscrepancy"
            :row-data="dataVariables.discrepancyRowData"
            @get-updated-data="getUpdatedRiseData"
            :tempEditModalData="editModal"
            :modalType="dataVariables.actionModelTypes"
            :haveAccessReject="checkAccessRight('weight_discrepancy') ? true : deepCheckAccessRight('domestic', 'weight_discrepancy', 'reject')"
            :haveAccessAccept="checkAccessRight('weight_discrepancy') ? true : deepCheckAccessRight('domestic', 'weight_discrepancy', 'accept')"
        />
        <ViewDetail id="view-details-outer" v-if="dataVariables.isViewDetail" :row-data="dataVariables.discrepancyRowData" />
    </DialogView>
    <CommonConfirmationModal />
    <!-- <DeleteConfirmationModal v-if="dataVariables.isAcceptDiscrepancy" @close-modal="cancleDiscrepancy"
        delete-heading="Accept Weight Discrepancy">
        <template #body>
            <div class="helvetica-regular gray-700">Are you sure ?</div>
        </template>
        <template #deletebtn>
            <button class="accept-btn helvetica-medium gray-700" @click="acceptWeightDescrepency()"
                :disabled="dataVariables.isLoadingSubmit">
                <div v-if="dataVariables.isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon"
                        aria-hidden="true"></i></div>
                <div v-else>Yes, Accept it</div>
            </button>
        </template>
    </DeleteConfirmationModal> -->

    <DeleteConfirmationModal
        v-if="dataVariables.isAcceptDiscrepancy"
        @close-modal="cancleDiscrepancy"
        delete-heading="Accept Weight Discrepancy"
        modalDescription="Are you sure ?"
        :actionBtnHandler="acceptWeightDescrepency"
        actionBtnText="Yes, Delete it"
    >
    </DeleteConfirmationModal>
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
@import './weightDiscrepancy.scss';

#store-action {
    @media screen and (max-width: 767px) {
        width: 100%;
        height: 100%;
        margin: 0px !important;
    }
}

#store-action .p-dialog-header-icons {
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    gap: 8px;
    margin-top: 6px;
}

#store-action .p-dialog .p-dialog-header .p-dialog-header-icon:focus {
    box-shadow: none !important;
}

#store-action .p-dialog .p-dialog-header .p-dialog-header-icon:hover {
    background: transparent !important;
}

#store-action .p-column-title {
    font-size: 10px;

    @include theme() {
        color: theme-get('check-value');
    }
}

#store-action th {
    padding: 6px 16px !important;
}

#store-action .p-datatable-thead > tr {
    font-size: 10px !important;
    background-color: #f4f7f9;
    text-transform: uppercase;
    border-bottom: none !important;
}

#store-action .p-datatable-tbody > tr > td {
    padding: 0.5rem 0.5rem !important;
    color: #0c0c0d;
    border-top: none !important;

    @include theme() {
        border-bottom: 1px solid theme-get('modal-header-border-bottom') !important;
    }

    text-align: center !important;
}

#store-action .p-dialog-content {
    border-radius: 0px !important;
}

#store-action .p-dialog-header {
    padding: 0 !important;
    top: 16px;
    left: 16px;

    @media screen and (max-width: 768px) {
        padding-left: 0 !important;
    }

    position: absolute !important;
    z-index: 99 !important;
}

#store-action .p-dialog-content {
    position: relative;
}

#store-action.p-dialog .p-dialog-content {
    padding: 0px !important;

    @include theme() {
        background: theme-get('dt-save-filter-bg') !important;
    }
}

@media (min-width: 1200px) {
    #store-action {
        min-width: 60%;
    }

    .weightDescripancy .products {
        width: 80%;
    }
}

@media (max-width: 767px) {
    .right-img {
        right: 10px;
        position: relative;
    }
}

@media (max-width: 400px) {
    .main-section .main-saler-weight .sales-content .left-content {
        flex-direction: column;
    }

    .main-section .main-saler-weight .sales-content .left-content .sales-nav.sales-nav.seller-weight {
        margin-right: 0 !important;
        border-right: none !important;
    }
}
</style>
