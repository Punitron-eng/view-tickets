<script setup>
import { defineProps, ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex'
import { useToast } from "primevue/usetoast";
import config from '../../../util/config';
import getImg from '../../../util/getImg';
import { RATECHART } from '../../../store/rate-chart/constants';
import { DARKMODE } from '../../../store/dark-mode/constants';
import ConfirmationModal from '../../rateChartTable/confirmationModal/ConfirmationModal.vue';
import { checkAccessRight, deepCheckAccessRight } from '../../../util/commonHandlers';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const store = useStore();
const toast = useToast();
const props = defineProps(['headingTitle', 'makeBandNullOnVModel'])
const emit = defineEmits(['showRateChartModal', 'callServiceType'])

const band = ref(null);
const vendorCodes = ref(null);
const isLoading = ref(false);
const showConfirmationModal = ref({
    type: '',
    value: false
});
const prevoiusBand = ref();

const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const domesticInternational = ref({ name: 'Domestic' })
const domesticInternationalOptions = reactive([{ name: 'Domestic' }, { name: 'International' }])

const bandOptions = computed(() => store.getters[`${RATECHART.NAME}/getBandOptions`])
const getVendor = computed(() => store.getters[`${RATECHART.NAME}/getVendor`])
const getBand = computed(() => store.getters[`${RATECHART.NAME}/getBand`])
const getTabType = computed(() => store.getters[`${RATECHART.NAME}/getTabType`])
const getDeliveryType = computed(() => store.getters[`${RATECHART.NAME}/getDeliveryType`])
const getActiveLogistics = computed(() => store.getters[`${RATECHART.NAME}/getActiveLogistics`])


const addCss = () => {
    setTimeout(() => {
        const elem = document.getElementsByClassName('p-dialog-mask')
        elem[0].style.overflowY = 'auto';
    }, 50)
}

const setDeliveryType = (e) => {
    if (domesticInternational.value.name == 'International') {
        window.open(`${config.baseUrlPanel}account-setting/12/${getVendor.value.id ? getVendor.value.id : '9'}/1`);
        e.preventDefault();
    } else {
        store.dispatch(`${RATECHART.NAME}/setDeliveryType`, '0');
    }
}

const setBand = async () => {
    prevoiusBand.value = band.value;
    const tempBand = bandOptions.value.filter((val) => {
        return val.value == band.value
    })
    store.dispatch(`${RATECHART.NAME}/setBand`, ...tempBand);
    await store.dispatch(`${RATECHART.NAME}/fetchData`, {
        vendor_id: getVendor.value.id,
        tab_type: getTabType.value,
        band_id: getBand.value.id,
        delivery_type: getDeliveryType.value
    });
    emit('callServiceType');
}


const showBandChangeConfirmation = () => {
    showConfirmationModal.value.type = 'CHANGEBANDTYPE';
    showConfirmationModal.value.value = true;
}

const addRateModalFn = async () => {
    document.body.classList.add('edit-modal-open');
    if (getVendor.value.id) {
        await store.dispatch(`${RATECHART.NAME}/fetchModalData`, { tab_type: getTabType.value, edit_id: '0', vendor_id: getVendor.value.id, delivery_type: 0 });
        emit('showRateChartModal', 'new');
        addCss();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Vendor', life: 3000 });
    }
}

const sendMail = async () => {
    showConfirmationModal.value.type = 'SENDEMAIL';
    showConfirmationModal.value.value = true;
}

const copyVendorsInputHandler = async () => {
    if (validateVendorIDS()) {
        showConfirmationModal.value.type = 'COPYVENDORCODES';
        showConfirmationModal.value.value = true;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: "Only 20 Vendor Code's should be comma seperated and with no space.", life: 3000 });
    }
}

const validateVendorIDS = () => {
    if (!vendorCodes.value) {
        return false;
    }
    const values = vendorCodes.value.split(',');
    if (vendorCodes.value.startsWith(',') || vendorCodes.value.endsWith(',')) {
        return false;
    }
    if (values.length > 20) {
        return false;
    }
    const pattern = /^[a-zA-Z0-9]+$/;
    for (let value of values) {
        if (!pattern.test(value.trim())) {
            return false;
        }
    }

    return true;
}


const validateVendorInput = (event) => {
    const input = event.target.value;
    const validInput = input.replace(/[^a-zA-Z0-9,]/g, '');
    vendorCodes.value = validInput;
}

const closeConfirmationModal = (e) => {
    showConfirmationModal.value.type = '';
    showConfirmationModal.value.value = false;
    band.value = prevoiusBand.value;
    if(e == 'COPYCODES') vendorCodes.value = null;
}

watch(() => props.makeBandNullOnVModel, () => {
    band.value = getBand.value.value;
    prevoiusBand.value = band.value;
})

watch(() => getBand.value, () => {
    if(getBand.value){
        band.value = getBand.value.value;
    } else {
        store.dispatch(`${RATECHART.NAME}/setBand`, { id: '', value: 'Select Band (%)' });
        band.value = "Select Band (%)";
    }
    prevoiusBand.value = band.value;
})

watch(() => getBand.value, () => {
    vendorCodes.value = null;
})
</script>

<template>
    <div class="rc-page-header">
        <div class="page-header">
            <div class="heading-section">
                <div class="heading-title md:flex items-center gap-2">{{ props.headingTitle }}
                <span class="text-[12px] text-[#0052cc] items-center hover:cursor-pointer">
                <a href="https://knowledgebase.ithinklogistics.com/knowledgebase/articles/where-can-you-check-the-rate-chart-for-the-logistics
                " target="_blank" class="md:flex items-center gap-2">
                 <img :src="getImg('knowledge-base', darkModeVal)" />
                 <span class=" !text-[#0052cc] dark:!text-[#78C7FF]">Learn
                  More</span></a>
                </span>
            </div>
               
                <div v-show="topHeader.user_type != 3" class="select-vendor-text-icon">
                    <span class="pr-2">({{ getVendor.value ? getVendor.value : 'Select Vendor' }})</span>
                    <img v-if="darkModeVal != true" @click="$emit('showVendorModal')" class="showModalIcon"
                        src="../../../assets/images/vendor-select-icon.svg" alt="close-icon" />
                    <img v-else @click="$emit('showVendorModal')" class="showModalIcon"
                        src="../../../assets/images/dark-mode/dark-vendor-select-icon.svg" alt="close-icon" />
                </div>
            </div>
            <div class="actions-section">
                <div v-if="topHeader.user_type != 3">
                    <input
                        v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_copy_rates_rate_chart_v3') && getVendor.value"
                        v-show="false" @keyup.enter="copyVendorsInputHandler()" @input="validateVendorInput"
                        v-model.trim="vendorCodes" type="text" placeholder="Enter Vendor Code's , Separated"
                        class="hidden md:block h-[32px] w-[245px] mr-3 rounded-full p-3 bg-[#fff] dark:bg-[#212121] border-[#DDDEE1] border dark:border-[#41464E] placeholder-[#9099A5] dark:placeholder-[#dfdfdf]" />
                </div>
                <Dropdown id="rc-dropdown-1" v-show="(topHeader.user_type != 3) && getVendor.value" @change="showBandChangeConfirmation()"
                    v-model="band" :options="bandOptions" optionLabel="value" optionValue="value"
                    placeholder="Select Band (%)" class="mr-3 sb-dropdown">
                    <template #option="slotProps">
                        <div class="dropdown-panel-options-parent">
                            <div>{{ slotProps.option.value }}</div>

                            <img v-if="!darkModeVal" v-show="band == slotProps.option.value" class="check-sign"
                                src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                            <img v-else v-show="band == slotProps.option.value" class="check-sign"
                                src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                        </div>
                    </template>
                </Dropdown>

                <div v-if="topHeader.user_type != 3">
                    <button
                        v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_send_email_rate_chart_v3')"
                        v-show="topHeader.user_type != 3 && getVendor.value" @click="sendMail()"
                        class="send-mail-btn bg-[#fff] dark:bg-[#212121] text-[#808b98] dark:text-[#fff] border-[#DDDEE1] border dark:border-[#41464E] mr-3"
                        :class="isLoading ? 'pointer-events-none' : ''">
                        <div class="flex items-center justify-center" v-if="isLoading">
                            <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
                        </div>
                        <div v-else>Send Email</div>
                    </button>
                </div>
                <Dropdown id="rc-dropdown-2" @change="setDeliveryType($event)" v-model="domesticInternational"
                    :options="domesticInternationalOptions" optionLabel="name" placeholder="Domestic"
                    class="mr-3 di-dropdown">
                    <template #option="slotProps">
                        <div class="dropdown-panel-options-parent">
                            <div>{{ slotProps.option.name }}</div>
                            <img v-if="!darkModeVal" v-show="domesticInternational.name == slotProps.option.name"
                                class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                            <img v-else v-show="domesticInternational.name == slotProps.option.name" class="check-sign"
                                src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                        </div>
                    </template>
                </Dropdown>
                <button
                    v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_add_rate_chart_v3')"
                    v-show="topHeader.user_type != 3" @click="addRateModalFn()" class="add-rate-btn">Add Rate</button>
            </div>
        </div>

        <div class="page-header-responsive">
            <div class="heading-section">
                <div class="heading-section">
                    <div class="heading-title flex items-center gap-2 md:gap-2">{{ props.headingTitle }}
                        <span class="md:ml-3 flex gap-[5px] text-[12px] text-[#0052cc] items-center hover:cursor-pointer">
                            <a href="https://knowledgebase.ithinklogistics.com/knowledgebase/articles/where-can-you-check-the-rate-chart-for-the-logistics
                            " target="_blank" class="md:flex items-center gap-2">
                             <img :src="getImg('weight-discrepancy-knowledge-base', darkModeVal)" />
                             <span class="hidden md:flex !text-[#0052cc] dark:!text-[#78C7FF]">Learn
                              More</span></a>
                            </span>
                    </div>
                    <div v-show="topHeader.user_type != 3"
                        class="select-vendor-text-icon select-vendor-text-icon-responsive-tablet">
                        <span class="pr-2">({{ getVendor.value ? getVendor.value : 'Select Vendor' }})</span>
                        <!-- <img @click="$emit('showVendorModal')" class="showModalIcon"
                            src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/vendor_v3.svg"> -->
                        <img v-if="darkModeVal != true" @click="$emit('showVendorModal')" class="showModalIcon"
                            src="../../../assets/images/vendor-select-icon.svg" alt="close-icon" />
                        <img v-else @click="$emit('showVendorModal')" class="showModalIcon"
                            src="../../../assets/images/dark-mode/dark-vendor-select-icon.svg" alt="close-icon" />
                    </div>
                </div>
                <div class="actions-section">
                    <div v-if="topHeader.user_type != 3">
                        <input
                            v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_copy_rates_rate_chart_v3') && getVendor.value"
                            @keyup.enter="copyVendorsInputHandler()" @input="validateVendorInput"
                            v-model.trim="vendorCodes" type="text" placeholder="Enter Vendor Code's , Separated"
                            class="hidden lg:block h-[32px] w-[160px] mr-3 rounded-full p-3 bg-[#fff] dark:bg-[#212121] border-[#DDDEE1] border dark:border-[#41464E]  placeholder-[#9099A5] dark:placeholder-[#dfdfdf]" />
                    </div>
                    <div v-if="topHeader.user_type != 3">
                        <button
                            v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_send_email_rate_chart_v3')"
                            v-show="topHeader.user_type != 3 && getVendor.value" @click="sendMail()"
                            class="hidden lg:block send-mail-btn bg-[#fff] dark:bg-[#212121] text-[#808b98] dark:text-[#fff] border-[#DDDEE1] border dark:border-[#41464E] mr-2"
                            :class="isLoading ? 'pointer-events-none' : ''">
                            <div class="flex items-center justify-center" v-if="isLoading">
                                <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
                            </div>
                            <div v-else>Send Email</div>
                        </button>
                    </div>
                    <Dropdown id="rc-dropdown-3" @change="setDeliveryType($event)" v-model="domesticInternational"
                        :options="domesticInternationalOptions" optionLabel="name" placeholder="Domestic"
                        class="mr-3 di-dropdown">
                        <template #option="slotProps">
                            <div class="dropdown-panel-options-parent">
                                <div>{{ slotProps.option.name }}</div>

                                <img v-if="!darkModeVal" v-show="domesticInternational.name == slotProps.option.name"
                                    class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                <img v-else v-show="domesticInternational.name == slotProps.option.name"
                                    class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg"
                                    alt="Check Sign">
                            </div>
                        </template>
                    </Dropdown>
                    <button
                        v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_add_rate_chart_v3')"
                        v-show="topHeader.user_type != 3" @click="addRateModalFn()" class="add-rate-btn">Add
                        Rate</button>
                </div>
            </div>
        </div>

        <div v-show="topHeader.user_type != 3" class="select-vendor-text-icon select-vendor-text-icon-responsive">
            <span class="pr-2">({{ getVendor.value ? getVendor.value : 'Select Vendor' }})</span>
            <img v-if="darkModeVal != true" @click="$emit('showVendorModal')" class="showModalIcon"
                src="../../../assets/images/vendor-select-icon.svg" alt="close-icon" />
            <img v-else @click="$emit('showVendorModal')" class="showModalIcon"
                src="../../../assets/images/dark-mode/dark-vendor-select-icon.svg" alt="close-icon" />
        </div>
    </div>

    <ConfirmationModal @closeConfirmationModal="(e) => closeConfirmationModal(e)"
        :showConfirmationModal="showConfirmationModal" :vendorCodes="vendorCodes" @confirmBandChange="setBand()" />
    <ToastView />
</template>

<style>
@import './Header.scss';
</style>