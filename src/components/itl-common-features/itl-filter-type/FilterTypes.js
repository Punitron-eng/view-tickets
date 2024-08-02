import { ref } from 'vue';
import { endOfMonth, startOfMonth, subMonths, subDays } from 'date-fns';

export const filterTypeVariables = ref({
    filteredValue: [],
    minMax: { min: null, max: null },
    isCustomizeDate: false,
    customDateLable: '',
    customStartDate: '',
    customEndDate: '',
    customDateField: '',
    selectDefaultDate: '',
    isSelectedDate: false,
    check: true,
    pRanges: [
        {
            id: 'all',
            label: 'All',
            range: [new Date('2017-01-01'), new Date()],
            // range: [startOfMonth(subMonths(new Date(), 6)), new Date()],
            state: false,
        },
        {
            id: 'today',
            label: 'Today',
            range: [new Date(), new Date()],
            state: false,
        },
        {
            id: 'yesterday',
            label: 'Yesterday',
            range: [subDays(new Date(), 1), subDays(new Date(), 1)],
            state: false,
        },
        {
            id: 'last_7_days',
            label: 'Last 7 Days',
            range: [subDays(new Date(), 6), new Date()],
            state: false,
        },
        {
            id: 'last_30_days',
            label: 'Last 30 Days',
            range: [subDays(new Date(), 29), new Date()],
            state: false,
        },
        {
            id: 'this_month',
            label: 'This Month',
            range: [startOfMonth(new Date()), endOfMonth(new Date())],
            state: false,
        },
        {
            id: 'last_month',
            label: 'Last Month',
            range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
            state: false,
        },
        // {
        //     id: 'this_year',
        //     label: 'This Year',
        //     range: [startOfYear(new Date()), endOfYear(new Date())],
        //     state: false,
        // },
        {
            id: 'custom_range',
            label: 'Custom Range',
            range: [new Date(), new Date()],
            state: false,
        },
    ],
    defaultStartDate: '',
    defaultEndDate: '',
    showDateError: false,
    getSelectedDate: '',
});
