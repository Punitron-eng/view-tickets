import { ref } from 'vue';
import config from '@/util/config';
import { subDays } from 'date-fns';
import { FilterMatchMode } from 'primevue/api';
export const viewBillingVariables = ref({
    tempDataTableColumns: '',
    processType: '135',
    config: config,
    orderidAwbSearch: '',
    pageSize: 10,
    totalRecords: 0,
    isHeaderLoad: true,
    isSkeletonShow: true,
    activeTabIndex: 0,
    dataTableColumns: [],
    hiddenClass: 'hidden',
    orderSearch: '',
    showViewDetailsModal: false,
    position: 'right',
    selectedOption: 'Charges',
    isDropdownOpen: false,
    isDivVisible: false,
    isSaveFilterAvail: false,
    isWidgetAvail: false,
    isUniversalSearchAvail: false,
    isUniversalDateAvail: false,
    isUniversalFilterAvail: false,
    isCustomizeColumnAvail: false,
    isActionColumn: false,
    options: [
        { id: 1, label: 'Charges' },
        { id: 2, label: 'Invoice' },
    ],
    statusCheckboxData: [
        { id: 1, value: 'RTO' },
        { id: 2, value: 'Delivered' },
    ],
    statusValue: [],
    startDate: [subDays(new Date(), 29), new Date()],
    widgetSkeleton: [1, 2, 3, 4],
    exportAccessRight: 0,
    defaultDatatableSize: '',
    isVendorModalVisible: false,
    savedFilterData: [],
    showEditInput: false,
    editInput: null,
    saveFilterEditId: null,
    showDeleteFilter: false,
    saveFilterOrder: [],
    savedFiltervalue: null,
    saveFilterValue: '',
    showSelectedFilter: '',
    isWidgetSekeleton: true,
    removeCheck: false,
    filterFields: ['invoice_id', 'order_id', 'awb_no', 'order_date', 'invoice_date', 'status', 'vendor_name'],
    modalShow: false,
});

export const moreFilter = [
    { field: 'more_filter_1', header: 'More Filter 1', isFilterType: 2, value: [] },
    { field: 'more_filter_2', header: 'More Filter 2', isFilterType: 2 },
    { field: 'more_filter_3', header: 'More Filter 3', isFilterType: 2 },
];

export const filterModal = {
    vendor_name: { value: null, matchMode: FilterMatchMode.IN },
    applied_on: { value: null },
    status: { value: null, matchMode: FilterMatchMode.IN },
};
