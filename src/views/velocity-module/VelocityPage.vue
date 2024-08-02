<script setup>
import { viewBillingVariables, filterModal } from './VelocityPage';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { VELOCITY } from '@/store/velocity-page/constants';
import DataTable from '../../components/itl-dataTable-files/itl-dataTable/DataTable.vue';
import DateTimeRangePicker from '@/components/itl-common-features/itl-date-range-picker/dataTable-dateRange/DateTimeRangePicker.vue';
import OverlayPanel from 'primevue/overlaypanel';
import VendorModalDatatable from '@/components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import DialogView from 'primevue/dialog';
// import MoreFilter from '@/components/itl-common-features/itl-more-filter/MoreFilters.vue';
import DeleteConfirmationModal from '@/components/common-modal-files/DeleteConfirmationModal.vue';
import Listbox from 'primevue/listbox';
import BottomSheet from '../../components/itl-common-features/itl-bottomSheet/BottomSheet.vue';
import { format } from 'date-fns';

const dataTableWidth = ref('');
const columnWidth = ref('');

const topHeader = JSON.parse(localStorage.getItem('top_header'));
const connectPlusAccess = JSON.parse(localStorage.getItem('connect_plus_access_right'));
const filterModalData = filterModal;
const dataVariables = viewBillingVariables;
const store = useStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const viewSaveFilter = ref(null);
const saveFilterID = ref('');

const allFilterData = computed(() => store.getters[`${VELOCITY.NAME}/getAllFilterData`]);
const velocityData = computed(() => store.getters[`${VELOCITY.NAME}/getVelocityData`]);
const getPaginatorStartValue = computed(() => store.getters[`${VELOCITY.NAME}/getPaginatorStartValue`]);
const getPaginatorLastValue = computed(() => store.getters[`${VELOCITY.NAME}/getPaginatorLastValue`]);
const getMappedFilterValue = computed(() => store.getters[`${VELOCITY.NAME}/getMappedFilterValue`]);
const getUpdatedColumns = computed(() => store.getters[`${VELOCITY.NAME}/getUpdatedColumns`]);
const getUpdatedSizePayload = computed(() => store.getters[`${VELOCITY.NAME}/getUpdatedSizePayload`]);
const exportStatus = computed(() => store.getters[`${VELOCITY.NAME}/getExportStatus`]);
const getVendorValues = computed(() => store.getters[`${VELOCITY.NAME}/getVendorValues`]);
const getVendorModalPayload = computed(() => store.getters[`${VELOCITY.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${VELOCITY.NAME}/getVendorStatus`]);

const getDataTableColumns = computed(() => {
    return dataVariables.value.dataTableColumns
        .map((item) => {
            // if (item.field === 'vendor_name') {
            //     item.filterIcon = 'th-vendor';
            //     const showVendorNameColumn = topHeader.is_subadmin;
            //     if (showVendorNameColumn !== 1) {
            //         return null;
            //     }
            // }
            if (item.field === 'applied_on' && allFilterData.value && allFilterData.value[item.field] && allFilterData.value[item.field].value) {
                dataVariables.value.startDate = allFilterData.value[item.field].value.split(' ');
            }
            if (item.is_visible == 1) {
                item.is_visible = true;
            } else {
                item.is_visible = false;
            }
            const field = item.field;
            const appliedFilter = allFilterData.value && allFilterData.value[field] ? allFilterData.value[field] : null;
            const appliedSort = allFilterData.value && allFilterData.value[field + '_sort'] ? allFilterData.value[field + '_sort'] : 'none';

            const temp = { ...item, width: `${columnWidth.value}px`, filterValue: appliedFilter, sortValue: appliedSort };
            return temp;
        })
        .filter((column) => column !== null);
});
const computedSplitValues = computed(() => {
    return dataVariables.value.startDate;
});
const getTempDataTableColumns = computed(() => {
    return dataVariables.value.tempDataTableColumns
        .map((item) => {
            if (item.field === 'vendor_name') {
                item.filterIcon = 'th-vendor';
                const showVendorNameColumn = topHeader.user_type;
                if (showVendorNameColumn != 1 && showVendorNameColumn != 1) {
                    return null;
                }
            }
            if (item.is_visible == 1) {
                item.is_visible = true;
            } else {
                item.is_visible = false;
            }

            const field = item.field;
            const appliedFilter = allFilterData.value && allFilterData.value[field] ? allFilterData.value[field] : null;
            const appliedSort = allFilterData.value && allFilterData.value[field + '_sort'] ? allFilterData.value[field + '_sort'] : 'none';

            const temp = { ...item, filterValue: appliedFilter, sortValue: appliedSort };
            return temp;
        })
        .filter((column) => column !== null);
});
watch(
    () => dataVariables.value.savedFiltervalue,
    () => showSelectedSaveFilter()
);
watch(velocityData, () => {
    if (dataVariables.value.filterFields.some((field) => getMappedFilterValue.value[field] !== '')) {
        const windowHeight = window.innerHeight - 220;
        document.querySelector('.datatable-wrapper').style.height = 'calc(' + windowHeight + 'px - 73px)';
    } else {
        const windowHeight = window.innerHeight - 180;
        document.querySelector('.datatable-wrapper').style.height = 'calc(' + windowHeight + 'px - 73px)';
    }
});
watch(allFilterData, () => {
    dataVariables.value.orderSearch = allFilterData.value.search;
    if (dataVariables.value.orderSearch !== '') {
        dataVariables.value.hiddenClass = '';
    } else {
        dataVariables.value.hiddenClass = 'hidden';
    }
});

onMounted(async () => {
    store.commit(`${VELOCITY.NAME}/clearAllFilter`);
    await getColumnData();
    // await getVelocityData();
    // await getVelocityData();
    // document.querySelector('.p-datatable-thead').classList.add('hidden');
    // await getAllWidgetTitleData();
    // store.dispatch(`${BILLING.NAME}/getPaginatorStart`, 0);
    // if (connectPlusAccess.user_access_rights.itl_connect_access == 1) {
    //     dataVariables.value.exportAccessRight = 1;
    // } else if (connectPlusAccess.user_access_rights.connect_plus.view_notification_billing.view_itl_connect_notification_billing_v3 == 1) {
    //     if (connectPlusAccess.user_access_rights.connect_plus.view_notification_billing.export_itl_connect_notification_billing_v3 == 1) {
    //         dataVariables.value.exportAccessRight = connectPlusAccess.user_access_rights.connect_plus.view_notification_billing.export_itl_connect_notification_billing_v3;
    //     } else {
    //         dataVariables.value.exportAccessRight = 0;
    //     }
    // } else {
    //     window.location.href = dataVariables.value.config.baseUrlPanel + 'logout';
    // }

    // if (dataVariables.value.isHeaderLoad == true) {
    //     document.querySelector('.p-datatable-thead').classList.add('hidden');
    // } else {
    //     document.querySelector('.p-datatable-thead').classList.remove('hidden');
    // }
    // defaultCustomizeSize();
    await formatDate();
    if (topHeader.user_type == 1 || topHeader.user_type == 2) {
        await vendorDataValue(50, 0, '', 'checkbox');
    }
});

const showSelectedSaveFilter = () => {
    let temp = '';
    dataVariables.value.savedFilterData.forEach((saveFilter) => {
        if (saveFilter.id == dataVariables.value.savedFiltervalue) {
            temp = saveFilter.value;
            return temp;
        }
    });
    return temp;
};
const formatSelectedData = (value) => {
    const selectedData = value.split(',');
    if (selectedData.length > 2) {
        return `${selectedData[0]} & ${selectedData.length - 1} others`;
    } else {
        return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
    }
};
const setFilterValue = async (data) => {
    store.commit(`${VELOCITY.NAME}/setFilterValueData`, data);
    store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
    // await getColumnData();
    // await getVelocityData();
};
const getAppliedFilterData = (val, column) => {
    const applyButton = document.querySelector('.store-filter-button-apply');
    const clearButton = document.querySelector('.store-filter-button-clear');
    if (val != '') {
        applyButton.classList.remove('apply-button-disable');
        clearButton.classList.remove('clear-button-disable');
    } else if (getMappedFilterValue.value[column['field']] != '') {
        applyButton.classList.remove('apply-button-disable');
        clearButton.classList.remove('clear-button-disable');
    } else {
        applyButton.classList.add('apply-button-disable');
        clearButton.classList.add('clear-button-disable');
    }
};
const clearFilter = async (data) => {
    store.commit(`${VELOCITY.NAME}/clearfilterbyfield`, data);
    store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
    dataVariables.value.removeCheck = true;
    await getColumnData();
    await getVelocityData();
    dataVariables.value.removeCheck = false;
    if (data === 'vendor_name') {
        await store.dispatch(`${VELOCITY.NAME}/resetVendorData`);
        await vendorDataValue(50, 0, '', 'checkbox');
    }
};
const resetAllFilters = async () => {
    dataVariables.value.removeCheck = true;
    store.commit(`${VELOCITY.NAME}/clearAllFilter`);
    await getColumnData(saveFilterID.value);
    await getVelocityData();
    dataVariables.value.removeCheck = false;
};
const vendorDataValue = async (limit, start, searchVendorName, inputType) => {
    await store.dispatch(`${VELOCITY.NAME}/getvendorModalData`, { limit: limit, start: start, searchVendorName: searchVendorName, inputType: inputType });
};
const getColumnData = async () => {
    dataVariables.value.isHeaderLoad = true;
    await store.dispatch(`${VELOCITY.NAME}/getDefaultColumn`);
    const divElement = document.querySelector('.page-header-section');
    dataTableWidth.value = divElement.clientWidth;

    dataVariables.value.dataTableColumns = getUpdatedColumns.value['user_customized_column']['customized_column_velocity']; // After we get columns from api uncommit this customized_column_velocity
    const columnCount = dataVariables.value.dataTableColumns.length;
    columnWidth.value = dataTableWidth.value / columnCount;
    dataVariables.value.tempDataTableColumns = getUpdatedColumns.value['default_column_header']; // After Column api updated uncommit this
    updateDefaultColumns(dataVariables.value.dataTableColumns);
    dataVariables.value.pageSize = Number(getUpdatedColumns.value['page_count']);
    dataVariables.value.isHeaderLoad = false;
};
const getVelocityData = async () => {
    dataVariables.value.isSkeletonShow = true;
    const headerElement = document.querySelector('.p-datatable-thead');
    dataVariables.value.isHeaderLoad = true;
    try {
        await store.dispatch(`${VELOCITY.NAME}/getVelocityApiData`, { length: dataVariables.value.pageSize });
        await store.dispatch(`${VELOCITY.NAME}/getPaginatorLast`, dataVariables.value.pageSize);
        dataVariables.value.totalRecords = velocityData.value.recordsTotal;
    } catch (error) {
        dataVariables.value.isHeaderLoad = false;
    } finally {
        dataVariables.value.isHeaderLoad = false;
        headerElement?.classList.toggle('hidden', dataVariables.value.isHeaderLoad);
    }

    dataVariables.value.isSkeletonShow = false;
};
const startRemittanceWithVelocity = async () => {
    if (getMappedFilterValue.value['vendor_name'] !== '') {
        await getVelocityData();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Vendor', life: 3000 });
        return;
    }
};
const selectOption = (option) => {
    dataVariables.value.selectedOption = option.label;
    dataVariables.value.isDropdownOpen = false;
};
const handlePageChange = async (event) => {
    dataVariables.value.pageSize = event.rows;
    const { first, rows } = event;
    const payload = { first, rows };
    await store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, payload.first);
    await store.dispatch(`${VELOCITY.NAME}/getPaginatorLast`, dataVariables.value.pageSize);
    await getColumnData();
    dataVariables.value.pageSize = event.rows;
    await getVelocityData();
};
const isTabActive = (index) => index === dataVariables.value.activeTabIndex;

// new layout js end //
const showWidget = () => {
    dataVariables.value.isDivVisible = !dataVariables.value.isDivVisible;
    document.body.classList.toggle('overflow-hidden');
};

const updateDate = async (date) => {
    const data = {
        type: date.type,
        order_date: date,
    };
    store.commit(`${VELOCITY.NAME}/setFilterValueData`, data);
    await getColumnData(saveFilterID.value);
    await getVelocityData();
};
const formatDate = async () => {
    const formatDateLength = 'YYYY-MM-DD';
    let data = '';
    if (formatDateLength.length === dataVariables.value.startDate[0].length) {
        data = {
            date: dataVariables.value.startDate[0] + ' ' + dataVariables.value.startDate[1],
            selectedLabel: 'last_30_days',
        };
    } else {
        const formattedStartDate = format(dataVariables.value.startDate[0], 'yyyy-MM-dd');
        const formattedEndDate = format(dataVariables.value.startDate[1], 'yyyy-MM-dd');
        data = {
            date: formattedStartDate + ' ' + formattedEndDate,
            selectedLabel: 'last_30_days',
        };
    }
    await store.dispatch(`${VELOCITY.NAME}/getDateRange`, data);
};
const exportData = () => {
    if (dataVariables.value.totalRecords == 0 || exportStatus.value === 'error') {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Data to Export', life: 3000 });
        return;
    } else {
        store.dispatch(`${VELOCITY.NAME}/getBillingExport`, dataVariables.value.processType);
        window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
    }
};
const onInputOrder = () => {
    if (dataVariables.value.orderSearch !== '') {
        dataVariables.value.hiddenClass = '';
    } else {
        dataVariables.value.hiddenClass = 'hidden';
    }
};
const clearInputField = async () => {
    dataVariables.value.orderSearch = '';
    await store.dispatch(`${VELOCITY.NAME}/getOrderInput`, dataVariables.value.orderSearch);
    await getColumnData(saveFilterID.value);
    await getVelocityData();
    // await getAllWidgetValueData();
    dataVariables.value.hiddenClass = 'hidden';
};
const setCustomColumn = async (data) => {
    if (data !== '') {
        if (data.newColumns === '') {
            data.newColumns = getUpdatedSizePayload.value;
            dataVariables.value.defaultDatatableSize = data.size;
            data['page'] = dataVariables.value.pageSize;
            const column = data.column;

            if (
                (column.isFilterType == 2 && column.filterValue == null && column.is_visible == true) ||
                (column.isFilterType == 5 && column.filterValue.label == '' && column.is_visible == true) ||
                (column.isFilterType == 1 && column.filterValue['id'].length == 0 && column.is_visible == true) ||
                (column.isFilterType == 8 && column.filterValue == null && column.is_visible == true) ||
                (column.field === 'vendor_name' && column.filterValue['id'].length == 0 && column.is_visible == true)
            ) {
                await store.dispatch(`${VELOCITY.NAME}/getColumnsData`, data);
                // await getColumnData();
            } else {
                await store.dispatch(`${VELOCITY.NAME}/getColumnsData`, data);
                // await getColumnData();
                store.commit(`${VELOCITY.NAME}/clearfilterbyfield`, column.field);
                store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
                await getVelocityData();
            }
        } else {
            await store.dispatch(`${VELOCITY.NAME}/getDataTableSize`, data.newColumns);
            data['page'] = dataVariables.value.pageSize;
            dataVariables.value.defaultDatatableSize = data.size;
            const column = data.column;
            if (
                (column.isFilterType == 2 && column.is_visible == true) ||
                (column.isFilterType == 5 && column.is_visible == true) ||
                (column.isFilterType == 1 && column.is_visible == true) ||
                (column.isFilterType == 8 && column.is_visible == true) ||
                (column.field === 'vendor_name' && column.is_visible == true)
            ) {
                await store.dispatch(`${VELOCITY.NAME}/getColumnsData`, data);
                updateDefaultColumns(data.updatedColumns);
                // await getColumnData();
            } else {
                await store.dispatch(`${VELOCITY.NAME}/getColumnsData`, data);
                updateDefaultColumns(data.updatedColumns);
                // await getColumnData();
                if (dataVariables.value.filterFields.some((field) => getMappedFilterValue.value[field] !== '')) {
                    store.commit(`${VELOCITY.NAME}/clearfilterbyfield`, column.field);
                    store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
                    await getColumnData(saveFilterID.value);
                    await getVelocityData();
                }
            }
        }
    }
};

const resetvendor = async (val) => {
    await store.dispatch(`${VELOCITY.NAME}/resetVendorData`);
    dataVariables.value.isVendorModalVisible = val;
    if (!dataVariables.value.isVendorModalVisible) {
        store.commit(`${VELOCITY.NAME}/clearfilterbyfield`, 'vendor_name');
        await getColumnData();
        await getVelocityData();
    }
    await vendorDataValue(50, 0, '', 'checkbox');
};
const searchByVendorName = async (data) => {
    await store.dispatch(`${VELOCITY.NAME}/getvendorModalData`, {
        limit: data.limit,
        start: data.start,
        searchVendorName: data.searchVendorName,
        inputType: data.inputType,
        isVendorSearch: data.isVendorSearch,
    });
};
const setFilter = async (value) => {
    dataVariables.value.isVendorModalVisible = value.isShow;
    const data = {
        type: 'vendorModal',
        vendor_name: value.vendorData,
    };
    store.commit(`${VELOCITY.NAME}/setFilterValueData`, data);
    store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
    // await getColumnData();
    // await getVelocityData();
};
const vendorModalVisible = (value) => (dataVariables.value.isVendorModalVisible = value);
const showMoreFilter = () => (dataVariables.value.showViewDetailsModal = true);
const saveEditFiltersViewBilling = async (updateType) => {
    if (dataVariables.value.filterFields.some((field) => getMappedFilterValue.value[field] !== '') || allFilterData.value.search !== '') {
        const data = {
            length: dataVariables.value.pageSize,
            saveFilterValue: dataVariables.value.saveFilterValue,
            updateType: updateType,
            updateTypeName: updateType === 'edit' ? 'edit_filter_id' : '',
            saveFilterEditId: updateType === 'edit' ? dataVariables.value.saveFilterEditId : '',
            newColumns: getUpdatedSizePayload.value,
            size: dataVariables.value.defaultDatatableSize,
        };
        await store.dispatch(`${VELOCITY.NAME}/getSaveFilterData`, data);

        if (saveFilterResponse.value.status === 'success') {
            if (dataVariables.value.editInput === null) {
                dataVariables.value.savedFilterData.push({ id: saveFilterResponse.value.last_inserted_row_id, value: dataVariables.value.saveFilterValue, pin: 0 });
                dataVariables.value.saveFilterValue = '';
                reArrangeSaveFilter();
                const saveData = {
                    moduleName: 'billing',
                    reOrderSaveFilter: dataVariables.value.saveFilterOrder,
                };
                store.dispatch(`${VELOCITY.NAME}/getSavedFilteredData`, saveData);
            } else {
                dataVariables.value.savedFilterData[dataVariables.value.editInput].value = dataVariables.value.saveFilterValue;
                dataVariables.value.showSelectedFilter = dataVariables.value.saveFilterValue;
            }
            const elements = document.getElementsByClassName('save-filter-dropdown-outer');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }
            toast.add({ severity: 'success', summary: 'Success', detail: saveFilterResponse.value.html_message, life: 3000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: saveFilterResponse.value.html_message, life: 3000 });
        }
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please apply filter to save.', life: 3000 });
        return;
    }
};
const showDeleteFilterPopup = (saveFilterId) => {
    dataVariables.value.showDeleteFilter = true;
    dataVariables.value.saveFilterEditId = saveFilterId;
};
const cancleDeleteFilter = () => (dataVariables.value.showDeleteFilter = false);
const deleteSaveFilter = async (updateType) => {
    const valueToRemove = dataVariables.value.saveFilterEditId; // Change this to the actual property value you want to remove
    const indexToRemove = dataVariables.value.savedFilterData.findIndex((item) => item.id === valueToRemove);
    if (indexToRemove !== -1) {
        dataVariables.value.savedFilterData.splice(indexToRemove, 1);
    } else {
        console.error('');
    }
    dataVariables.value.savedFilterData.splice(dataVariables.value.saveFilterEditId, 1);
    dataVariables.value.showSelectedFilter = '';
    // dataVariables.value.saveFilterValue = '';
    reArrangeSaveFilter();
    const data = {
        length: dataVariables.value.pageSize,
        saveFilterValue: dataVariables.value.saveFilterValue,
        updateType: updateType,
        updateTypeName: 'delete_filter_id',
        saveFilterEditId: dataVariables.value.saveFilterEditId,
        newColumns: getUpdatedSizePayload.value,
        size: dataVariables.value.defaultDatatableSize,
        reOrderSaveFilter: dataVariables.value.saveFilterOrder,
    };

    if (route.params.id == dataVariables.value.saveFilterEditId) {
        dataVariables.value.saveFilterValue = '';
        await store.dispatch(`${BILLING.NAME}/getSaveFilterData`, data);
        router.push({ name: 'ViewBilling', params: { id: '' } });
        store.commit(`${BILLING.NAME}/clearAllFilter`);
        await getColumnData(saveFilterID.value);
        await getBillingData();
        await getAllWidgetValueData();
        saveFilterID.value = '';
    } else {
        await store.dispatch(`${BILLING.NAME}/getSaveFilterData`, data);
    }
    dataVariables.value.showEditInput = false;
    dataVariables.value.showDeleteFilter = false;
    const elements = document.getElementsByClassName('save-filter-dropdown-outer');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    toast.add({ severity: 'success', summary: 'Success', detail: saveFilterResponse.value.html_message, life: 1000 });
};
const checkPin = (saveFilter) => {
    if (saveFilter.pin == 0) {
        saveFilter.pin = 1;
    } else {
        saveFilter.pin = 0;
    }
    reArrangeSaveFilter();
    backToTop();
    const data = {
        moduleName: 'billing',
        reOrderSaveFilter: dataVariables.value.saveFilterOrder,
    };
    store.dispatch(`${BILLING.NAME}/getSavedFilteredData`, data);
};
const reArrangeSaveFilter = () => {
    const pinSaveFilters = [];
    const unPinSaveFilters = [];
    dataVariables.value.savedFilterData.forEach((saveFilter) => {
        if (saveFilter.pin == 1) {
            pinSaveFilters.push(saveFilter);
        } else {
            unPinSaveFilters.push(saveFilter);
        }
    });

    dataVariables.value.savedFilterData = [...pinSaveFilters, ...unPinSaveFilters];
    const temp = [];
    for (let i = 0; i < dataVariables.value.savedFilterData.length; i++) {
        temp.push(`${dataVariables.value.savedFilterData[i].id}::${dataVariables.value.savedFilterData[i].pin == 1 ? 1 : 0}`);
    }
    dataVariables.value.saveFilterOrder = temp;
};
const backToTop = () => {
    const scrollOptions = {
        top: 0,
        behavior: 'smooth',
    };
    const element = document.querySelector('.p-listbox-list-wrapper');
    element.scrollTo(scrollOptions);
};
const getSavedFilterData = async (selectedValue, selectedIndex) => {
    dataVariables.value.saveFilterEditId = selectedValue.id;
    dataVariables.value.showSelectedFilter = selectedValue.value;
    dataVariables.value.saveFilterValue = dataVariables.value.savedFilterData[selectedIndex].value;
    dataVariables.value.editInput = dataVariables.value.saveFilterValue;
    dataVariables.value.savedFilterData.filter((ele) => {
        if (dataVariables.value.savedFilterData.indexOf(ele) === selectedIndex) {
            dataVariables.value.saveFilterValue = ele.value;
        }
    });
    dataVariables.value.editInput = selectedIndex;
    router.push({ name: 'VelocityPage', params: { id: selectedValue.id } });
    dataVariables.value.showEditInput = true;
    const getDataPayload = {
        moduleName: 'billing',
        selectedFilterId: selectedValue.id,
    };
    saveFilterID.value = selectedValue.id;
    await store.dispatch(`${VELOCITY.NAME}/getSavedFilteredData`, getDataPayload);
    await getColumnData(saveFilterID.value);
    await getVelocityData();
    // await getAllWidgetValueData();
};
const closeModal = (val) => (dataVariables.value.showViewDetailsModal = val);
const setExportValue = (val) => console.log(val);
const removeBackdrop = () => (dataVariables.value.modalShow = false);
const setColumnPosition = async (data) => {
    const column = data.column;
    if (dataVariables.value.filterFields.some((field) => getMappedFilterValue.value[field] !== '')) {
        store.commit(`${VELOCITY.NAME}/clearfilterbyfield`, column.field);
        store.dispatch(`${VELOCITY.NAME}/getPaginatorStart`, 0);
        await store.dispatch(`${VELOCITY.NAME}/getColumnsData`, data);
        await getColumnDataFix(saveFilterID.value);
        await getBillingData();
    } else {
        await store.dispatch(`${BILLING.NAME}/getColumnsData`, data);
        await getColumnDataFix(saveFilterID.value);
    }
};
const updateDefaultColumns = (updatedColumns) => {
    const tempColumns = dataVariables.value.tempDataTableColumns
        .map((element) => {
            return updatedColumns.find((item) => {
                if (element.field === item.field) {
                    return { ...element, isColumnFixed: item.isColumnFixed, is_visible: item.is_visible };
                }
            });
        })
        .filter((column) => column !== undefined);
    dataVariables.value.tempDataTableColumns = [...tempColumns];
};
</script>
<template>
    <ToastView class="notification-bar" />
    <div class="widget-overlay" v-if="dataVariables.isDivVisible"></div>
    <div class="wrapper mt-0">
        <div class="section-container">
            <div class="page-header-section">
                <div class="page-header">
                    <div class="sec-heading"><img src="@/assets/images/billing-header.svg" /> <span>Velocity</span></div>
                    <div class="custom-dropdown dropdown-mobile-view hidden">
                        <div class="dropdown-header" @click="dataVariables.isDropdownOpen = !dataVariables.isDropdownOpen">
                            <div class="selected-lable" :class="dataVariables.isDropdownOpen ? 'dropdownopen' : ''">
                                {{ dataVariables.selectedOption }}
                                <span :class="dataVariables.isDropdownOpen ? 'up' : 'down'">
                                    <img src="@/assets/images/drodown-arrow-down.svg" />
                                </span>
                            </div>
                        </div>
                        <div v-show="dataVariables.isDropdownOpen" class="dropdown-options">
                            <div class="dropdown-item" :class="{ selected: option.label === dataVariables.selectedOption }" v-for="option in dataVariables.options" :key="option" @click="selectOption(option)">
                                {{ option.label }}
                            </div>
                        </div>
                    </div>
                    <!-- <div class="domestic-int-dropdown">
                        <div class="widget-icon-outer" @click="showWidget()">
                            <img src="@/assets/images/widget-icon.svg" />
                        </div>
                    </div> -->
                </div>
                <div v-if="dataVariables.isWidgetAvail" class="widget-outer-sec responsive-div" :class="dataVariables.isDivVisible == true ? 'show-div' : ''">
                    <!-- <div class="hidewidget" @click="showWidget()"></div> -->
                    <div class="widget-outer">
                        <div class="widget-box" v-for="(widget, index) in getWidgetTitle" :key="index">
                            <div class="widget-label">{{ widget.name }}</div>
                            <div v-if="dataVariables.isWidgetSekeleton">
                                <skeletonView width="3rem" height="16px"></skeletonView>
                            </div>

                            <div v-else class="widget-count">{{ getWidgetValues[index].value }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-tabs">
                <TabPanel v-for="(tab, index) in dataVariables.dataTableColumns" :key="tab.id" :header="tab.label">
                    <div v-if="isTabActive(index)">
                        <DataTable
                            :handlePageChange="handlePageChange"
                            :columns="getDataTableColumns"
                            :is-show-checkbox="false"
                            :row-data="velocityData.data"
                            :filter-modal-data="filterModalData"
                            @clear-value="clearFilter"
                            @filter="setFilterValue"
                            :isHeaderLoad="dataVariables.isHeaderLoad"
                            :isSkeleton="dataVariables.isSkeletonShow"
                            @export-value="setExportValue"
                            :totalrecord="dataVariables.totalRecords"
                            :paginator-start="getPaginatorStartValue"
                            :paginator-last="getPaginatorLastValue"
                            @custom-column="setCustomColumn"
                            @vendor-modal-visible="vendorModalVisible"
                            @toggle-vendor="vendorModalVisible"
                            :temp-columns="getTempDataTableColumns"
                            @applyfilter-data="getAppliedFilterData"
                            :page-size="dataVariables.pageSize"
                            @column-position="setColumnPosition"
                            :isCustomizeColumnAvail="dataVariables.isCustomizeColumnAvail"
                            :isActionColumn="dataVariables.isActionColumn"
                        >
                            <template #filter-li>
                                <div class="filter-li-outer-main">
                                    <ul class="filter-list">
                                        <li v-for="(value, key) in getMappedFilterValue" :key="value">
                                            <div class="selected-item flex" :id="key" v-if="getMappedFilterValue[key] != '' && value != undefined">
                                                {{ key === 'awb_no' ? 'Logistics' : key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') }} :
                                                <span>
                                                    {{ formatSelectedData(value) }}
                                                </span>
                                                <img src="@/assets/images/selected-list-close.svg" alt="close" @click="clearFilter(key)" class="select-close-icon" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                            <template #features-section>
                                <div class="features-outer">
                                    <div class="features-left-side">
                                        <div class="start-remittance-outer-sec">
                                            <div class="start-remittance-text" @click="startRemittanceWithVelocity()">Start Remittance With Velocity</div>
                                        </div>
                                        <div v-if="dataVariables.isUniversalSearchAvail" class="search-outer">
                                            <img src="@/assets/images/store-order-search.svg" alt="" class="searchimg" />
                                            <input type="text" class="form-control" v-model="dataVariables.orderSearch" @keydown.enter="orderSearchData()" @input="onInputOrder()" placeholder="Search Order ID Or AWB" />
                                            <div class="cross-icon-section cursor-pointer" :class="dataVariables.hiddenClass" @click="clearInputField()">
                                                <i class="pi pi-times"></i>
                                            </div>
                                        </div>
                                        <div v-if="dataVariables.isUniversalDateAvail" class="datepicker-outer">
                                            <DateTimeRangePicker @updateDate="updateDate" :start-date="computedSplitValues" :inline="false"></DateTimeRangePicker>
                                        </div>
                                        <div v-if="dataVariables.isUniversalFilterAvail" class="cursor-pointer more-filter flex items-center" @click="showMoreFilter()">
                                            <img src="@/assets/images/more-filter.svg" class="more-filter-icon" />
                                            <span class="filters">Filters</span>
                                        </div>
                                        <div class="more-features-button" @click="moreFeatureShowHide()">
                                            <img src="@/assets/images/down-arrow.svg" />
                                        </div>
                                        <div class="bottomsheet-outer bottom-sheet-wrapper" :class="dataVariables.modalShow == true ? 'modal-show-div' : ''">
                                            <div class="backdrop" @click="removeBackdrop()"></div>
                                            <div class="bottom-sheet">
                                                <div class="bottomsheet-title">Filters</div>
                                                <div class="bottomsheet-list">
                                                    <ul>
                                                        <BottomSheet :linkName="'Export'" :imageName="'export-arrow'"></BottomSheet>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #right-side-features-section v-if="dataVariables.isSaveFilterAvail">
                                <div class="features-right-side">
                                    <div class="select-filter-outer-section">
                                        <div class="filter-dropdown" @click="$refs[`viewSaveFilter`][0].toggle($event)">
                                            <img src="@/assets/images/store-order-view-details.svg" alt="view save filter" />
                                            <span class="view-saveFilter">View</span>
                                            <span class="view-saveFilter-text">{{ dataVariables.showSelectedFilter }}</span>
                                        </div>
                                        <OverlayPanel ref="viewSaveFilter" class="customized-column save-filter-overly">
                                            <div class="overlay-heading save-filter-dropdown-head">
                                                <div class="save-filter-input-outer">
                                                    <div class="filter-title">Enter Filter Name</div>
                                                    <div class="input-button-div">
                                                        <input
                                                            type="text"
                                                            id="filterInput"
                                                            class="filter-input"
                                                            v-model="dataVariables.saveFilterValue"
                                                            placeholder="Enter Filter Name"
                                                            name="save_filter_name"
                                                            @keydown.enter="saveEditFiltersViewBilling(!dataVariables.showEditInput ? 'add' : 'edit')"
                                                            autocomplete="off"
                                                        />
                                                        <div class="save-filter-section-btn save-filter-footer">
                                                            <div
                                                                class="save-filter-btn store-filter-button-apply"
                                                                :class="dataVariables.saveFilterValue !== '' ? '' : 'apply-button-disable'"
                                                                @click="saveEditFiltersViewBilling(!dataVariables.showEditInput ? 'add' : 'edit'), $refs[`viewSaveFilter`][0].toggle($event)"
                                                            >
                                                                {{ dataVariables.showSelectedFilter === '' ? 'Save' : 'Update' }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="removeFilter" v-if="dataVariables.showSelectedFilter != ''" @click="removeSaveFilter()">Remove Filter</div>
                                            </div>
                                            <div class="saved-filter-title">Saved Filter</div>
                                            <Listbox
                                                v-if="dataVariables.savedFilterData.length > 0"
                                                v-model="dataVariables.savedFiltervalue"
                                                :options="dataVariables.savedFilterData"
                                                optionValue="id"
                                                class="w-full h-full"
                                                listStyle="max-height:108px"
                                            >
                                                <template #option="{ option, index }">
                                                    <div class="list-item-flex">
                                                        <div @click="getSavedFilterData(option, index), $refs[`viewSaveFilter`][0].toggle($event)" class="list-text">{{ option.value }}</div>
                                                        <div class="list-item-imgs">
                                                            <img v-if="$route.params.id == option.id" class="margin-right" src="@/assets/images/save-filter-tick.svg" alt="checked" />
                                                            <div>
                                                                <img v-if="option.pin == 0" src="@/assets/images/save-filter-pin.svg" alt="view save filter" @click="checkPin(option)" />
                                                                <img v-else src="@/assets/images/SFpin.svg" alt="view save filter" @click="checkPin(option)" />
                                                            </div>
                                                            <img
                                                                class="save-delete-icon"
                                                                src="@/assets/images/save-filter-delete.svg"
                                                                alt="delete-icon"
                                                                @click="$route.params.id == option.id ? $refs[`viewSaveFilter`][0].toggle($event) : '', showDeleteFilterPopup(option.id)"
                                                            />
                                                        </div>
                                                    </div>
                                                </template>
                                            </Listbox>
                                            <div v-else>
                                                <div class="no-data-found">
                                                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" />
                                                    <div class="head">No Data Found</div>
                                                </div>
                                            </div>
                                        </OverlayPanel>
                                    </div>
                                </div>
                            </template>
                            <template #export-button-section>
                                <div class="export-btn-outer" @click="exportData()"><img src="@/assets/images/export-btn.svg" /> <span>Export</span></div>
                            </template>
                        </DataTable>
                        <DialogView id="more-filters" v-model:visible="dataVariables.showViewDetailsModal" header="Filters" :position="dataVariables.position" :modal="true" :draggable="false" dismissableMask>
                            <MoreFilter
                                :filter-column="getTempDataTableColumns"
                                :filter-fields="dataVariables.filterFields"
                                :get-mapped-filters="getMappedFilterValue"
                                @tempFilterValue="setFilterValue"
                                @clearAllFilterValue="resetAllFilters()"
                                @close-modal="closeModal"
                            />
                        </DialogView>
                    </div>
                </TabPanel>
            </div>
        </div>
        <DeleteConfirmationModal v-if="dataVariables.showDeleteFilter" @close-modal="cancleDeleteFilter" delete-heading="Delete Filter">
            <template #body>
                <div class="helvetica-regular gray-700">Are you sure you want to delete this filter</div>
            </template>
            <template #deletebtn>
                <button class="cancel-yes-btn helvetica-medium gray-700" @click="deleteSaveFilter('delete')">Yes, Delete it</button>
            </template>
        </DeleteConfirmationModal>
        <VendorModalDatatable
            v-show="dataVariables.isVendorModalVisible"
            @vendorData="setFilter"
            @close-modal="dataVariables.isVendorModalVisible = false"
            @reset-vendor="resetvendor"
            :vendor-store="getMappedFilterValue.vendor_name"
            :remove-check="dataVariables.removeCheck"
            :getVendorValues="getVendorValues"
            :getVendorModalPayload="getVendorModalPayload"
            :getVendorDataStatus="getVendorDataStatus"
            @search-vendor-name="searchByVendorName"
        />
    </div>
</template>
<style lang="scss">
@import './velocityPage.scss';
</style>
