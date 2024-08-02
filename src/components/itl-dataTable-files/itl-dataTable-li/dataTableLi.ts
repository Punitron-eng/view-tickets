import { ref } from 'vue';
import { Filters } from './types';

export const dataVariables = ref<Filters>({
    filters: {
        field1:'value1',
        field2:'value2',
        field3:'value3',
        field4:'value4',
        field5:'value5',
    }
})