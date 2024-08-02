import { rateChartModalVariables  } from './RateChartModal'

export const returnPayloadModal = (rateChartModalVariables: any) => {
    return {
        zone_a_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a : '',
        zone_b_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b : '',
        zone_c_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c : '',
        zone_d_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d : '',
        zone_e_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e : '',
        zone_f_fwd: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f : '',
        zone_a_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_fwd_add : '',
        zone_b_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_fwd_add : '',
        zone_c_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_fwd_add : '',
        zone_d_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_fwd_add : '',
        zone_e_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_fwd_add : '',
        zone_f_fwd_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_fwd_add : '',
        zone_a_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_fwd_fsc : '',
        zone_b_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_fwd_fsc : '',
        zone_c_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_fwd_fsc : '',
        zone_d_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_fwd_fsc : '',
        zone_e_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_fwd_fsc : '',
        zone_f_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_fwd_fsc : '',
        zone_a_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_cod : '',
        zone_b_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_cod : '',
        zone_c_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_cod : '',
        zone_d_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_cod : '',
        zone_e_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_cod : '',
        zone_f_cod: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_cod : '',
        zone_a_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_cod_per : '',
        zone_b_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_cod_per : '',
        zone_c_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_cod_per : '',
        zone_d_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_cod_per : '',
        zone_e_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_cod_per : '',
        zone_f_cod_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_cod_per : '',
        zone_a_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_rto : '',
        zone_b_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_rto : '',
        zone_c_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_rto : '',
        zone_d_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_rto : '',
        zone_e_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_rto : '',
        zone_f_rto: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_rto : '',
        zone_a_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_rto_add : '',
        zone_b_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_rto_add : '',
        zone_c_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_rto_add : '',
        zone_d_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_rto_add : '',
        zone_e_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_rto_add : '',
        zone_f_rto_additional: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_rto_add : '',
        zone_a_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_a_rto_fsc : '',
        zone_b_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_b_rto_fsc : '',
        zone_c_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_c_rto_fsc : '',
        zone_d_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_d_rto_fsc : '',
        zone_e_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_e_rto_fsc : '',
        zone_f_rto_fsc_per: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? rateChartModalVariables.modalData.zone_f_rto_fsc : '',
        flat_rate_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.flat_rate_value : '',
        flat_rate_add_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.flat_rate_add_value : '',

        cod_flat_rate_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.cod_flat_rate_value : '',
        cod_flat_rate_add_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.cod_flat_rate_add_value : '',
        prepaid_flat_rate_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.prepaid_flat_rate_value : '',
        prepaid_flat_rate_add_value: rateChartModalVariables.rateTypeZoneWise == 'FR' ? rateChartModalVariables.modalData.prepaid_flat_rate_add_value : '',
    };
};


export const setValuesOnUpdated = (getModalData: any) => {
    rateChartModalVariables.modalData.zone_a = getModalData.value.rate_card_data_array[0].zone_a_fwd;
    rateChartModalVariables.modalData.zone_b = getModalData.value.rate_card_data_array[0].zone_b_fwd;
    rateChartModalVariables.modalData.zone_c = getModalData.value.rate_card_data_array[0].zone_c_fwd;
    rateChartModalVariables.modalData.zone_d = getModalData.value.rate_card_data_array[0].zone_d_fwd;
    rateChartModalVariables.modalData.zone_e = getModalData.value.rate_card_data_array[0].zone_e_fwd;
    rateChartModalVariables.modalData.zone_f = getModalData.value.rate_card_data_array[0].zone_f_fwd;
    rateChartModalVariables.modalData.zone_a_fwd_add = getModalData.value.rate_card_data_array[0].zone_a_fwd_additional;
    rateChartModalVariables.modalData.zone_b_fwd_add = getModalData.value.rate_card_data_array[0].zone_b_fwd_additional;
    rateChartModalVariables.modalData.zone_c_fwd_add = getModalData.value.rate_card_data_array[0].zone_c_fwd_additional;
    rateChartModalVariables.modalData.zone_d_fwd_add = getModalData.value.rate_card_data_array[0].zone_d_fwd_additional;
    rateChartModalVariables.modalData.zone_e_fwd_add = getModalData.value.rate_card_data_array[0].zone_e_fwd_additional;
    rateChartModalVariables.modalData.zone_f_fwd_add = getModalData.value.rate_card_data_array[0].zone_f_fwd_additional;
    rateChartModalVariables.modalData.zone_a_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_a_fsc_per;
    rateChartModalVariables.modalData.zone_b_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_b_fsc_per;
    rateChartModalVariables.modalData.zone_c_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_c_fsc_per;
    rateChartModalVariables.modalData.zone_d_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_d_fsc_per;
    rateChartModalVariables.modalData.zone_e_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_e_fsc_per;
    rateChartModalVariables.modalData.zone_f_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_f_fsc_per;
    rateChartModalVariables.modalData.zone_a_cod = getModalData.value.rate_card_data_array[0].zone_a_cod;
    rateChartModalVariables.modalData.zone_b_cod = getModalData.value.rate_card_data_array[0].zone_b_cod;
    rateChartModalVariables.modalData.zone_c_cod = getModalData.value.rate_card_data_array[0].zone_c_cod;
    rateChartModalVariables.modalData.zone_d_cod = getModalData.value.rate_card_data_array[0].zone_d_cod;
    rateChartModalVariables.modalData.zone_e_cod = getModalData.value.rate_card_data_array[0].zone_e_cod;
    rateChartModalVariables.modalData.zone_f_cod = getModalData.value.rate_card_data_array[0].zone_f_cod;
    rateChartModalVariables.modalData.zone_a_cod_per = getModalData.value.rate_card_data_array[0].zone_a_cod_per;
    rateChartModalVariables.modalData.zone_b_cod_per = getModalData.value.rate_card_data_array[0].zone_b_cod_per;
    rateChartModalVariables.modalData.zone_c_cod_per = getModalData.value.rate_card_data_array[0].zone_c_cod_per;
    rateChartModalVariables.modalData.zone_d_cod_per = getModalData.value.rate_card_data_array[0].zone_d_cod_per;
    rateChartModalVariables.modalData.zone_e_cod_per = getModalData.value.rate_card_data_array[0].zone_e_cod_per;
    rateChartModalVariables.modalData.zone_f_cod_per = getModalData.value.rate_card_data_array[0].zone_f_cod_per;
    rateChartModalVariables.modalData.zone_a_rto = getModalData.value.rate_card_data_array[0].zone_a_rto;
    rateChartModalVariables.modalData.zone_b_rto = getModalData.value.rate_card_data_array[0].zone_b_rto;
    rateChartModalVariables.modalData.zone_c_rto = getModalData.value.rate_card_data_array[0].zone_c_rto;
    rateChartModalVariables.modalData.zone_d_rto = getModalData.value.rate_card_data_array[0].zone_d_rto;
    rateChartModalVariables.modalData.zone_e_rto = getModalData.value.rate_card_data_array[0].zone_e_rto;
    rateChartModalVariables.modalData.zone_f_rto = getModalData.value.rate_card_data_array[0].zone_f_rto;
    rateChartModalVariables.modalData.zone_a_rto_add = getModalData.value.rate_card_data_array[0].zone_a_rto_additional;
    rateChartModalVariables.modalData.zone_b_rto_add = getModalData.value.rate_card_data_array[0].zone_b_rto_additional;
    rateChartModalVariables.modalData.zone_c_rto_add = getModalData.value.rate_card_data_array[0].zone_c_rto_additional;
    rateChartModalVariables.modalData.zone_d_rto_add = getModalData.value.rate_card_data_array[0].zone_d_rto_additional;
    rateChartModalVariables.modalData.zone_e_rto_add = getModalData.value.rate_card_data_array[0].zone_e_rto_additional;
    rateChartModalVariables.modalData.zone_f_rto_add = getModalData.value.rate_card_data_array[0].zone_f_rto_additional;
    rateChartModalVariables.modalData.zone_a_rto_fsc = getModalData.value.rate_card_data_array[0].zone_a_rto_fsc_per;
    rateChartModalVariables.modalData.zone_b_rto_fsc = getModalData.value.rate_card_data_array[0].zone_b_rto_fsc_per;
    rateChartModalVariables.modalData.zone_c_rto_fsc = getModalData.value.rate_card_data_array[0].zone_c_rto_fsc_per;
    rateChartModalVariables.modalData.zone_d_rto_fsc = getModalData.value.rate_card_data_array[0].zone_d_rto_fsc_per;
    rateChartModalVariables.modalData.zone_e_rto_fsc = getModalData.value.rate_card_data_array[0].zone_e_rto_fsc_per;
    rateChartModalVariables.modalData.zone_f_rto_fsc = getModalData.value.rate_card_data_array[0].zone_f_rto_fsc_per;

    rateChartModalVariables.modalData.zone_b_up = getModalData.value.rate_card_data_array[0].zone_b_fwd_up;
    rateChartModalVariables.modalData.zone_b_up_fwd_add = getModalData.value.rate_card_data_array[0].zone_b_fwd_additional_up;
    rateChartModalVariables.modalData.zone_b_up_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_b_fsc_per_up;
    rateChartModalVariables.modalData.zone_b_up_cod = getModalData.value.rate_card_data_array[0].zone_b_cod_up;
    rateChartModalVariables.modalData.zone_b_up_cod_per = getModalData.value.rate_card_data_array[0].zone_b_cod_per_up;
    rateChartModalVariables.modalData.zone_b_up_rto = getModalData.value.rate_card_data_array[0].zone_b_rto_up;
    rateChartModalVariables.modalData.zone_b_up_rto_add = getModalData.value.rate_card_data_array[0].zone_b_rto_additional_up;
    rateChartModalVariables.modalData.zone_b_up_rto_fsc = getModalData.value.rate_card_data_array[0].zone_b_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_b_ros = getModalData.value.rate_card_data_array[0].zone_b_fwd_ros;
    rateChartModalVariables.modalData.zone_b_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_b_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_b_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_b_fsc_per_ros;
    rateChartModalVariables.modalData.zone_b_ros_cod = getModalData.value.rate_card_data_array[0].zone_b_cod_ros;
    rateChartModalVariables.modalData.zone_b_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_b_cod_per_ros;
    rateChartModalVariables.modalData.zone_b_ros_rto = getModalData.value.rate_card_data_array[0].zone_b_rto_ros;
    rateChartModalVariables.modalData.zone_b_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_b_rto_additional_ros;
    rateChartModalVariables.modalData.zone_b_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_b_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_b_up_ros = getModalData.value.rate_card_data_array[0].zone_b_fwd_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_b_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_b_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_cod = getModalData.value.rate_card_data_array[0].zone_b_cod_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_b_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_rto = getModalData.value.rate_card_data_array[0].zone_b_rto_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_b_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_b_rto_fsc_per_up_ros;

    rateChartModalVariables.modalData.zone_d_up = getModalData.value.rate_card_data_array[0].zone_d_fwd_up;
    rateChartModalVariables.modalData.zone_d_up_fwd_add = getModalData.value.rate_card_data_array[0].zone_d_fwd_additional_up;
    rateChartModalVariables.modalData.zone_d_up_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_d_fsc_per_up;
    rateChartModalVariables.modalData.zone_d_up_cod = getModalData.value.rate_card_data_array[0].zone_d_cod_up;
    rateChartModalVariables.modalData.zone_d_up_cod_per = getModalData.value.rate_card_data_array[0].zone_d_cod_per_up;
    rateChartModalVariables.modalData.zone_d_up_rto = getModalData.value.rate_card_data_array[0].zone_d_rto_up;
    rateChartModalVariables.modalData.zone_d_up_rto_add = getModalData.value.rate_card_data_array[0].zone_d_rto_additional_up;
    rateChartModalVariables.modalData.zone_d_up_rto_fsc = getModalData.value.rate_card_data_array[0].zone_d_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_d_ros = getModalData.value.rate_card_data_array[0].zone_d_fwd_ros;
    rateChartModalVariables.modalData.zone_d_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_d_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_d_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_d_fsc_per_ros;
    rateChartModalVariables.modalData.zone_d_ros_cod = getModalData.value.rate_card_data_array[0].zone_d_cod_ros;
    rateChartModalVariables.modalData.zone_d_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_d_cod_per_ros;
    rateChartModalVariables.modalData.zone_d_ros_rto = getModalData.value.rate_card_data_array[0].zone_d_rto_ros;
    rateChartModalVariables.modalData.zone_d_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_d_rto_additional_ros;
    rateChartModalVariables.modalData.zone_d_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_d_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_d_up_ros = getModalData.value.rate_card_data_array[0].zone_d_fwd_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_d_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_d_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_cod = getModalData.value.rate_card_data_array[0].zone_d_cod_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_d_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_rto = getModalData.value.rate_card_data_array[0].zone_d_rto_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_d_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_d_rto_fsc_per_up_ros;

    rateChartModalVariables.modalData.zone_e_up = getModalData.value.rate_card_data_array[0].zone_e_fwd_up;
    rateChartModalVariables.modalData.zone_e_up_fwd_add = getModalData.value.rate_card_data_array[0].zone_e_fwd_additional_up;
    rateChartModalVariables.modalData.zone_e_up_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_e_fsc_per_up;
    rateChartModalVariables.modalData.zone_e_up_cod = getModalData.value.rate_card_data_array[0].zone_e_cod_up;
    rateChartModalVariables.modalData.zone_e_up_cod_per = getModalData.value.rate_card_data_array[0].zone_e_cod_per_up;
    rateChartModalVariables.modalData.zone_e_up_rto = getModalData.value.rate_card_data_array[0].zone_e_rto_up;
    rateChartModalVariables.modalData.zone_e_up_rto_add = getModalData.value.rate_card_data_array[0].zone_e_rto_additional_up;
    rateChartModalVariables.modalData.zone_e_up_rto_fsc = getModalData.value.rate_card_data_array[0].zone_e_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_e_ros = getModalData.value.rate_card_data_array[0].zone_e_fwd_ros;
    rateChartModalVariables.modalData.zone_e_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_e_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_e_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_e_fsc_per_ros;
    rateChartModalVariables.modalData.zone_e_ros_cod = getModalData.value.rate_card_data_array[0].zone_e_cod_ros;
    rateChartModalVariables.modalData.zone_e_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_e_cod_per_ros;
    rateChartModalVariables.modalData.zone_e_ros_rto = getModalData.value.rate_card_data_array[0].zone_e_rto_ros;
    rateChartModalVariables.modalData.zone_e_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_e_rto_additional_ros;
    rateChartModalVariables.modalData.zone_e_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_e_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_e_up_ros = getModalData.value.rate_card_data_array[0].zone_e_fwd_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_e_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_e_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_cod = getModalData.value.rate_card_data_array[0].zone_e_cod_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_e_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_rto = getModalData.value.rate_card_data_array[0].zone_e_rto_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_e_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_e_rto_fsc_per_up_ros;


    rateChartModalVariables.modalData.zone_f_up = getModalData.value.rate_card_data_array[0].zone_f_fwd_up;
    rateChartModalVariables.modalData.zone_f_up_fwd_add = getModalData.value.rate_card_data_array[0].zone_f_fwd_additional_up;
    rateChartModalVariables.modalData.zone_f_up_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_f_fsc_per_up;
    rateChartModalVariables.modalData.zone_f_up_cod = getModalData.value.rate_card_data_array[0].zone_f_cod_up;
    rateChartModalVariables.modalData.zone_f_up_cod_per = getModalData.value.rate_card_data_array[0].zone_f_cod_per_up;
    rateChartModalVariables.modalData.zone_f_up_rto = getModalData.value.rate_card_data_array[0].zone_f_rto_up;
    rateChartModalVariables.modalData.zone_f_up_rto_add = getModalData.value.rate_card_data_array[0].zone_f_rto_additional_up;
    rateChartModalVariables.modalData.zone_f_up_rto_fsc = getModalData.value.rate_card_data_array[0].zone_f_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_f_ros = getModalData.value.rate_card_data_array[0].zone_f_fwd_ros;
    rateChartModalVariables.modalData.zone_f_ros_fwd_add = getModalData.value.rate_card_data_array[0].zone_f_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_f_ros_fwd_fsc = getModalData.value.rate_card_data_array[0].zone_f_fsc_per_ros;
    rateChartModalVariables.modalData.zone_f_ros_cod = getModalData.value.rate_card_data_array[0].zone_f_cod_ros;
    rateChartModalVariables.modalData.zone_f_ros_cod_per = getModalData.value.rate_card_data_array[0].zone_f_cod_per_ros;
    rateChartModalVariables.modalData.zone_f_ros_rto = getModalData.value.rate_card_data_array[0].zone_f_rto_ros;
    rateChartModalVariables.modalData.zone_f_ros_rto_add = getModalData.value.rate_card_data_array[0].zone_f_rto_additional_ros;
    rateChartModalVariables.modalData.zone_f_ros_rto_fsc = getModalData.value.rate_card_data_array[0].zone_f_rto_fsc_per_ros;

    rateChartModalVariables.rateTypeZoneWise = getModalData.value.rate_card_data_array[0].rate_slab_type == 0 ? 'ZW' : 'FR';
    rateChartModalVariables.modalData.rate_slab_type = getModalData.value.rate_card_data_array[0].rate_slab_type;
    rateChartModalVariables.modalData.logistics_fsc_per = getModalData.value.rate_card_data_array[0].logistics_fsc_per;
    rateChartModalVariables.modalData.logistics_cod = getModalData.value.rate_card_data_array[0].logistics_cod;
    rateChartModalVariables.modalData.logistics_cod_per = getModalData.value.rate_card_data_array[0].logistics_cod_per;
    rateChartModalVariables.modalData.logistics_rto = getModalData.value.rate_card_data_array[0].logistics_rto;
    rateChartModalVariables.modalData.logistics_rto_additional = getModalData.value.rate_card_data_array[0].logistics_rto_additional;
    rateChartModalVariables.modalData.logistics_rto_fsc_per = getModalData.value.rate_card_data_array[0].logistics_rto_fsc_per;
    rateChartModalVariables.modalData.flat_rate_value = getModalData.value.rate_card_data_array[0].flat_rate_value;
    rateChartModalVariables.modalData.flat_rate_add_value = getModalData.value.rate_card_data_array[0].flat_rate_add_value;

    rateChartModalVariables.modalData.cod_flat_rate_value = getModalData.value.rate_card_data_array[0].cod_flat_rate_value;
    rateChartModalVariables.modalData.cod_flat_rate_add_value = getModalData.value.rate_card_data_array[0].cod_flat_rate_add_value;
    rateChartModalVariables.modalData.prepaid_flat_rate_value = getModalData.value.rate_card_data_array[0].prepaid_flat_rate_value;
    rateChartModalVariables.modalData.prepaid_flat_rate_add_value = getModalData.value.rate_card_data_array[0].prepaid_flat_rate_add_value;
}


export const setValuesOnFetchBaseChart = (temp: any) => {
    rateChartModalVariables.modalData.logistics_cod = temp.logistics_cod;
    rateChartModalVariables.modalData.logistics_cod_per = temp.logistics_cod_per;
    rateChartModalVariables.modalData.logistics_fsc_per = temp.logistics_fsc_per;
    rateChartModalVariables.modalData.flat_rate_value = temp.flat_rate_value;
    rateChartModalVariables.modalData.flat_rate_add_value = temp.flat_rate_add_value;

    rateChartModalVariables.modalData.cod_flat_rate_value = temp.cod_flat_rate_value;
    rateChartModalVariables.modalData.cod_flat_rate_add_value = temp.cod_flat_rate_add_value;
    rateChartModalVariables.modalData.prepaid_flat_rate_value = temp.prepaid_flat_rate_value;
    rateChartModalVariables.modalData.prepaid_flat_rate_add_value = temp.prepaid_flat_rate_add_value;


    rateChartModalVariables.logisticsFwd = temp.logistics_fwd;
    rateChartModalVariables.logisticsFwdAdditional = temp.logistics_fwd_additional;
    rateChartModalVariables.modalData.logistics_rto = temp.logistics_rto;
    rateChartModalVariables.modalData.logistics_rto_additional = temp.logistics_rto_additional;
    rateChartModalVariables.modalData.logistics_rto_fsc_per = temp.logistics_rto_fsc_per;
    rateChartModalVariables.modalData.zone_a_cod = temp.zone_a_cod;
    rateChartModalVariables.modalData.zone_a_cod_per = temp.zone_a_cod_per;
    rateChartModalVariables.modalData.zone_a_fwd_fsc = temp.zone_a_fsc_per;
    rateChartModalVariables.modalData.zone_a = temp.zone_a_fwd;
    rateChartModalVariables.modalData.zone_a_fwd_add = temp.zone_a_fwd_additional;
    rateChartModalVariables.modalData.zone_a_rto = temp.zone_a_rto;
    rateChartModalVariables.modalData.zone_a_rto_add = temp.zone_a_rto_additional;
    rateChartModalVariables.modalData.zone_a_rto_fsc = temp.zone_a_rto_fsc_per;

    rateChartModalVariables.modalData.zone_b_cod = temp.zone_b_cod;
    rateChartModalVariables.modalData.zone_b_cod_per = temp.zone_b_cod_per;
    rateChartModalVariables.modalData.zone_b_ros_cod_per = temp.zone_b_cod_per_ros;
    rateChartModalVariables.modalData.zone_b_up_cod_per = temp.zone_b_cod_per_up;
    rateChartModalVariables.modalData.zone_b_up_ros_cod_per = temp.zone_b_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_b_ros_cod = temp.zone_b_cod_ros;
    rateChartModalVariables.modalData.zone_b_up_cod = temp.zone_b_cod_up;
    rateChartModalVariables.modalData.zone_b_up_ros_cod = temp.zone_b_cod_up_ros;
    rateChartModalVariables.modalData.zone_b_fwd_fsc = temp.zone_b_fsc_per;
    rateChartModalVariables.modalData.zone_b_ros_fwd_fsc = temp.zone_b_fsc_per_ros;
    rateChartModalVariables.modalData.zone_b_up_fwd_fsc = temp.zone_b_fsc_per_up;
    rateChartModalVariables.modalData.zone_b_up_ros_fwd_fsc = temp.zone_b_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_b = temp.zone_b_fwd;
    rateChartModalVariables.modalData.zone_b_fwd_add = temp.zone_b_fwd_additional;
    rateChartModalVariables.modalData.zone_b_ros_fwd_add = temp.zone_b_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_b_up_fwd_add = temp.zone_b_fwd_additional_up;
    rateChartModalVariables.modalData.zone_b_up_ros_fwd_add = temp.zone_b_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_b_ros = temp.zone_b_fwd_ros;
    rateChartModalVariables.modalData.zone_b_up = temp.zone_b_fwd_up;
    rateChartModalVariables.modalData.zone_b_up_ros = temp.zone_b_fwd_up_ros;
    rateChartModalVariables.modalData.zone_b_rto = temp.zone_b_rto;
    rateChartModalVariables.modalData.zone_b_rto_add = temp.zone_b_rto_additional;
    rateChartModalVariables.modalData.zone_b_ros_rto_add = temp.zone_b_rto_additional_ros;
    rateChartModalVariables.modalData.zone_b_up_rto_add = temp.zone_b_rto_additional_up;
    rateChartModalVariables.modalData.zone_b_up_ros_rto_add = temp.zone_b_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_b_rto_fsc = temp.zone_b_rto_fsc_per;
    rateChartModalVariables.modalData.zone_b_ros_rto_fsc = temp.zone_b_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_b_up_rto_fsc = temp.zone_b_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_b_up_ros_rto_fsc = temp.zone_b_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_b_up_ros_rto_fsc = temp.zone_b_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_b_ros_rto = temp.zone_b_rto_ros;
    rateChartModalVariables.modalData.zone_b_up_rto = temp.zone_b_rto_up;
    rateChartModalVariables.modalData.zone_b_up_ros_rto = temp.zone_b_rto_up_ros;

    rateChartModalVariables.modalData.zone_c_cod = temp.zone_c_cod;
    rateChartModalVariables.modalData.zone_c_cod_per = temp.zone_c_cod_per;
    rateChartModalVariables.modalData.zone_c_fwd_fsc = temp.zone_c_fsc_per;
    rateChartModalVariables.modalData.zone_c = temp.zone_c_fwd;
    rateChartModalVariables.modalData.zone_c_fwd_add = temp.zone_c_fwd_additional;
    rateChartModalVariables.modalData.zone_c_rto = temp.zone_c_rto;
    rateChartModalVariables.modalData.zone_c_rto_add = temp.zone_c_rto_additional;
    rateChartModalVariables.modalData.zone_c_rto_fsc = temp.zone_c_rto_fsc_per;


    rateChartModalVariables.modalData.zone_d_cod = temp.zone_d_cod;
    rateChartModalVariables.modalData.zone_d_cod_per = temp.zone_d_cod_per;
    rateChartModalVariables.modalData.zone_d_ros_cod_per = temp.zone_d_cod_per_ros;
    rateChartModalVariables.modalData.zone_d_up_cod_per = temp.zone_d_cod_per_up;
    rateChartModalVariables.modalData.zone_d_up_ros_cod_per = temp.zone_d_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_d_ros_cod = temp.zone_d_cod_ros;
    rateChartModalVariables.modalData.zone_d_up_cod = temp.zone_d_cod_up;
    rateChartModalVariables.modalData.zone_d_up_ros_cod = temp.zone_d_cod_up_ros;
    rateChartModalVariables.modalData.zone_d_fwd_fsc = temp.zone_d_fsc_per;
    rateChartModalVariables.modalData.zone_d_ros_fwd_fsc = temp.zone_d_fsc_per_ros;
    rateChartModalVariables.modalData.zone_d_up_fwd_fsc = temp.zone_d_fsc_per_up;
    rateChartModalVariables.modalData.zone_d_up_ros_fwd_fsc = temp.zone_d_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_d = temp.zone_d_fwd;
    rateChartModalVariables.modalData.zone_d_fwd_add = temp.zone_d_fwd_additional;
    rateChartModalVariables.modalData.zone_d_ros_fwd_add = temp.zone_d_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_d_up_fwd_add = temp.zone_d_fwd_additional_up;
    rateChartModalVariables.modalData.zone_d_up_ros_fwd_add = temp.zone_d_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_d_ros = temp.zone_d_fwd_ros;
    rateChartModalVariables.modalData.zone_d_up = temp.zone_d_fwd_up;
    rateChartModalVariables.modalData.zone_d_up_ros = temp.zone_d_fwd_up_ros;
    rateChartModalVariables.modalData.zone_d_rto = temp.zone_d_rto;
    rateChartModalVariables.modalData.zone_d_rto_add = temp.zone_d_rto_additional;
    rateChartModalVariables.modalData.zone_d_ros_rto_add = temp.zone_d_rto_additional_ros;
    rateChartModalVariables.modalData.zone_d_up_rto_add = temp.zone_d_rto_additional_up;
    rateChartModalVariables.modalData.zone_d_up_ros_rto_add = temp.zone_d_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_d_rto_fsc = temp.zone_d_rto_fsc_per;
    rateChartModalVariables.modalData.zone_d_ros_rto_fsc = temp.zone_d_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_d_up_rto_fsc = temp.zone_d_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_d_up_ros_rto_fsc = temp.zone_d_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_d_up_ros_rto_fsc = temp.zone_d_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_d_ros_rto = temp.zone_d_rto_ros;
    rateChartModalVariables.modalData.zone_d_up_rto = temp.zone_d_rto_up;
    rateChartModalVariables.modalData.zone_d_up_ros_rto = temp.zone_d_rto_up_ros;


    rateChartModalVariables.modalData.zone_e_cod = temp.zone_e_cod;
    rateChartModalVariables.modalData.zone_e_cod_per = temp.zone_e_cod_per;
    rateChartModalVariables.modalData.zone_e_ros_cod_per = temp.zone_e_cod_per_ros;
    rateChartModalVariables.modalData.zone_e_up_cod_per = temp.zone_e_cod_per_up;
    rateChartModalVariables.modalData.zone_e_up_ros_cod_per = temp.zone_e_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_e_ros_cod = temp.zone_e_cod_ros;
    rateChartModalVariables.modalData.zone_e_up_cod = temp.zone_e_cod_up;
    rateChartModalVariables.modalData.zone_e_up_ros_cod = temp.zone_e_cod_up_ros;
    rateChartModalVariables.modalData.zone_e_fwd_fsc = temp.zone_e_fsc_per;
    rateChartModalVariables.modalData.zone_e_ros_fwd_fsc = temp.zone_e_fsc_per_ros;
    rateChartModalVariables.modalData.zone_e_up_fwd_fsc = temp.zone_e_fsc_per_up;
    rateChartModalVariables.modalData.zone_e_up_ros_fwd_fsc = temp.zone_e_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_e = temp.zone_e_fwd;
    rateChartModalVariables.modalData.zone_e_fwd_add = temp.zone_e_fwd_additional;
    rateChartModalVariables.modalData.zone_e_ros_fwd_add = temp.zone_e_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_e_up_fwd_add = temp.zone_e_fwd_additional_up;
    rateChartModalVariables.modalData.zone_e_up_ros_fwd_add = temp.zone_e_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_e_ros = temp.zone_e_fwd_ros;
    rateChartModalVariables.modalData.zone_e_up = temp.zone_e_fwd_up;
    rateChartModalVariables.modalData.zone_e_up_ros = temp.zone_e_fwd_up_ros;
    rateChartModalVariables.modalData.zone_e_rto = temp.zone_e_rto;
    rateChartModalVariables.modalData.zone_e_rto_add = temp.zone_e_rto_additional;
    rateChartModalVariables.modalData.zone_e_ros_rto_add = temp.zone_e_rto_additional_ros;
    rateChartModalVariables.modalData.zone_e_up_rto_add = temp.zone_e_rto_additional_up;
    rateChartModalVariables.modalData.zone_e_up_ros_rto_add = temp.zone_e_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_e_rto_fsc = temp.zone_e_rto_fsc_per;
    rateChartModalVariables.modalData.zone_e_ros_rto_fsc = temp.zone_e_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_e_up_rto_fsc = temp.zone_e_rto_fsc_per_up;
    rateChartModalVariables.modalData.zone_e_up_ros_rto_fsc = temp.zone_e_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_e_up_ros_rto_fsc = temp.zone_e_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_e_ros_rto = temp.zone_e_rto_ros;
    rateChartModalVariables.modalData.zone_e_up_rto = temp.zone_e_rto_up;
    rateChartModalVariables.modalData.zone_e_up_ros_rto = temp.zone_e_rto_up_ros;

    rateChartModalVariables.modalData.zone_f_cod = temp.zone_f_cod;
    rateChartModalVariables.modalData.zone_f_cod_per = temp.zone_f_cod_per;
    rateChartModalVariables.modalData.zone_f_ros_cod_per = temp.zone_f_cod_per_ros;
    rateChartModalVariables.modalData.zone_f_up_cod_per = temp.zone_f_cod_per_up;
    rateChartModalVariables.modalData.zone_f_up_ros_cod_per = temp.zone_f_cod_per_up_ros;
    rateChartModalVariables.modalData.zone_f_ros_cod = temp.zone_f_cod_ros;
    rateChartModalVariables.modalData.zone_f_up_cod = temp.zone_f_cod_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_cod = temp.zone_f_cod_up_ros;
    rateChartModalVariables.modalData.zone_f_fwd_fsc = temp.zone_f_fsc_per;
    rateChartModalVariables.modalData.zone_f_ros_fwd_fsc = temp.zone_f_fsc_per_ros;
    rateChartModalVariables.modalData.zone_f_up_fwd_fsc = temp.zone_f_fsc_per_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_fwd_fsc = temp.zone_f_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_f = temp.zone_f_fwd;
    rateChartModalVariables.modalData.zone_f_fwd_add = temp.zone_f_fwd_additional;
    rateChartModalVariables.modalData.zone_f_ros_fwd_add = temp.zone_f_fwd_additional_ros;
    rateChartModalVariables.modalData.zone_f_up_fwd_add = temp.zone_f_fwd_additional_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_fwd_add = temp.zone_f_fwd_additional_up_ros;
    rateChartModalVariables.modalData.zone_f_ros = temp.zone_f_fwd_ros;
    rateChartModalVariables.modalData.zone_f_up = temp.zone_f_fwd_up;
    rateChartModalVariables.modalData.zone_f_up_ros = temp.zone_f_fwd_up_ros;
    rateChartModalVariables.modalData.zone_f_rto = temp.zone_f_rto;
    rateChartModalVariables.modalData.zone_f_rto_add = temp.zone_f_rto_additional;
    rateChartModalVariables.modalData.zone_f_ros_rto_add = temp.zone_f_rto_additional_ros;
    rateChartModalVariables.modalData.zone_f_up_rto_add = temp.zone_f_rto_additional_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_rto_add = temp.zone_f_rto_additional_up_ros;
    rateChartModalVariables.modalData.zone_f_rto_fsc = temp.zone_f_rto_fsc_per;
    rateChartModalVariables.modalData.zone_f_ros_rto_fsc = temp.zone_f_rto_fsc_per_ros;
    rateChartModalVariables.modalData.zone_f_up_rto_fsc = temp.zone_f_rto_fsc_per_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_rto_fsc = temp.zone_f_rto_fsc_per_up_ros;
    // rateChartModalVariables.modalData.zone_f_up_ros_rto_fsc = temp.zone_f_rto_fsc_per_up_ros;
    rateChartModalVariables.modalData.zone_f_ros_rto = temp.zone_f_rto_ros;
    rateChartModalVariables.modalData.zone_f_up_rto = temp.zone_f_rto_up;
    // rateChartModalVariables.modalData.zone_f_up_ros_rto = temp.zone_f_rto_up_ros;
}