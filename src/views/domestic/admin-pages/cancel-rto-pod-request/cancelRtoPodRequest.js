import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const cancelRtoPodVariables = ref(dataTableVariables.value);
export const filterModal = commonFilterModal;
export const staticTabs = [
    { name: 'Cancel Request', id: '1', value: 'cancel' },
    { name: 'RTO Request', id: '2', value: 'rto' },
    { name: 'POD Request', id: '3', value: 'pod' },
];
