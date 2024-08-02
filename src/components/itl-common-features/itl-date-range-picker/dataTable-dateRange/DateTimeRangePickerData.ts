import { endOfMonth, startOfMonth, subMonths, subDays } from 'date-fns';
export const presetRanges = [
    {
        label: 'All',
        range: [new Date('2017-01-01'), new Date()],
        // range: [startOfMonth(subMonths(new Date(), 6)), new Date()],
        state: false,
    },
    {
        label: 'Today',
        range: [new Date(), new Date()],
        state: false,
    },
    {
        label: 'Yesterday',
        range: [subDays(new Date(), 1), subDays(new Date(), 1)],
        state: false,
    },
    {
        label: 'Last 7 Days',
        range: [subDays(new Date(), 6), new Date()],
        state: false,
    },
    {
        label: 'Last 30 Days',
        range: [subDays(new Date(), 29), new Date()],
        state: false,
    },
    {
        label: 'This Month',
        range: [startOfMonth(new Date()), endOfMonth(new Date())],
        state: false,
    },
    {
        label: 'Last Month',
        range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
        state: false,
    },
    // {
    //     label: 'This Year',
    //     range: [startOfYear(new Date()), endOfYear(new Date())],
    //     state: false,
    // },
    {
        label: 'Custom Range',
        range: [new Date(), new Date()],
        state: false,
    },
];
