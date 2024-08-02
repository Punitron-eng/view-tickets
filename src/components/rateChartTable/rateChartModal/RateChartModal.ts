import { reactive, ref, watch } from "vue";

export const rateChartModalVariables = reactive({
    rateTypeZoneWise: 'ZW',
    tabType: '',
    tabTypeOptions: [{ id: 0, value: 'Surface' }, { id: 1, value: 'Air' }, { id: 2, value: 'SND' }],
    logistic: 'Select Logistics',
    logisticServiceType: 'Select Logistics Service Type',
    logisticServiceTypeArr: [],
    slabType: '0.50',
    multiplyFactor: '0.50',
    logisticsFwd: '',
    logisticsFwdAdditional: '',
    rateType: '',
    rateTypeOptions: [],
    workingFactor: '',
    modalData: {
        zone_a: '',
        zone_b: '',
        zone_c: '',
        zone_d: '',
        zone_e: '',
        zone_f: '',
        zone_a_fwd_add: '',
        zone_b_fwd_add: '',
        zone_c_fwd_add: '',
        zone_d_fwd_add: '',
        zone_e_fwd_add: '',
        zone_f_fwd_add: '',
        zone_a_fwd_fsc: '',
        zone_b_fwd_fsc: '',
        zone_c_fwd_fsc: '',
        zone_d_fwd_fsc: '',
        zone_e_fwd_fsc: '',
        zone_f_fwd_fsc: '',
        zone_a_cod: '',
        zone_b_cod: '',
        zone_c_cod: '',
        zone_d_cod: '',
        zone_e_cod: '',
        zone_f_cod: '',
        zone_a_cod_per: '',
        zone_b_cod_per: '',
        zone_c_cod_per: '',
        zone_d_cod_per: '',
        zone_e_cod_per: '',
        zone_f_cod_per: '',
        zone_a_rto: '',
        zone_b_rto: '',
        zone_c_rto: '',
        zone_d_rto: '',
        zone_e_rto: '',
        zone_f_rto: '',
        zone_a_rto_add: '',
        zone_b_rto_add: '',
        zone_c_rto_add: '',
        zone_d_rto_add: '',
        zone_e_rto_add: '',
        zone_f_rto_add: '',
        zone_a_rto_fsc: '',
        zone_b_rto_fsc: '',
        zone_c_rto_fsc: '',
        zone_d_rto_fsc: '',
        zone_e_rto_fsc: '',
        zone_f_rto_fsc: '',

        zone_b_up: '',
        zone_b_up_fwd_add: '',
        zone_b_up_fwd_fsc: '',
        zone_b_up_cod: '',
        zone_b_up_cod_per: '',
        zone_b_up_rto: '',
        zone_b_up_rto_add: '',
        zone_b_up_rto_fsc: '',
        zone_b_ros: '',
        zone_b_ros_fwd_add: '',
        zone_b_ros_fwd_fsc: '',
        zone_b_ros_cod: '',
        zone_b_ros_cod_per: '',
        zone_b_ros_rto: '',
        zone_b_ros_rto_add: '',
        zone_b_ros_rto_fsc: '',
        zone_b_up_ros: '',
        zone_b_up_ros_fwd_add: '',
        zone_b_up_ros_fwd_fsc: '',
        zone_b_up_ros_cod: '',
        zone_b_up_ros_cod_per: '',
        zone_b_up_ros_rto: '',
        zone_b_up_ros_rto_add: '',
        zone_b_up_ros_rto_fsc: '',
        zone_d_up: '',
        zone_d_up_fwd_add: '',
        zone_d_up_fwd_fsc: '',
        zone_d_up_cod: '',
        zone_d_up_cod_per: '',
        zone_d_up_rto: '',
        zone_d_up_rto_add: '',
        zone_d_up_rto_fsc: '',
        zone_d_ros: '',
        zone_d_ros_fwd_add: '',
        zone_d_ros_fwd_fsc: '',
        zone_d_ros_cod: '',
        zone_d_ros_cod_per: '',
        zone_d_ros_rto: '',
        zone_d_ros_rto_add: '',
        zone_d_ros_rto_fsc: '',
        zone_d_up_ros: '',
        zone_d_up_ros_fwd_add: '',
        zone_d_up_ros_fwd_fsc: '',
        zone_d_up_ros_cod: '',
        zone_d_up_ros_cod_per: '',
        zone_d_up_ros_rto: '',
        zone_d_up_ros_rto_add: '',
        zone_d_up_ros_rto_fsc: '',
        zone_e_up: '',
        zone_e_up_fwd_add: '',
        zone_e_up_fwd_fsc: '',
        zone_e_up_cod: '',
        zone_e_up_cod_per: '',
        zone_e_up_rto: '',
        zone_e_up_rto_add: '',
        zone_e_up_rto_fsc: '',
        zone_e_ros: '',
        zone_e_ros_fwd_add: '',
        zone_e_ros_fwd_fsc: '',
        zone_e_ros_cod: '',
        zone_e_ros_cod_per: '',
        zone_e_ros_rto: '',
        zone_e_ros_rto_add: '',
        zone_e_ros_rto_fsc: '',
        zone_e_up_ros: '',
        zone_e_up_ros_fwd_add: '',
        zone_e_up_ros_fwd_fsc: '',
        zone_e_up_ros_cod: '',
        zone_e_up_ros_cod_per: '',
        zone_e_up_ros_rto: '',
        zone_e_up_ros_rto_add: '',
        zone_e_up_ros_rto_fsc: '',
        zone_f_up: '',
        zone_f_up_fwd_add: '',
        zone_f_up_fwd_fsc: '',
        zone_f_up_cod: '',
        zone_f_up_cod_per: '',
        zone_f_up_rto: '',
        zone_f_up_rto_add: '',
        zone_f_up_rto_fsc: '',
        zone_f_ros: '',
        zone_f_ros_fwd_add: '',
        zone_f_ros_fwd_fsc: '',
        zone_f_ros_cod: '',
        zone_f_ros_cod_per: '',
        zone_f_ros_rto: '',
        zone_f_ros_rto_add: '',
        zone_f_ros_rto_fsc: '',
        zone_f_up_ros: '',
        zone_f_up_ros_cod_per: '',

        rate_slab_type: '',
        logistics_fsc_per: '',
        logistics_cod: '',
        logistics_cod_per: '',
        logistics_rto: '',
        logistics_rto_additional: '',
        logistics_rto_fsc_per: '',
        flat_rate_value: '',
        flat_rate_add_value: '',

        cod_flat_rate_value: '',
        cod_flat_rate_add_value: '',
        prepaid_flat_rate_value: '',
        prepaid_flat_rate_add_value: ''
    },
    logisticsOptions: [],
    fwdAddCheckbox: false,
    fwdFscCheckbox: false,
    codCheckbox: false,
    codPerCheckbox: false,
    rtoCheckbox: false,
    rtoAddCheckbox: false,
    rtoFscCheckbox: false,

    tabTypeRequiredText: false,
    logisticsRequiredText: false,
    logisticsServiceTypeRequiredText: false,
    slabTypeRequiredText: false,
    multiplyFactorRequiredText: false,
    allValuesRequiredText: false,
    allValuesRequiredTextEkartBluedart: false,
    allValuesRequiredTextEcom: false,
    bothFlatRatesValuesRequiredText: false,

    baseRateChartFetched: false
})
export const rateChartModalConstantVariables = reactive({
    slabTypeOptions: [
        {
            value: '',
            weight: 'Select Slab Type'
        },
        {
            value: '0.50',
            weight: '0.5 KG'
        },
        {
            value: '1.00',
            weight: '1 KG'
        },
        {
            value: '1.50',
            weight: '1.5 KG'
        },
        {
            value: '2.00',
            weight: '2 KG'
        },
        {
            value: '2.50',
            weight: '2.5 KG'
        },
        {
            value: '3.00',
            weight: '3 KG'
        },
        {
            value: '3.50',
            weight: '3.5 KG'
        },
        {
            value: '4.00',
            weight: '4 KG'
        },
        {
            value: '4.50',
            weight: '4.5 KG'
        },
        {
            value: '5.00',
            weight: '5 KG'
        },
        {
            value: '6.00',
            weight: '6 KG'
        },
        {
            value: '7.00',
            weight: '7 KG'
        },
        {
            value: '8.00',
            weight: '8 KG'
        },
        {
            value: '9.00',
            weight: '9 KG'
        },
        {
            value: '10.00',
            weight: '10 KG'
        },
        {
            value: '15.00',
            weight: '15 KG'
        },
        {
            value: '20.00',
            weight: '20 KG'
        }
    ],
    multiplyFactorOptions: [
        {
            value: '',
            weight: 'Select Multiply Factor'
        },
        {
            value: '0.50',
            weight: '0.5 KG'
        },
    ],
    rateTypeOptions: [
        {
            id: '',
            value: 'Select Rate Type'
        },
    ]
})

export const checkBoxHandler = (num: number, receivedData: any) => {
    switch (num) {
        case 1:
            if (rateChartModalVariables.fwdAddCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_fwd_add = rateChartModalVariables.modalData.zone_a;
                rateChartModalVariables.modalData.zone_b_fwd_add = rateChartModalVariables.modalData.zone_b;
                rateChartModalVariables.modalData.zone_b_up_fwd_add = rateChartModalVariables.modalData.zone_b_up;
                rateChartModalVariables.modalData.zone_b_ros_fwd_add = rateChartModalVariables.modalData.zone_b_ros;
                rateChartModalVariables.modalData.zone_b_up_ros_fwd_add = rateChartModalVariables.modalData.zone_b_up_ros;
                rateChartModalVariables.modalData.zone_c_fwd_add = rateChartModalVariables.modalData.zone_c;
                rateChartModalVariables.modalData.zone_d_fwd_add = rateChartModalVariables.modalData.zone_d;
                rateChartModalVariables.modalData.zone_d_up_fwd_add = rateChartModalVariables.modalData.zone_d_up;
                rateChartModalVariables.modalData.zone_d_ros_fwd_add = rateChartModalVariables.modalData.zone_d_ros;
                rateChartModalVariables.modalData.zone_d_up_ros_fwd_add = rateChartModalVariables.modalData.zone_d_up_ros;
                rateChartModalVariables.modalData.zone_e_fwd_add = rateChartModalVariables.modalData.zone_e;
                rateChartModalVariables.modalData.zone_e_up_fwd_add = rateChartModalVariables.modalData.zone_e_up;
                rateChartModalVariables.modalData.zone_e_ros_fwd_add = rateChartModalVariables.modalData.zone_e_ros;
                rateChartModalVariables.modalData.zone_e_up_ros_fwd_add = rateChartModalVariables.modalData.zone_e_up_ros;
                rateChartModalVariables.modalData.zone_f_fwd_add = rateChartModalVariables.modalData.zone_f;
                rateChartModalVariables.modalData.zone_f_up_fwd_add = rateChartModalVariables.modalData.zone_f_up;
                rateChartModalVariables.modalData.zone_f_ros_fwd_add = rateChartModalVariables.modalData.zone_f_ros;
            } else {
                rateChartModalVariables.modalData.zone_a_fwd_add = '0';
                rateChartModalVariables.modalData.zone_b_fwd_add = '0';
                rateChartModalVariables.modalData.zone_b_up_fwd_add = '0';
                rateChartModalVariables.modalData.zone_b_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_c_fwd_add = '0';
                rateChartModalVariables.modalData.zone_d_fwd_add = '0';
                rateChartModalVariables.modalData.zone_d_up_fwd_add = '0';
                rateChartModalVariables.modalData.zone_d_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_e_fwd_add = '0';
                rateChartModalVariables.modalData.zone_e_up_fwd_add = '0';
                rateChartModalVariables.modalData.zone_e_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_fwd_add = '0';
                rateChartModalVariables.modalData.zone_f_fwd_add = '0';
                rateChartModalVariables.modalData.zone_f_up_fwd_add = '0';
            }
            break;

        case 2:
            if (rateChartModalVariables.fwdFscCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_b_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_b_up_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_b_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_b_up_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_c_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_d_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_d_up_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_d_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_d_up_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_e_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_e_up_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_e_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_e_up_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_f_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_f_up_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_f_ros_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
            } else {
                rateChartModalVariables.modalData.zone_a_fwd_fsc = rateChartModalVariables.modalData.zone_a_fwd_fsc;
                rateChartModalVariables.modalData.zone_b_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_b_up_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_b_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_c_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_d_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_d_up_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_d_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_e_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_e_up_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_e_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_f_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_f_up_fwd_fsc = '0';
                rateChartModalVariables.modalData.zone_f_ros_fwd_fsc = '0';
            }
            break;

        case 3:
            if (rateChartModalVariables.codCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_b_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_b_up_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_b_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_b_up_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_c_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_d_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_d_up_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_d_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_d_up_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_e_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_e_up_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_e_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_e_up_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_f_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_f_up_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_f_ros_cod = rateChartModalVariables.modalData.zone_a_cod;
            } else {
                rateChartModalVariables.modalData.zone_a_cod = rateChartModalVariables.modalData.zone_a_cod;
                rateChartModalVariables.modalData.zone_b_cod = '0';
                rateChartModalVariables.modalData.zone_b_up_cod = '0';
                rateChartModalVariables.modalData.zone_b_ros_cod = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_cod = '0';
                rateChartModalVariables.modalData.zone_c_cod = '0';
                rateChartModalVariables.modalData.zone_d_cod = '0';
                rateChartModalVariables.modalData.zone_d_up_cod = '0';
                rateChartModalVariables.modalData.zone_d_ros_cod = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_cod = '0';
                rateChartModalVariables.modalData.zone_e_cod = '0';
                rateChartModalVariables.modalData.zone_e_up_cod = '0';
                rateChartModalVariables.modalData.zone_e_ros_cod = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_cod = '0';
                rateChartModalVariables.modalData.zone_f_cod = '0';
                rateChartModalVariables.modalData.zone_f_up_cod = '0';
                rateChartModalVariables.modalData.zone_f_ros_cod = '0';
            }
            break;

        case 4:
            if (rateChartModalVariables.codPerCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_b_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_b_up_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_b_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_b_up_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_c_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_d_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_d_up_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_d_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_d_up_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_e_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_e_up_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_e_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_e_up_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_f_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_f_up_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_f_ros_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
            } else {
                rateChartModalVariables.modalData.zone_a_cod_per = rateChartModalVariables.modalData.zone_a_cod_per;
                rateChartModalVariables.modalData.zone_b_cod_per = '0';
                rateChartModalVariables.modalData.zone_b_up_cod_per = '0';
                rateChartModalVariables.modalData.zone_b_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_c_cod_per = '0';
                rateChartModalVariables.modalData.zone_d_cod_per = '0';
                rateChartModalVariables.modalData.zone_d_up_cod_per = '0';
                rateChartModalVariables.modalData.zone_d_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_e_cod_per = '0';
                rateChartModalVariables.modalData.zone_e_up_cod_per = '0';
                rateChartModalVariables.modalData.zone_e_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_cod_per = '0';
                rateChartModalVariables.modalData.zone_f_cod_per = '0';
                rateChartModalVariables.modalData.zone_f_up_cod_per = '0';
                rateChartModalVariables.modalData.zone_f_ros_cod_per = '0';
            }
            break;

        case 5:
            if (rateChartModalVariables.rtoCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_rto = rateChartModalVariables.modalData.zone_a;
                rateChartModalVariables.modalData.zone_b_rto = rateChartModalVariables.modalData.zone_b;
                rateChartModalVariables.modalData.zone_b_up_rto = rateChartModalVariables.modalData.zone_b_up;
                rateChartModalVariables.modalData.zone_b_ros_rto = rateChartModalVariables.modalData.zone_b_ros;
                rateChartModalVariables.modalData.zone_b_up_ros_rto = rateChartModalVariables.modalData.zone_b_up_ros;
                rateChartModalVariables.modalData.zone_c_rto = rateChartModalVariables.modalData.zone_c;
                rateChartModalVariables.modalData.zone_d_rto = rateChartModalVariables.modalData.zone_d;
                rateChartModalVariables.modalData.zone_d_up_rto = rateChartModalVariables.modalData.zone_d_up;
                rateChartModalVariables.modalData.zone_d_ros_rto = rateChartModalVariables.modalData.zone_d_ros;
                rateChartModalVariables.modalData.zone_d_up_ros_rto = rateChartModalVariables.modalData.zone_d_up_ros;
                rateChartModalVariables.modalData.zone_e_rto = rateChartModalVariables.modalData.zone_e;
                rateChartModalVariables.modalData.zone_e_up_rto = rateChartModalVariables.modalData.zone_e_up;
                rateChartModalVariables.modalData.zone_e_ros_rto = rateChartModalVariables.modalData.zone_e_ros;
                rateChartModalVariables.modalData.zone_e_up_ros_rto = rateChartModalVariables.modalData.zone_e_up_ros;
                rateChartModalVariables.modalData.zone_f_rto = rateChartModalVariables.modalData.zone_f;
                rateChartModalVariables.modalData.zone_f_up_rto = rateChartModalVariables.modalData.zone_f_up;
                rateChartModalVariables.modalData.zone_f_ros_rto = rateChartModalVariables.modalData.zone_f_ros;
            } else {
                rateChartModalVariables.modalData.zone_a_rto = '0';
                rateChartModalVariables.modalData.zone_b_rto = '0';
                rateChartModalVariables.modalData.zone_b_up_rto = '0';
                rateChartModalVariables.modalData.zone_b_ros_rto = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_rto = '0';
                rateChartModalVariables.modalData.zone_c_rto = '0';
                rateChartModalVariables.modalData.zone_d_rto = '0';
                rateChartModalVariables.modalData.zone_d_up_rto = '0';
                rateChartModalVariables.modalData.zone_d_ros_rto = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_rto = '0';
                rateChartModalVariables.modalData.zone_e_rto = '0';
                rateChartModalVariables.modalData.zone_e_up_rto = '0';
                rateChartModalVariables.modalData.zone_e_ros_rto = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_rto = '0';
                rateChartModalVariables.modalData.zone_f_rto = '0';
                rateChartModalVariables.modalData.zone_f_up_rto = '0';
                rateChartModalVariables.modalData.zone_f_ros_rto = '0';
            }
            break;

        case 6:
            if (rateChartModalVariables.rtoAddCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_rto_add = rateChartModalVariables.modalData.zone_a_fwd_add;
                rateChartModalVariables.modalData.zone_b_rto_add = rateChartModalVariables.modalData.zone_b_fwd_add;
                rateChartModalVariables.modalData.zone_b_up_rto_add = rateChartModalVariables.modalData.zone_b_up_fwd_add;
                rateChartModalVariables.modalData.zone_b_ros_rto_add = rateChartModalVariables.modalData.zone_b_ros_fwd_add;
                rateChartModalVariables.modalData.zone_b_up_ros_rto_add = rateChartModalVariables.modalData.zone_b_up_ros_fwd_add;
                rateChartModalVariables.modalData.zone_c_rto_add = rateChartModalVariables.modalData.zone_c_fwd_add;
                rateChartModalVariables.modalData.zone_d_rto_add = rateChartModalVariables.modalData.zone_d_fwd_add;
                rateChartModalVariables.modalData.zone_d_up_rto_add = rateChartModalVariables.modalData.zone_d_up_fwd_add;
                rateChartModalVariables.modalData.zone_d_ros_rto_add = rateChartModalVariables.modalData.zone_d_ros_fwd_add;
                rateChartModalVariables.modalData.zone_d_up_ros_rto_add = rateChartModalVariables.modalData.zone_d_up_ros_fwd_add;
                rateChartModalVariables.modalData.zone_e_rto_add = rateChartModalVariables.modalData.zone_e_fwd_add;
                rateChartModalVariables.modalData.zone_e_up_rto_add = rateChartModalVariables.modalData.zone_e_up_fwd_add;
                rateChartModalVariables.modalData.zone_e_ros_rto_add = rateChartModalVariables.modalData.zone_e_ros_fwd_add;
                rateChartModalVariables.modalData.zone_e_up_ros_rto_add = rateChartModalVariables.modalData.zone_e_up_ros_fwd_add;
                rateChartModalVariables.modalData.zone_f_rto_add = rateChartModalVariables.modalData.zone_f_fwd_add;
                rateChartModalVariables.modalData.zone_f_up_rto_add = rateChartModalVariables.modalData.zone_f_up;
                rateChartModalVariables.modalData.zone_f_ros_rto_add = rateChartModalVariables.modalData.zone_f_ros;
            } else {
                rateChartModalVariables.modalData.zone_a_rto_add = '0';
                rateChartModalVariables.modalData.zone_b_rto_add = '0';
                rateChartModalVariables.modalData.zone_b_up_rto_add = '0';
                rateChartModalVariables.modalData.zone_b_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_c_rto_add = '0';
                rateChartModalVariables.modalData.zone_d_rto_add = '0';
                rateChartModalVariables.modalData.zone_d_up_rto_add = '0';
                rateChartModalVariables.modalData.zone_d_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_e_rto_add = '0';
                rateChartModalVariables.modalData.zone_e_up_rto_add = '0';
                rateChartModalVariables.modalData.zone_e_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_rto_add = '0';
                rateChartModalVariables.modalData.zone_f_rto_add = '0';
                rateChartModalVariables.modalData.zone_f_up_rto_add = '0';
                rateChartModalVariables.modalData.zone_f_ros_rto_add = '0';
            }
            break;

        case 7:
            if (rateChartModalVariables.rtoFscCheckbox == true) {
                rateChartModalVariables.modalData.zone_a_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_b_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_b_up_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_b_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_b_up_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_c_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_d_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_d_up_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_d_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_d_up_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_e_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_e_up_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_e_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_e_up_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_f_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_f_up_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_f_ros_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
            } else {
                rateChartModalVariables.modalData.zone_a_rto_fsc = rateChartModalVariables.modalData.zone_a_rto_fsc;
                rateChartModalVariables.modalData.zone_b_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_b_up_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_b_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_b_up_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_c_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_d_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_d_up_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_d_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_d_up_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_e_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_e_up_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_e_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_e_up_ros_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_f_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_f_up_rto_fsc = '0';
                rateChartModalVariables.modalData.zone_f_ros_rto_fsc = '0';
            }
            break;
    }
}

export const setToDefaultValues = (): void => {
    rateChartModalVariables.baseRateChartFetched = false;
    rateChartModalVariables.rateTypeZoneWise = 'ZW';
    rateChartModalVariables.logistic = 'Select Logistics';
    rateChartModalVariables.logisticServiceType = 'Select Logistics Service Type';
    rateChartModalVariables.slabType = '';
    rateChartModalVariables.multiplyFactor = '';
    rateChartModalVariables.logisticsFwd = '';
    rateChartModalVariables.logisticsFwdAdditional = '';
    rateChartModalVariables.rateType = 'Select Rate Type';
    rateChartModalVariables.workingFactor = '';
    rateChartModalVariables.modalData = {
        zone_a: '',
        zone_b: '',
        zone_c: '',
        zone_d: '',
        zone_e: '',
        zone_f: '',
        zone_a_fwd_add: '',
        zone_b_fwd_add: '',
        zone_c_fwd_add: '',
        zone_d_fwd_add: '',
        zone_e_fwd_add: '',
        zone_f_fwd_add: '',
        zone_a_fwd_fsc: '',
        zone_b_fwd_fsc: '',
        zone_c_fwd_fsc: '',
        zone_d_fwd_fsc: '',
        zone_e_fwd_fsc: '',
        zone_f_fwd_fsc: '',
        zone_a_cod: '',
        zone_b_cod: '',
        zone_c_cod: '',
        zone_d_cod: '',
        zone_e_cod: '',
        zone_f_cod: '',
        zone_a_cod_per: '',
        zone_b_cod_per: '',
        zone_c_cod_per: '',
        zone_d_cod_per: '',
        zone_e_cod_per: '',
        zone_f_cod_per: '',
        zone_a_rto: '',
        zone_b_rto: '',
        zone_c_rto: '',
        zone_d_rto: '',
        zone_e_rto: '',
        zone_f_rto: '',
        zone_a_rto_add: '',
        zone_b_rto_add: '',
        zone_c_rto_add: '',
        zone_d_rto_add: '',
        zone_e_rto_add: '',
        zone_f_rto_add: '',
        zone_a_rto_fsc: '',
        zone_b_rto_fsc: '',
        zone_c_rto_fsc: '',
        zone_d_rto_fsc: '',
        zone_e_rto_fsc: '',
        zone_f_rto_fsc: '',

        zone_b_up: '',
        zone_b_up_fwd_add: '',
        zone_b_up_fwd_fsc: '',
        zone_b_up_cod: '',
        zone_b_up_cod_per: '',
        zone_b_up_rto: '',
        zone_b_up_rto_add: '',
        zone_b_up_rto_fsc: '',
        zone_b_ros: '',
        zone_b_ros_fwd_add: '',
        zone_b_ros_fwd_fsc: '',
        zone_b_ros_cod: '',
        zone_b_ros_cod_per: '',
        zone_b_ros_rto: '',
        zone_b_ros_rto_add: '',
        zone_b_ros_rto_fsc: '',
        zone_b_up_ros: '',
        zone_b_up_ros_fwd_add: '',
        zone_b_up_ros_fwd_fsc: '',
        zone_b_up_ros_cod: '',
        zone_b_up_ros_cod_per: '',
        zone_b_up_ros_rto: '',
        zone_b_up_ros_rto_add: '',
        zone_b_up_ros_rto_fsc: '',
        zone_d_up: '',
        zone_d_up_fwd_add: '',
        zone_d_up_fwd_fsc: '',
        zone_d_up_cod: '',
        zone_d_up_cod_per: '',
        zone_d_up_rto: '',
        zone_d_up_rto_add: '',
        zone_d_up_rto_fsc: '',
        zone_d_ros: '',
        zone_d_ros_fwd_add: '',
        zone_d_ros_fwd_fsc: '',
        zone_d_ros_cod: '',
        zone_d_ros_cod_per: '',
        zone_d_ros_rto: '',
        zone_d_ros_rto_add: '',
        zone_d_ros_rto_fsc: '',
        zone_d_up_ros: '',
        zone_d_up_ros_fwd_add: '',
        zone_d_up_ros_fwd_fsc: '',
        zone_d_up_ros_cod: '',
        zone_d_up_ros_cod_per: '',
        zone_d_up_ros_rto: '',
        zone_d_up_ros_rto_add: '',
        zone_d_up_ros_rto_fsc: '',
        zone_e_up: '',
        zone_e_up_fwd_add: '',
        zone_e_up_fwd_fsc: '',
        zone_e_up_cod: '',
        zone_e_up_cod_per: '',
        zone_e_up_rto: '',
        zone_e_up_rto_add: '',
        zone_e_up_rto_fsc: '',
        zone_e_ros: '',
        zone_e_ros_fwd_add: '',
        zone_e_ros_fwd_fsc: '',
        zone_e_ros_cod: '',
        zone_e_ros_cod_per: '',
        zone_e_ros_rto: '',
        zone_e_ros_rto_add: '',
        zone_e_ros_rto_fsc: '',
        zone_e_up_ros: '',
        zone_e_up_ros_fwd_add: '',
        zone_e_up_ros_fwd_fsc: '',
        zone_e_up_ros_cod: '',
        zone_e_up_ros_cod_per: '',
        zone_e_up_ros_rto: '',
        zone_e_up_ros_rto_add: '',
        zone_e_up_ros_rto_fsc: '',
        zone_f_up: '',
        zone_f_up_fwd_add: '',
        zone_f_up_fwd_fsc: '',
        zone_f_up_cod: '',
        zone_f_up_cod_per: '',
        zone_f_up_rto: '',
        zone_f_up_rto_add: '',
        zone_f_up_rto_fsc: '',
        zone_f_ros: '',
        zone_f_ros_fwd_add: '',
        zone_f_ros_fwd_fsc: '',
        zone_f_ros_cod: '',
        zone_f_ros_cod_per: '',
        zone_f_ros_rto: '',
        zone_f_ros_rto_add: '',
        zone_f_ros_rto_fsc: '',
        zone_f_up_ros: '',
        zone_f_up_ros_cod_per: '',

        rate_slab_type: '',
        logistics_fsc_per: '',
        logistics_cod: '',
        logistics_cod_per: '',
        logistics_rto: '',
        logistics_rto_additional: '',
        logistics_rto_fsc_per: '',
        flat_rate_value: '',
        flat_rate_add_value: '',

        cod_flat_rate_value: '',
        cod_flat_rate_add_value: '',
        prepaid_flat_rate_value: '',
        prepaid_flat_rate_add_value: ''
    },
        // rateChartModalVariables.logisticsOptions = [];
        rateChartModalVariables.fwdAddCheckbox = false;
    rateChartModalVariables.fwdFscCheckbox = false;
    rateChartModalVariables.codCheckbox = false;
    rateChartModalVariables.codPerCheckbox = false;
    rateChartModalVariables.rtoCheckbox = false;
    rateChartModalVariables.rtoAddCheckbox = false;
    rateChartModalVariables.rtoFscCheckbox = false;
    rateChartModalVariables.tabTypeRequiredText = false;
    rateChartModalVariables.logisticsRequiredText = false;
    rateChartModalVariables.logisticsServiceTypeRequiredText = false;
    rateChartModalVariables.slabTypeRequiredText = false;
    rateChartModalVariables.multiplyFactorRequiredText = false;
    rateChartModalVariables.allValuesRequiredText = false;
    rateChartModalVariables.allValuesRequiredTextEkartBluedart = false;
    rateChartModalVariables.allValuesRequiredTextEcom = false;
    rateChartModalVariables.bothFlatRatesValuesRequiredText = false;
}

export const checkValidations = (): boolean => {
    let tabTypeCheck: boolean = false;
    let logisticCheck: boolean = false;
    let logisticsServiceTypeCheck: boolean = false;
    let slabCheck: boolean = false;
    let multiplyCheck: boolean = false;
    let allValuesCheck: boolean = false;
    let allValuesCheckEkartBluedart: boolean = false;
    let allValuesCheckEcom: boolean = false;
    let bothFlatRatesValuesCheck: boolean = false;

    if (rateChartModalVariables.tabType != '') {
        rateChartModalVariables.tabTypeRequiredText = false;
        tabTypeCheck = true;
    } else {
        rateChartModalVariables.tabTypeRequiredText = true;
        tabTypeCheck = false;
    }
    if (rateChartModalVariables.logistic != 'Select Logistics' && rateChartModalVariables.logistic != '') {
        rateChartModalVariables.logisticsRequiredText = false;
        logisticCheck = true;
    } else {
        rateChartModalVariables.logisticsRequiredText = true;
        logisticCheck = false;
    }
    if (rateChartModalVariables.logisticServiceType != 'Select Logistics Service Type' && rateChartModalVariables.logisticServiceType != '') {
        rateChartModalVariables.logisticsServiceTypeRequiredText = false;
        logisticsServiceTypeCheck = true;
    } else {
        rateChartModalVariables.logisticsServiceTypeRequiredText = true;
        logisticsServiceTypeCheck = false;
    }
    if (rateChartModalVariables.slabType != '0.00' && rateChartModalVariables.slabType != '') {
        rateChartModalVariables.slabTypeRequiredText = false;
        slabCheck = true;
    } else {
        rateChartModalVariables.slabTypeRequiredText = true;
        slabCheck = false;
    }
    if (rateChartModalVariables.multiplyFactor != '0.00' && rateChartModalVariables.multiplyFactor != '') {
        rateChartModalVariables.multiplyFactorRequiredText = false;
        multiplyCheck = true;
    } else {
        rateChartModalVariables.multiplyFactorRequiredText = true;
        multiplyCheck = false;
    }

    if (rateChartModalVariables.rateTypeZoneWise == 'ZW') {
        if (!rateChartModalVariables.modalData.zone_a || !rateChartModalVariables.modalData.zone_b || !rateChartModalVariables.modalData.zone_c || !rateChartModalVariables.modalData.zone_d || !rateChartModalVariables.modalData.zone_e || !rateChartModalVariables.modalData.zone_f || !rateChartModalVariables.modalData.zone_a_fwd_add || !rateChartModalVariables.modalData.zone_b_fwd_add || !rateChartModalVariables.modalData.zone_c_fwd_add || !rateChartModalVariables.modalData.zone_d_fwd_add || !rateChartModalVariables.modalData.zone_e_fwd_add || !rateChartModalVariables.modalData.zone_f_fwd_add || !rateChartModalVariables.modalData.zone_b_fwd_add || !rateChartModalVariables.modalData.zone_c_fwd_add || !rateChartModalVariables.modalData.zone_d_fwd_add || !rateChartModalVariables.modalData.zone_e_fwd_add || !rateChartModalVariables.modalData.zone_f_fwd_add || !rateChartModalVariables.modalData.zone_a_fwd_fsc || !rateChartModalVariables.modalData.zone_b_fwd_fsc || !rateChartModalVariables.modalData.zone_c_fwd_fsc || !rateChartModalVariables.modalData.zone_d_fwd_fsc || !rateChartModalVariables.modalData.zone_e_fwd_fsc || !rateChartModalVariables.modalData.zone_f_fwd_fsc || !rateChartModalVariables.modalData.zone_a_cod || !rateChartModalVariables.modalData.zone_b_cod || !rateChartModalVariables.modalData.zone_c_cod || !rateChartModalVariables.modalData.zone_d_cod || !rateChartModalVariables.modalData.zone_e_cod || !rateChartModalVariables.modalData.zone_f_cod || !rateChartModalVariables.modalData.zone_a_cod_per || !rateChartModalVariables.modalData.zone_b_cod_per || !rateChartModalVariables.modalData.zone_c_cod_per || !rateChartModalVariables.modalData.zone_d_cod_per || !rateChartModalVariables.modalData.zone_e_cod_per || !rateChartModalVariables.modalData.zone_f_cod_per || !rateChartModalVariables.modalData.zone_a_rto || !rateChartModalVariables.modalData.zone_b_rto || !rateChartModalVariables.modalData.zone_c_rto || !rateChartModalVariables.modalData.zone_d_rto || !rateChartModalVariables.modalData.zone_e_rto || !rateChartModalVariables.modalData.zone_f_rto || !rateChartModalVariables.modalData.zone_a_rto_add || !rateChartModalVariables.modalData.zone_b_rto_add || !rateChartModalVariables.modalData.zone_c_rto_add || !rateChartModalVariables.modalData.zone_d_rto_add || !rateChartModalVariables.modalData.zone_e_rto_add || !rateChartModalVariables.modalData.zone_f_rto_add || !rateChartModalVariables.modalData.zone_a_rto_fsc || !rateChartModalVariables.modalData.zone_b_rto_fsc || !rateChartModalVariables.modalData.zone_c_rto_fsc || !rateChartModalVariables.modalData.zone_d_rto_fsc || !rateChartModalVariables.modalData.zone_e_rto_fsc || !rateChartModalVariables.modalData.zone_f_rto_fsc) {
            rateChartModalVariables.allValuesRequiredText = true;
            allValuesCheck = false;
            rateChartModalVariables.allValuesRequiredTextEcom = true;
            allValuesCheckEcom = false;
        } else {
            rateChartModalVariables.allValuesRequiredText = false;
            allValuesCheck = true;
            rateChartModalVariables.allValuesRequiredTextEcom = false;
            allValuesCheckEcom = true;
        }

        if (!rateChartModalVariables.modalData.zone_a || !rateChartModalVariables.modalData.zone_b || !rateChartModalVariables.modalData.zone_c || !rateChartModalVariables.modalData.zone_d || !rateChartModalVariables.modalData.zone_e || !rateChartModalVariables.modalData.zone_f || !rateChartModalVariables.modalData.zone_a_fwd_add || !rateChartModalVariables.modalData.zone_b_fwd_add || !rateChartModalVariables.modalData.zone_c_fwd_add || !rateChartModalVariables.modalData.zone_d_fwd_add || !rateChartModalVariables.modalData.zone_e_fwd_add || !rateChartModalVariables.modalData.zone_f_fwd_add || !rateChartModalVariables.modalData.zone_b_fwd_add || !rateChartModalVariables.modalData.zone_c_fwd_add || !rateChartModalVariables.modalData.zone_d_fwd_add || !rateChartModalVariables.modalData.zone_e_fwd_add || !rateChartModalVariables.modalData.zone_f_fwd_add || !rateChartModalVariables.modalData.zone_a_cod || !rateChartModalVariables.modalData.zone_b_cod || !rateChartModalVariables.modalData.zone_c_cod || !rateChartModalVariables.modalData.zone_d_cod || !rateChartModalVariables.modalData.zone_e_cod || !rateChartModalVariables.modalData.zone_f_cod || !rateChartModalVariables.modalData.zone_a_cod_per || !rateChartModalVariables.modalData.zone_b_cod_per || !rateChartModalVariables.modalData.zone_c_cod_per || !rateChartModalVariables.modalData.zone_d_cod_per || !rateChartModalVariables.modalData.zone_e_cod_per || !rateChartModalVariables.modalData.zone_f_cod_per || !rateChartModalVariables.modalData.zone_a_rto || !rateChartModalVariables.modalData.zone_b_rto || !rateChartModalVariables.modalData.zone_c_rto || !rateChartModalVariables.modalData.zone_d_rto || !rateChartModalVariables.modalData.zone_e_rto || !rateChartModalVariables.modalData.zone_f_rto || !rateChartModalVariables.modalData.zone_a_rto_add || !rateChartModalVariables.modalData.zone_b_rto_add || !rateChartModalVariables.modalData.zone_c_rto_add || !rateChartModalVariables.modalData.zone_d_rto_add || !rateChartModalVariables.modalData.zone_e_rto_add || !rateChartModalVariables.modalData.zone_f_rto_add) {
            rateChartModalVariables.allValuesRequiredTextEkartBluedart = true;
            allValuesCheckEkartBluedart = false;
        } else {
            rateChartModalVariables.allValuesRequiredTextEkartBluedart = false;
            allValuesCheckEkartBluedart = true;
        }
    } else {
        rateChartModalVariables.allValuesRequiredText = false;
        allValuesCheck = true;
        rateChartModalVariables.allValuesRequiredTextEkartBluedart = false;
        allValuesCheckEkartBluedart = true;
        rateChartModalVariables.allValuesRequiredTextEcom = false;
        allValuesCheckEcom = true;
    }

    if (rateChartModalVariables.rateTypeZoneWise == 'FR') {
        if (!rateChartModalVariables.modalData.cod_flat_rate_value || !rateChartModalVariables.modalData.cod_flat_rate_add_value || !rateChartModalVariables.modalData.prepaid_flat_rate_value || !rateChartModalVariables.modalData.prepaid_flat_rate_add_value) {
            rateChartModalVariables.bothFlatRatesValuesRequiredText = true;
            bothFlatRatesValuesCheck = false;
        } else {
            rateChartModalVariables.bothFlatRatesValuesRequiredText = false;
            bothFlatRatesValuesCheck = true;
        }
    }

    // console.log('CHECKKK', tabTypeCheck , logisticCheck, logisticsServiceTypeCheck, slabCheck , multiplyCheck , (rateChartModalVariables.logistic == 'Ecom Express' ? allValuesCheckEcom : (rateChartModalVariables.logistic == 'Ekart' || rateChartModalVariables.logistic == 'BlueDart') ? allValuesCheckEkartBluedart : allValuesCheck) , rateChartModalVariables.rateTypeZoneWise == 'FR' ? bothFlatRatesValuesCheck : true)


    // if (tabTypeCheck && logisticCheck && logisticsServiceTypeCheck && slabCheck && multiplyCheck && (rateChartModalVariables.logistic == 'Ecom Express' ? allValuesCheckEcom : allValuesCheck) && (rateChartModalVariables.logistic == 'Ekart' ? allValuesCheckEkartBluedart : allValuesCheck) && (rateChartModalVariables.logistic == 'BlueDart' ? allValuesCheckEkartBluedart : allValuesCheck) && (rateChartModalVariables.rateTypeZoneWise == 'FR' ? bothFlatRatesValuesCheck : true))
    //     return true
    if (tabTypeCheck && logisticCheck && logisticsServiceTypeCheck && slabCheck && multiplyCheck && (rateChartModalVariables.logistic == 'Ecom Express' ? allValuesCheckEcom : (rateChartModalVariables.logistic == 'Ekart' || rateChartModalVariables.logistic == 'BlueDart') ? allValuesCheckEkartBluedart : allValuesCheck) && ((rateChartModalVariables.logistic == 'Ekart' || rateChartModalVariables.logistic == 'BlueDart') ? allValuesCheckEkartBluedart : true) && (rateChartModalVariables.rateTypeZoneWise == 'FR' ? bothFlatRatesValuesCheck : true))
        return true

    return false
}


export const setDefaultData = () => {
    rateChartModalVariables.baseRateChartFetched = false;
    rateChartModalVariables.modalData = {
        zone_a: '',
        zone_b: '',
        zone_c: '',
        zone_d: '',
        zone_e: '',
        zone_f: '',
        zone_a_fwd_add: '',
        zone_b_fwd_add: '',
        zone_c_fwd_add: '',
        zone_d_fwd_add: '',
        zone_e_fwd_add: '',
        zone_f_fwd_add: '',
        zone_a_fwd_fsc: '',
        zone_b_fwd_fsc: '',
        zone_c_fwd_fsc: '',
        zone_d_fwd_fsc: '',
        zone_e_fwd_fsc: '',
        zone_f_fwd_fsc: '',
        zone_a_cod: '',
        zone_b_cod: '',
        zone_c_cod: '',
        zone_d_cod: '',
        zone_e_cod: '',
        zone_f_cod: '',
        zone_a_cod_per: '',
        zone_b_cod_per: '',
        zone_c_cod_per: '',
        zone_d_cod_per: '',
        zone_e_cod_per: '',
        zone_f_cod_per: '',
        zone_a_rto: '',
        zone_b_rto: '',
        zone_c_rto: '',
        zone_d_rto: '',
        zone_e_rto: '',
        zone_f_rto: '',
        zone_a_rto_add: '',
        zone_b_rto_add: '',
        zone_c_rto_add: '',
        zone_d_rto_add: '',
        zone_e_rto_add: '',
        zone_f_rto_add: '',
        zone_a_rto_fsc: '',
        zone_b_rto_fsc: '',
        zone_c_rto_fsc: '',
        zone_d_rto_fsc: '',
        zone_e_rto_fsc: '',
        zone_f_rto_fsc: '',
        zone_f_up_ros_cod_per: '',

        zone_b_up: '',
        zone_b_up_fwd_add: '',
        zone_b_up_fwd_fsc: '',
        zone_b_up_cod: '',
        zone_b_up_cod_per: '',
        zone_b_up_rto: '',
        zone_b_up_rto_add: '',
        zone_b_up_rto_fsc: '',
        zone_b_ros: '',
        zone_b_ros_fwd_add: '',
        zone_b_ros_fwd_fsc: '',
        zone_b_ros_cod: '',
        zone_b_ros_cod_per: '',
        zone_b_ros_rto: '',
        zone_b_ros_rto_add: '',
        zone_b_ros_rto_fsc: '',
        zone_b_up_ros: '',
        zone_b_up_ros_fwd_add: '',
        zone_b_up_ros_fwd_fsc: '',
        zone_b_up_ros_cod: '',
        zone_b_up_ros_cod_per: '',
        zone_b_up_ros_rto: '',
        zone_b_up_ros_rto_add: '',
        zone_b_up_ros_rto_fsc: '',
        zone_d_up: '',
        zone_d_up_fwd_add: '',
        zone_d_up_fwd_fsc: '',
        zone_d_up_cod: '',
        zone_d_up_cod_per: '',
        zone_d_up_rto: '',
        zone_d_up_rto_add: '',
        zone_d_up_rto_fsc: '',
        zone_d_ros: '',
        zone_d_ros_fwd_add: '',
        zone_d_ros_fwd_fsc: '',
        zone_d_ros_cod: '',
        zone_d_ros_cod_per: '',
        zone_d_ros_rto: '',
        zone_d_ros_rto_add: '',
        zone_d_ros_rto_fsc: '',
        zone_d_up_ros: '',
        zone_d_up_ros_fwd_add: '',
        zone_d_up_ros_fwd_fsc: '',
        zone_d_up_ros_cod: '',
        zone_d_up_ros_cod_per: '',
        zone_d_up_ros_rto: '',
        zone_d_up_ros_rto_add: '',
        zone_d_up_ros_rto_fsc: '',
        zone_e_up: '',
        zone_e_up_fwd_add: '',
        zone_e_up_fwd_fsc: '',
        zone_e_up_cod: '',
        zone_e_up_cod_per: '',
        zone_e_up_rto: '',
        zone_e_up_rto_add: '',
        zone_e_up_rto_fsc: '',
        zone_e_ros: '',
        zone_e_ros_fwd_add: '',
        zone_e_ros_fwd_fsc: '',
        zone_e_ros_cod: '',
        zone_e_ros_cod_per: '',
        zone_e_ros_rto: '',
        zone_e_ros_rto_add: '',
        zone_e_ros_rto_fsc: '',
        zone_e_up_ros: '',
        zone_e_up_ros_fwd_add: '',
        zone_e_up_ros_fwd_fsc: '',
        zone_e_up_ros_cod: '',
        zone_e_up_ros_cod_per: '',
        zone_e_up_ros_rto: '',
        zone_e_up_ros_rto_add: '',
        zone_e_up_ros_rto_fsc: '',
        zone_f_up: '',
        zone_f_up_fwd_add: '',
        zone_f_up_fwd_fsc: '',
        zone_f_up_cod: '',
        zone_f_up_cod_per: '',
        zone_f_up_rto: '',
        zone_f_up_rto_add: '',
        zone_f_up_rto_fsc: '',
        zone_f_ros: '',
        zone_f_ros_fwd_add: '',
        zone_f_ros_fwd_fsc: '',
        zone_f_ros_cod: '',
        zone_f_ros_cod_per: '',
        zone_f_ros_rto: '',
        zone_f_ros_rto_add: '',
        zone_f_ros_rto_fsc: '',
        zone_f_up_ros: '',

        rate_slab_type: '',
        logistics_fsc_per: '',
        logistics_cod: '',
        logistics_cod_per: '',
        logistics_rto: '',
        logistics_rto_additional: '',
        logistics_rto_fsc_per: '',
        flat_rate_value: '',
        flat_rate_add_value: '',

        cod_flat_rate_value: '',
        cod_flat_rate_add_value: '',
        prepaid_flat_rate_value: '',
        prepaid_flat_rate_add_value: ''
    }
}