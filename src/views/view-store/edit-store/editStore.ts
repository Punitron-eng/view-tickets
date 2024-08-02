import { ref } from "vue"

export interface VariablesType {
    showMoreHandler: boolean,
    partialPaymentToggle: boolean,
    ivrToggle: boolean,
    pullOrderStatusToggle: boolean,
    pushOrderStatusToggle: boolean,
    mapPaymentStatusToggle: boolean,
    pushPaidStatusChannelToggle: boolean,
    pullCancelOrderToggle: boolean,
    fetchSelfFullfilledOrdersToggle: boolean,
    all_amazon_sub_platform_id_array: Array<number>,
    paymentGatewayDropdownOptions: Array<{id: number, value: string}>,
    partialPaymentModeDropdownOptions: Array<{id: number, value: string}>,
    readyToShipDropdownOptions: Array<{id: number, value: string}>,
    cancelledDropdownOptions: Array<{id: number, value: string}>,
    platformIdFromState: number | null,
    stepCount: number,
    data: any
}

export const variables = ref<VariablesType>({
    showMoreHandler: false,
    partialPaymentToggle: false,
    ivrToggle: false,
    pullOrderStatusToggle: false,
    pushOrderStatusToggle: false,
    mapPaymentStatusToggle: false,
    pushPaidStatusChannelToggle: false,
    pullCancelOrderToggle: false,
    fetchSelfFullfilledOrdersToggle: false,
    all_amazon_sub_platform_id_array: [7,23,24,25,26,27,28,29,30,31],
    paymentGatewayDropdownOptions: [{ id: 0, value: 'N/A' }, { id: 1, value: 'Razorpay' }, { id: 2, value: 'Cashfree' }],
    partialPaymentModeDropdownOptions: [{ id: 0, value: 'N/A' }, { id: 1, value: 'Flat' }, { id: 2, value: 'Percent' }],
    readyToShipDropdownOptions: [{ id: 0, value: 'N/A' }, { id: 1, value: 'Fulfilled' }],
    cancelledDropdownOptions: [{ id: 0, value: 'N/A' }, { id: 1, value: 'Cancelled' }],
    platformIdFromState: null,
    stepCount: 1,
    data: []
})
