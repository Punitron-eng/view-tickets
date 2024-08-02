import { ref, computed } from "vue"

export interface VariablesType {
    search: string;
    conn_confirm_ivr_toggle: boolean;
    conn_partial_payment_toggle: boolean;
    unicommerce_toggle: boolean;
    push_cancel_update_toggle: boolean;
    prepaid_toggle: boolean;
    cod_toggle: boolean;
}

export const variables = ref<VariablesType>({
    search: '',
    conn_confirm_ivr_toggle: true,
    conn_partial_payment_toggle: true,
    unicommerce_toggle: true,
    push_cancel_update_toggle: true,
    prepaid_toggle: true,
    cod_toggle: true,
})
