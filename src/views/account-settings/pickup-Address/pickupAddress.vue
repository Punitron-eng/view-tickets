<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
const topHeader = JSON.parse(localStorage.getItem('top_header')) || {};
import { DARKMODE } from '../../../store/dark-mode/constants';
import { dummyData } from './pickupAddress.ts';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
import { useStore } from 'vuex';
const store = useStore();
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};
import addNewInput from './addNewInput.vue';
import DialogView from 'primevue/dialog';

const isAdmin = ref(false);
const pickupData = ref(dummyData);
const pickupData1 = ref(dummyData);
const statusAvaliables = ref([
    { id: 1, value: 'All', code: 'CO' },
    { id: 2, value: 'Active', code: 'IN' },
    { id: 3, value: 'Inactive', code: 'INS' },
]);
const selectedCity = ref(statusAvaliables.value[0]);
const showstatusUpdate = ref(true);
const getStatusColor = (statusCode) => {
    if (statusCode === 'CO') {
        return 'bg-[#fef9c3] && text-[#a16207]'; // Yellow color for Pending status
    } else if (statusCode === 'IN') {
        return 'bg-[#ccf3c6] && text-[#18740a]';
    } else {
        return 'bg-[#ffd9d9] && text-[#e4400b]'; // Green color for Approved status
        // Red color for Rejected status
    }
};
const setstatus = (currentStatus) => {
    const tempData = [...pickupData1.value];
    pickupData.value = tempData.filter((res) => {
        if (currentStatus.id === 2) return res.isActive;
        else if (currentStatus.id === 3) return !res.isActive;
        else return res;
    });
};

const vendorData = ref([]);
const records = ref();
const showVendorModal = () => {
    isAdmin.value = true;
};

const state = reactive({
    id: pickupData.value[0].id,
    address1: pickupData.value[0].address1,
    address2: pickupData.value[0].address2,
    state_name: pickupData.value[0].state_name,
    city_name: pickupData.value[0].city_name,
    pincode: pickupData.value[0].pincode,
    gst_no: pickupData.value[0].gst_no,
    invoice_prefix: pickupData.value[0].invoice_prefix,
    invoice_suffix: pickupData.value[0].invoice_suffix,
});
console.log('state value is', state);
console.log(pickupData.value.length);

onMounted(async () => {
    document.body.classList.add('account-pickup');
});
onUnmounted(() => {
    document.body.classList.remove('account-pickup');
});
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        const payload = {
            vendor_id: tempData[1],
        };
        // debugger;
        // const userDetails = await getAccountDetails(payload);
        vendorData.value = tempData;
        isAdmin.value = false;
    });
};
const viewModalOpen = ref(false);
const isModalOpen = ref(false);
const openModal = () => {
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};
const closeModal = () => {
    isModalOpen.value = false;
    viewModalOpen.value = false;
    document.body.style.overflow = '';
};
</script>

<template>
    <!-- form div start  -->

    <DialogView v-model:visible="isModalOpen" dismissableMask :modal="true" header="Add New Pickup Address" :style="{ width: '50%' }" class="">
        <addNewInput />
    </DialogView>

    <!-- form div end  -->

    <!-- first section start  -->
    <div class="flex items-center justify-between py-[20px]">
        <div class="flex items-center">
            <div class="font-semibold text-[20px] text-[#1F2937] dark:text-[#dfdfdf]">Pickup Address</div>
            <!-- vendor model start  -->
            <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" class="flex align-items-center gap-1 cursor-pointer font-medium text-[13px] ml-[5px]">
                <span v-if="vendorData.length == 0" @click="showVendorModal()" class="text-[#4b5563] dark:text-[#dfdfdf] cursor-pointer font-medium text-[13px]"> ( Select Vendor ) </span>
                <span v-else>
                    {{ vendorData[0] }}
                </span>
                <button @click="showVendorModal()" class="show-vendor-btn font-medium">
                    <img v-if="!darkModeVal" :src="getImg('account-vendor_v3')" />
                    <img v-else src="../../../assets/images/dark-mode/account-vendor_v3.svg" alt="map" />
                </button>
                <!-- vendor model  -->
                <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
            </div>
        </div>
        <div>
            <button type="submit" class="bg-[#0052cc] w-[96px] h-[32px] rounded-[50px] border-[#0049b0]" @click="openModal">
                <span class="mx-auto text-[14px] text-center font-medium text-[#fff]">Add New</span>
            </button>
        </div>
    </div>
    <!-- first section end  -->

    <!-- second section start  -->
    <div class="pickupAddressContainer h-[100vh]">
        <div class="py-[30px] px-[20px] md:px-[30px] rounded-[12px] bg-[#fff] dark:bg-[#313131]">
            <div v-if="records" class="no-record-outer flex flex-col justify-center items-center gap-1 py-[50px]">
                <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                <div class="head text-[#9CA3AF] text-[16px]">No Records Found</div>
            </div>

            <div v-else>
                <div class="flex justify-between">
                    <div>
                        <div>
                            <p class="text-[13px]">{{ pickupData.length }} Address</p>
                        </div>
                    </div>
                    <div class="flex gap-[12px]">
                        <div class="flex border-[1px] border-[#e5e7eb] rounded-[50px] w-[208px] h-[32px] bg-[#f3f4f6]">
                            <img src="@/assets/images/store-order-search.svg" alt="Search" class="w-[14px] ml-[12px]" />
                            <InputText type="text" class="border-0 w-[85%] bg-[#f3f4f6] dark:bg-transparent" placeholder="Search" />
                        </div>
                        <BaseDropdown @listenDropdownChange="(val) => setstatus(val)" :options="statusAvaliables" placeholder="All" twClasses="w-[9rem]" class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50]" />
                    </div>
                </div>
                <!-- card start  -->
                <div class="flex gap-[12px] mt-[20px]">
                    <div v-for="(card, index) in pickupData" :key="index" class="rounded-[12px]">
                        <div class="border-[1px] border-solid border-[#e5e7eb] rounded-[12px] pt-[23px] pr-[20px] pb-[21px] pl-[38px] mb-[16px] relative w-[367px]">
                            <div class="flex justify-between items-center">
                                <div class="flex w-[69%] items-center">
                                    <div class="w-[32px] h-[32px] text-[#ffffff] rounded-full text-center px-[7px] py-[7px]" :class="[card.isActive ? 'img-active' : 'img-notactive']">FA</div>
                                    <div class="ml-[12px] font-semibold leading-[16px] text-[13px] text-[#374151]">Fashionrig</div>
                                </div>
                                <div class="flex items-center">
                                    <div>
                                        <span v-show="showstatusUpdate" :class="[card.isActive ? 'bg-green' : 'bg-red']" class="w-[48px] text-[12px] text-center font-medium h-[20px] px-[18px] py-[3px] rounded-[100px]">
                                            {{ card.isActive ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                    <div class="relative left-[10px] top-[0px]">
                                        <img v-if="!darkModeVal" :src="getImg('pickup-address-as-vertical-dots')" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-mode-picup-address-as-vertical-dots.svg" alt="map" />
                                    </div>
                                </div>
                            </div>

                            <!-- second section end  -->
                            <!-- third section start  -->
                            <div class="mt-[24px]">
                                <div class="text-[12px] text-[#4B5563]">ID: {{ card.id }}</div>

                                <div class="min-h-[57px]">
                                    <div class="mt-[16px] mr-[0px] mb-[8px] ml-[0px] leading-[20px] text-[12px] text-[#4B5563]">{{ card.address1 }}</div>
                                    <div class="leading-[16px] text-[12px] text-[#4B5563] mb-[8px]">{{ card.address2 }}</div>
                                </div>

                                <div class="font-semibold leading-[16px] text-[13px] text-[#374151]">{{ card.state_name }}, {{ card.city_name }}- {{ card.pincode }}</div>
                                <div class="mt-[21px]">
                                    <div class="text-[12px] leading-[16px]">GST Number</div>
                                    <div class="font-semibold leading-[16px] text-[13px] text-[#374151]">{{ card.gst_no }}</div>
                                </div>
                                <div>
                                    <div class="text-[12px] leading-[16px]">Invoice Prefix</div>
                                    <div class="font-semibold leading-[16px] text-[13px] text-[#374151]">{{ card.invoice_prefix }}</div>
                                </div>
                                <div>
                                    <div class="text-[12px] leading-[16px]">Invoice Suffix</div>
                                    <div class="font-semibold leading-[16px] text-[13px] text-[#374151]">{{ card.invoice_suffix }}</div>
                                </div>
                                <div class="text-[12px] leading-[16px]">RTO Address</div>
                                <div class="font-semibold leading-[16px] text-[13px] text-[#374151]">Same as Pickup</div>
                                <div class="flex items-center mt-[15px] mb-[7px]">
                                    <div class="mr-[13px] align-middle">
                                        <img v-if="!darkModeVal" :src="getImg('Pickup-as-call')" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-pickup-as-call.svg" alt="call" />
                                    </div>
                                    <div>1234567654</div>
                                </div>
                                <div class="flex items-center mb-[7px]">
                                    <div class="mr-[13px] align-middle">
                                        <img v-if="!darkModeVal" :src="getImg('pickup-as-sms')" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-pickup-as-sms.svg" alt="sms" />
                                    </div>
                                    <div>234567654</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="mr-[13px] align-middle">
                                        <img v-if="!darkModeVal" :src="getImg('pickup-as-web')" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-pickup-as-web.svg" alt="web" />
                                    </div>
                                    <div>334567654</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- card end  -->
            </div>
            
        </div>
    </div>
</template>
<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';
.pickupAddressContainer {
    margin-left: auto;
    margin-right: auto;
    font-family: $interRegular;
}
.account-pickup {
    .p-dropdown-items-wrapper {
        width: 9rem !important;
    }
    .p-inputtext:enabled:focus {
        outline: none !important;
        box-shadow: none !important;
    }
    .p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover {
        background: none !important;
    }
}
.bg-green {
    background-color: #ccf3c6;
    color: #18740a;
}
.bg-red {
    background-color: #f3f4f6;
    color: #4b5563;
}
.img-active {
    background-color: #4c9aff;
    color: #ffffff;
}
.img-notactive {
    background-color: #f3f4f6;
    color: #4b5563;
}
</style>