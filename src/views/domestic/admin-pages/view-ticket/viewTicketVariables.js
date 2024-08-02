import { ref } from 'vue';
import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
export const viewTicketVariables = ref(dataTableVariables.value);
viewTicketVariables.value.isChatModalVisible = ref(false);
viewTicketVariables.value.isCreateNewTicketModalVisible = ref(false);
viewTicketVariables.value.selectedTicketId = ref('');
viewTicketVariables.value.isTicketRateModalVisible = ref(false);
viewTicketVariables.value.isVisibleConfirmationforVendor = ref(false);
viewTicketVariables.value.isVisibleConfirmationForCs = ref(false);
viewTicketVariables.value.selectedRowId = ref('');
export const filterModal = commonFilterModal;
export const staticTabs = [
    { name: 'Open', id: '1', value: 'open' },
    { name: 'Closed', id: '2', value: 'closed' },
    { name: 'All', id: '3', value: 'all' },
];
