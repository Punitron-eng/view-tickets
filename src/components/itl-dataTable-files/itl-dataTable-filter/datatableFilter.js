import { ref } from 'vue';
import config from '@/util/config';
export const dataTableFilterVariables = ref({
    checkboxSearchInput: '',
    filteredValue: [],
    minMax: { min: null, max: null },
    selectedDatelabel: '',
    seleceddate: [],
    config: config,
    startDate: undefined,
    check: true,
});
