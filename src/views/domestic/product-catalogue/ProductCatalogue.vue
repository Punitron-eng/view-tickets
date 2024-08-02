<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import { productCatalogueVariable, filterModal } from './productCatalogue';
import DataTable from '@/components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { ref, computed, watch, onMounted, onBeforeUnmount, provide, onBeforeMount } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import HeaderLeftSide from './components/HeaderLeftSide.vue';
import ProductModalV1 from './modal/productModalV1.vue';
import DTPageHeader from '@/components/itl-dataTable-files/itl-dataTable/component/DTPageHeader.vue';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal.vue';
import OtherActions from './components/OtherActions.vue';
import AddProductBtn from './components/AddProductBtn.vue';
import ChannelDropdown from './components/ChannelDropdown.vue';
import StoreDropdown from './components/StoreDropdown.vue';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
import config from '../../../util/config';

const store = useStore();
const toast = useToast();
const emitter = useEmitter();
const filterModalData = filterModal;
const dataVariables = productCatalogueVariable;
const getPaginatorStartValue = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getPaginatorLastValue`]);
const savedFilteredList = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getViewSavedFilteredData`]);
const getVendorModalPayload = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getVendorStatus`]);
dataVariables.value.allFilterData = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getAllFilterData`]);
dataVariables.value.dataTableData = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getBillingData`]);
dataVariables.value.getMappedFilterValue = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getMappedFilterValue`]);
dataVariables.value.getUpdatedColumns = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getUpdatedColumns`]);
dataVariables.value.getUpdatedSizePayload = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getUpdatedSizePayload`]);
dataVariables.value.savedDatatableResponse = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getSavedDatatableResponse`]);
dataVariables.value.saveFilterResponse = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getSaveFilterResponse`]);
dataVariables.value.exportStatus = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getExportStatus`]);
dataVariables.value.getVendorValues = computed(() => store.getters[`${PRODUCTCATALOGUE.NAME}/getVendorValues`]);
onMounted(() => {
    document.body.classList.add('product-catalogue');
    dataVariables.value.selectedTabHeading = 'Product Catalogue';
    dataVariables.value.isTabsPresent = false;
    dataVariables.value.isWidgetAvail = false;
    dataVariables.value.isUniversalSearchAvail = true;
    dataVariables.value.isUniversalDateAvail = true;
    dataVariables.value.isUniversalFilterAvail = true;
    dataVariables.value.isCustomizeColumnAvail = true;
    dataVariables.value.isShowCheckbox = true;
    dataVariables.value.isActionColumn = true;
    dataVariables.value.changeActionColumn = true;
    dataVariables.value.changeCheckboxColumn = true;
    dataVariables.value.hiddenClass = 'hidden';
    dataVariables.value.processType = '169';
    dataVariables.value.dtGlobalSearchId = 'product_sku';
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
    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('checkout-store');
    store.commit(`${PRODUCTCATALOGUE.NAME}/clearAllFilter`);
    if (!dataVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(dataVariables.value.saveFilterID);
    }
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await formatDate();
    if (!dataVariables.value.router.currentRoute.params.id) {
        await Promise.all([dataTableFncs.getDataTableData(), dataTableFncs.getDataTableDataCount()]);
    }
    if (checkUserType('subadmin') || checkUserType('admin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }
    dataVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
    const apiResponse = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/fetchCategories`);
    if (apiResponse.status == 'Success') {
        dataVariables.value.productCategoryOptions = apiResponse.data;
    }
});
onBeforeUnmount(() => {
    document.body.classList.remove('connect-plus-notification-billing-outer');
    window.location.reload();
});
onBeforeMount(async () => {
    dataVariables.value.moduleName = 'product_catalogue';
    dataVariables.value.syncDateName = 'product_last_updated_date';
    dataTableFncs.getCurrentRoutes();
    await dataTableFncs.getCurrentModuleStoreName(PRODUCTCATALOGUE.NAME);
});
const formatDate = async () => {
    await store.dispatch(`${PRODUCTCATALOGUE.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
};

const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const setExportValue = (val) => {
    store.dispatch(`${PRODUCTCATALOGUE.NAME}/getSelectedRow`, val);
    dataVariables.value.productCategory = { id: '', vallue: '' };
    dataVariables.value.selectedCheckBoxes = val;
};
provide('storeName', PRODUCTCATALOGUE);
provide('placeholder', 'Search by Product SKU');
onMounted(() => {
    dataVariables.value.toast = toast;
    emitter.on('clearBtnFilter', (data) => {
        if (data == 'vendor_name') {
            productCatalogueVariable.value.store = '';
            productCatalogueVariable.value.storeOptions = [];
            const tempFormat2 = ['' + ',' + ''];
            const data2 = [
                {
                    type: 'multiSelect',
                    store: tempFormat2,
                },
            ];
            store.commit(`${PRODUCTCATALOGUE.NAME}/setFilterValueData`, data2);
        }
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

const getUpdatedData = async () => {
    dataVariables.value.showProductModel = false;
    await dataTableFncs.getDataTableData();
};

const updateByCategoryMaster = async () => {
    if (checkUserType('subadmin') && dataVariables.value.getVendorValues.id.length != 1) {
        toast.add({ severity: 'error', detail: `Only One Vendor Should be Selected`, life: 3000 });
        return;
    }
    if (!dataVariables.value.productCategory.id) {
        toast.add({ severity: 'error', detail: `Select Atleast one category`, life: 3000 });
        return;
    }
    dataVariables.value.isLoading = true;
    const res = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/updateByCategoryMaster`, {
        selectedCheckBoxes: dataVariables.value.selectedCheckBoxes,
        platform_id: dataVariables.value.channel.id,
        store_id: dataVariables.value.store.id || '',
        productCategory: dataVariables.value.productCategory.id,
        vendor_id: dataVariables.value.getVendorValues.id,
    });
    dataVariables.value.isLoading = false;
    if (res.status == 'success') {
        await dataTableFncs.getDataTableData();
        window.open(config.baseUrlPanel + 'view-bg-process-v3', '_blank');
    }
};

watch(
    () => dataVariables.value.showProductModel,
    () => {
        dataVariables.value.showImageError = false;
    }
);
const actionModal = async (data) => {
    dataVariables.value.rowIdValue = data.rowId;
    if (data.selectedAction.name == 'View') {
        dataVariables.value.modalType = 'view';
        dataVariables.value.showProductModel = true;
    } else if (data.selectedAction.name == 'Edit') {
        dataVariables.value.modalType = 'edit';
        dataVariables.value.showProductModel = true;
    }
};
</script>
<template>
    <div class="widget-overlay" v-if="dataVariables.isDivVisible" />
    <div class="wrapper mt-0">
        <div class="page-header-section px-2" :class="dataVariables.isWidgetAvail ? '' : 'mb-3'">
            <DTPageHeader :headerText="dataVariables.selectedTabHeading">
                <template #right-side>
                    <OtherActions />
                </template>
            </DTPageHeader>
            <!-- <DTWidgets /> -->
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
                    <template #bottomsheet>
                        <li class="p-0 m-0">
                            <AddProductBtn />
                        </li>
                        <li v-if="productCatalogueVariable.channelOptions.length != 0" class="p-0 m-0">
                            <ChannelDropdown />
                        </li>
                        <li v-if="productCatalogueVariable.storeOptions.length != 0" class="p-0 mt-2">
                            <StoreDropdown />
                        </li>
                    </template>
                    <template #strip-left-side>
                        <div class="flex items-center">
                            <BaseDropdown
                                id="categoryDropdown"
                                filter
                                placeholder="Select Category"
                                :options="dataVariables.productCategoryOptions"
                                @listenDropdownChange="(val) => (dataVariables.productCategory = val)"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />
                            <!-- <button @click="updateByCategoryMaster()"
                            class="bg-[#1279ff] text-[#fff] ml-3 px-2 py-1 h-8 rounded-md">Update</button> -->
                            <button @click="updateByCategoryMaster()" :disabled="dataVariables.isLoading" class="bg-[#1279ff] text-[#fff] ml-3 px-2 py-1 h-8 rounded-md w-[60px]" :class="dataVariables.isLoading ? 'pointer-events-none' : ''">
                                <div v-if="dataVariables.isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                                <span v-else>Update</span>
                            </button>
                        </div>
                    </template>
                </DataTable>
                <ProductModalV1
                    v-model:visible="dataVariables.showProductModel"
                    :rowId="dataVariables.rowIdValue"
                    :modalType="dataVariables.modalType"
                    :showModal="dataVariables.showProductModel"
                    :categoryData="dataVariables.productCategoryOptions"
                    @get-updated-data="getUpdatedData()"
                    @close-modal="dataVariables.showProductModel = false"
                />
            </div>
        </div>
    </div>
    <DeleteConfirmationModal />
    <VendorModalDatatable
        id="dt-vendor-modal"
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
@import './productCatalogue.scss';
</style>
