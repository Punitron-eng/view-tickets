import { ref } from 'vue';

export const filterVariables = ref({
    filterType: null,
    filter: '',
    clearFilterValue: 1,
    defaultFilterSelected: 'invoice_id',
    selectedFilterClass: null,
    handleDateError: false,
});
