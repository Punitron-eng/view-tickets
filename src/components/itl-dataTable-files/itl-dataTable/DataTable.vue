<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TieredMenu from 'primevue/tieredmenu';
import { useToast } from 'primevue/usetoast';
import ActionColumn from './ActionColumn.vue';
import PaginatorView from 'primevue/paginator';
import DTTextVue from './component/DTText.vue';
import DTAmount from './component/DTAmount.vue';
import DTWeight from './component/DTWeight.vue';
import { dataTableVariables } from './dataTable';
import DTWarehouse from './component/DTWarehouse.vue';
import DTFilterModal from './modal/DTFilterModal.vue';
import * as dataTableFunc from './commonFunctions';
import { DARKMODE } from '@/store/dark-mode/constants';
import DatatableHeader from './component/DatatableHeader.vue';
import HeaderLoading from '@/components/dt-head-load/HeaderLoading.vue';
import { dataTableVariables as dtVariable } from './commonVariable';
import DataTableFilter from '@/components/itl-datatable-files/itl-dataTable-filter/DatatableFilter.vue';
import { computed, watch, onMounted, onBeforeMount, defineProps, defineEmits, ref, nextTick, provide } from 'vue';
import DtTab from './DtTab.vue';
import DTTextHover from './component/DTTextHover.vue';

const menu = ref(null);
const toast = useToast();
const check = ref(false);
const route = useRoute();
const store = useStore();
const dataTableWidth = ref(null);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps([
    'rowData',
    'filterModalData',
    'handlePageChange',
    'totalrecord',
    'isHeaderLoad',
    'isSkeleton',
    'isShowCheckbox',
    'paginatorStart',
    'paginatorLast',
    'pageSize',
    'isCustomizeColumnAvail',
    'productDetails',
    'isActionColumn',
    'actionColumnWidth',
    'isOrderIdModalAvail',
    'haveAccess',
    'haveAccessOrderDetail',
    'haveAccessParcel',
    'weightUpdateAvail',
]);

const dataTableConsts = dataTableVariables;
const commonVariables = dtVariable;
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const emit = defineEmits(['filter', 'exportValue', 'tableRowId', 'customColumn', 'vendorModalVisible', 'clear-value', 'applyfilterData', 'columnPosition', 'toggleVendor', 'actionModal', 'defaultColumnPayload', 'getTempColumn']);
const getCustomizeColumnSize = computed(() => {
    return dataTableConsts.value?.customizeColumns?.length ?? 0;
});
const getDataTableColumns = computed(() => {
    const userType = topHeader.user_type;
    return commonVariables.value.dataTableColumns
        .map((item) => {
            if (commonVariables.value.columnsOnlyForMasters.includes(item.field) && userType != 1 && userType != 2) {
                return null;
            }
            if (item.field === 'return_rejected_date') {
                if (commonVariables.value.subTabName == 'requested') {
                    return null;
                }
            }
            if (item.field == null) {
                return null;
            }
            if (item.field === commonVariables.value.syncDateName && commonVariables.value.allFilterData && commonVariables.value.allFilterData[item.field] && commonVariables.value.allFilterData[item.field].value) {
                commonVariables.value.startDate = commonVariables.value.allFilterData[item.field].value.split(' ');
            }
            if (item.frozenPosition == null || item.frozenPosition == 'null') {
                item.frozenPosition = 'left';
                item.isColumnFixed = false;
            }
            const field = item.field;
            const appliedFilter = commonVariables.value.allFilterData && commonVariables.value.allFilterData[field] ? commonVariables.value.allFilterData[field] : null;
            const appliedSort = commonVariables.value.allFilterData && commonVariables.value.allFilterData[field + '_sort'] ? commonVariables.value.allFilterData[field + '_sort'] : 'none';
            const temp = { ...item, filterValue: appliedFilter, sortValue: appliedSort };
            return temp;
        })
        .filter((column) => column !== null);
});
const computedSplitValues = computed(() => {
    return commonVariables.value.startDate;
});
const getTempDataTableColumns = computed(() => {
    const userType = topHeader.user_type;
    return commonVariables.value.tempDataTableColumns
        .map((item) => {
            if (commonVariables.value.columnsOnlyForMasters.includes(item.field) && userType != 1 && userType != 2) {
                return null;
            }
            if (item.field === commonVariables.value.syncDateName && commonVariables.value.allFilterData && commonVariables.value.allFilterData[item.field] && commonVariables.value.allFilterData[item.field].value) {
                commonVariables.value.startDate = commonVariables.value.allFilterData[item.field].value.split(' ');
            }
            if (item.field == null || item.frozenPosition == null || item.frozenPosition === 'null') {
                item.frozenPosition = 'left';
                item.isColumnFixed = false;
            }
            const field = item.field;
            const appliedFilter = commonVariables.value.allFilterData?.[field] ?? null;
            const appliedSort = commonVariables.value.allFilterData?.[field + '_sort'] ?? 'none';
            return { ...item, filterValue: appliedFilter, sortValue: appliedSort };
        })
        .filter(Boolean);
});

const defaultCustomizeSize = () => {
    let customColumnData = [];
    for (let i = 0; i < getDataTableColumns.value.length; i++) {
        customColumnData.push(
            `${getDataTableColumns.value[i].field}::${getDataTableColumns.value[i].width}::${getDataTableColumns.value[i].isColumnFixed ? 1 : 0}::${getDataTableColumns.value[i].isVisible ? 1 : 0}::${getDataTableColumns.value[i].frozenPosition}`
        );
    }
    emit('defaultColumnPayload', customColumnData);
};
//end
const tempSelectAll = (getCheck) => {
    dataTableConsts.value.checkboxValues = getCheck ? props.rowData.map((row) => row.row_id) : [];
    check.value = getCheck;
    emit('exportValue', dataTableConsts.value.checkboxValues);
};

const tempSingle = () => {
    check.value = dataTableConsts.value.checkboxValues.length === props.rowData.length;
    emit('exportValue', dataTableConsts.value.checkboxValues);
};

const items = ref([
    {
        label: 'Column Setting',
        icon: 'column-icon column-setting-icon',
        command: () => attachSubmenuEventListeners(),
        items: [
            {
                label: 'Move to start',
                icon: 'column-icon column-movetostart-icon',
                command: () => getColumnPosition('start', dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Move to End',
                icon: 'column-icon column-movetoend-icon',
                command: () => getColumnPosition('end', dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Move to Left',
                icon: 'column-icon column-movetoleft-icon',
                command: () => getColumnPosition('left', dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Move to Right',
                icon: 'column-icon column-movetoright-icon',
                command: () => getColumnPosition('right', dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Reset Column Width',
                icon: 'column-icon column-reset-icon',
                command: () => resetColumnWidth(dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Pin Column',
                icon: 'column-icon column-pin-icon',
                command: () => toggleFreezSelectedColumn(dataTableConsts.value.storeSelectedColumn),
            },
            {
                label: 'Hide Column',
                icon: 'column-icon column-hide-icon',
                command: () => hideAndShowColumn(dataTableConsts.value.storeSelectedColumn),
            },
        ],
    },
]);
watch(
    () => getDataTableColumns.value,
    (newColumns) => {
        dataTableConsts.value.defaultColumns = [];
        dataTableConsts.value.columnsData = arrangeDefaultPinColumns(newColumns);
        defaultCustomizeSize();
    }
);
watch(
    () => getTempDataTableColumns.value,
    (newColumns) => {
        emit('getTempColumn', newColumns);
        dataTableConsts.value.getTempColumns = newColumns;
        preventShufflingColumns();
    }
);
watch(
    () => dataTableConsts.value.columnsData,
    (newColumns) => {
        if (!newColumns.length) {
            dataTableConsts.value.tempHeaderLoader = true;
        } else {
            dataTableConsts.value.tempHeaderLoader = false;
        }
        dataTableConsts.value.customizeColumns = [];
        dataTableConsts.value.customizeColumns = arrangePinColumns(newColumns);
        preventShufflingColumns();
    }
);
watch(
    () => props.rowData,
    () => {
        check.value = false;
        dataTableConsts.value.checkboxValues = [];
    }
);
onBeforeMount(() => initFilters1());
onMounted(async () => {
    dataTableConsts.value.windowWidth = window.innerWidth;
    document.body.classList.add('dt-wrapper-outer');
    document.body.classList.add('datatable');
    await dataTableFunc.getSaveFilterData();
    dataTableConsts.value.getTempColumns = getTempDataTableColumns.value;
    dataTableConsts.value.columnsData = arrangeDefaultPinColumns(getDataTableColumns.value);
    filterCustomizeColumns();
    countPinColumnsLength();
    const temp = document.querySelectorAll('.remove-resize-cursor>.p-column-resizer');
    if (temp) {
        temp.forEach((item) => {
            item.classList.remove('p-column-resizer');
        });
    }
    const divElement = document.querySelector('.card.datatable-card');
    if (divElement) {
        dataTableWidth.value = divElement.clientWidth;
    }
    setTimeout(() => {
        dataTableConsts.value.tempCheckboxTest = props.isShowCheckbox;
        dataTableConsts.value.tempHeaderTest = props.isHeaderLoad;
    }, 100);
});
const saveCustomizeColumn = (selectedColumn, tempColumnsData) => {
    const temp = tempColumnsData.map((col) => `${col.field}::${col.width}::${col.isColumnFixed ? 1 : 0}::${col.isVisible ? 1 : 0}::${col.frozenPosition}`);
    const data = {
        newColumns: temp,
        size: 'sm',
        column: selectedColumn,
        updatedColumns: tempColumnsData,
    };
    emit('customColumn', data);
};
const filterCustomizeColumns = () => {
    dataTableConsts.value.customizeColumns = dataTableConsts.value.columnsData.filter((column) => column.isVisible === true);
};
const arrangeDefaultPinColumns = (columns) => {
    const leftPinColumns = columns.filter((column) => column.isColumnFixed && column.frozenPosition === 'left' && column.isColumnAvailable);
    const leftUnPinColumns = columns.filter((column) => !column.isColumnFixed && column.isColumnAvailable);
    const rightPinColumns = columns.filter((column) => column.isColumnFixed && column.frozenPosition === 'right' && column.isColumnAvailable);

    return [...leftPinColumns, ...leftUnPinColumns, ...rightPinColumns];
};

const arrangePinColumns = (columns) => {
    const leftPinColumns = columns.filter((column) => column.isColumnFixed && column.frozenPosition === 'left' && column.isVisible);
    const leftUnPinColumns = columns.filter((column) => !column.isColumnFixed && column.isVisible);
    const rightPinColumns = columns.filter((column) => column.isColumnFixed && column.frozenPosition === 'right' && column.isVisible);

    return [...leftPinColumns, ...leftUnPinColumns, ...rightPinColumns];
};

const attachSubmenuEventListeners = () => {
    const submenuItems = document.querySelectorAll('.p-menuitem');
    submenuItems.forEach((item) => {
        item.addEventListener('click', adjustPosition);
    });
};

const adjustPosition = () => {
    const menuContainer = document.querySelector('.p-submenu-list');
    const availableSpace = window.innerWidth - menuContainer.getBoundingClientRect().right;
    menuContainer.classList.toggle('open-left', availableSpace < 100);
};

const getFilterIconSrc = (iconName) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};

const setFilter = (data) => {
    dataTableConsts.value.filter = data;
};
const applyFilter = (field) => {
    if (dataTableConsts.value.filter.type === 'minMax' && Number(dataTableConsts.value.filter[field].max) < Number(dataTableConsts.value.filter[field].min)) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Min amount should be less than max amount', life: 3000 });
        return;
    } else {
        const applyButton = document.querySelector('.store-filter-button-apply');
        applyButton.classList.remove('apply-button-disable');
        const buttonElements = document.querySelector('[aria-label="Apply"]');
        buttonElements.dispatchEvent(new Event('click'));
        emit('filter', dataTableConsts.value.filter);
    }
};
const getFilterValue = (data) => {
    emit('applyfilterData', data, dataTableConsts.value.storeSelectedColumn);
};
const initFilters1 = () => (dataTableConsts.value.filters = props.filterModalData);
const clearValue = (filterId) => {
    const buttonElements = document.querySelectorAll('.p-button-outlined');
    buttonElements.forEach((buttonElement) => {
        buttonElement.dispatchEvent(new Event('click'));
    });
    emit('clear-value', filterId);
};
const dataDropdownToggle = (event, data, index) => {
    dataTableConsts.value.selectedCharge = null;
    dataTableConsts.value.selectedRowId = index;
    dataTableConsts.value.isOverlayOpen = !dataTableConsts.value.isOverlayOpen;
    dataTableConsts.value.selectedCharge = data;
    const parentElement = event.target.closest('.parent');
    if (
        dataTableConsts.value.selectedCharge?.name == '' ||
        dataTableConsts.value.selectedCharge[0]?.total_whatsapp_charge === '₹0' ||
        dataTableConsts.value.selectedCharge[0]?.Total_SMS_Charges === '₹0' ||
        dataTableConsts.value.selectedCharge[0]?.Total_Email_Charges === '₹0' ||
        dataTableConsts.value.selectedCharge[0]?.final_total_price == '0'
    ) {
        return;
    } else {
        if (dataTableConsts.value.isOverlayOpen) {
            parentElement.classList.add('parent');
            parentElement.classList.add('overlay-open');
        } else {
            parentElement.classList.remove('overlay-open');
        }
    }
};
const customerToggle = (event, data, index, fieldName, isApiAvail) => {
    let enableEmit = 'apiAvail';
    dataTableConsts.value.selectedCharge = null;
    dataTableConsts.value.isOverlayOpen = !dataTableConsts.value.isOverlayOpen;
    dataTableConsts.value.selectedCharge = data;
    const parentElement = event.target.closest('.parent');
    if (dataTableConsts.value.isOverlayOpen) {
        parentElement.classList.add('parent');
        parentElement.classList.add('overlay-open');
    } else {
        parentElement.classList.remove('overlay-open');
    }
    if (enableEmit === isApiAvail) {
        emit('tableRowId', data);
    } else {
        return;
    }
};
const showVendorModal = () => emit('vendorModalVisible', true);
const toggleFreezSelectedColumn = (column) => {
    if (column.isVisible === true) {
        const frozenColumnsRightCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'right').length;
        const frozenColumnsLeftCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'left').length;
        countPinColumnsLength();
        if (column.isColumnFixed === false && dataTableConsts.value.pinColumnsLength === 4) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Maximum 4 columns should be fixed', life: 3000 });
        } else {
            const updatedColumns = dataTableConsts.value.columnsData.map((col) => {
                if (col.field === column.field) {
                    col.isColumnFixed = !col.isColumnFixed;
                    dataTableConsts.value.isResetWidthAvail = false;
                }
                return col;
            });
            const tempUpdatedColumns = arrangeDefaultPinColumns(updatedColumns);
            if ((column.frozenPosition === 'right' && frozenColumnsRightCount > 2 && !column.isColumnFixed) || (column.frozenPosition === 'left' && frozenColumnsLeftCount > 2 && !column.isColumnFixed)) {
                customizeColumnPositionPayload(column, tempUpdatedColumns);
            } else {
                dataTableConsts.value.columnsData = [...tempUpdatedColumns];
                commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
                filterCustomizeColumns();
                saveCustomizeColumn(column, tempUpdatedColumns);
            }
        }
    } else {
        return;
    }
    const buttonElements = document.querySelectorAll('.p-button-outlined');
    buttonElements.forEach((buttonElement) => {
        buttonElement.dispatchEvent(new Event('click'));
    });
};
const countPinColumnsLength = async () => (dataTableConsts.value.pinColumnsLength = dataTableConsts.value.customizeColumns.filter((column) => column.isColumnFixed === true).length);
const startScrolling = (event) => {
    const header = document.querySelector('.p-datatable-thead');
    const preventDraggable = header.contains(event.target.closest('th'));
    if (!preventDraggable) {
        dataTableConsts.value.isScrolling = true;
        dataTableConsts.value.initialScrollX = event.clientX;
    } else {
        dataTableConsts.value.isScrolling = false;
    }
};
const stopScrolling = () => (dataTableConsts.value.isScrolling = false);
const scrollTable = (event) => {
    if (dataTableConsts.value.isScrolling) {
        const deltaX = dataTableConsts.value.initialScrollX - event.clientX;
        const dataTable = document.querySelector('.p-datatable-wrapper');
        dataTable.scrollLeft += deltaX;
        dataTableConsts.value.initialScrollX = event.clientX;
    }
};
const hideAndShowColumn = (column) => {
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
        if ((tempColumn.isColumnFixed && column.frozenPosition === 'right' && frozenColumnsRightCount > 2) || (tempColumn.isColumnFixed && column.frozenPosition === 'left' && frozenColumnsLeftCount > 2)) {
            customizeColumnPositionPayload(column, updatedColumns);
        } else {
            dataTableConsts.value.columnsData = [...updatedColumns];
            commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
            filterCustomizeColumns();
            saveCustomizeColumn(column, updatedColumns);
        }
    }
    dataTableConsts.value.isResetWidthAvail = false;
};
const getColumnPosition = (position, column) => {
    const tempColumn = column;
    const index = dataTableConsts.value.columnsData.findIndex((col) => col.field === tempColumn.field);
    switch (position) {
        case 'left':
            moveColumnToLeft(tempColumn);
            break;
        case 'right':
            moveColumnToRight(tempColumn);
            break;
        case 'start':
            moveColumnToStart(index, tempColumn);
            break;
        case 'end':
            moveColumnToEnd(index, tempColumn);
            break;
        default:
            return;
    }
    dataTableConsts.value.isResetWidthAvail = false;
    const buttonElements = document.querySelectorAll('.p-button-outlined');
    buttonElements.forEach((buttonElement) => {
        buttonElement.dispatchEvent(new Event('click'));
    });
};
const moveColumnToLeft = (column) => {
    const findIndexOfSelectedColumn = dataTableConsts.value.customizeColumns.findIndex((col) => col.field === column.field);
    if (findIndexOfSelectedColumn !== 0) {
        const replaceColumn = dataTableConsts.value.customizeColumns[findIndexOfSelectedColumn - 1];
        const findIndexofReplaceColumn = dataTableConsts.value.columnsData.findIndex((col) => col.field === replaceColumn.field);
        const findIndexofSelecetedColumnInColumnsData = dataTableConsts.value.columnsData.findIndex((col) => col.field === column.field);
        const selectedColumn = dataTableConsts.value.columnsData[findIndexofSelecetedColumnInColumnsData];
        const tempColumnsData = [...dataTableConsts.value.columnsData];
        tempColumnsData.splice(findIndexofSelecetedColumnInColumnsData, 1);
        tempColumnsData.splice(findIndexofReplaceColumn, 0, selectedColumn);
        dataTableConsts.value.columnsData = [...tempColumnsData];
        commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
        filterCustomizeColumns();
        saveCustomizeColumn(column, dataTableConsts.value.columnsData);
    }
};
const moveColumnToRight = (column) => {
    const findIndexOfSelectedColumn = dataTableConsts.value.customizeColumns.findIndex((col) => col.field === column.field);
    if (findIndexOfSelectedColumn !== dataTableConsts.value.customizeColumns.length - 1) {
        const replaceColumn = dataTableConsts.value.customizeColumns[findIndexOfSelectedColumn + 1];
        const findIndexofReplaceColumn = dataTableConsts.value.columnsData.findIndex((col) => col.field === replaceColumn.field);
        const findIndexofSelecetedColumnInColumnsData = dataTableConsts.value.columnsData.findIndex((col) => col.field === column.field);
        const selectedColumn = dataTableConsts.value.columnsData[findIndexofSelecetedColumnInColumnsData];
        const tempColumnsData = [...dataTableConsts.value.columnsData];
        tempColumnsData.splice(findIndexofSelecetedColumnInColumnsData, 1);
        tempColumnsData.splice(findIndexofReplaceColumn, 0, selectedColumn);
        dataTableConsts.value.columnsData = [...tempColumnsData];
        commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
        filterCustomizeColumns();
        saveCustomizeColumn(column, dataTableConsts.value.columnsData);
    }
};
const moveColumnToStart = (index, column) => {
    if (index !== 0) {
        const frozenColumnsRightCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'right').length;
        const frozenColumnsLeftCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'left').length;
        const newPosition = Math.min(frozenColumnsLeftCount, index);
        column.frozenPosition = 'left';
        const tempColumnsData = [...dataTableConsts.value.columnsData];
        tempColumnsData.splice(index, 1);
        tempColumnsData.splice(newPosition, 0, column);
        if (frozenColumnsRightCount > 2 && column.isColumnFixed === true) {
            customizeColumnPositionPayload(column, tempColumnsData);
        } else {
            dataTableConsts.value.columnsData = [...tempColumnsData];
            commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
            filterCustomizeColumns();
            saveCustomizeColumn(column, tempColumnsData);
        }
    }
};
const moveColumnToEnd = (index, column) => {
    const customizeColumnIndex = dataTableConsts.value.customizeColumns.findIndex((col) => col.field === column.field);
    if (customizeColumnIndex !== dataTableConsts.value.customizeColumns.length - 1) {
        const frozenColumnsLeftCount = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'left').length;
        let insertIndex = '';
        const lastColumn = dataTableConsts.value.columnsData[dataTableConsts.value.columnsData.length - 1];
        const tempColumn = dataTableConsts.value.columnsData.filter((column) => column.isColumnFixed && column.frozenPosition === 'right');
        if (lastColumn.isColumnFixed === true && column.isColumnFixed === true && column.frozenPosition === 'right') {
            return;
        } else {
            if (lastColumn.isColumnFixed === true) {
                insertIndex = dataTableConsts.value.columnsData.length - (tempColumn.length + 1);
            } else {
                insertIndex = dataTableConsts.value.columnsData.length - 1;
            }
            column.frozenPosition = 'right';
            const tempColumnsData = [...dataTableConsts.value.columnsData];
            tempColumnsData.splice(index, 1);
            tempColumnsData.splice(insertIndex, 0, column);
            if (frozenColumnsLeftCount > 2 && column.isColumnFixed === true) {
                customizeColumnPositionPayload(column, tempColumnsData);
            } else {
                dataTableConsts.value.columnsData = [...tempColumnsData];
                commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
                filterCustomizeColumns();
                saveCustomizeColumn(column, tempColumnsData);
            }
        }
    }
};
const getSelectedColumn = async (column) => {
    dataTableConsts.value.storeSelectedColumn = column;
    const windowWidth = window.innerWidth;
    const pinLabel = column.isColumnFixed ? 'Unpin Column' : 'Pin Column';
    items.value[0].items[5].label = pinLabel;
    await nextTick();
    const filterOverlay = document.querySelector('.p-column-filter-overlay');
    const popoverBody = filterOverlay.querySelector('.popover-body');
    const filterWidth = popoverBody.offsetWidth;
    const { left } = filterOverlay.getBoundingClientRect();
    const availWindowSpace = windowWidth - left;
    if (availWindowSpace < filterWidth) {
        filterOverlay.style.left = `${left - availWindowSpace}px`;
    }
};
const resetColumnWidth = (column) => {
    if (dataTableConsts.value.customizeColumns.length > 5) {
        if (column.isColumnFixed === true) {
            return;
        } else {
            const dataTableElement = document.querySelector('.p-datatable-resizable-table');
            dataTableElement.style.width = `${dataTableWidth.value}px`;
            dataTableElement.style.minWidth = `${dataTableWidth.value}px`;
            const updatedColumns = dataTableConsts.value.columnsData.map((col) => {
                if (col.field === column.field) {
                    col.width = column.defaultWidth;
                }
                return col;
            });
            dataTableConsts.value.isResetWidthAvail = false;
            dataTableConsts.value.columnsData = updatedColumns;
            commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
            filterCustomizeColumns();
            saveCustomizeColumn(column, dataTableConsts.value.columnsData);
            const buttonElements = document.querySelector('[aria-label="Clear"]');
            buttonElements.dispatchEvent(new Event('click'));
        }
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Column Width can not be reset', life: 3000 });
    }
};
const preventShufflingColumns = () => {
    const tempColumns = dataTableConsts.value.getTempColumns
        .filter((column) => column.isColumnAvailable)
        .map((element) => {
            return dataTableConsts.value.columnsData.find((item) => {
                if (element.field === item.field) {
                    return { ...element, isColumnFixed: item.isColumnFixed, isVisible: item.isVisible };
                }
            });
        });
    dataTableConsts.value.defaultColumns = [...tempColumns];
};
const customizeColumnPositionPayload = (selectedColumn, tempColumnsData) => {
    const temp = tempColumnsData.map((col) => `${col.field}::${col.width}::${col.isColumnFixed ? 1 : 0}::${col.isVisible ? 1 : 0}::${col.frozenPosition}`);
    const data = {
        newColumns: temp,
        size: 'sm',
        column: selectedColumn,
        updatedColumns: tempColumnsData,
    };
    emit('columnPosition', data);
};
const toggleVendorModal = (column) => {
    if (column.isFilterType !== null) return;
    emit('toggleVendor', true);
};
const onColumnResize = (event) => {
    dataTableConsts.value.isResetWidthAvail = true;
    setTimeout(() => {
        const resizedColumnElement = event.element;
        const resizedColumnIndex = Array.from(resizedColumnElement.parentNode.children).indexOf(resizedColumnElement);
        const newWidth = resizedColumnElement.clientWidth;
        const columns = document.querySelectorAll('.p-column-title');
        const columnName = columns[resizedColumnIndex].textContent.trim();
        let selectedColumn = '';
        const updatedColumns = dataTableConsts.value.columnsData.map((column) => {
            if (columnName === column.header) {
                selectedColumn = column;
                return { ...column, width: `${newWidth}px` };
            }
            return column;
        });
        dataTableConsts.value.columnsData = [...updatedColumns];
        commonVariables.value.dataTableColumns = dataTableConsts.value.columnsData;
        filterCustomizeColumns();
        saveCustomizeColumn(selectedColumn, dataTableConsts.value.columnsData);
    }, 100);
};
const showActionModal = (data) => {
    emit('actionModal', data);
};
const openOrderIdModal = (rowId) => {
    const data = {
        isModalVisible: true,
        rowId: rowId,
        modalType: '',
    };
    emit('actionModal', data);
};

const openTicketModal = (ticketId) => {
    dtVariable.value.isChatModalVisible = true;
    dtVariable.value.selectedTicketId = ticketId;
};
// provide('hideAndShowColumn', hideAndShowColumn);
</script>

<template>
    <ToastView class="notification-bar" />
    <div v-if="dataTableConsts.checkboxValues.length" class="select-all-checkbox-label h-fit md:h-[48px] gap-2 flex flex-col md:flex-row md:justify-between text-[#fff] !items-start md:!items-center">
        <div class="flex justify-start w-full items-center">
            <img src="@/assets/images/select-all.svg" alt="" class="select-all-margin" />
            <div class="select-all-margin select-label-text">{{ dataTableConsts.checkboxValues.length }} Selected</div>
            <div class="select-all-label-text" @click="tempSelectAll(true)">Select all {{ props.rowData.length >= props.pageSize ? props.pageSize : props.rowData.length }} orders</div>

            <div class="hidden md:block ml-4">
                <slot name="strip-left-side"></slot>
            </div>
        </div>

        <div class="block md:hidden">
            <slot name="strip-left-side"></slot>
        </div>

        <div>
            <slot name="strip-button"></slot>
        </div>
        <div>
            <slot name="return-dropDown"></slot>
        </div>
    </div>
    <div class="col-12 p-0">
        <div class="dt-tabs-outer" v-if="dtVariable.isTabsPresent">
            <DtTab v-if="dtVariable.isTabsPresent" :scrollable-tabs="dtVariable.scrollableTabs" @get-active-tab="dataTableFunc.getActiveTab" />
        </div>
        <div class="flex">
            <slot name="dataTable-left-side-section"> </slot>
            <div class="datatable-card datatable-main-outer w-screen overflow-auto" :class="!dtVariable.isTabsPresent ? '!rounded-[12px]' : 'card'">
                <!-- <slot name="tabview"></slot> -->
                <DatatableHeader :hideAndShowColumn="hideAndShowColumn" :getCustomizeColumnSize="getCustomizeColumnSize" :computedSplitValues="computedSplitValues" :toggleFreezSelectedColumn="toggleFreezSelectedColumn">
                    <template #DataTable-header-left-side>
                        <slot name="DataTable-header-left-side"> </slot>
                    </template>

                    <template #header-left-side>
                        <slot name="header-left-side"> </slot>
                    </template>
                    <template #header-right-side>
                        <slot name="header-right-side"> </slot>
                    </template>
                    <template #bottomsheet-top>
                        <slot name="bottomsheet-top"> </slot>
                    </template>
                    <template #bottomsheet>
                        <slot name="bottomsheet"></slot>
                    </template>
                </DatatableHeader>
                <slot name="widget"></slot>
                <slot name="column-Resize"></slot>
                <div class="flex">
                    <slot name="custom-column"></slot>
                    <slot name="input-search"></slot>
                    <slot name="filter-date"></slot>
                </div>
                <slot name="filter-li"></slot>
                <div id="custom_height" class="custom-height position-relative">
                    <div class="datatable-wrapper" @mousedown="startScrolling" @mousemove="scrollTable" @mouseup="stopScrolling" @mouseleave="stopScrolling">
                        <DataTable
                            :value="props.rowData"
                            :scrollable="true"
                            scrollHeight="flex"
                            :loading="dataTableConsts.loading"
                            dataKey="id"
                            :rowHover="false"
                            v-model:filters="dataTableConsts.filters"
                            filterDisplay="menu"
                            @page="props.handlePageChange"
                            :resizableColumns="dataTableConsts.customizeColumns.length > 5 ? props.isCustomizeColumnAvail : false"
                            columnResizeMode="expand"
                            @column-resize-end="onColumnResize"
                            responsiveLayout="scroll"
                        >
                            <template v-if="!props.isHeaderLoad" #empty>
                                <div class="no-record-outer flex flex-col justify-center items-center gap-1">
                                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[65px]" />
                                    <div class="head">No Records Found</div>
                                    <div class="sub-head">Try changing the filters or search term.</div>
                                    <slot name="viewAllApiData"></slot>
                                </div>
                            </template>
                            <HeaderLoading v-if="props.isHeaderLoad"></HeaderLoading>
                            <ColumnView
                                v-if="props.isShowCheckbox"
                                class="column-checkbox remove-resize-cursor"
                                :style="{
                                    width: `58px !important`,
                                    minWidth: `58px !important`,
                                }"
                            >
                                <template #header v-if="!props.isHeaderLoad">
                                    <input type="checkbox" name="selectAll" id="selectAll" v-model="check" @change="tempSelectAll(check)" class="p-column-title styled-checkbox" />
                                    <label for="selectAll"></label>
                                </template>
                                <template #body="{ data }">
                                    <span :class="props.isHeaderLoad ? 'hidden' : ''">
                                        <input type="checkbox" name="checkbox" :id="data.row_id" v-model="dataTableConsts.checkboxValues" @change="tempSingle()" :value="data.row_id" class="styled-checkbox" />
                                        <label :for="data.row_id"></label>
                                    </span>
                                </template>
                            </ColumnView>
                            <ColumnView
                                v-for="(col, index) in dataTableConsts.customizeColumns"
                                :columnKey="col.field"
                                :key="index"
                                :style="{
                                    width: dataTableConsts.customizeColumns.length < 5 ? '24%' : dataTableConsts.isResetWidthAvail ? `${col.width}` : `${col.width}!important`,
                                    minWidth: dataTableConsts.customizeColumns.length < 5 ? '24%' : `${col.defaultWidth}!important`,
                                    maxWidth: `unset !important`,
                                }"
                                :rowReorderIcon="'rowRecorderIcon'"
                                :field="col.field"
                                :header="col.header"
                                :frozen="col.isColumnFixed"
                                :alignFrozen="col.frozenPosition"
                                :class="col.field"
                            >
                                <!-- :header="col.header" -->
                                <template #header>
                                    <div v-if="col.field === 'vendor_name'" :class="'p-d-flex p-ai-center ' + col.field">
                                        <img :src="getFilterIconSrc(col.filterIcon)" class="header-custom-icon cursor-pointer w-[12px]" @click="toggleVendorModal(col)" />
                                    </div>
                                    <div v-else :class="'p-d-flex p-ai-center ' + col.field">
                                        <img :src="getFilterIconSrc(col.filterIcon)" class="header-custom-icon w-[12px]" />
                                    </div>
                                </template>
                                <template
                                    v-if="
                                        col.field === 'total_whatsapp_charges' ||
                                        col.field === 'total_sms_charges' ||
                                        col.field === 'total_email_charges' ||
                                        col.field === 'awb_no_logistics' ||
                                        col.field === 'order_amount' ||
                                        col.field === 'order_refund_amount' ||
                                        col.field === 'order_customer_details' ||
                                        col.field === 'order_type' ||
                                        col.field === 'order_tags' ||
                                        col.field === 'order_product_quantity' ||
                                        col.field === 'order_id' ||
                                        col.field === 'weight_discrepancy_status' ||
                                        col.field === 'vendor_entered_weight' ||
                                        col.field === 'order_weight' ||
                                        col.field === 'product_weight' ||
                                        col.field === 'weight' ||
                                        col.field === 'buyer_address' ||
                                        col.field === 'order_remark' ||
                                        col.field === 'order_return_reason' ||
                                        col.field === 'origin_warehouse' ||
                                        col.field === 'delivery_warehouse' ||
                                        col.field === 'tracking_status' ||
                                        col.field === 'tracking_status_intl' ||
                                        col.field === 'product_category' ||
                                        col.field === 'ticket_id' ||
                                        col.field === 'ticket_category' ||
                                        col.field === 'ticket_subject' ||
                                        col.field === 'ticket_description' ||
                                        col.field === 'ticket_assign_by' ||
                                        col.field === 'ticket_assign_to' ||
                                        col.field === 'unactionable_by_itl'
                                    "
                                    #body="{ data }"
                                >
                                    <!-- amount -->
                                    <DTAmount :data="data" :col="col" :dataDropdownToggle="dataDropdownToggle" />
                                    <!-- warehouse -->
                                    <DTWarehouse :data="data" :col="col" :props="props" :index="index" :customerToggle="customerToggle" />
                                    <!-- only text -->
                                    <DTTextVue :data="data" :col="col" />
                                    <DTTextHover :data="data" :col="col" :props="props" :functions="{ openOrderIdModal, openTicketModal }" />
                                    <!-- weight overlaypannel -->
                                    <DTWeight :data="data" :col="col" :props="props" :index="index" :dataDropdownToggle="dataDropdownToggle" />
                                </template>
                                <template #filter v-if="col.isFilterAvailable">
                                    <div class="custom-filter-wrapper custom-filter-8">
                                        <div class="popover-body">
                                            <div :class="'labeltext-name datefilter_' + col.isFilterType" :id="col.field + '_' + col.isFilterType">
                                                {{ col.header }}
                                                <div @click="showVendorModal()" v-if="col.field == 'vendor_name'" class="vendor-search-icon"><img src="@/assets/images/store-order-search.svg" /></div>
                                            </div>
                                            <DataTableFilter :col="col" :items="items" @filter="setFilter" @selected-column="getSelectedColumn" @filter-value="getFilterValue" :isCustomizeColumnAvail="props.isCustomizeColumnAvail" />
                                        </div>
                                        <!-- <div v-if="!route.params.tabs">
                                        <div v-if="col.isFilterType !== 5 && col.isFilterType !== 8 && props.isCustomizeColumnAvail">
                                            <div class="column-setting-outer" :class="'column-setting-outer-' + col.isFilterType">
                                                <TieredMenu :model="items" ref="menu" />
                                            </div>
                                        </div>
                                        <div :class="['footer-buttons custom-filter-' + col.isFilterType, 'datefilter_' + col.isFilterType]">
                                            <ButtonView type="button" @click="clearValue(col.field)" class="p-button-secondary store-filter-button-clear clear-button-disable"> Cancel</ButtonView>
                                            <ButtonView type="button" @click="applyFilter(col.field)" class="p-button-success store-filter-button-apply apply-button-disable"> Apply</ButtonView>
                                        </div>
                                    </div> -->
                                    </div>
                                </template>
                            </ColumnView>
                            <ColumnView
                                v-if="props.isActionColumn"
                                class="action-column remove-resize-cursor"
                                field="action"
                                :style="{
                                    width: `${props.actionColumnWidth}`,
                                    minWidth: `100px !important`,
                                }"
                            >
                                <template #header v-if="!props.isHeaderLoad">
                                    <div class="p-d-flex p-ai-center">
                                        <img :src="getFilterIconSrc('th-action')" class="header-custom-icon" />
                                        <div class="p-column-title">Action</div>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <ActionColumn :actionLink="data.action" :row-data="data" @show-modal="showActionModal" />
                                </template>
                            </ColumnView>
                        </DataTable>
                    </div>
                </div>
                <PaginatorView class="pagignationRow" v-if="props.totalrecord > 0" :rows="props.pageSize" :totalRecords="props.totalrecord" :rowsPerPageOptions="[5, 10, 25, 50, 100]" @page="props.handlePageChange">
                    <template #start> Showing {{ props.paginatorStart + 1 }} to {{ props.paginatorLast === 0 ? 10 : props.paginatorLast }} of {{ props.totalrecord }} entries </template>
                </PaginatorView>
            </div>
        </div>
    </div>
    <DTFilterModal />
</template>
<style lang="scss">
@import './dataTable.scss';

.dt-tabs-outer {
    width: 100%;
    height: 46px;
    // background-color: white;
    @include theme() {
        background-color: theme-get('dtb-tabs-whole-background');
    }
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    // box-shadow: 0 2px 4px 0 rgba(192, 205, 210, 0.6), 0 1px 18px 0 rgba(187, 224, 238, 0.1)
}

.card {
    border-radius: 0px !important;
    box-shadow: none !important;
}
</style>
