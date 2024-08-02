type Rule = {
    label : String;
    value : String;
};

type Priority = {
    label : String;
    logo? : {
        logo_name : String;
        air_surface : String;
    }[];
}

interface Rules {
    rule_name : String;
    rule: Rule[],
    rule_courier_priority:Priority,
    isActive : Boolean,
    isShow:Boolean,
    priority:Number,
}

type ruleList = Rules [];
const ruleData : ruleList = [
 {
        rule_name: 'Quick Ship',
        rule: [
            { label: 'Modify Date', value: '20/01/2024' },
            { label: 'Created Date', value: '12/01/2024' },
            { label: 'Payment', value: 'COD' },
            { label: 'Weight', value: 'Greater than 10KG' },
            { label: 'Zone', value: 'A,B' },
            { label: 'Order Value', value: 'Greater than ₹ 2000' },
            { label: 'Dangerous Goods', value: 'No' },
            { label: 'State', value: 'Maharashtra to Karnataka, Assam to Karnataka, Goa to Haryana, Arunachal Pradesh to Assam.' },
            { label: 'Pincode', value: '400067 to 400102' },
        ],
        rule_courier_priority: {
            label: 'BestRated',
        },
        isActive: true,
        isShow: false,
        priority: 1,
    },
    {
        rule_name: 'Vipuls Order Rules',
        rule: [
            { label: 'Modify Date', value: '20/01/2024' },
            { label: 'Created Date', value: '12/01/2024' },
            { label: 'Payment', value: 'COD' },
            { label: 'Weight', value: 'Greater than 10KG' },
            { label: 'Zone', value: 'A,B' },
            { label: 'Order Value', value: 'Greater than ₹ 2000' },
            { label: 'Dangerous Goods', value: 'No' },
            { label: 'State', value: 'Maharashtra to Karnataka, Assam to Karnataka, Goa to Haryana, Arunachal Pradesh to Assam.' },
            { label: 'Pincode', value: '400067 to 400102' },
        ],
        rule_courier_priority: {
            label: 'Custom',
            logo: [
                { logo_name: 'bluedart', air_surface: 'air' },
                { logo_name: 'shadowfax', air_surface: 'surface' },
                { logo_name: 'aramex', air_surface: 'surface' },
                { logo_name: 'DHL', air_surface: 'air' },
                { logo_name: 'xpressbees', air_surface: 'air' },
                { logo_name: 'DTDC', air_surface: 'air' },
                { logo_name: 'delhivery', air_surface: 'air' },
                { logo_name: 'ekart', air_surface: 'air' },
            ],
        },
        isActive: false,
        isShow: true,
        priority: 1,
    },
    // {
    //     rule_name: 'Vipuls Order Rules',
    //     rule: [
    //         { label: 'Modify Date', value: '20/01/2024' },
    //         { label: 'Created Date', value: '12/01/2024' },
    //         { label: 'Payment', value: 'COD' },
    //         { label: 'Weight', value: 'Greater than 10KG' },
    //         { label: 'Zone', value: 'A,B' },
    //         { label: 'Order Value', value: 'Greater than ₹ 2000' },
    //         { label: 'Dangerous Goods', value: 'No' },
    //         { label: 'State', value: 'Maharashtra to Karnataka, Assam to Karnataka, Goa to Haryana, Arunachal Pradesh to Assam.' },
    //         { label: 'Pincode', value: '400067 to 400102' },
    //     ],
    //     rule_courier_priority: {
    //         label: 'Custom',
    //         logo: [
    //             { logo_name: 'bluedart', air_surface: 'air' },
    //             { logo_name: 'shadowfax', air_surface: 'surface' },
    //             { logo_name: 'aramex', air_surface: 'surface' },
    //             { logo_name: 'DHL', air_surface: 'air' },
    //             { logo_name: 'xpressbees', air_surface: 'air' },
    //             { logo_name: 'DTDC', air_surface: 'air' },
    //             { logo_name: 'delhivery', air_surface: 'air' },
    //             { logo_name: 'ekart', air_surface: 'air' },
    //         ],
    //     },
    //     isActive: false,
    //     isShow: true,
    //     priority: 1,
    // },
];

export default ruleData;