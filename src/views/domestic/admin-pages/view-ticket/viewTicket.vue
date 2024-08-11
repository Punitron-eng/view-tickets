<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { viewTicketVariables, filterModal, staticTabs } from './viewTicketVariables';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import HeaderRightSide from './components/HeaderRightSide.vue';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import { dataTableVariables } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable';
import ChatTicketModal from './modal/ChatTicketModal.vue';
import TicketRateModal from './modal/TicketRateModal.vue';
import { closeTicketApi, reopenTicketApi, confirmPendingApi, confirmPendingApiForCs, confirmCloseReopenApi } from '@/api/domestic/view-ticket/viewTicketApi';
import ConfirmationModal from '@/components/itl-common-features/ConfirmationModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = viewTicketVariables;
const getVendorDataStatus = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getVendorStatus`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getExportStatus`]);
const savedFilteredList = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getViewSavedFilteredData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getBillingData`]);
const getPaginatorLastValue = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getPaginatorLastValue`]);
const getVendorModalPayload = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getVendorModalPayload`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getAllFilterData`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getVendorValues`]);
const getPaginatorStartValue = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getPaginatorStartValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getUpdatedColumns`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getSaveFilterResponse`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/getSavedDatatableResponse`]);

onMounted(() => {
    dataVariables.value.selectedTabHeading = staticTabs[0].name;
    dataVariables.value.isTabsPresent = true;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = true;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.processType = '152';
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
    (newValue) => {
        newValue?.data?.forEach((item) => {
            if (item.action.actionsAvail.length == 0) {
                dataVariables.value.isActionColumn = false;
            }
        });

        dataTableFncs.getCurrentRoutes();
    }
);
watch(
    () => [dataVariables.value.subTabName, dataVariables.value.selectedTabName],
    () => {
        dataVariables.value.isShowCheckbox = false;
        dataVariables.value.isActionColumn = true;
    }
);
watch(
    () => dataVariables.value.router.currentRoute,
    () => {
        if (dataVariables.value.router.currentRoute.params.tabs == 'open') {
            dataVariables.value.subTabName = 'pending_from_itl';
        } else {
            dataVariables.value.subTabName = '';
        }
    }
);
watch(
    () => savedFilteredList.value,
    (value) => {
        dataVariables.value.savedFilterData = value;
    }
);
watch(
    () => [dataVariables.value.isVisibleConfirmationforVendor, dataVariables.value.isVisibleConfirmationForCs],
    (newValue) => {
        if (newValue[0] || newValue[1]) {
            document.body.classList.add('confirmation-modal');
        } else {
            document.body.classList.remove('confirmation-modal');
        }
    }
);
const newref = ref();
const getTempColumn = (columns) => {
    newref.value = columns;
};
provide('dataTabelColumnData', newref);
provide('placeholder', 'Search By AWB No.');
onMounted(async () => {
    if (!checkAccessRight()) {
        deepCheckAccessRight('domestic', 'support_ticket', 'view');
    }
    dataVariables.value.scrollableTabs = staticTabs;
    dataTableFncs.getSelectedTabOnLoad();
    document.body.classList.add('view-ticket');
    document.body.classList.add('ticket-page-count');
    store.commit(`${NEWVIEWTICKET.NAME}/clearAllFilter`);
    if (dataVariables.value.router.currentRoute.params.tabs == 'open') {
        dataVariables.value.subTabName = 'pending_from_itl';
    } else {
        dataVariables.value.subTabName = '';
    }

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
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'support_ticket';
    dataVariables.value.syncDateName = 'ticket_created_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(NEWVIEWTICKET.NAME);
});
const isTabActive = (index) => index === dataVariables.value.activeTabIndex;
const formatDate = async () => {
    await store.dispatch(`${NEWVIEWTICKET.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

// confirmation modal

// for open confirmation modal
const isOpenConfirmation = ref(false);
const selectedRowId = ref({
    actionType: '',
    rowId: '',
});

const confirmPendingFnc = async () => {
    let result;
    try {
        const reOpenPayload = { ticket_id: selectedRowId.value.rowId, awb_no: selectedRowId.value.selectedRowData.awb_no_logistics };
        result = selectedRowId.value.actionType === 'Close' ? await closeTicketApi(selectedRowId.value.rowId) : await reopenTicketApi(reOpenPayload);
        if (result.status === 'success') {
            toast.add({
                severity: 'success',
                summary: 'Success Message',
                detail: result.message,
                life: 1000,
            });
            isOpenConfirmation.value = !isOpenConfirmation.value;
            await dataTableFncs.getDataTableData();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};

const handleTicketAction = async (data) => {
    console.log(data, 'this is the data ');
    selectedRowId.value = { actionType: data.selectedAction.name, rowId: data.rowId, selectedRowData: data.selectedRowData };
    if (data.selectedAction.name === 'Close') {
        isOpenConfirmation.value = true;
        return;
    } else if (data.selectedAction.name === 'Reopen') {
        isOpenConfirmation.value = true;
        return;
    } else {
        throw new Error('Invalid modal type');
    }
};
const pendingForVendor = ref(''); // for the pending from vendor remark
const confirmPendingFncForVendor = async (ticketId) => {
    try {
        const payload = {
            ticket_id: ticketId,
            pending_from_vendor: 1,
            pending_from_vendor_remark: pendingForVendor.value,
        };
        const result = await confirmPendingApi(payload);
        if (result.status !== 'success') {
            throw new Error(result.message);
        }
        dataVariables.value.isVisibleConfirmationforVendor = false;
        await dataTableFncs.getDataTableData();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};

const pendingForCsRemark = ref('');
const confirmPendingFncForCs = async (ticketId) => {
    try {
        const payload = {
            ticket_id: ticketId,
            remark: pendingForCsRemark.value,
        };
        const result = await confirmPendingApiForCs(payload);
        if (result.status !== 'success') {
            throw new Error(result.message);
        }
        dataVariables.value.isVisibleConfirmationforVendor = false;
        await dataTableFncs.getDataTableData();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};
const closeReopenRemark = ref('');
const closeReopenRemarkSelectedData = ref(null);
const handleCloseReopenConfirmation = async (data) => {
    closeReopenRemarkSelectedData.value = data.selectedRowData;
    dataVariables.value.isVisibleCloseReopenConfirmation = true;
};
const comfirmCloseReopenFnc = async () => {
    try {
        const payload = {
            ticket_id: closeReopenRemarkSelectedData.value.ticket_id,
            awb_no: closeReopenRemarkSelectedData.value.awb_no_logistics,
            remark: closeReopenRemark.value,
        };
        const result = await confirmCloseReopenApi(payload);
        if (result.status !== 'success') {
            throw new Error(result.message);
        }
        dataVariables.value.isVisibleCloseReopenConfirmation = false;
        await dataTableFncs.getDataTableData();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};
const actionModal = async (data) => {
    if (data.selectedAction.name === 'Close' || data.selectedAction.name === 'Reopen') {
        await handleTicketAction(data);
    } else if (data.selectedAction.name === 'Pending From Vendor') {
        dataVariables.value.isVisibleConfirmationforVendor = true;
        dataVariables.value.selectedRowId = data.rowId;
    } else if (data.selectedAction.name === 'Pending From Cs') {
        dataVariables.value.isVisibleConfirmationForCs = true;
        dataVariables.value.selectedRowId = data.rowId;
    } else if (data.selectedAction.name === 'Rate Us') {
        dataVariables.value.isTicketRateModalVisible = true;
        dataVariables.value.selectedTicketId = data.rowId;
    } else if (data.selectedAction.name === 'Close & Reopen') {
        handleCloseReopenConfirmation(data);
    }
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => store.dispatch(`${NEWVIEWTICKET.NAME}/getSelectedRow`, val);
provide('storeName', NEWVIEWTICKET);
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
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <div class="hidden lg:flex lg:items-center tk-create-btn">
                        <HeaderRightSide />
                    </div>
                </template>
            </DTPageHeader>
        </div>
        <div class="section-container view-billing-page-outer-section">
            <div class="section-tabs">
                <TabPanel v-for="(tab, index) in dataTableVariables.scrollableTabs" :key="tab.id" :header="tab.label">
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
                            @action-modal="actionModal"
                            :productDetails="dataVariables.productDetails"
                            @table-row-id="dataTableFncs.tableRowId"
                            :action-column-width="dataVariables.actionColumnWidth"
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
    <ChatTicketModal />
    <TicketRateModal />
    <ConfirmationModal :isVisible="dataVariables.isVisibleConfirmationforVendor" @close-confirmation-modal="() => ((dataVariables.isVisibleConfirmationforVendor = false), (isCheck = false))">
        <template #header> Show Confirmation </template>
        <template #body>
            <p>Changing the status to 'Pending from Vendor' will mark this as 'Pending from Vendor.'</p>
            <BaseTextarea rows="4" cols="50" v-model="pendingForVendor" placeholder="Remark" class="rounded-[4px] w-full py-4" />
        </template>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="small" name="Cancel" :isLoading="false" @click="() => ((dataVariables.isVisibleConfirmationforVendor = false), (isCheck = false))" />
                <BaseButton type="primary" size="medium" name="Submit" :isLoading="false" @click="confirmPendingFncForVendor(dataVariables.selectedRowId)" />
            </div>
        </template>
    </ConfirmationModal>
    <ConfirmationModal :isVisible="dataVariables.isVisibleConfirmationForCs" @close-confirmation-modal="() => ((dataVariables.isVisibleConfirmationForCs = false), (isCheck = false))">
        <template #header> Show Confirmation </template>
        <template #body>
            <div class="flex flex-col items-center justify-center">
                <div class="mb-3">Are you sure you want to mark this ticket as pending from Cs?</div>
                <BaseTextarea rows="4" cols="50" v-model="pendingForCsRemark" placeholder="Remark" class="rounded-[4px]" />
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="small" name="Cancel" :isLoading="false" @click="() => ((dataVariables.isVisibleConfirmationForCs = false), (isCheck = false))" />
                <BaseButton type="primary" size="medium" name="Submit" :isLoading="false" @click="confirmPendingFncForCs(dataVariables.selectedRowId)" />
            </div>
        </template>
    </ConfirmationModal>

    <ConfirmationModal :isVisible="isOpenConfirmation" @close-confirmation-modal="() => (isOpenConfirmation = false)">
        <template #header>
            <span class="font-interSemiBold">
                {{ selectedRowId.actionType === 'Close' ? 'Close Ticket' : 'Reopen Ticket' }}
            </span>
        </template>
        <template #body>
            <p>Are you sure you want to {{ selectedRowId.actionType === 'Close' ? 'close' : 'reopen' }} this ticket?</p>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="small" name="No" :isLoading="false" @click="() => (isOpenConfirmation = false)" />
                <BaseButton type="primary" size="medium" name="Yes" :isLoading="false" @click="confirmPendingFnc" />
            </div>
        </template>
    </ConfirmationModal>

    <ConfirmationModal :isVisible="dataVariables.isVisibleCloseReopenConfirmation" @close-confirmation-modal="(() => (dataVariables.isVisibleCloseReopenConfirmation = false), (closeReopenRemark = ''))">
        <template #header> Close & Reopen Ticket </template>
        <template #body>
            <div class="flex flex-col">
                <div class="mb-3">Are you sure you want to close & reopen this ticket?</div>
                <BaseTextarea rows="4" cols="50" v-model="closeReopenRemark" placeholder="Remark" class="rounded-[4px]" />
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="small" name="Cancel" :isLoading="false" @click="(() => (dataVariables.isVisibleCloseReopenConfirmation = false), (closeReopenRemark = ''))" />
                <BaseButton type="primary" size="medium" name="Submit" :isLoading="false" @click="comfirmCloseReopenFnc" />
            </div>
        </template>
    </ConfirmationModal>
</template>
<style lang="scss">
@import '@/components/itl-dataTable-files/itl-dataTable/commonDataTable.scss';
@import './viewTicket.scss';
</style>
