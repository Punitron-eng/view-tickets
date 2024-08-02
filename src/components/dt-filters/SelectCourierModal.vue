<script setup lang="ts">
import { ref, defineProps, watch, defineEmits, computed, onMounted, onBeforeMount } from 'vue';
import * as Type from './types';
import SelectCourierModalCard from './SelectCourierModalCard.vue';
import getImg from '../../util/getImg';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
const store = useStore();
const toast = useToast();
const router = useRouter();
import { DARKMODE } from '@/store/dark-mode/constants';
import { RETURN } from '@/store/domestic/return-flow/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const pickNowData = computed(() => store.getters[`${RETURN.NAME}/getPickNowDetails`]);

const props = defineProps({
    showModal: { type: Boolean, required: true },
    skeletonData: { type: Boolean, required: true },
    rowId: { type: Boolean, required: true },
});

const emits = defineEmits(['closeModal']);

const data = ref<Array<Type.DataObject> | null>(null);
const visible = ref<boolean>(true);
const selectedFilter = ref<string>('0');
const filters = ref([
    { filterName: 'Best Rated', value: '0' },
    { filterName: 'Cheapest', value: '1' },
    { filterName: 'Fastest', value: '2' },
    { filterName: 'Custom', value: '3' },
]);
const insurancePremiumAmount = ref<number | null>(null);
const deliverTo = ref<number | null>(null);
const wareHouseData = ref<Array<Type.WarehouseObject> | []>([]);
const cardData = ref<Array<Object> | null>([1, 2, 3]);
const pickupFrom = ref<string | null>(null);
const courierFound = ref<number | null>(0);
const orderValue = ref<number | null>(null);
const height = ref<number | null>(null);
const width = ref<number | null>(null);
const length = ref<any | null>(null);
const applied_weight = ref<any | null>(null);
const volumatic_weight = ref<any | null>(0);
const isSkeletonShow = ref<boolean>(false);
const logistic_id = ref<string | null>('');
const isLoadingSubmit = ref<boolean>(false);

watch(pickNowData, () => {
    wareHouseData.value = pickNowData.value.warehouse_data_array;
    // deliverTo.value = pickNowData.value.warehouse_data_array.id;

    // deliverTo.value = wareHouseData.value.some((item) => item.id == pickNowData.value.selected_delivered_id) ? deliverTo.value : wareHouseData.value[0]?.id;
    deliverTo.value = pickNowData.value.selected_delivered_id;
    pickupFrom.value = pickNowData.value.all_shipment_details.pickup_from;
    orderValue.value = pickNowData.value.all_shipment_details.order_value;
    height.value = pickNowData.value.all_shipment_details.height;
    width.value = pickNowData.value.all_shipment_details.width;
    length.value = pickNowData.value.all_shipment_details.length;
    applied_weight.value = pickNowData.value.all_shipment_details.applied_weight;
    cardData.value = pickNowData.value.card_data;
    courierFound.value = pickNowData.value.card_data.length;
    volumatic_weight.value = ((pickNowData.value.all_shipment_details.length * pickNowData.value.all_shipment_details.width * pickNowData.value.all_shipment_details.height) / 5000).toFixed(2);
});

// wareHouseData.value = pickNowData.value.warehouse_data_array;
// // insurancePremiumAmount.value = data.value[0].insurance_premium_amount;
// // deliverTo.value = pickNowData.value.warehouse_data_array.id;
// pickupFrom.value = pickNowData.value.all_shipment_details.pickup_from;
// orderValue.value = pickNowData.value.all_shipment_details.order_value;
// height.value = pickNowData.value.all_shipment_details.height;
// width.value = pickNowData.value.all_shipment_details.width;
// length.value = pickNowData.value.all_shipment_details.length;

onMounted(() => {
    setTimeout(() => {
        data.value = [
            {
                insurance_premium_amount: 30,
                vendor_user_id: 7214,
                shipment_details: {
                    applied_weight: 0.1,
                    order_value: 42.99,
                    height: 30,
                    width: 60,
                    length: 30,
                    pickup_from: '400104, Mumbai, Maharashtra',
                },
                warehouse_data_array: [
                    {
                        id: 26671,
                        value: 'Krishna Warehouse-400067',
                    },
                    {
                        id: 27962,
                        value: 'jaipur warehouse-302033',
                    },
                    {
                        id: 28323,
                        value: 'Kandivali warehouse-400067',
                    },
                    {
                        id: 29204,
                        value: 'Surat Warehouse-395010',
                    },
                    {
                        id: 32902,
                        value: 'Navi Mumbai-400068',
                    },
                ],
                card_data: [
                    {
                        id: 1,
                        logistic: {
                            svg_logo: 'fedex-v3',
                            name: 'Fedex',
                        },
                        courier_mode: 'Surface',
                        progress: 75,
                        itl_bill_with_gst: 74.58,
                        freight_charges: 31.2,
                        cod_charge: 32,
                        logistics_rating_percentage: 78,
                        pickup_performance_rating: 80,
                        delivery_performance_rating: 90,
                        same_day_pickup: true,
                        estimated_delivery_time: '1-1 days',
                    },
                    {
                        id: 2,
                        logistic: {
                            svg_logo: 'fedex-v3',
                            name: 'Fedex',
                        },
                        courier_mode: 'Air',
                        progress: 71,
                        itl_bill_with_gst: 22.36,
                        freight_charges: 3.66,
                        cod_charge: 22,
                        logistics_rating_percentage: 76,
                        pickup_performance_rating: 92,
                        delivery_performance_rating: 96,
                        same_day_pickup: true,
                        estimated_delivery_time: '1-2 days',
                    },
                ],
            },
        ];

        // cardData.value = data.value[0].card_data;
    }, 1500);
});
const appliedWeight = async () => {
    isSkeletonShow.value = true;
    logistic_id.value = '';
    const data = {
        rowId: props.rowId,
        courierPriority: filters.value.some((item) => item.value === selectedFilter.value) ? selectedFilter.value : filters.value[0]?.value,
        tabName: 'rev_return_request',
        changeCourierPriority: 1,
        appliedWeight: applied_weight.value,
        shipLength: length.value,
        shipWidth: width.value,
        shipHeight: height.value,
        deliveredId: deliverTo.value,
    };
    await store.dispatch(`${RETURN.NAME}/getPickNowDetails`, data);
    const result = store.getters[`${RETURN.NAME}/getPickNowDetails`];
    if (result.status == 'success') {
        isSkeletonShow.value = false;
    }
};
const volumattriLwhChange = async () => {
    isSkeletonShow.value = true;
    if (length.value != null && width.value != null && height.value != null) {
        const volumaticWeight = (length.value * width.value * height.value) / 5000;
        volumatic_weight.value = volumaticWeight.toFixed(2);
    }
    const data = {
        rowId: props.rowId,
        courierPriority: filters.value.some((item) => item.value === selectedFilter.value) ? selectedFilter.value : filters.value[0]?.value,
        changeCourierPriority: 1,
        tabName: 'rev_return_request',
        appliedWeight: applied_weight.value,
        shipLength: length.value,
        shipWidth: width.value,
        shipHeight: height.value,
        deliveredId: deliverTo.value,
    };
    await store.dispatch(`${RETURN.NAME}/getPickNowDetails`, data);
    const result = store.getters[`${RETURN.NAME}/getPickNowDetails`];
    if (result.status == 'success') {
        isSkeletonShow.value = false;
    }
};
const validateInput = (name: any) => {
    if (name == 'applied_weight') {
        name = applied_weight;
    } else if (name == 'length') {
        name = length;
    } else if (name == 'width') {
        name = width;
    } else if (name == 'height') {
        name = height;
    }
    const regex = /^\d*\.?\d{0,2}$/; // Regex to match numbers with up to 2 decimal places
    if (!regex.test(name.value)) {
        // If the input doesn't match the pattern, remove invalid characters
        name.value = name.value.replace(/[^0-9.]/g, '').match(regex) || '';
    }
    if (name.value < 0) name.value = 0;
    if (name.value > 1000) name.value = '';
    var value = name.value;
    var idx = value.indexOf('.');
    if (idx >= 0) {
        if (value.length - idx > 3) {
            e.target.value = value.substring(0, value.length - 1);
            return false;
        }
    }
};
const validateAfterDegit = (input: any) => {
    if (input == 'applied_weight') {
        input = applied_weight;
    } else if (input == 'length') {
        input = length;
    } else if (input == 'width') {
        input = width;
    } else if (input == 'height') {
        input = height;
    }
    let value = input.value;
    let numbers = value.replace(/[^0-9\.]/g, '');
    input.value = numbers;
    var paste_value = input.value;
    if (parseInt(paste_value)) {
        if (paste_value.length > 3) {
            length.value = length.value.substring(0, 6);
        }
    }
};
const logisticId = async (value: any) => {
    logistic_id.value = value;
};
const pickNowSubmit = async () => {
    isLoadingSubmit.value = true;
    if (logistic_id.value == '') {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please Select Logistic', life: 1000 });
        isLoadingSubmit.value = false;
        return;
    }
    const data = {
        rowId: props.rowId,
        tabName: 'rev_return_request',
        appliedWeight: applied_weight.value,
        shipLength: length.value,
        shipWidth: width.value,
        shipHeight: height.value,
        deliveredId: deliverTo.value,
        logisticId: logistic_id.value,
    };
    await store.dispatch(`${RETURN.NAME}/getPickNowSubmit`, data);
    const result = store.getters[`${RETURN.NAME}/setPickNowSubmit`];
    if (result.status == 'success') {
        isLoadingSubmit.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: result.html_message, life: 1000 });
        // router.replace({ name: 'ReturnFlow', params: { tabs: 'rev-manifest' } });
        emits('pickcloseModal', true);
    } else {
        isLoadingSubmit.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: result.html_message, life: 1000 });
    }
};
</script>

<template>
    <DialogView
        id="select-courier-modal"
        v-model:visible="visible"
        maximizable
        modal
        :draggable="false"
        :dismissableMask="true"
        @update:visible="(e: boolean) => { !e ? $emit('closeModal', false) : '' }"
        header="Header"
        :style="{ width: '95vw' }"
        :breakpoints="{ '1199px': '75vw', '1024px': '100vw', '820px': '100vw', '575px': '100vw' }"
    >
        <template #header>
            <div class="flex items-center justify-between w-[100%]">
                <div class="flex items-center justify-start w-[60%] md:w-[25%] select-courier-modal-title ml-10 xl:ml-20">
                    <!-- <img @click="visible = false; $emit('closeModal')" :src="getImg('close-icon', darkModeVal)" class="mr-[24px] w-[24px] h-[24px]" alt="close-icon" /> -->
                    <div class="text-[18px] font-semibold">Select Courier</div>
                </div>
                <!-- <div class="hidden md:flex items-center justify-start w-[50%] pl-0 md:pl-4 xl:pl-0">
                    <img :src="getImg('ph_shield-fill', darkModeVal)" class="mr-[8px]" alt="close-icon" />
                   
                    <div class="text-[13px]">Insured shipment: <span class="font-semibold">₹{{ insurancePremiumAmount }}</span> will get deducted
                    </div>
                </div> -->
                <div class="flex items-center justify-end w-[25%]">
                    <button class="pick-now-btn" :class="isLoadingSubmit ? 'pointer-events-none' : ''" @click="pickNowSubmit()">
                        <div v-if="isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                        <div v-else>Pick Now</div>
                    </button>
                </div>
            </div>
        </template>
        <div class="m-0 flex flex-col justify-center items-center">
            <Card class="w-[100%] xl:w-[1136px] rounded-[4px]">
                <template #header>
                    <div class="flex items-center justify-start gap-4 px-[1.25rem] py-[1rem] modal-border-bottom">
                        <img :src="getImg('select-courier-modal-purple', darkModeVal)" alt="purple-icon" />
                        <div class="text[16px] font-semibold text-[#3c4249] dark:text-[#dfdfdf]">Details</div>
                    </div>
                </template>
                <template #content>
                    <div class="m-0 block md:flex items-center justify-start gap-4">
                        <div class="w-[100%] lg:w-[360px]">
                            <label class="block label mb-[4px]">Deliver To</label>
                            <!-- <input
                                class="w-full text-black text-[13px] border dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]"
                                value="40010, Maharashtra" /> -->
                            <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                            <Dropdown @change="appliedWeight()" v-else id="select-courier-modal-dropdown" filter v-model="deliverTo" :options="wareHouseData" optionLabel="value" optionValue="id" placeholder="Select a Filter" class="w-full" />
                        </div>
                        <img :src="getImg('select-courier-modal-right-arrow-btn', darkModeVal)" class="w-[32px] h-[32px] md:w-[80px] lg:w-[32px] rounded mt-4 hidden md:block rotate-icon" />
                        <div class="w-[100%] lg:w-[360px] mt-2 lg:mt-0">
                            <label class="label mb-[4px]">Pickup From</label>
                            <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                            <input v-else v-model="pickupFrom" class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]" disabled />
                        </div>
                    </div>
                    <div class="mt-[24px] block md:flex items-center justify-start gap-[5.3rem]">
                        <div class="flex items-center justify-start gap-3 lg:gap-4 w-[100%] md:w-[360px]">
                            <div class="w-[172px] md:w-[50%] lg:w-[172px]">
                                <label class="label mb-[4px]">Order Value</label>
                                <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                                <input v-else v-model="orderValue" class="w-full text-black dark:text-[#dfdfdf] text-[13px] border dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-[4px]" disabled />
                            </div>
                            <div class="w-[172px] md:w-[50%] lg:w-[172px]">
                                <label class="label mb-[4px]">Applied Weight</label>
                                <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                                <div v-else class="flex w-full text-black text-[13px]">
                                    <input
                                        @input="validateInput('applied_weight')"
                                        type="text"
                                        @blur="appliedWeight()"
                                        v-model="applied_weight"
                                        class="block w-full text-black dark:text-[#dfdfdf] text-[13px] border border-e-0 dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-s-[4px]"
                                    />
                                    <span
                                        class="px-[9px] py-[5px] inline-flex items-center min-w-fit border border-e-lg border-[#d4d6d9] bg-[#f1f3f5] dark:bg-[#212121] dark:border-[#3b3b3b] dark: text-sm text-[#808b98] dark:text-[#dfdfdf] rounded-e-[4px]"
                                        >KG</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-start gap-3 md:gap-2 lg:gap-4 w-[100%] md:w-[360px] mt-2 md:mt-0">
                            <div class="w-[172px] md:w-[33%] lg:w-[172px]">
                                <label class="label mb-[4px]">Length</label>
                                <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                                <div v-else class="flex w-full text-black dark:text-[#dfdfdf] text-[13px]">
                                    <input
                                        @input="validateInput('length'), validateAfterDegit('length')"
                                        @blur="volumattriLwhChange()"
                                        type="text"
                                        v-model="length"
                                        class="block w-full text-black dark:text-[#dfdfdf] text-[13px] border border-e-0 dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-s-[4px]"
                                    />
                                    <span class="px-[7px] py-[5px] inline-flex items-center min-w-fit border border-e-lg border-[#d4d6d9] bg-[#f1f3f5] dark:bg-[#212121] dark:border-[#3b3b3b] text-sm text-[#808b98] dark:text-[#dfdfdf] rounded-e-[4px]"
                                        >CM</span
                                    >
                                </div>
                            </div>
                            <div class="w-[172px] md:w-[33%] lg:w-[172px]">
                                <label class="label mb-[4px]">Width</label>
                                <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                                <div v-else class="flex w-full text-black dark:text-[#dfdfdf] text-[13px]">
                                    <input
                                        @input="validateInput('width'), validateAfterDegit('width')"
                                        @blur="volumattriLwhChange()"
                                        type="text"
                                        v-model="width"
                                        class="block w-full text-black dark:text-[#dfdfdf] text-[13px] border border-e-0 dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-s-[4px]"
                                    />
                                    <span class="px-[7px] py-[5px] inline-flex items-center min-w-fit border border-e-lg border-[#d4d6d9] bg-[#f1f3f5] dark:bg-[#212121] dark:border-[#3b3b3b] text-sm text-[#808b98] dark:text-[#dfdfdf] rounded-e-[4px]"
                                        >CM</span
                                    >
                                </div>
                            </div>
                            <div class="w-[172px] md:w-[33%] lg:w-[172px]">
                                <label class="label mb-[4px]">Height</label>
                                <skeletonView width="100%" height="32px" class="rounded-[4px]" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                                <div v-else class="flex w-full text-black dark:text-[#dfdfdf] text-[13px]">
                                    <input
                                        @input="validateInput('height'), validateAfterDegit('height')"
                                        @blur="volumattriLwhChange()"
                                        type="text"
                                        v-model="height"
                                        class="block w-full text-black dark:text-[#dfdfdf] text-[13px] border border-e-0 dark:border-[#5d5d5d] px-[12px] py-[6px] rounded-s-[4px]"
                                    />
                                    <span class="px-[7px] py-[5px] inline-flex items-center min-w-fit border border-e-lg border-[#d4d6d9] bg-[#f1f3f5] dark:bg-[#212121] dark:border-[#3b3b3b] text-sm text-[#808b98] dark:text-[#dfdfdf] rounded-e-[4px]"
                                        >CM</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full volumatic-weight-div mt-4">
                        <skeletonView width="200px" height="8px" class="border-radius" v-if="props.skeletonData == true || isSkeletonShow"></skeletonView>
                        <div v-else>
                            Volumetric Weight : <span>{{ volumatic_weight }} Kg</span>
                        </div>
                    </div>
                </template>
            </Card>
            <Card class="w-[100%] xl:w-[1136px] rounded-[4px] mt-[16px]">
                <template #header>
                    <div class="flex items-center justify-between modal-border-bottom px-[1.25rem] py-[1rem]">
                        <div class="flex items-center justify-start gap-4">
                            <img :src="getImg('select-courier-modal-orange', darkModeVal)" alt="purple-icon" />
                            <div class="text[16px] font-semibold text-black dark:text-[#dfdfdf]">{{ courierFound }} Couriers Found</div>
                        </div>
                        <Dropdown @change="appliedWeight()" id="select-courier-modal-dropdown" v-model="selectedFilter" :options="filters" optionLabel="filterName" optionValue="value" class="w-12rem" />
                    </div>
                </template>
                <template #content>
                    <div class="flex flex-wrap gap-4 md:gap-3 items-center justify-normal lg:justify-normal">
                        <div class="courier-modal-outer" v-for="(card, i) in cardData" :key="i">
                            <SelectCourierModalCard :cardData="card" :skeletonData="props.skeletonData" :isSkeletonShow="isSkeletonShow == true" @logistic-id="logisticId" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </DialogView>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#select-courier-modal-dropdown {
    .p-inputtext {
        padding: 4px 12px !important;
    }
    .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
        @include theme() {
            background-color: theme-get('dropdownbg');
        }
    }
}

.p-inputtext:enabled:focus {
    border-color: #d9dbdd !important;
}
.select-courier-modal-title {
    @media screen and (max-width: 1280) and (min-width: 1026) {
        margin-left: 4.5rem;
    }
}
#select-courier-modal {
    font-family: $interRegular;
    .rotate-icon {
        transform: rotate(-180deg);
    }
    .p-dialog-header-icon {
        @media screen and (max-width: 380px) {
            top: 0px !important;
        }
    }
    .courier-modal-outer {
        @media (max-width: 575px) {
            width: 100%;
        }
        @media (min-width: 768px) and (max-width: 991px) {
            width: 48%;
        }
    }

    @media screen and (max-width: 820px) {
        max-height: 100% !important;
    }

    @media screen and (min-width: 576px) and (max-width: 1025px) {
        max-height: 100vh !important;
    }

    .p-dialog-header-icons {
        position: absolute !important;
        flex-direction: row-reverse !important;
        gap: 4px !important;

        svg {
            width: 14px !important;
            height: 14px !important;

            @include theme() {
                color: #3c4249 theme-get('dropdown-hover');
            }
        }

        .p-dialog-header-icon:enabled:hover {
            background: none !important;
        }

        .p-dialog-header-icon:focus {
            box-shadow: none !important;
        }

        @media screen and (max-width: 1025px) {
            .p-dialog-header-maximize {
                display: none !important;
            }
        }
    }

    .p-dropdown {
        @include theme() {
            border: solid 1px theme-get('border-black-500') !important;
        }
        border-radius: 6px !important;
    }

    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none !important;
    }

    .p-focus {
        background: #fff !important;
    }

    .p-dialog-header {
        height: 64px !important;
        // @media screen and (max-width: 1025px) {
        //     padding: 10px !important;
        // }
    }

    .p-dialog-content {
        @include theme() {
            background: theme-get('dt-save-filter-bg') !important;
        }
        padding: 40px 40px 2rem 40px !important;

        @media screen and (max-width: 1025px) {
            padding: 10px !important;
        }
    }

    .p-card .p-card-content {
        font-family: $interRegular;
        padding: 0px !important;
    }

    .pick-now-btn {
        width: 80px;
        padding: 8px 0px;
        border-radius: 4px;
        border: solid 1px #0168ed;
        background-color: #1279ff;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.33;
        letter-spacing: normal;
    }

    .label {
        font-size: 12px;
        @include theme() {
            color: theme-get('label-clr');
        }
    }
    .volumatic-weight-div {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.23;
        letter-spacing: normal;
        text-align: left;
        @include theme() {
            color: theme-get('dt-filter-header-right-text');
        }
        font-family: $interRegular;
        span {
            @include theme() {
                color: theme-get('black-700');
            }
        }
    }
    .modal-border-bottom {
        @include theme() {
            border-bottom: 1px solid theme-get('modal-border-bottom');
        }
    }

    // input[type="text"]:disabled {
    //     background: #dfe3e6;
    // }
    .courier-disable-strip {
        @include theme() {
            background: theme-get('dt-input-search-bg');
            color: theme-get('input-placeholder');
        }
    }
}
.darkTheme #select-courier-modal .p-card {
    background: #3d3d3d;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.darkTheme #select-courier-modal .p-card .p-card-body {
    background: #313131;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.darkTheme .activeCard {
    border-color: #1279ff;
}
.darkTheme #select-courier-modal .p-focus {
    background: transparent !important;
}
.darkTheme #select-courier-modal .p-dropdown .p-dropdown-trigger {
    background: #3d3d3d;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon {
    background: url('../../assets/images/dark-store-order-search.svg');
    width: 16px;
    height: 16px;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon g {
    display: none;
}
</style>
