import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const returnFlowVariables = ref(dataTableVariables.value);
returnFlowVariables.value.isLoadingSubmit = false;
returnFlowVariables.value.courierPriority = 0;
returnFlowVariables.value.changeCourierPriority = 0;
returnFlowVariables.value.shipLength = '';
returnFlowVariables.value.shipWidth = '';
returnFlowVariables.value.shipHeight = '';
returnFlowVariables.value.appliedWeight = '';
returnFlowVariables.value.showPickNowModal = false;
returnFlowVariables.value.showRejectModal = ref(false);
returnFlowVariables.value.storeViewFilterData = '';
returnFlowVariables.value.isOrderIdModalAvail = true; // for order id modal
returnFlowVariables.value.showCancelModal = false; // for cancel modal
returnFlowVariables.value.showBulkUpload = false;
returnFlowVariables.value.warehouseData = [];
returnFlowVariables.value.selectedWareHouse = '';
returnFlowVariables.value.showBulkTitle = '';
returnFlowVariables.value.dtToggleButtons = [
    { label: 'Pending', shortLabel: 'P', isActive: true, value: 'pending' },
    { label: 'Complete', shortLabel: 'C', isActive: false, value: 'complete' },
];
returnFlowVariables.value.dtToggleButtonsReturn = [
    { label: 'Requested', shortLabel: 'R', isActive: true, value: 'requested' },
    { label: 'Rejected', shortLabel: 'R', isActive: false, value: 'rejected' },
];
returnFlowVariables.value.groupByColumn = ['order_customer_name', 'order_customer_mobile', 'order_customer_email'];
returnFlowVariables.value.groupByColumnHeading = 'Customer Details';
export const filterModal = commonFilterModal;
