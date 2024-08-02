import { ref } from 'vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { checkUserType } from '@/util/commonHandlers';
import { apiHandlerWithFile } from '../../../api/common/api';
export const viewOrderVariables = ref(dataTableVariables.value);
viewOrderVariables.value.dataTableSideBar = ref(false);
viewOrderVariables.value.dataTableManifestData = ref([]);
viewOrderVariables.value.manifestSearch = ref();
export const filterModal = commonFilterModal;
export const staticTabs = [
    { name: 'Store Order', id: '1', value: 'store_order' },
    { name: 'Ready To Dispatch', id: '1', value: 'rtd' },
    { name: 'Manifest', id: '1', value: 'manifest' },
    { name: 'Intransit', id: '1', value: 'intransit' },
    { name: 'Delivered', id: '1', value: 'delivered' },
    { name: 'RTO', id: '1', value: 'rto' },
    { name: 'All', id: '1', value: 'all' },
];
export const mounted1 = () => {
    dataTableVariables.value.selectedTabHeading = 'Orders';
    dataTableVariables.value.isTabsPresent = true;
    dataTableVariables.value.isUniversalSearchAvail = true;
    dataTableVariables.value.isWidgetAvail = false;
    dataTableVariables.value.isUniversalDateAvail = true;
    dataTableVariables.value.isUniversalFilterAvail = true;
    dataTableVariables.value.isCustomizeColumnAvail = true;
    dataTableFncs.closeAllOverlay();
};

export const mounted2 = async (store, VIEWORDER, savedFilteredList) => {
    await dataTableFncs.getCurrentRoutes();
    viewOrderVariables.value.scrollableTabs = staticTabs;
    dataTableFncs.getSelectedTabOnLoad();
    if (viewOrderVariables.value.selectedTabName == 'manifest') {
        (viewOrderVariables.value.dataTableSideBar = true);
    } else {
        (viewOrderVariables.value.dataTableSideBar = false);
    }
    document.body.classList.add('connect-plus-notification-billing-outer');
    document.body.classList.add('view-order-domestic');
    store.commit(`${VIEWORDER.NAME}/clearAllFilter`);
    viewOrderVariables.value.isActionColumn = true;
    if (!viewOrderVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getColumnData(viewOrderVariables.value.saveFilterID);
    }
    store.dispatch('getPaginatorStart', 0);
    dataTableFncs.onHeaderLoading();
    await dataTableFncs.getStoreDetails();
    await formatDate(store, VIEWORDER);
    if (!viewOrderVariables.value.router.currentRoute.params.id) {
        await dataTableFncs.getDataTableData();
    }
    if (checkUserType('subadmin') || checkUserType('admin')) {
        await dataTableFncs.vendorDataValue(50, 0, '', 'checkbox');
    }

    viewOrderVariables.value.savedFilterData = savedFilteredList.value;
    dataTableFncs.hideDataTableFilter();
};
const formatDate = async (store, VIEWORDER) => {
    // await store.dispatch(`${VIEWORDER.NAME}/getDateRange`, dataTableFncs.changeDateFormatPayload());
    await store.dispatch(`${VIEWORDER.NAME}/getDateRange`, { [viewOrderVariables.value.syncDateName]: dataTableFncs.changeDateFormatPayload() });
};

export const getManifestData = async (payloadData) => {
    try {
        const url = 'view-order-v3/get-manifestid-list-v3.json';
        const payload = payloadData;
        const result = await apiHandlerWithFile(url, payload);

        if (result.status !== 'success') {
            throw new Error(result);
        }
        return result;
    } catch (err) {
        console.log(err);
        return err.message;
    }
};
