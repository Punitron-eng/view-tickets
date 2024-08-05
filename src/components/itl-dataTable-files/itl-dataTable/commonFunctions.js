import { format } from 'date-fns';
import store from '@/store/index';
import router from '@/router/index';
import { dataTableVariables as dataTableConsts } from './dataTable';
import { dataTableVariables as dataVariables } from './commonVariable';
import { apiRoutes } from './commonVariable.js';
let storeName = '';
const selectedSubTab = ['rev_return_request', 'credit', 'wallet'];
const rejectCloseModal = () => (dataVariables.value.showRejectModal = false);
export const getCurrentRoutes = () => {
    dataVariables.value.router = router;
};
export const getCurrentModuleStoreName = (StoreName) => {
    storeName = StoreName;
};

export const handleBodyClick = () => {
    const dpInputWrap = document.querySelector('.dp__input_wrap');
    const overlaypanel = document.querySelector('.p-overlaypanel');
    const dropdownPanel = document.querySelector('.p-dropdown-panel');
    const datatableoverlaypanel = document.querySelector('.p-column-filter-overlay');
    dpInputWrap.addEventListener('click', function () {
        if (overlaypanel) {
            overlaypanel.style.display = 'none';
        } else if (datatableoverlaypanel) {
            datatableoverlaypanel.style.display = 'none';
        } else if (dropdownPanel) {
            dropdownPanel.style.display = 'none';
        }
    });
};
export const closeAllOverlay = () => document.body.addEventListener('click', handleBodyClick);
export const addClassToBody = () => document.body.classList.add('billing-overflow-hidden');
export const removeClassFromBody = () => document.body.classList.remove('billing-overflow-hidden');
export const hideDataTableFilter = () => {
    const clickableDiv = document.querySelector('.dp__input_icon_pad');
    clickableDiv.addEventListener('click', function () {
        var applyButton = document.querySelector('.p-button-outlined');
        if (applyButton) {
            applyButton.dispatchEvent(new Event('click'));
        }
    });
};
// export const tempWidthCalc = () => {
//     const layoutElement = document.querySelector('.layout-topbar');
//     const layoutComputedStyles = window.getComputedStyle(layoutElement);
//     const layoutTempLeftValue = layoutComputedStyles.getPropertyValue('height');
//     const layoutHeight = parseFloat(layoutTempLeftValue);
//     const pageElement = document.querySelector('.page-header');
//     const pageComputedStyles = window.getComputedStyle(pageElement);
//     const pageTempLeftValue = pageComputedStyles.getPropertyValue('height');
//     const pageHeight = parseFloat(pageTempLeftValue);
//     const widgetElement = document.querySelector('.widget-outer-sec');
//     const tabElement = document.querySelector('.p-tabview-nav-container');
//     let widgetHeight = null;
//     let tabHeight = null;
//     if (widgetElement) {
//         const widgetComputedStyles = window.getComputedStyle(widgetElement);
//         const widgetTempLeftValue = widgetComputedStyles.getPropertyValue('height');
//         widgetHeight = parseFloat(widgetTempLeftValue);
//     } else {
//         widgetHeight = 0;
//     }
//     if (tabElement) {
//         const tabComputedStyles = window.getComputedStyle(tabElement);
//         const tabTempLeftValue = tabComputedStyles.getPropertyValue('height');
//         tabHeight = parseFloat(tabTempLeftValue);
//     } else {
//         tabHeight = 0;
//     }
//     const filterLIElement = document.querySelector('.dt-li-filter');
//     let FilterLIHeight = null;
//     if (filterLIElement) {
//         const filterLIComputedStyles = window.getComputedStyle(filterLIElement);
//         const filterLITempLeftValue = filterLIComputedStyles.getPropertyValue('height');
//         FilterLIHeight = parseFloat(filterLITempLeftValue) + 6 + 34;
//     } else {
//         FilterLIHeight = 60;
//     }
//     const featureElement = document.querySelector('.features-outer');
//     const featureComputedStyles = window.getComputedStyle(featureElement);
//     const featureTempLeftValue = featureComputedStyles.getPropertyValue('height');
//     const featuretHeight = parseFloat(featureTempLeftValue);
//     const total = layoutHeight + pageHeight + widgetHeight + tabHeight;
//     const cardHeight = window.innerHeight - total;
//     document.querySelector('.datatable-card').style.height = `calc(${window.innerHeight}px - ${total}px)`;
//     const tempTotal = featuretHeight + FilterLIHeight + tabHeight;
//     const dataTableWrapperWidth = cardHeight - tempTotal;
//     document.querySelector('.datatable-wrapper').style.height = 'calc(' + dataTableWrapperWidth + 'px)';
// };
export const showSelectedSaveFilter = () => {
    let temp = '';
    dataVariables.value.savedFilterData.forEach((saveFilter) => {
        if (saveFilter.id == dataVariables.value.savedFiltervalue) {
            temp = saveFilter.value;
            return temp;
        }
    });
    return temp;
};
export const searchByVendorName = async (data) => {
    await store.dispatch(`${storeName}/getvendorModalData`, {
        limit: data.limit,
        start: data.start,
        searchVendorName: data.searchVendorName,
        inputType: data.inputType,
        isVendorSearch: data.isVendorSearch,
    });
};
export const removeClassListOnAppliedFilter = () => {
    const applyButton = document.querySelector('.store-filter-button-apply');
    const clearButton = document.querySelector('.store-filter-button-clear');
    applyButton.classList.remove('apply-button-disable');
    clearButton.classList.remove('clear-button-disable');
};
export const addClassListOnAppliedFilter = () => {
    const applyButton = document.querySelector('.store-filter-button-apply');
    const clearButton = document.querySelector('.store-filter-button-clear');
    applyButton.classList.add('apply-button-disable');
    clearButton.classList.add('clear-button-disable');
};
export const showDeleteFilterPopup = (saveFilterData) => {
    dataVariables.value.showDeleteFilter = true;
    dataVariables.value.saveFilterEditId = saveFilterData.filterId;
    dataVariables.value.storeViewFilterData = saveFilterData;
};
export const reArrangeSaveFilter = () => {
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
export const updateDefaultColumns = (updatedColumns) => {
    const tempColumns = dataVariables.value.tempDataTableColumns
        .map((element) => {
            return updatedColumns.find((item) => {
                if (element.field === item.field) {
                    return { ...element, isColumnFixed: item.isColumnFixed, isVisible: item.isVisible };
                }
            });
        })
        .filter((column) => column !== undefined);
    dataVariables.value.tempDataTableColumns = [...tempColumns];
};
export const hideAndShowColumn = (column) => {
    const tempColumn = { ...column };
    const frozenColumnsRightCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'right').length;
    const frozenColumnsLeftCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'left').length;
    let showToast = false;
    if (dataTableConsts.value.customizeColumns.length > 4 && column.isVisible === true) {
        showToast = true;
    } else if (column.isVisible === false) {
        showToast = true;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'At least 4 columns should be visible', life: 1000 });
    }
    if (showToast) {
        const updatedColumns = dataTableConsts.value.columnsData.map((col) => {
            if (col.field === column.field) {
                col.isVisible = !col.isVisible;
                if (!col.isVisible) {
                    col.isColumnFixed = false;
                }
            }
            return col;
        });
        // if ((tempColumn.isColumnFixed === true && column.frozenPosition === 'right' && frozenColumnsRightCount > 2) || (tempColumn.isColumnFixed === true && column.frozenPosition === 'left' && frozenColumnsLeftCount > 2)) {
        // customizeColumnPositionPayload(column, updatedColumns);
        // } else {
        // dataTableConsts.value.columnsData = [...updatedColumns];
        // filterCustomizeColumns();
        // saveCustomizeColumn(column, updatedColumns);
        // }
    }
    dataTableConsts.value.isResetWidthAvail = false;
};
export const onHeaderLoading = () => {
    if (dataVariables.value.isHeaderLoad == true) {
        document.querySelector('.p-datatable-thead').classList.add('hidden');
    } else {
        document.querySelector('.p-datatable-thead').classList.remove('hidden');
    }
};
export const changeDateFormatPayload = () => {
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
    return data;
};
export const checkSaveCustomizeColumn = (column) => {
    return (
        (column.isFilterType == 1 && column.isVisible == true) ||
        (column.isFilterType == 2 && column.isVisible == true) ||
        (column.isFilterType == 3 && column.isVisible == true) ||
        (column.isFilterType == 4 && column.isVisible == true) ||
        (column.isFilterType == 5 && column.isVisible == true) ||
        (column.isFilterType == 6 && column.isVisible == true) ||
        (column.isFilterType == 8 && column.isVisible == true) ||
        (column.field === 'vendor_name' && column.isVisible == true)
    );
};
export const activeSabTab = () => {
    if (dataVariables.value.selectedTabName == 'rev_manifest' || dataVariables.value.selectedTabName == 'shipping_charges') {
        dataVariables.value.dtToggleButtons[0].isActive = true;
        dataVariables.value.dtToggleButtons[1].isActive = false;
        dataVariables.value.activeToggleBtn = dataVariables.value.dtToggleButtons.find((button) => button.isActive);
        dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.value : '';
    } else if (dataVariables.value.selectedTabName == 'rev_return_request' || dataVariables.value.selectedTabName == 'wallet_transaction') {
        dataVariables.value.dtToggleButtonsReturn[0].isActive = true;
        dataVariables.value.dtToggleButtonsReturn[1].isActive = false;
        dataVariables.value.activeToggleBtn = dataVariables.value.dtToggleButtonsReturn.find((button) => button.isActive);
        dataVariables.value.subTabName = dataVariables.value.activeToggleBtn ? dataVariables.value.activeToggleBtn.value : '';
    } else if (dataVariables.value.selectedTabName == 'open') {
        dataVariables.value.subTabName = 'pending_from_itl';
    } else {
        dataVariables.value.subTabName = '';
    }
};

export const getDataTableData = async (extraPayload) => {
    dataVariables.value.isSkeletonShow = true;
    const headerElement = document.querySelector('.p-datatable-thead');
    dataVariables.value.isHeaderLoad = true;
    if (dataVariables.value.isShowCheckbox) {
        store.dispatch(`${storeName}/getSelectedRow`, []);
    }
    try {
        await getDataTableDataCount();
        await store.dispatch(`${storeName}/getDatatableApiData`, {
            moduleName: dataVariables.value.moduleName,
            length: dataVariables.value.pageSize,
            selectedTab: dataVariables.value.selectedTabName,
            subTabName: dataVariables.value.subTabName,
            is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
            ...extraPayload,
        });
        adjustTableHeight();
        dataVariables.value.isHeaderLoad = false;

        if (
            dataVariables.value.router.currentRoute.path.includes('tickets') ||
            dataVariables.value.router.currentRoute.path.includes('view-order') ||
            dataVariables.value.router.currentRoute.path.includes('view-user') ||
            dataVariables.value.router.currentRoute.path.includes('store-order') ||
            dataVariables.value.router.currentRoute.path.includes('abandoned-cart') ||
            dataVariables.value.router.currentRoute.path.includes('product-catalogue') ||
            dataVariables.value.router.currentRoute.path.includes('weight-discrepancy') ||
            dataVariables.value.router.currentRoute.path.includes('notification-billing') ||
            dataVariables.value.router.currentRoute.path.includes('return-flow')
        ) {
            const dataCount = store.getters[`${storeName}/getDataCount`];
            dataVariables.value.totalRecords = dataCount.count;
        } else {
            dataVariables.value.totalRecords = dataVariables.value.dataTableData.recordsTotal;
        }
    } catch (error) {
        dataVariables.value.isHeaderLoad = false;
    } finally {
        dataVariables.value.isHeaderLoad = false;
        headerElement?.classList.toggle('hidden', dataVariables.value.isHeaderLoad);
        dataVariables.value.isWidgetAvail ? await getAllWidgetValueData() : null;
    }
    dataVariables.value.isSkeletonShow = false;
};
export const getDataTableDataCount = async () => {
    if (
        dataVariables.value.router.currentRoute.path.includes('tickets') ||
        dataVariables.value.router.currentRoute.path.includes('view-order') ||
        dataVariables.value.router.currentRoute.path.includes('view-user') ||
        dataVariables.value.router.currentRoute.path.includes('store-order') ||
        dataVariables.value.router.currentRoute.path.includes('abandoned-cart') ||
        dataVariables.value.router.currentRoute.path.includes('product-catalogue') ||
        dataVariables.value.router.currentRoute.path.includes('weight-discrepancy') ||
        dataVariables.value.router.currentRoute.path.includes('notification-billing') ||
        dataVariables.value.router.currentRoute.path.includes('return-flow')
    ) {
        await store.dispatch(`${storeName}/getDatatableApiDataCount`, {
            moduleName: dataVariables.value.moduleName,
            length: dataVariables.value.pageSize,
            selectedTab: dataVariables.value.selectedTabName,
            subTabName: dataVariables.value.subTabName,
            is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
        });
        const dataCount = store.getters[`${storeName}/getDataCount`];
        dataVariables.value.totalRecords = dataCount.count;
    } else {
        return true;
    }
};
const adjustTableHeight = () => {
    const tableWrapper = document.querySelector('.p-datatable-wrapper');
    const topBar = document.querySelector('.layout-topbar');
    const pageHeader = document.querySelector('.page-header-section');
    const tabParent = document.querySelector('.tabs-parent');
    const dataTableCustomFeature = document.querySelector('.datatable-custom-features');
    const dataTableLi = document.querySelector('.dt-li-filter');
    const paginationRow = document.querySelector('.pagignationRow');

    const topBarHeight = topBar ? topBar.getBoundingClientRect().height + 16 : 0;
    const pageHeaderHeight = pageHeader ? pageHeader.getBoundingClientRect().height : 0;
    const tabParentHeight = tabParent ? tabParent.getBoundingClientRect().height + 12 : 0;
    const dataTableCustomFeatureHeight = dataTableCustomFeature ? dataTableCustomFeature.getBoundingClientRect().height : 0;
    const dataTableLiHeight = dataTableLi ? dataTableLi.getBoundingClientRect().height : 0;
    const paginationRowHeight = paginationRow ? paginationRow.getBoundingClientRect().height : 0;

    let totalHeight = topBarHeight + pageHeaderHeight + dataTableCustomFeatureHeight + dataTableLiHeight + paginationRowHeight + 20; // 11 for space below the table

    if (tabParent) {
        totalHeight += tabParentHeight;
    }
    if (paginationRowHeight === 0) {
        totalHeight += 40;
    }

    const confirmHeight = totalHeight + 'px';
    tableWrapper.style.minHeight = `calc(100vh - ${confirmHeight})`;
    tableWrapper.style.maxHeight = `calc(100vh - ${confirmHeight})`;
};
export const setFilterValue = async (data) => {
    store.commit(`${storeName}/setFilterValueData`, data);
    store.dispatch(`${storeName}/getPaginatorStart`, 0);
    await getDataTableData();
};
export const clearFilter = async (data) => {
    if (data == dataVariables.value.dtGlobalSearchId) {
        store.commit(`${storeName.NAME}/setOrderInput`, '');
        dataVariables.value.orderSearch = '';
        store.commit(`${storeName}/clearfilterbyfield`, data);
        store.dispatch(`${storeName}/getPaginatorStart`, 0);
        dataVariables.value.removeCheck = true;
        await getDataTableData;
        dataVariables.value.removeCheck = false;
    }
    store.commit(`${storeName}/clearfilterbyfield`, data);
    store.dispatch(`${storeName}/getPaginatorStart`, 0);
    dataVariables.value.removeCheck = true;
    await getDataTableData;
    dataVariables.value.removeCheck = false;
    if (data === 'vendor_name') {
        await store.dispatch(`${storeName}/resetVendorData`);
        await vendorDataValue(50, 0, '', 'checkbox');
    }
    if (data === 'ticket_department') {
        store.commit(`${storeName}/clearfilterbyfield`, 'ticket_category');
        store.dispatch(`${storeName}/getPaginatorStart`, 0);
        store.commit(`${storeName}/clearTicketDepartmentId`, '');
        dataVariables.value.removeCheck = true;
        await getDataTableData();
        await getColumnData(dataVariables.value.saveFilterID);
        dataVariables.value.removeCheck = false;
    }
};
export const clearGroupFilter = async (data) => {
    store.commit(`${storeName}/clearGroupFilter`, data);
    store.dispatch(`${storeName}/getPaginatorStart`, 0);
    dataVariables.value.removeCheck = true;
    await getDataTableData();
    dataVariables.value.removeCheck = false;
};
export const resetAllFilters = async () => {
    dataVariables.value.removeCheck = true;

    if (dataVariables.value.router.currentRoute.params.id) {
        await removeSaveFilter();
    } else {
        store.commit(`${storeName}/clearAllFilter`);
        dataVariables.value.showSelectedFilter = '';
        await getDataTableData();
    }
    dataVariables.value.removeCheck = false;
};
export const vendorDataValue = async (limit, start, searchVendorName, inputType) => {
    await store.dispatch(`${storeName}/getvendorModalData`, { limit: limit, start: start, searchVendorName: searchVendorName, inputType: inputType });
};
export const getColumnDataFix = async (saveFilterId) => {
    dataVariables.value.isHeaderLoad = true;
    dataVariables.value.showSkeletonInCustomizeColumn = true;
    const url = dataVariables.value.router.currentRoute.params?.id != '' && dataVariables.value.router.currentRoute.params?.id !== undefined ? apiRoutes.getById + dataVariables.value.router.currentRoute.params.id : apiRoutes.get;
    console.log('url =>', url);
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const combinePayload = { url, payload };
    dataVariables.value.dataTableColumns = [];
    await store.dispatch(`${storeName}/getDefaultColumn`, combinePayload);
    await store.dispatch(`${storeName}/getPaginatorLast`, combinePayload);
    dataVariables.value.pageSize = Number(store.getters[`${storeName}/getPaginatorRow`]);
    // await store.dispatch('fetchDtColumn', combinePayload);
    // await store.dispatch('fetchDtPaginatorLast', combinePayload);
    // dataVariables.value.pageSize = Number(store.getters['getPaginatorRow']);
    dataVariables.value.dataTableColumns = dataVariables.value.getUpdatedColumns['user_customized_column'];
    dataVariables.value.tempDataTableColumns = dataVariables.value.getUpdatedColumns['default_column_header']; // After Column api updated uncommit this
    dataVariables.value.isHeaderLoad = false;
    dataVariables.value.showSkeletonInCustomizeColumn = false;
    updateDefaultColumns(dataVariables.value.dataTableColumns);
};
export const selectedFilteredValue = () => {
    dataVariables.value.savedFilterData.forEach((item) => {
        dataVariables.value.showEditInput = true;
        if (item.id == dataVariables.value.savedDatatableResponse[0]['id']) {
            dataVariables.value.savedFiltervalue = item.id;
            dataVariables.value.saveFilterValue = item.value;
            dataVariables.value.showSelectedFilter = item.value;
        }
    });
};
export const handlePageChange = async (event) => {
    dataVariables.value.pageSize = event.rows;
    const url = dataVariables.value.router.currentRoute.params?.id ? apiRoutes.editById + dataVariables.value.router.currentRoute.params?.id : apiRoutes.edit;
    const { first, rows } = event;
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        page_count: dataVariables.value.pageSize,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const combinePayload = { url, payload };
    await store.dispatch(`${storeName}/getPaginatorStart`, first);
    await store.dispatch(`${storeName}/getPaginatorLast`, combinePayload);
    await getDataTableData();
};
export const updateDate = async (date) => {
    const data = [
        {
            type: date.type,
            [dataVariables.value.syncDateName]: date,
        },
    ];
    store.commit(`${storeName}/setFilterValueData`, data);
    await getDataTableData();
};

export const exportData = async (type) => {
    dataVariables.value.isExportLoading = true;
    if (type == 'Export_Data') {
        if (dataVariables.value.totalRecords == 0) {
            dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Data to Export', life: 3000 });
            dataVariables.value.isExportLoading = false;
            return;
        } else {
            await store.dispatch(`${storeName}/getBillingExport`, { processType: dataVariables.value.processType, selectedTab: dataVariables.value.selectedTabName, subTabName: dataVariables.value.subTabName });
            if (dataVariables.value.exportStatus.status == 'error') {
                dataVariables.value.isExportLoading = false;
                dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.exportStatus.html_message, life: 3000 });
                return;
            } else {
                setTimeout(() => {
                    dataVariables.value.isExportLoading = false;
                    window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
                }, 2000);
            }
        }
    } else {
        if (dataVariables.value.totalRecords == 0) {
            dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Data to Export', life: 3000 });
            return;
        } else {
            const payload = {
                process_type: 148,
            };
            await store.dispatch(`${storeName}/getExportCount`, payload);
            if (dataVariables.value.exportStatus.status == 'error') {
                dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.exportStatus.html_message, life: 3000 });
                return;
            } else {
                window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
            }
        }
        dataVariables.value.isExportLoading = false;
    }
};

export const newExportData = async (type) => {
    dataVariables.value.isExportLoading = true;
    if (type == 'Export_Data') {
        if (dataVariables.value.totalRecords == 0) {
            dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Data to Export', life: 3000 });
            dataVariables.value.isExportLoading = false;
            return;
        } else {
            store.dispatch(`${storeName}/getBillingExport`, { moduleName: dataVariables.value.moduleName, selectedTab: dataVariables.value.selectedTabName, subTabName: dataVariables.value.subTabName });
            if (dataVariables.value.exportStatus.status == 'error') {
                dataVariables.value.isExportLoading = false;
                dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.exportStatus.html_message, life: 3000 });
                return;
            } else {
                setTimeout(() => {
                    dataVariables.value.isExportLoading = false;
                    window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
                }, 2000);
            }
        }
    } else {
        if (dataVariables.value.totalRecords == 0) {
            dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Data to Export', life: 3000 });
            return;
        } else {
            const payload = {
                process_type: 148,
            };
            store.dispatch(`${storeName}/getExportCount`, payload);
            if (dataVariables.value.exportStatus.status == 'error') {
                dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: dataVariables.value.exportStatus.html_message, life: 3000 });
                return;
            } else {
                window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
            }
        }
        dataVariables.value.isExportLoading = false;
    }
};

export const editColumns = async (data) => {
    if (data !== '') {
        await store.dispatch(`${storeName}/getDataTableSize`, data.newColumns);
        data['page'] = dataVariables.value.pageSize;
        data['saveFilterId'] = dataVariables.value.saveFilterID;
        data['selectedTab'] = dataVariables.value.selectedTabName;
        dataVariables.value.defaultDatatableSize = data.size;
        const column = data.column;
        if (checkSaveCustomizeColumn(column)) {
            await editedColumnsPayload(data);
            updateDefaultColumns(data.updatedColumns);
        } else {
            await editedColumnsPayload(data);
            updateDefaultColumns(data.updatedColumns);
            if (dataVariables.value.filterFields.some((field) => dataVariables.value.getMappedFilterValue[field] !== '' && field == column.field)) {
                store.commit(`${storeName}/clearfilterbyfield`, column.field);
                store.dispatch(`${storeName}/getPaginatorStart`, 0);
                // await getColumnData(dataVariables.value.router.currentRoute.params.id);
                await getDataTableData();
            }
        }
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: 'Some error occurs.', life: 3000 });
        return;
    }
};
export const resetvendor = async (val) => {
    await store.dispatch(`${storeName}/resetVendorData`);
    dataVariables.value.isVendorModalVisible = val;
    if (!dataVariables.value.isVendorModalVisible) {
        store.commit(`${storeName}/clearfilterbyfield`, 'vendor_name');
        await getColumnData(dataVariables.value.saveFilterID);
        await getDataTableData();
    }
    await vendorDataValue(50, 0, '', 'checkbox');
};
export const setFilter = async (value) => {
    dataVariables.value.isVendorModalVisible = value.isShow;
    const data = {
        type: 'vendorModal',
        vendor_name: value.vendorData,
    };
    store.commit(`${storeName}/setAppliedVendorData`, data);
    store.dispatch(`${storeName}/getPaginatorStart`, 0);
    await getColumnData(dataVariables.value.saveFilterID);
    await getDataTableData();
    await warehouseApi();
    // await getAllWidgetValueData();
};

export const closePickModal = async (isCloseModal) => {
    const data = {
        value: 'rev_manifest',
        name: 'Manifested',
    };
    await getActiveTab(data);
    if (isCloseModal) {
        dataVariables.value.showPickNowModal = false;
        dataVariables.value.showActionModal = false;
    } else {
        dataVariables.value.showPickNowModal = false;
    }
};
export const checkPin = async (saveFilter) => {
    await UpdateSaveFilterData(saveFilter);
};
export const setColumnPosition = async (data) => {
    const column = data.column;
    data['page'] = dataVariables.value.pageSize;
    data['saveFilterId'] = dataVariables.value.saveFilterID;
    console.log('dataVariables.value.saveFilterID =>', dataVariables.value.saveFilterID);
    data['selectedTab'] = dataVariables.value.selectedTabName;
    store.commit(`${storeName}/resetReverseOrderData`);
    dataVariables.value.isHeaderLoad = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    if (dataVariables.value.filterFields.some((field) => dataVariables.value.getMappedFilterValue[field] !== '' && field == column.field && !column.isVisible)) {
        store.commit(`${storeName}/clearfilterbyfield`, column.field);
        store.dispatch(`${storeName}/getPaginatorStart`, 0);
        await editedColumnsPayload(data);
        if (dataVariables.value.changeActionColumn) {
            dataVariables.value.isActionColumn = true;
        }
        if (dataVariables.value.changeCheckboxColumn) {
            dataVariables.value.isShowCheckbox = true;
        }
        await getColumnDataFix(dataVariables.value.saveFilterID);
    } else {
        await editedColumnsPayload(data);
        if (dataVariables.value.changeActionColumn) {
            dataVariables.value.isActionColumn = true;
        }
        if (dataVariables.value.changeCheckboxColumn) {
            dataVariables.value.isShowCheckbox = true;
        }
        await getColumnDataFix(dataVariables.value.saveFilterID);
    }
    await getDataTableData();
    dataVariables.value.isHeaderLoad = false;
};
export const tableRowId = async (tempRowId) => {
    dataVariables.value.productDetails = [];
    const data = {
        rowId: tempRowId,
        moduleName: dataVariables.value.moduleName,
        selectedTab: dataVariables.value.selectedTabName,
    };
    await store.dispatch(`${storeName}/getProductDetails`, data);
    dataVariables.value.productDetails = store.getters[`${storeName}/sendProductDetails`].all_product_data_array;
};
export const applyVendorFilter = async (vendorData) => {
    vendorData.forEach(async (element) => {
        const tempData = element.split(',');
        dataVariables.value.BulkVendorData = tempData[0];
        dataVariables.value.VendorId = tempData[1];
    });
    const payload = {
        vendor_id: dataVariables.value.VendorId || '',
        module_name: ' reverse_order',
        tab_name: dataVariables.value.selectedTabName,
    };
    await store.dispatch(`${storeName}/getStripWarehouse`, payload);
    dataVariables.value.ShowBulkVendorModal = false;
};
export const pickNowSubmitData = async () => {
    try {
        dataVariables.value.isLoading = true;
        if (!dataVariables.value.selectedWareHouse) {
            throw new Error('Please select a warehouse');
        }
        const vendor_id = (dataVariables.value.topHeader.user_type === '2' || dataVariables.value.topHeader.user_type === '1') && dataVariables.value.getVendorValues.id.length === 1 ? dataVariables.value.getVendorValues.id[0] : '';
        await store.dispatch(`${storeName}/getPickNowWareHouse`, {
            vendor_id,
            warehouse_address_id: dataVariables.value.selectedWareHouse.id,
            process_type: 3,
            order_id_array: dataVariables.value.warehouseData.checkboxData,
        });
        const result = store.getters[`${storeName}/getPickNowWareHouseData`];
        dataVariables.value.isLoading = false;
        if (result.status === 'success') {
            window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
            setTimeout(async () => {
                await getDataTableData();
            }, 2000);
        } else {
            dataVariables.value.toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
        }
    } catch (error) {
        dataVariables.value.isLoading = false;
        dataVariables.value.toast.add({ severity: 'error', detail: error.message || 'An error occurred, please try again later.', life: 3000 });
    }
};
export const weightUpdateApi = async (payload) => {
    try {
        await store.dispatch(`${storeName}/getWeightData`, payload);
        const result = store.getters[`${storeName}/getWeightApiData`];
        if (result.status === 'success') {
            dataVariables.value.toast.add({ severity: 'success', detail: result.html_message, life: 3000 });
            await getDataTableData();
            emitter.emit('isloading', false);
        } else {
            dataVariables.value.toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
            emitter.emit('isloading', false);
        }
    } catch (error) {
        dataVariables.value.toast.add({ severity: 'error', detail: error.message || 'An error occurred, please try again later.', life: 3000 });
        emitter.emit('isloading', false);
    }
};

export const rejectModalData = async () => {
    dataVariables.value.isLoadingSubmit = true;
    const data = {
        rowId: dataVariables.value.rowIdValue,
        rejectInput: dataVariables.value.rejectInput == undefined ? '' : dataVariables.value.rejectInput,
    };
    await store.dispatch(`${storeName}/getRejectDetails`, data);
    const result = store.getters[`${storeName}/getRejectDetails`];
    if (result.status == 'success') {
        dataVariables.value.isLoadingSubmit = false;
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success Message', detail: result.html_message, life: 3000 });
        rejectCloseModal();
        dataVariables.value.showActionModal = false;
        dataVariables.value.rejectInput = '';
        await getDataTableData();
    } else {
        dataVariables.value.isLoadingSubmit = false;
        dataVariables.value.rejectInput = '';
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 1000 });
    }
};
export const pickNowModal = async (data) => {
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
    await store.dispatch(`${storeName}/getPickNowDetails`, data);
    const result = store.getters[`${storeName}/getPickNowDetails`];
    if (result.status == 'success') {
        dataVariables.value.skeletonDataValue = false;
    } else {
        dataVariables.value.skeletonDataValue = false;
    }
};
export const cancelOrder = async () => {
    dataVariables.value.isLoadingSubmit = true;
    const data = {
        rowId: dataVariables.value.rowIdValue,
    };
    await store.dispatch(`${storeName}/getCancelOrder`, data);
    const checkStatus = store.getters[`${storeName}/checkCancelOrderStatus`];
    if (checkStatus.status == 'success') {
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success Message', detail: checkStatus.html_message, life: 3000 });
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: checkStatus.html_message, life: 3000 });
    }
    dataVariables.value.isLoadingSubmit = false;
    dataVariables.value.showCancelModal = false;
};
export const getStoreDetails = async () => {
    await store.dispatch(`${storeName}/getStoreDetails`);
    dataVariables.value.dropdownStoreDetails = store.getters[`${storeName}/sendStoreDetails`];
    if (dataVariables.value.dropdownStoreDetails.status === 'success') {
        dataVariables.value.selectedSetting = dataVariables.value.dropdownStoreDetails.data[0].id;
    } else {
        dataVariables.value.selectedSetting = '';
    }
};
// export const actionModal = async (data) => {
//     dataVariables.value.rowIdValue = data.rowId;
//     if (data.modalType == 'picknow') {
//         dataVariables.value.showPickNowModal = true;
//         dataVariables.value.skeletonDataValue = true;
//         data['courierPriority'] = dataVariables.value.courierPriority;
//         data['tabName'] = dataVariables.value.selectedTabName;
//         data['changeCourierPriority'] = dataVariables.value.changeCourierPriority;
//         data['appliedWeight'] = dataVariables.value.appliedWeight;
//         data['shipLength'] = dataVariables.value.shipLength;
//         data['shipWidth'] = dataVariables.value.shipWidth;
//         data['shipHeight'] = dataVariables.value.shipHeight;
//         data['deliveredId'] = 0;
//         await store.dispatch(`${storeName}/getPickNowDetails`, data);
//         const result = store.getters[`${storeName}/getPickNowDetails`];
//         if (result.status == 'success') {
//             dataVariables.value.skeletonDataValue = false;
//         } else {
//             dataVariables.value.skeletonDataValue = false;
//         }
//     } else if (data.modalType == 'view') {
//         dataVariables.value.modalType = 'view';
//         dataVariables.value.showProductModel = true;
//     } else if (data.modalType == 'edit') {
//         dataVariables.value.modalType = 'edit';
//         dataVariables.value.showProductModel = true;
//     } else if (data.modalType == 'reject') {
//         dataVariables.value.showRejectModal = true;
//     } else if (data.modalType == 'Cancel') {
//         dataVariables.value.showCancelModal = true;
//         await getDataTableData();
//     } else {
//         dataVariables.value.skeletonDataValue = true;
//         dataVariables.value.showActionModal = data.isModalVisible;
//         data['selectedTab'] = dataVariables.value.selectedTabName;
//         data['moduleName'] = 'reverse_order';
//         const productData = {
//             rowId: data.rowId,
//             moduleName: 'reverse_order',
//             selectedTab: dataVariables.value.selectedTabName,
//         };
//         await store.dispatch(`${storeName}/getProductDetails`, productData);
//         await store.dispatch(`${storeName}/getViewDetails`, data);
//         //  add the activity api
//         await store.dispatch(`${storeName}/getviewDetailModal`, productData);
//         const result = store.getters[`${storeName}/getViewDetails`];
//         if (result.status == 'success') {
//             dataVariables.value.skeletonDataValue = false;
//         } else {
//             dataVariables.value.toast.add({ severity: 'error', summary: 'Error', detail: result.html_message, life: 1000 });
//         }
//         data['courierPriority'] = dataVariables.value.courierPriority;
//         data['tabName'] = dataVariables.value.selectedTabName;
//         data['changeCourierPriority'] = dataVariables.value.changeCourierPriority;
//         data['appliedWeight'] = dataVariables.value.appliedWeight;
//         data['shipLength'] = dataVariables.value.shipLength;
//         data['shipWidth'] = dataVariables.value.shipWidth;
//         data['shipHeight'] = dataVariables.value.shipHeight;
//         data['deliveredId'] = 0;
//         await store.dispatch(`${storeName}/getPickNowDetails`, data);
//     }
// };
export const resetVendorFilter = () => {
    dataVariables.value.BulkVendorData = [];
    dataVariables.value.ShowBulkVendorModal = false;
};
export const openModalFilter = (id) => {
    store.dispatch(`${storeName}/updateOpenModal`, id);
    store.getters[`${storeName}/getOpenModal`];
};
export const callDtTabs = async () => {
    await store.dispatch(`${storeName}/updateDataTableTabs`);
    dataVariables.value.scrollableTabs = store.getters[`${storeName}/getDataTableTabs`].all_tab_data_array;
    dataVariables.value.selectedTabName = dataVariables.value.router.currentRoute.params.tabs == '' ? dataVariables.value.scrollableTabs[0].value : dataVariables.value.router.currentRoute.params.tabs.replace(/-/g, '_');
    const tempHeading = dataVariables.value.scrollableTabs.find((item) => item.value === dataVariables.value.router.currentRoute.params.tabs.replace(/-/g, '_'));
    dataVariables.value.selectedTabHeading = dataVariables.value.router.currentRoute.params.tabs == '' ? dataVariables.value.scrollableTabs[0].name : tempHeading.name;
    if (dataVariables.value.selectedTabName == 'rev_manifest') {
        dataVariables.value.subTabName = 'pending';
    }
    if (dataVariables.value.selectedTabName == 'rev_return_request') {
        dataVariables.value.subTabName = 'requested';
    }
    await warehouseApi();
    store.commit(`${storeName}/setSelectedTabName`, dataVariables.value.selectedTabName);
    dataVariables.value.router.replace({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-') } });
};
export const getActiveTab = async (activeTab) => {
    store.commit(`${storeName}/changeDtTab`, false);
    store.commit(`${storeName}/resetReverseOrderData`);
    store.commit(`${storeName}/setResetSavedFilteredData`);
    dataVariables.value.orderSearch = '';
    dataVariables.value.isHeaderLoad = true;
    dataVariables.value.isShowCheckbox = false;
    dataVariables.value.isActionColumn = false;
    dataVariables.value.selectedTabName = activeTab.value;
    dataVariables.value.selectedTabHeading = activeTab.name;
    dataVariables.value.showSelectedFilter = '';
    store.commit(`${storeName}/setSelectedTabName`, dataVariables.value.selectedTabName);
    activeSabTab();
    store.commit(`${storeName}/clearAllFilter`);
    dataVariables.value.router.replace({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-') } });
    dataVariables.value.dataTableColumns = [];
    dataVariables.value.tempDataTableColumns = [];
    if (dataVariables.value.changeActionColumn) {
        dataVariables.value.isActionColumn = true;
    }
    if (dataVariables.value.changeCheckboxColumn) {
        dataVariables.value.isShowCheckbox = true;
    }
    // await Promise.all([getColumnData(dataVariables.value.saveFilterID), getSaveFilterData(), getDataTableData(), getDataTableDataCount()]);  //trying this new thing to fix the issue but it is workign same as below
    getColumnData(dataVariables.value.saveFilterID);
    await getDataTableData();
    await getSaveFilterData();
    await vendorDataValue(50, 0, '', 'checkbox');
    // await warehouseApi();
    dataVariables.value.isHeaderLoad = false;
};
export const removeSaveFilter = async () => {
    store.commit(`${storeName}/clearAllFilter`);
    dataVariables.value.orderSearch = '';
    dataVariables.value.saveFilterID = '';
    dataVariables.value.saveFilterEditId = null;
    dataVariables.value.editInput = null;
    dataVariables.value.showSelectedFilter = '';
    dataVariables.value.saveFilterValue = '';
    dataVariables.value.showEditInput = false;
    await dataVariables.value.router.push({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-'), id: '' } });
    store.commit(`${storeName}/setOpenModalFalse`, 'viewSaveFilterModal');
    dataVariables.value.toast.add({ severity: 'success', summary: 'Success', detail: 'Removed Filter Successfully', life: 3000 });
    await getColumnData(dataVariables.value.saveFilterID);
    await getDataTableData();
};

// export const editSaveFilterData = async (data) => {
//     console.log(data, 'edit');
//     // const url = apiRoutes.get;
//     // const payload = { module_name: dataVariables.value.moduleName, tab_name: dataVariables.value.selectedTabName };
//     // const combinePayload = { url, payload };
//     // await store.dispatch(`${storeName}/getSaveFilterData`, combinePayload);
// };
export const deleteSaveFilter = async () => {
    dataVariables.value.showDeleteFilter = false;
    const url = apiRoutes.filterDelete + dataVariables.value.saveFilterEditId;
    const valueToRemove = dataVariables.value.saveFilterEditId; // Change this to the actual property value you want to remove
    const indexToRemove = dataVariables.value.savedFilterData.findIndex((item) => item.id == valueToRemove);
    // reArrangeSaveFilter();
    const data = { payload: { module_name: dataVariables.value.moduleName, tab_name: dataVariables.value.selectedTabName, sub_tab_name: dataVariables.value.subTabName }, url: url };
    if (dataVariables.value.router.currentRoute.params.id == dataVariables.value.saveFilterEditId) {
        dataVariables.value.saveFilterValue = '';
        dataVariables.value.editInput = null;
        if (indexToRemove !== -1) {
            // dataVariables.value.savedFilterData.splice(indexToRemove, 1);
            await store.dispatch(`${storeName}/getUpdateDeleteFilterArray`, data);
            await getSaveFilterData();
        } else {
            console.error('');
        }
        dataVariables.value.showSelectedFilter = '';
        dataVariables.value.router.push({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-'), id: '' } });
        if (dataVariables.value.router.currentRoute.path.includes('tickets')) {
            await store.commit(`${storeName}/clearTicketDepartmentId`, '');
        }
        store.commit(`${storeName}/clearAllFilter`);
        await getColumnData(dataVariables.value.saveFilterID);
        await getDataTableData();
        // await getAllWidgetValueData();
        dataVariables.value.saveFilterID = '';
    } else {
        if (indexToRemove !== -1) {
            await store.dispatch(`${storeName}/getUpdateDeleteFilterArray`, data);
            await getSaveFilterData();
            // dataVariables.value.savedFilterData.splice(indexToRemove, 1);
        } else {
            console.error('');
        }
    }
    dataVariables.value.showEditInput = false;
    dataVariables.value.showDeleteFilter = false;
    const elements = document.getElementsByClassName('save-filter-dropdown-outer');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    const response = store.getters[`${storeName}/getResponseMessage`];
    if (response.status == 'success') {
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    }
};

export const getAppliedFilterData = (val, column) => {
    if (val != '') {
        removeClassListOnAppliedFilter();
    } else if (dataVariables.value.getMappedFilterValue[column['field']] != '') {
        removeClassListOnAppliedFilter();
    } else {
        addClassListOnAppliedFilter();
    }
};
export const warehouseApi = async () => {
    const payload = {
        vendor_id: dataVariables.value.getVendorValues?.id[0] || '',
        module_name: ' reverse_order',
        tab_name: dataVariables.value.selectedTabName,
    };
    await store.dispatch(`${storeName}/getStripWarehouse`, payload);
};
export const getAllWidgetTitleData = async () => {
    await store.dispatch(`${storeName}/getWidgetTitleData`, { length: dataVariables.value.pageSize });
};

export const getAllWidgetValueData = async () => {
    dataVariables.value.isWidgetSekeleton = true;
    await store.dispatch(`${storeName}/getWidgetValueData`, { length: dataVariables.value.pageSize });
    dataVariables.value.isWidgetSekeleton = false;
};

export const orderSearchData = async (searchData) => {
    store.dispatch(`${storeName}/getOrderInput`, searchData);
    await getDataTableData();
};

//  new functions
export const getColumnData = async (saveFilterId, filterArr) => {
    dataVariables.value.showSkeletonInCustomizeColumn = true;
    dataVariables.value.isFilterSkeletonShow = true; // added for if any api change data in filter modal
    const url = saveFilterId != '' && saveFilterId !== undefined ? apiRoutes.getById + saveFilterId : apiRoutes.get;
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const combinePayload = { url, payload };
    if (dataVariables.value.router.currentRoute.path.includes('tickets')) {
        filterArr?.forEach(async (filter) => {
            if (filter.ticket_department) {
                await store.commit(`${storeName}/setTicketDepartmentId`, filter.ticket_department.id);
            }
        });
    }
    await store.dispatch(`${storeName}/getDefaultColumn`, combinePayload);
    // await store.dispatch('fetchDtColumn', combinePayload);
    await store.dispatch(`${storeName}/getPaginatorLast`, combinePayload);
    dataVariables.value.pageSize = Number(store.getters[`${storeName}/getPaginatorRow`]);
    dataVariables.value.dataTableColumns = dataVariables.value.getUpdatedColumns['user_customized_column'];
    dataVariables.value.tempDataTableColumns = dataVariables.value.getUpdatedColumns['default_column_header']; // After Column api updated uncommit this
    dtFilterFields(dataVariables.value.tempDataTableColumns);
    dataVariables.value.showSkeletonInCustomizeColumn = false;
    dataVariables.value.isFilterSkeletonShow = false; // added for if any api change data in filter modal

    // store.commit(`${storeName}/setStoreVariables`, filterStoreVariables(dataVariables.value.tempDataTableColumns));
};
const dtFilterFields = (columns) => {
    dataVariables.value.filterFields = columns.filter((dtField) => dtField.isFilterType != 8).map((dtField) => dtField.field);
    dataVariables.value.filterFields.push('vendor_name');
};
export const getSaveFilterData = async () => {
    const url = apiRoutes.get;
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const combinePayload = { url, payload };
    await store.dispatch(`${storeName}/getSaveFilterData`, combinePayload);
};
export const applySaveFilterData = async (data) => {
    await store.commit(`${storeName}/clearAllFilter`);
    await dataVariables.value.router.push({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-'), id: data.id } });
    await store.commit(`${storeName}/setApplySavedFilteredData`, data);
    await getColumnData(data.id, data.filterArr);
    await getDataTableData();
    dataVariables.value.showSelectedFilter = data.name;
    if (data.filterArr.some((filter) => Object.keys(filter).includes(dataVariables.value.dtGlobalSearchId))) {
        dataVariables.value.orderSearch = data.filterArr.find((filter) => Object.keys(filter).includes(dataVariables.value.dtGlobalSearchId))[dataVariables.value.dtGlobalSearchId];
    } else {
        const searchValue = data.filterArr.find((filter) => filter.type === 'search' && filter[dataVariables.value.dtGlobalSearch])?.[dataVariables.value.dtGlobalSearch] || '';
        dataVariables.value.orderSearch = searchValue;
    }
};
export const UpdateSaveFilterData = async (tempData) => {
    const url = apiRoutes.editById + tempData.filterArr?.id;
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const data = {
        length: dataVariables.value.pageSize,
        saveFilterValue: tempData.filterName,
        saveFilterEditId: tempData.filterArr?.id || '' || dataVariables.value.router.currentRoute.params?.id || '',
        newColumns: dataVariables.value.getUpdatedSizePayload,
        size: dataVariables.value.defaultDatatableSize,
        selectedTab: dataVariables.value.selectedTabName,
        tempData: tempData.filterArr,
        updatedFrom: tempData.updatedFrom,
        url,
        payload,
        is_pinned: tempData?.is_pinned || 0,
    };
    await store.dispatch(`${storeName}/getUpdatefilterData`, data);
    const saveFilterStatus = store.getters[`${storeName}/getSaveFilterResponse`];
    if (saveFilterStatus.status == 'success') {
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success Message', detail: saveFilterStatus.message, life: 3000 });
        await getSaveFilterData();
        const searchValue = tempData.filterArr.search ? tempData.filterArr.search : '';
        dataVariables.value.orderSearch = searchValue;
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: saveFilterStatus.message, life: 3000 });
    }
};
export const saveEditFiltersDatatable = async (tempData) => {
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
    };
    const data = {
        length: dataVariables.value.pageSize,
        saveFilterValue: tempData.filterName,
        updateType: tempData.updateType,
        updateTypeName: tempData.updateType === 'edit' ? 'edit_filter_id' : '',
        saveFilterEditId: tempData.updateType === 'edit' ? dataVariables.value.saveFilterEditId : '',
        newColumns: dataVariables.value.getUpdatedSizePayload,
        size: dataVariables.value.defaultDatatableSize,
        selectedTab: dataVariables.value.selectedTabName,
        tempData: tempData.filterArr,
        newFilter: true,
        payload,
        is_pinned: 0,
    };
    dataVariables.value.saveFilterValue = tempData.filterName;
    await store.dispatch(`${storeName}/getUpdatefilterData`, data);
    const saveFilterStatus = store.getters[`${storeName}/getSaveFilterResponse`];
    if (saveFilterStatus.status == 'success') {
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success Message', detail: saveFilterStatus.message, life: 3000 });
        await getSaveFilterData();
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: saveFilterStatus.message, life: 3000 });
    }
};

export const editedColumnsPayload = async (columnPayload) => {
    const url = dataVariables.value.router.currentRoute.params?.id ? apiRoutes.editById + dataVariables.value.router.currentRoute.params.id : apiRoutes.edit;
    const joinColumnPayload = columnPayload['newColumns'].join(',');
    const payload = {
        module_name: dataVariables.value.moduleName,
        tab_name: dataVariables.value.selectedTabName,
        sub_tab_name: dataVariables.value.subTabName,
        is_active_sub_tab_filter: selectedSubTab.find((tab) => tab == dataVariables.value.selectedTabName) ? 1 : 0,
        filter_customize_column: joinColumnPayload,
    };
    const combinePayload = { url, payload };
    await store.dispatch(`${storeName}/getEditedColumnsData`, combinePayload);
    const response = store.getters[`${storeName}/getEditedColumnStatus`];
    if (response.status == 'success') {
        dataVariables.value.toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
    } else {
        dataVariables.value.toast.add({ severity: 'error', summary: 'Error Message', detail: response.message, life: 3000 });
    }
};

export const defaultCustomizeSize = (customColumnData) => {
    store.dispatch(`${storeName}/getDataTableSize`, customColumnData);
};

export const moreFeatureShowHide = () => {
    dataVariables.value.modalShow = true;
};

export const removeBackdrop = () => (dataVariables.value.modalShow = false);

export const getSelectedTabOnLoad = () => {
    dataVariables.value.selectedTabName = dataVariables.value.router.currentRoute.params.tabs == '' ? dataVariables.value.scrollableTabs[0].value : dataVariables.value.router.currentRoute.params.tabs.replace(/-/g, '_');
    const tempHeading = dataVariables.value.scrollableTabs.find((item) => item.value === dataVariables.value.router.currentRoute.params.tabs.replace(/-/g, '_'));
    dataVariables.value.selectedTabHeading = dataVariables.value.router.currentRoute.params.tabs == '' ? dataVariables.value.scrollableTabs[0].name : tempHeading.name;
    dataVariables.value.router.replace({ name: dataVariables.value.router.currentRoute.name, params: { tabs: dataVariables.value.selectedTabName.replace(/_/g, '-') } });
};

// const filterStoreVariables = (columns) => {
//     columns
//         .filter((dtField) => dtField.isFilterType != 8)
//         .map((dtField) => {
//             switch (dtField.isFilterType) {
//                 case 1:
//                 case 6:
//                 case 7:
//                     dataVariables.value.storeFilterVariables[dtField.field] = { id: [], value: [] };
//                     break;
//                 case 2:
//                 case 3:
//                 case 4:
//                     dataVariables.value.storeFilterVariables[dtField.field] = '';
//                     break;
//                 case 5:
//                     dataVariables.value.storeFilterVariables[dtField.field] = { id: '', value: '', label: '' };
//                     break;
//             }
//             return dataVariables.value.storeFilterVariables;
//         });
//     dataVariables.value.storeFilterVariables.paginatorStart = 0;
//     dataVariables.value.storeFilterVariables.paginatorLast = 10;
//     dataVariables.value.storeFilterVariables.search = '';
//     dataVariables.value.storeFilterVariables.vendor_name = { id: [], value: [] };
//     return dataVariables.value.storeFilterVariables;
// };
