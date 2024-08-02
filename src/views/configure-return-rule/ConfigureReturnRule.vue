<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUnmount, computed, toRefs, watch } from 'vue';
import { useToast } from "primevue/usetoast";
import getImg from '../../util/getImg';
import config from '../../util/config.js';
import { checkAccessRight, deepCheckAccessRight, checkUserType } from '../../util/commonHandlers.js';
import { apiHandlerWithFormData } from '../../api/common/api'
import BaseToggle from '../../components/base/BaseToggle.vue'
import BaseFileUpload from '../../components/base/BaseFileUpload.vue'
import BaseCheckBox from '../../components/base/BaseCheckBox.vue'
import BaseSubmitButton from '../../components/base/BaseSubmitButton.vue';
import BaseDropdown from '../../components/base/BaseDropdown.vue';
import VendorModal from '../../components/common-modal-files/VendorModal.vue';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useStore } from 'vuex';
import * as Types from './types';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const topHeader = ref<Types.TopHeaderValues>(JSON.parse(localStorage.getItem('top_header') || ''));
const trackingPageStatus = ref<boolean>(false);
const file = ref<File | null>(null);
const returnProductDays = ref<number | null>(null);
const returnReasons = ref<Types.ReturnReasons | null>(null);
const channelValue = ref<Types.ChannelValue | null>(null)
const channelDropdownOptions = ref<Array<{ id: number, value: string } | null>>([]);
const storeValue = ref<Types.StoreValue | null>(null);
const storeDropdownOptions = ref<Array<{ id: number, value: string }>>([]);
const downloadExistingSKUFileUrl = ref<string | null>(null);
const vendorData = ref<Types.VendorData>({
    id: null,
    name: null
});
const isVendorModalVisible = ref<boolean>(false);
const buttonLoading = ref<boolean>(false);
const fileUploadComponent = ref<any>(null);

onBeforeMount(async () => {
    document.body.classList.add('configure-return-rule-parent');
})

onMounted(async () => {
    checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'configure_return_rule', 'view_configure_return_rule_v3') ? true : window.location.href = config.baseUrlPanel + 'logout';
    if (topHeader.value.user_type == 3) {
        await fetchChannels();
    }
})

onBeforeUnmount(() => {
    document.body.classList.remove('configure-return-rule-parent');
})

const isNumber = (event: any) => {
    const keyPressed = event.key;
    if (keyPressed === 'Backspace') return;
    if (keyPressed === '0' && (event.target.value === '' || event.target.value === '0')) {
        event.preventDefault();
        return;
    }
    if (isNaN(Number(keyPressed))) event.preventDefault();
}

const setVendor = async (vendor: Array<string>) => {
    resetValues();

    if (vendorData.value) {
        let extractedVendor = vendor[0].split(',');
        vendorData.value.id = Number(extractedVendor[1]);
        vendorData.value.name = extractedVendor[0];

        isVendorModalVisible.value = false;
        await fetchChannels();
        // await fetchData();
    }
}

const resetVendor = () => {
    window.location.reload();
}

const applyCheckBoxes = (val: Types.Reason) => {
    const temp = returnReasons.value?.map((reason: Types.Reason, i: number) => {
        if (val.id === reason.id) {
            reason.is_checked = val.is_checked;
        }
        return reason;
    })
    if (temp) {
        returnReasons.value = temp;
    }
}

const submitData = async () => {
    const return_reason_list = returnReasons.value?.filter((reason) => reason.is_checked).map((reason) => reason.id)

    if (validateForm()) {
        buttonLoading.value = true;

        const url = `post-ship-v3/submit-configure-return-rule.json`
        let payload = {
            // vendor_id: vendorData.value.id,
            enable_return_tracking_page: trackingPageStatus.value,
            platform_id: channelValue.value ? channelValue.value.id : '',
            store_id: storeValue.value ? storeValue.value.id : '',
            // sku_list_file: fileInfo?.value?.fileRemoteName ? fileInfo.value.fileRemoteName : '',
            return_product_days: returnProductDays.value,
            return_reason_list: JSON.stringify(return_reason_list),
        };
        if (topHeader.value.user_type != 3) {
            payload['vendor_id'] = vendorData.value.id;
        }

        const res: any = await apiHandlerWithFormData(url, payload);

        if (res.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 3000 });
            fetchData();
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
        }

        buttonLoading.value = false;
    }
}

const validateForm = (): boolean => {
    if (topHeader.value.user_type != 3) {
        if (!vendorData.value.id || !vendorData.value.name) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Vendor', life: 3000 });
            return false;
        }
    }
    if (channelValue.value?.id != 16 && channelValue.value?.id != 0) {
        if (!storeValue.value?.id) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Atleast one store should be selected', life: 3000 });
            return false;
        }
    }
    // if (!channelValue.value) {
    // toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Channel', life: 3000 });
    // return false;
    // }
    // if (!storeValue.value) {
    // toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Store', life: 3000 });
    // return false;
    // }
    // if (!fileInfo.value) {
    // toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Upload File', life: 3000 });
    // return false;
    // }
    if (!returnProductDays.value) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Return Product Days', life: 3000 });
        return false;
    }
    if (returnReasons.value) {
        const temp = returnReasons.value.filter((reason: Types.Reason) => {
            return reason.is_checked;
        })
        if (temp.length < 4) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select atleast 3 Return Reasons', life: 3000 });
            return false;
        }
    }

    return true;
}

const fetchChannels = async () => {
    let payload = {
        module: 1,
    }
    if (topHeader.value.user_type != 3) {
        payload['vendor_id'] = vendorData.value.id;
    }
    const res: any = await apiHandlerWithFormData('common_module_v3/get-user-platform-list-v3.php', payload)
    if (res.status == 'success') {
        channelDropdownOptions.value = res.data;
        channelValue.value = channelDropdownOptions.value[0];
    } else {
        // alert(toast)
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    }

}

const fetchStores = async () => {
    let payload = {
        platform_id: channelValue.value?.id,
    }
    if (topHeader.value.user_type != 3) {
        payload['vendor_id'] = vendorData.value.id;
    }
    const res: any = await apiHandlerWithFormData('common_module_v3/get-user-store-list-v3.php', payload)
    if (res.status == 'success') {
        storeDropdownOptions.value = res.data;
        storeValue.value = storeDropdownOptions.value[0]
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    }

}

const fetchData = async () => {
    returnReasons.value = null;

    let payload = {
        store_id: storeValue.value?.id || '',
        platform_id: channelValue.value?.id || '',
    }
    if (topHeader.value.user_type != 3) {
        payload['vendor_id'] = vendorData.value.id;
    }
    const res: any = await apiHandlerWithFormData('post-ship-v3/get-configure-return-rule.json', payload)
    if (res.status == 'success') {
        returnReasons.value = res.return_reason_list;
        trackingPageStatus.value = res.enable_return_tracking_page ? res.enable_return_tracking_page : false;
        downloadExistingSKUFileUrl.value = res.existing_sku_list;
        returnProductDays.value = res.return_product_in_days;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    }
}

const listenFileUploadChange = async (val: File) => {
    const payload = {
        file: val,
        process_type: 170,
        store_id: storeValue.value?.id || '',
        platform_id: channelValue.value?.id || '',
    }
    if (topHeader.value.user_type != 3) {
        payload['vendor_id'] = vendorData.value.id;
    }

    const res: any = await apiHandlerWithFormData('common-module-v3/bg-process-import-submit-v3.json', payload)

    if (res.status == 'error') {
        if (fileUploadComponent.value) {
            fileUploadComponent.value.clearFile();
        }
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    } else {
        file.value = val;
        setTimeout(async () => {
            await fetchData();
        }, 2000);
        window.open(`${config.baseUrlPanel}view-bg-process-v3`, '_blank')
        // window.location.href = 'https://my.ithinklogistics.net/view-bg-process-v3'
    }
}

watch(channelValue, async () => {
    if (fileUploadComponent.value) fileUploadComponent.value.clearFile();
    storeDropdownOptions.value = [];
    storeValue.value = null;
    if (channelValue.value?.id) {
        if (channelValue.value.id == 16 || channelValue.value.id == 0) await fetchData();
        else await fetchStores();
    }
});

watch(storeValue, async () => {
    if (fileUploadComponent.value) fileUploadComponent.value.clearFile();
    if (storeValue.value?.id) await fetchData();
});

watch(isVendorModalVisible, () => {
    if (isVendorModalVisible.value) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = '';
});

const resetValues = () => {
    vendorData.value.id = null;
    vendorData.value.name = null;
    returnReasons.value = null;
    channelValue.value = null;
    storeValue.value = null;
    channelDropdownOptions.value = [];
    storeDropdownOptions.value = [];
    if (fileUploadComponent.value) fileUploadComponent.value.clearFile();
}

const vendorModalVisibility = () => {
    isVendorModalVisible.value = !isVendorModalVisible.value;
    document.body.style.overflow = '';
}
</script>

<template>
    <div class="configure-return-rule min-h-[86vh] m-0 xl:mx-auto xl:max-w-[944px] pt-[0px] xl:pt-[12px]">
        <div class="block lg:flex items-center justify-between mb-3">
            <div class="block md:flex items-center justify-between gap-2">
                <h4 class="text-[#253858] dark:text-[#dfdfdf] heading text-[16px] md:text-[20px] m-0 ">Configure Return
                    Rule
                </h4>
                <div v-if="topHeader.user_type != 3"
                    class="text-[12px] md:text-[14px] m-0 flex items-center justify-between gap-0 md:gap-2 mt-2 md:mt-0">
                    <span>({{ vendorData.id ? vendorData.name : 'Select Vendor' }})</span>
                    <img @click="vendorModalVisibility" :src="getImg('vendor-select-icon', darkModeVal)"
                        alt="select vendor" class="cursor-pointer" />
                </div>
            </div>
            <div class="flex items-center justify-between gap-2 mt-3 lg:mt-0"
                v-if="(checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'configure_return_rule', 'is_enable_return_v3') && ((!checkUserType('vendor') && vendorData.id) || checkUserType('vendor')))">
                <span class="text-[#344563] dark:text-[#dfdfdf] text-[14px]">Enable Return on Tracking Page</span>
                <BaseToggle :value="trackingPageStatus"
                    @listenToggleChange="(val: boolean) => trackingPageStatus = val" />
            </div>
        </div>
        <div v-if="((!checkUserType('vendor') && vendorData.id) || checkUserType('vendor'))">
            <div class="flex items-center justify-start gap-2 mb-2">
                <BaseDropdown class="w-[50%]" @listenDropdownChange="(val) => channelValue = val"
                    :options="channelDropdownOptions" :defaultValue="channelValue && channelValue.id"
                    placeholder="Select Channel" />
                <BaseDropdown class="w-[50%]" v-show="channelValue && (channelValue.id != 16 && channelValue.id != 0)"
                    @listenDropdownChange="(val) => storeValue = val" :options="storeDropdownOptions"
                    :default-value="storeValue && storeValue.id" placeholder="Select Store" />
            </div>
            <div class="main-content text-[#000] dark:text-[#dfdfdf]">
                <Card id="card" class="mb-3 py-2 px-2 md:px-10 bg-[#fff] dark:bg-[#3D3D3D]">
                    <template #content>
                        <div class="mb-4"
                            v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'configure_return_rule', 'import_configure_return_rule_v3')">
                            <div :class="{ 'file-uploader': downloadExistingSKUFileUrl }" class=" max-h-52 h-52">
                                <div class=" flex items-center justify-between w-[auto] md:w-[480px]">
                                    <p class="heading-labels font-medium mb-2 text-[#344563] dark:text-[#dfdfdf]">Upload
                                        Non-Returnable SKU list<span class="text-[red] ml-[2px]">*</span></p>
                                    <a href="https://itl-uploads.s3.ap-south-1.amazonaws.com/uploads/postship/Non_returnable_sample_file.csv"
                                        class="flex items-center justify-end gap-2 cursor-pointer">
                                        <p class="download-text text-[12px] text-[#1279ff] m-0">Download Sample</p>
                                        <img src="../../assets/images/arrow-down-circle.svg" alt="Down Arrow"
                                            class="m-0" />
                                    </a>
                                </div>
                                <BaseFileUpload fileID="file-upload"
                                    twClasses="w-[auto] md:w-[480px] h-44 rounded-xl border-2 dark:border-[#5d5d5d] border-dashed"
                                    ref="fileUploadComponent" file-type="CSV"
                                    @listenFileUploadChange="(val: File) => listenFileUploadChange(val)"
                                    @clearFile="(val: null) => file = val" />
                            </div>

                            <div :class="downloadExistingSKUFileUrl ? '' : 'cursor-not-allowed'">
                                <a :href="downloadExistingSKUFileUrl ? downloadExistingSKUFileUrl : ''"
                                    class="w-[auto] md:w-[480px] flex items-center justify-start gap-2 mt-2 "
                                    :class="downloadExistingSKUFileUrl ? '' : 'pointer-events-none'">
                                    <img src="../../assets/images/arrow-down-circle.svg" alt="Down Arrow" class="m-0" />
                                    <p class="text-[12px] text-[#1279ff] m-0">Download non-returnable SKU List</p>
                                </a>
                            </div>
                            <div
                                class="text-[11px] text-[#4c545d] w-[auto] md:w-[480px] h-auto md:h-[44px] px-3 py-2 bg-[#eaf3ff] rounded-[6px] my-2">
                                <p class="m-0">The previous SKU will be replaced as per the new file uploaded.</p>
                                <p class="m-0">Kindly add all SKU's that you need in the upload file</p>
                            </div>
                        </div>

                        <div class="mb-4">
                            <p class="heading-labels font-medium m-auto mb-2 text-[#344563] dark:text-[#dfdfdf]">Return
                                Product
                                in Days<span class="text-[red] ml-[2px]">*</span></p>
                            <input v-model="returnProductDays" type="number"
                                class="border dark:border-[#5d5d5d] rounded-[4px] w-[100%] md:w-[480px] py-1 px-2 text-black dark:text-[#fff] bg-[transparent]"
                                @keydown="isNumber($event)" />
                        </div>
                        <div class="mb-4" v-if="returnReasons">
                            <div class="flex items-baseline justify-start w-[auto] md:w-[480px]">
                                <p class="heading-labels font-medium mb-3 text-[#000] dark:text-[#dfdfdf]">Configure
                                    Return
                                    Reasons<span class="text-[red] ml-[2px]">*</span></p>
                                <i class="pi pi-exclamation-circle px-2"
                                    v-tooltip.right="{ value: 'Select atleast 3 reasons', pt: { text: 'bg-gray-900 font-medium' } }"
                                    severity="secondary" label="Button"></i>
                            </div>
                            <!-- <SkeletonView v-if="!returnReasons" width="70%" height="8rem"></SkeletonView> -->
                            <div class="w-[auto] flex gap-2 flex-wrap ml-1">
                                <div v-for="(reason, i) in returnReasons"
                                    class="w-[100%] md:w-[40%] lg:w-[30%] mb-2 md:mb-0">
                                    <BaseCheckBox :data="reason" :disabled="reason.value == 'Other' ? true : false"
                                        @listenCheckboxChange="(val: Types.Reason) => applyCheckBoxes(val)" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
                <div class="flex justify-end"
                    v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'configure_return_rule', 'edit_configure_return_rule_v3')">
                    <BaseSubmitButton @click="submitData" :isLoading="buttonLoading" tw-classes="w-[90px]"
                        text="Save" />
                </div>
            </div>
        </div>
        <div v-else class="main-content text-[#000] dark:text-[#dfdfdf] mt-5">
            <Card id="card" class="h-[70vh] md:h-[78vh] mb-3 py-2 px-2 md:px-10 bg-[#fff] dark:bg-[#3D3D3D]">
                <template #content>
                    <div class="flex items-center justify-center h-[70vh]">
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" />
                            <div class="head">No Records Found</div>
                        </div>
                    </div>

                </template>
            </Card>
        </div>
    </div>
    <VendorModal v-if="topHeader.user_type != 3" v-show="isVendorModalVisible" @close-modal="vendorModalVisibility"
        @applyVendor="(vendor) => setVendor(vendor)" @resetVendor="resetVendor">
    </VendorModal>
    <ToastView />
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';


@media only screen and (min-width: 376px) and (max-width: 398px) {
    .file-uploader {
        margin-bottom: 8px;
    }

    .heading-labels {
        font-size: 10px !important;
    }

    .download-text {
        font-size: 10px;
    }
}

@media only screen and (min-width: 350px) and (max-width: 375px) {
    .file-uploader {
        margin-bottom: 8px;
    }

    .heading-labels {
        font-size: 10px !important;
    }

    .download-text {
        font-size: 10px;
    }
}

.configure-return-rule-parent.darkTheme {
    .p-dropdown {
        background: #3D3D3D !important;
    }
}

.configure-return-rule-parent {
    font-family: $interRegular;

    .base-dropdown-label {
        line-height: 18px;
    }

    .modal-footer .filter-button-apply {
        padding: 6px 28px 8px 28px;
    }

    .modal-overlay {
        overflow-y: hidden;
    }

    .p-dropdown-items-wrapper,
    #baseDropdown {
        @media screen and (max-width: 376px) {
            width: 12rem !important;
        }

        @media screen and (min-width: 377px) and (max-width: 392px) {
            width: 12.6rem !important;
        }

        @media screen and (min-width: 393px) and (max-width: 420px) {
            width: 13.3rem !important;
        }
    }


    .check-sign {
        margin-right: 12px;
    }

    .checkbox-custom-outer .input-before::after {
        top: -7px;
    }

    // #card.p-card {
    // @include theme() {
    // background: theme-get('background') !important;
    // }
    // }

    .p-dropdown-panel {
        z-index: 98 !important;
    }

    .p-dropdown-panel .p-dropdown-items {
        padding: 0 !important;
    }

    .pi {
        font-size: 12px;
    }

    .p-tooltip.p-tooltip-right .p-tooltip-arrow {
        border-right-color: #0c0c0d;
    }

    .p-tooltip.p-tooltip-bottom .p-tooltip-arrow {
        border-bottom-color: $primaryFontColor;
    }

    .p-tooltip .p-tooltip-text {
        padding: 3px 10px 5px 10px;
        font-size: 12px;
        border-radius: 4px;
    }

    .heading {
        font-family: $poppinsSemiBoldFont;
    }

    .heading-labels {
        font-size: 14px;

        @media screen and (max-width: 381px) {
            font-size: 10px;
        }

        @media screen and (min-width: 380px) and (max-width: 520px) {
            font-size: 12px;
        }

        // color: #344563;
    }

    .p-card .p-card-content {
        font-family: $interMedium;
        padding: 0 !important;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    // input[type=number] {
    // -moz-appearance: textfield;
    // }

    // input[type=checkbox] {
    // width: 16px;
    // height: 16px;
    // }
}
</style>