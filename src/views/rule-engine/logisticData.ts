interface Details {
    logistic_name: String,
        logistic_logo: String,
        air_surface: String,
        logistic_rating: String,
        logistic_pickup: String,
        logistic_delivery: String,
        logistic_ndr: String,
        logistic_weight_case: String,
        logistic_isChecked: Boolean,
        logistic_dropdown: Boolean,
}

type logistic = Details [];
const logisticDetails : logistic = [
    {
        logistic_name: 'Delhivery',
        logistic_logo: 'delhivery',
        air_surface: 'air',
        logistic_rating: '4.3',
        logistic_pickup: '3.2',
        logistic_delivery: '3.2',
        logistic_ndr: '3.2',
        logistic_weight_case: '3.2',
        logistic_isChecked: false,
        logistic_dropdown: true,
    },
    {
        logistic_name: 'DHL',
        logistic_logo: 'DHL',
        air_surface: 'air',
        logistic_rating: '4.3',
        logistic_pickup: '3.2',
        logistic_delivery: '3.2',
        logistic_ndr: '3.2',
        logistic_weight_case: '3.2',
        logistic_isChecked: true,
        logistic_dropdown: true,
    },
    {
        logistic_name: 'Delhivery',
        logistic_logo: 'delhivery',
        air_surface: 'air',
        logistic_rating: '4.3',
        logistic_pickup: '3.2',
        logistic_delivery: '3.2',
        logistic_ndr: '3.2',
        logistic_weight_case: '3.2',
        logistic_isChecked: false,
        logistic_dropdown: true,
    },
];

export default logisticDetails;