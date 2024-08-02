import { ref } from 'vue';

export const mainArray = ref([
    {
        id: 1,
        value: 'Payment',
    },
    {
        id: 2,
        value: 'Weight',
    },
    {
        id: 3,
        value: 'Zone',
    },
    {
        id: 4,
        value: 'Order Value',
    },
    {
        id: 5,
        value: 'State',
    },
    {
        id: 6,
        value: 'Customer Pincode',
    },
    {
        id: 7,
        value: 'City',
    },
    {
        id: 8,
        value: 'AWB Assigned time',
    },
    {
        id: 9,
        value: 'Product SKU',
    },
    {
        id: 10,
        value: 'Channel',
    },
]);

export const subArray = ref({
    1: [
        { id: 1, value: 'COD' },
        { id: 2, value: 'Prepaid' },
    ],

    2: [
        { id: 1, value: 'Select Range' },
        { id: 2, value: 'greater than' },
        { id: 3, value: 'less than' },
        { id: 4, value: 'Greater than or equal to' },
        { id: 5, value: 'less than or equal to' },
    ],
    3: [{ value: 'A' }, { value: 'B' }, { value: 'C' }, { value: 'D' }, { value: 'E' }],
    4: [
        { id: 1, value: 'Select Range' },
        { id: 2, value: 'greater than' },
        { id: 3, value: 'less than' },
        { id: 4, value: 'Greater than or equal to' },
        { id: 5, value: 'less than or equal to' },
    ],
    8: [
        { id: 1, value: 'Select Range' },
        { id: 2, value: 'After' },
        { id: 3, value: 'Before' },
    ],
    6: [],
    10: [],
});

export const thirdSubArray = ref([
    { type: 1, label: 'Weight (kg)', placeholder: 'Enter weight', id: 2 },
    { type: 1, label: 'Amount (₹)', placeholder: 'Enter Amount', id: 4 },
    { type: 2, label: 'Select Range', placeholder: 'Enter weight', id: 2 },
    { type: 2, label: 'Select Time Range', placeholder: '', id: 8 },
    { type: 3, label: 'Select Time', placeholder: 'Enter Time', id: 8 },
]);

//static data
export const dropdownStaticData = ref([
    {
        id: 1,
        value: 'Payment',
        tag: 'Is',
        note: 'User can select only one option',
        inputValue: {
            id: 1,
            value: 'COD',
        },
    },
    {
        id: 2,
        value: 'Weight',
        tag: 'Is',
        note: 'The minimum chargeable weight is 0.5KG',
        condition: {
            id: 1,
            value: 'Select Range',
        },
        inputValue: {
            fromValue: '12.12',
            toValue: '12.12',
        },
    },
    {
        id: 3,
        value: 'Zone',
        tag: 'Is',
        note: 'Multi-select checkbox, user can select multiple values',
        inputValue: [
            {
                value: 'A',
            },
            {
                value: 'B',
            },
        ],
    },
    {
        id: 4,
        value: 'Order Value',
        tag: 'Is',
        note: 'Note: The minimum chargeable weight is 0.5KG',
        condition: {
            id: 2,
            value: 'greater than',
        },
        inputValue: '123.12',
    },
    {
        id: 5,
        value: 'State',
        inputValue: [
            {
                from: {
                    id: '1',
                    value: 'andaman and nicobar islands',
                },
                to: {
                    id: '3',
                    value: 'arunachal pradesh',
                },
            },
            {
                from: {
                    id: '22',
                    value: 'maharashtra',
                },
                to: {
                    id: '4',
                    value: 'assam',
                },
            },
        ],
    },
    {
        id: 6,
        value: 'Customer Pincode',
        note: 'Users will upload excel file of delivery pincode',
        inputValue: {
            0: {
                pickup_From: [
                    {
                        id: '26',
                        value: 'mumbai-400101',
                    },
                    { id: '103', value: 'thane-400000' },
                ],
            },
            fileName: 'pincode.csv',
        },
    },
    {
        id: 7,
        value: 'city',
        inputValue: [
            {
                from: {
                    id: '1',
                    value: 'andaman and nicobar islands',
                },
                to: {
                    id: '3',
                    value: 'arunachal pradesh',
                },
            },
            {
                from: {
                    id: '22',
                    value: 'maharashtra',
                },
                to: {
                    id: '4',
                    value: 'assam',
                },
            },
        ],
    },
    {
        id: 8,
        value: 'AWB Assigned time',
        tag: 'Must be',
        condition: {
            id: 2,
            value: 'After',
        },
        inputValue: {
            hours: 15,
            minutes: 15,
            seconds: 0,
        },
    },
    {
        id: 9,
        value: 'Product SKU',
        inputValue: 'product_sku.csv',
    },
    {
        id: 10,
        value: 'Channel',
        note: 'Users can select channel, if they need to add specific store they can. Only one selection is allowed for store and for channel also.',
        inputValue: {
            channel: {
                id: 2,
                value: 'Shopify',
                logo: 'shopify.png',
            },
            store: {
                id: 1,
                value: 'vcgf',
            },
        },
    },
]);
