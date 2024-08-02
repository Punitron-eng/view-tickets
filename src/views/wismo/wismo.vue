<script setup>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import config from '../../util/config';
import ItlPageHeader from '../../components/itl-page-header/ItlPageHeader.vue';
import ViewTemplateModalVue from '../../components/common-modal-files/ViewTemplateModal.vue';
const getImg = (imageName) => {
    return new URL(`../../assets/images/${imageName}.svg`, import.meta.url).href;
};
import BaseCheckBox from '../../components/base/BaseCheckBox.vue';
import { checkAccessRight, deepCheckAccessRight, checkUserType } from '../../util/commonHandlers';
import VendorModal from '../../components/common-modal-files/VendorModal.vue';
import HeaderImage1 from '../../assets/images/wismo-header-1.png';
import HeaderImage2 from '../../assets/images/wismo-header-2.png';
import HeaderImage3 from '../../assets/images/wismo-header-3.png';
import { getWismoResponse, wismoSubmitResponse } from '../../api/wismo/wismoApi.ts';
const topHeader = JSON.parse(localStorage.getItem('top_header'));
import { useToast } from 'primevue/usetoast';
const toast = useToast();
// dark mode
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
// dark mode ends here

// api call

// api call ends here
const TableData = ref([]);
const ResetLoading = ref(false);
const reset = async () => {
    if (topHeader.user_type == 3) {
        const payload = {
            is_framework_requested: '1',
        };

        const notification_charges = await getWismoResponse(payload);
        if (notification_charges.status == 'success') {
            CheckBox.value.whatsapp = false;
            CheckBox.value.sms = false;
            CheckBox.value.email = false;
            selectTabs.value.whatsapp = false;
            selectTabs.value.sms = false;
            selectTabs.value.email = false;
            whatsappCharges.value = null;
            smsCharges.value = null;

            TableData.value = notification_charges.all_notification_charges_data_array.data.post_shipping;
            whatsappCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_whatsapp_charges;
            smsCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_sms_charges;

            updateTotal();
            ResetLoading.value = true;
            setTimeout(() => {
                checkedForSelectAll('email');
                checkedForSelectAll('sms');
                checkedForSelectAll('whatsapp');
                ResetLoading.value = false;
            }, 100);
        }
    } else {
        const payload = {
            is_framework_requested: '1',
            vendor_id: vendorData.value[1],
        };
        const notification_charges = await getWismoResponse(payload);
        if (notification_charges.status == 'success') {
            CheckBox.value.whatsapp = false;
            CheckBox.value.sms = false;
            CheckBox.value.email = false;
            selectTabs.value.whatsapp = false;
            selectTabs.value.sms = false;
            selectTabs.value.email = false;
            TableData.value = notification_charges.all_notification_charges_data_array.data.post_shipping;

            whatsappCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_whatsapp_charges;
            smsCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_sms_charges;
            updateTotal();
            ResetLoading.value = true;
            setTimeout(() => {
                checkedForSelectAll('email');
                checkedForSelectAll('sms');
                checkedForSelectAll('whatsapp');
                ResetLoading.value = false;
            }, 100);
        }
    }
};

onBeforeMount(() => {
    if (!(checkAccessRight() ? true : deepCheckAccessRight('connect_plus', 'notification_charges', 'view_itl_connect_notification_charges_v3'))) {
        window.location.href = config.baseUrlPanel + 'logout';
    }
});

onMounted(async () => {
    if (topHeader.user_type == 3) {
        const payload = {
            is_framework_requested: '1',
        };

        const notification_charges = await getWismoResponse(payload);
        if (notification_charges.status == 'success') {
            TableData.value = notification_charges.all_notification_charges_data_array.data.post_shipping;

            whatsappCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_whatsapp_charges;
            smsCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_sms_charges;
            updateTotal();
            setTimeout(() => {
                checkedForSelectAll('email');
                checkedForSelectAll('sms');
                checkedForSelectAll('whatsapp');
            }, 100);
        }
    }
});

// responsive for the carousel
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
]);
// responsive for the carousel end here

const whatsappCharges = ref(null);
const smsCharges = ref(null);

const totalAmount = ref({
    whatsapp: 0,
    sms: 0,
});
const viewTemplate = ref({
    isShow: false,
    headerTitle: '',
    whatsappImg: '',
    smsImg: '',
    emailImg: '',
});
const selectTabs = ref({
    whatsapp: false,
    sms: false,
    email: false,
});
const CheckBox = ref({
    whatsapp: false,
    sms: false,
    email: false,
});
const checkboxes = ref([
    { id: 1, value: 'Select All', is_checked: false, name: 'whatsapp' },
    { id: 2, value: 'Select All', is_checked: false, name: 'sms' },
    { id: 3, value: 'Select All ', is_checked: false, name: 'email' },
]);

watch(
    CheckBox,
    (newValues) => {
        checkboxes.value.forEach((checkbox) => {
            // Check if the checkbox name exists in the CheckBox object
            if (newValues[checkbox.name] !== undefined) {
                // Update the is_checked property
                checkbox.is_checked = newValues[checkbox.name];
            }
        });
    },
    { deep: true }
);

const updateTotal = () => {
    totalAmount.value.whatsapp = 0;
    totalAmount.value.sms = 0;

    TableData.value.notification.forEach((item) => {
        const whatsappChannel = item.channel.find((channel) => channel.name === 'whatsapp');
        const smsChannel = item.channel.find((channel) => channel.name === 'sms');
        if (whatsappChannel && whatsappChannel.value === '1') {
            // totalAmount.value.whatsapp += Number(TableData.value?.charges?.per_whatsapp_charges);
            totalAmount.value.whatsapp += Number(whatsappCharges.value);
        }
        if (smsChannel && smsChannel.value == '1' && !smsChannel.free) {
            // totalAmount.value.sms += Number(TableData.value?.charges?.per_sms_charges);
            totalAmount.value.sms += Number(smsCharges.value);
        }
    });
};

const products = [HeaderImage1, HeaderImage2, HeaderImage3];
const navigateToBottom = () => {
    const section4 = document.getElementById('section-4');
    if (section4) {
        section4.scrollIntoView({ behavior: 'smooth' });
    }
};
const handleCheckboxChange = (name) => {
    CheckBox.value[name.name] = !CheckBox.value[name.name];
    if (selectTabs.value[name.name]) {
        selectTabs.value[name.name] = false;
    } else {
        selectTabs.value[name.name] = true;
    }
    for (const id of TableData.value.notification) {
        for (const channel of id.channel) {
            if (channel.name === name.name) {
                if (selectTabs.value[name.name]) {
                    channel.value = '1';
                    updateTotal();
                } else {
                    channel.value = '0';
                    updateTotal();
                }
            }
        }
    }
};

const isLoading = ref(false);
const SendData = async () => {
    isLoading.value = true;
    let notificationArray = TableData.value.notification.map((item) => {
        return {
            event: item.event,
            channel: item.channel,
        };
    });

    const payload = {
        charges: TableData.value.charges,
        postCharges: notificationArray,
    };

    const data = {
        vendor_id: '',
        // post_shipping:{
        is_wismo: '1',
        mode: 'post_shipping',
        connect_plus_charges: '3.99',
        post_shipping: {
            // per_whatsapp_charges: TableData.value?.charges?.per_whatsapp_charges,
            // per_sms_charges: TableData.value?.charges?.per_sms_charges,
            per_whatsapp_charges: whatsappCharges.value,
            per_sms_charges: smsCharges.value,
            // total_whatsapp_charges: payload.charges.total_whatsapp_charges,
            // total_sms_charges: payload.charges.total_sms_charges,
            total_whatsapp_charges: totalAmount.value.whatsapp.toFixed(2),
            total_sms_charges: totalAmount.value.sms.toFixed(2),

            // total_charges: payload.charges.total_charges,
            total_charges: (Number(totalAmount.value.whatsapp) + Number(totalAmount.value.sms)).toFixed(2),

            order_shipped: {
                is_whatsapp_active: payload.postCharges[0].channel[0].value,
                is_sms_active: payload.postCharges[0].channel[1].value,
                is_email_active: payload.postCharges[0].channel[2].value,
            },
            order_picked_up: {
                is_whatsapp_active: payload.postCharges[1].channel[0].value,
                is_sms_active: payload.postCharges[1].channel[1].value,
                is_email_active: payload.postCharges[1].channel[2].value,
            },
            order_intransit: {
                is_whatsapp_active: payload.postCharges[2].channel[0].value,
                is_sms_active: payload.postCharges[2].channel[1].value,
                is_email_active: payload.postCharges[2].channel[2].value,
            },
            order_delay: {
                is_whatsapp_active: payload.postCharges[3].channel[0].value,
                is_sms_active: payload.postCharges[3].channel[1].value,
                is_email_active: payload.postCharges[3].channel[2].value,
            },
            order_ofd: {
                is_whatsapp_active: payload.postCharges[4].channel[0].value,
                is_sms_active: payload.postCharges[4].channel[1].value,
                is_email_active: payload.postCharges[4].channel[2].value,
            },
            order_rto: {
                is_whatsapp_active: payload.postCharges[5].channel[0].value,
                is_sms_active: payload.postCharges[5].channel[1].value,
                is_email_active: payload.postCharges[5].channel[2].value,
            },
            order_delivered: {
                is_whatsapp_active: payload.postCharges[6].channel[0].value,
                is_sms_active: payload.postCharges[6].channel[1].value,
                is_email_active: payload.postCharges[6].channel[2].value,
            },
        },
    };

    if (topHeader.user_type == 1 || topHeader.user_type == 2) {
        data.vendor_id = vendorData.value[1];
        try {
            const result = await wismoSubmitResponse(data);
            if (result.status == 'success') {
                isLoading.value = false;
                toast.add({ severity: 'success', summary: result.html_message, life: 1000 });
            } else {
                isLoading.value = false;
                toast.add({ severity: 'error', summary: result.html_message, life: 1000 });
            }
        } catch (err) {
            console.log(err.message);
        }
    } else {
        try {
            const result = await wismoSubmitResponse(data);
            if (result.status == 'success') {
                isLoading.value = false;
                toast.add({ severity: 'success', summary: result.html_message, life: 1000 });
            } else {
                isLoading.value = false;
                toast.add({ severity: 'error', summary: result.html_message, life: 1000 });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};

const checkedForSelectAll = (name) => {
    let checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let checkboxes1 = document.querySelectorAll(`input[name="${name}"]`);
    if (checkboxes.length == checkboxes1.length) {
        CheckBox.value[name] = true;
        selectTabs.value[name] = true;
    } else {
        CheckBox.value[name] = false;
        selectTabs.value[name] = false;
    }
};

const updateSingle = async (name, index) => {
    const targetChannel = TableData.value.notification[index].channel.find((res) => res.name === name);
    if (targetChannel) {
        targetChannel.value = targetChannel.value === '1' ? '0' : '1';
        updateTotal();
    }
    //  because the values are not getting updated that's y added the delayed of the 100 mili sec
    setTimeout(() => {
        checkedForSelectAll(name);
    }, 100);
};
const viewTemplatebtn = (eventName, WhatsappImg, SmsImg, EmailImg) => {
    viewTemplate.value.isShow = true;
    viewTemplate.value.headerTitle = eventName;
    (viewTemplate.value.whatsappImg = WhatsappImg), (viewTemplate.value.smsImg = SmsImg), (viewTemplate.value.emailImg = EmailImg);
};
const isAdmin = ref(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName) => {
    // debugger
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        const payload = {
            vendor_id: tempData[1],
        };
        vendorData.value = tempData;
        const notification_charges = await getWismoResponse(payload);
        if (notification_charges.status == 'success') {
            TableData.value = notification_charges.all_notification_charges_data_array.data.post_shipping;

            whatsappCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_whatsapp_charges;
            smsCharges.value = notification_charges.all_notification_charges_data_array.data.post_shipping.charges.per_sms_charges;

            isAdmin.value = false;
            updateTotal();
            setTimeout(() => {
                checkedForSelectAll('email');
                checkedForSelectAll('sms');
                checkedForSelectAll('whatsapp');
            }, 100);
        }
    });
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};
const isNumber = (evt, modelName) => {
    const value = evt.target.value;
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (!regex.test(value)) {
        if (modelName === 'whatsapp') {
            whatsappCharges.value = value.slice(0, -1);
        } else if (modelName === 'sms') {
            smsCharges.value = value.slice(0, -1);
        }
    }
};

watch(
    () => isAdmin.value,
    (newValue) => {
        if (newValue) {
            document.body.classList.add('wismo-overflow-hidden');
        } else {
            document.body.classList.remove('wismo-overflow-hidden');
        }
    }
);
watch(
    () => viewTemplate.value.isShow,
    (newValue) => {
        if (newValue) {
            document.body.classList.add('wismo-overflow-hidden');
        } else {
            document.body.classList.remove('wismo-overflow-hidden');
        }
    }
);
watch(whatsappCharges, () => {
    updateTotal();
});
watch(smsCharges, () => {
    updateTotal();
});
</script>
<template>
    <div class="main-conatiner flex flex-column justify-content-center md:align-items-center" :class="isAdmin ? 'overflow-hidden' : ''">
        <!-- Header Start here  -->
        <div class="container-header">
            <ItlPageHeader :Image="getImg('wismo-header')" Heading="WISMO" -sub-heading="Your Order's Journey, Your Updates, Your Peace of Mind." />
        </div>
        <!-- Header Ends here  -->

        <!-- Sections Start here  -->
        <div class="flex flex-column align-items-center main-sections">
            <!-- Section 1 Start Here  -->
            <div class="section-1-card flex mb-3">
                <div class="section1-left-card flex flex-column">
                    <div>Elevate Your Shipping Experience with Postship Notifications!</div>
                    <div>
                        Keep in touch with your parcels at ALL times <br />
                        with Postship Notifications!
                    </div>
                    <div>
                        <button @click="navigateToBottom()">Activate Your Notification</button>
                    </div>
                </div>
                <div class="section1-right-card" v-if="products.length > 0">
                    <Carousel :value="products" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
                        <template #item="slotProps">
                            <div class="flex justify-content-center align-items-center">
                                <img :src="slotProps.data" />
                            </div>
                        </template>
                    </Carousel>
                </div>
            </div>
            <!-- Section 1 Ends Here  -->

            <!-- Section 2 Start Here  -->
            <div class="section-2-card flex flex-column mb-3">
                <div class="section-2-header">Tracking Parcels has become Smart, Simple, and just a notification away! 🚚📲</div>
                <div class="section-2-content flex justify-content-center align-items-center">
                    <div class="content-1">
                        <div class="content-1-icon">
                            <img v-if="!darkModeVal" :src="getImg('wismo-effortless')" />
                            <img v-else src="../../assets/images/dark-mode/dark-wismo-effortless.svg" />
                        </div>
                        <div class="content-1-heading">Effortless Tracking</div>
                        <div class="content-1-subheading">No fuss, no stress. Postship brings you seamless tracking – because you deserve the easy way.</div>
                    </div>
                    <div class="content-2">
                        <div class="content-2-icon">
                            <img v-if="!darkModeVal" :src="getImg('wismo-timely')" />
                            <img v-else src="../../assets/images/dark-mode/dark-wismo-timely.svg" />
                        </div>
                        <div class="content-2-heading">Timely Delivery Updates</div>
                        <div class="content-2-subheading">Stay ahead of the game with real-time updates – no more guessing games.</div>
                    </div>
                    <div class="content-3">
                        <div class="content-3-icon">
                            <img v-if="!darkModeVal" :src="getImg('wismo-peace')" />
                            <img v-else src="../../assets/images/dark-mode/dark-wismo-peace.svg" />
                        </div>
                        <div class="content-3-heading">Peace of Mind Guaranteed</div>
                        <div class="content-3-subheading">Know exactly where your order is because tranquillity and deliveries go hand in hand.</div>
                    </div>
                </div>
            </div>
            <!-- Section 2 Ends Here  -->

            <!-- Section 3 Start Here -->
            <div class="section-3-card flex flex-column">
                <div class="section-3-header">Why WISMO is Your Go-to Tracking Buddy</div>
                <div class="section-3-content flex justify-content-center align-items-center">
                    <div class="section3-content-1">
                        <div class="section3-content-1-header">
                            <div>Instant Alerts</div>
                            <div>
                                <img v-if="!darkModeVal" :src="getImg('wismo-instant')" />
                                <img v-else src="../../assets/images/dark-mode/dark-wismo-instant.svg" />
                            </div>
                        </div>
                        <div class="section3-content-1-content">Your order's journey is at your fingertips with instant alerts.</div>
                    </div>
                    <div class="section3-content-2">
                        <div class="section3-content-1-header">
                            <div>Live Tracking</div>
                            <div>
                                <img v-if="!darkModeVal" :src="getImg('wismo-tracking')" />
                                <img v-else src="../../assets/images/dark-mode/dark-wismo-tracking.svg" />
                            </div>
                        </div>
                        <div class="section3-content-2-content">With real-time alerts. Say goodbye to the guessing game!</div>
                    </div>
                    <div class="section3-content-3">
                        <div class="section3-content-1-header">
                            <div>Delivery Confirmations</div>
                            <div>
                                <img v-if="!darkModeVal" :src="getImg('wismo-confirmations')" />
                                <img v-else src="../../assets/images/dark-mode/dark-wismo-confirmations.svg" />
                            </div>
                        </div>
                        <div class="section3-content-3-content">Your peace of mind – sealed, delivered, and confirmed.</div>
                    </div>
                </div>
            </div>
            <!-- Section 3 Ends Here -->
            <div class="mt-3 mb-2 buyer-chat-sec w-100 flex flex-col-reverse md:flex-row-reverse">
                <a :href="config.baseUrlPanel+'itl-connect-chats-v3'" class="bcs-link inline-flex rounded-md py-1.5 px-2 bg-white font-medium" target="_blank">
                    <img src="@/assets/images/massage-icon.svg" class="bcs-img mr-2" />
                    Open Buyer Chat
                    <img src="@/assets/images/new-tab-arrow.svg" class="bcs-img ml-1" />
                </a>
                <div class="mr-3 mb-1 bcs-title pt-1">Want to know your notification sent history ?</div>                
            </div>
            <!-- Section 4 Starts Here  -->
            <div class="section-4-card flex flex-column" id="section-4">
                <div class="section-4-header flex justify-content-between">
                    Activate in a Snap!
                    <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" style="font-size: 14px" class="flex align-items-center gap-2">
                        <span v-if="vendorData.length == 0" @click="showVendorModal()" style="cursor: pointer"> Select Vendor </span>
                        <span v-else>
                            {{ vendorData[0] }}
                        </span>
                        <button @click="showVendorModal()" class="show-vendor-btn">
                            <img v-if="!darkModeVal" :src="getImg('vendor_v3')" />
                            <img v-else src="../../assets/images/dark-mode/dark-vendor_v3.svg" />
                        </button>
                        <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
                    </div>
                </div>

                <div v-if="vendorData.length > 0 || topHeader['user_type'] == 3">
                    <div class="section-4-content">
                        <div class="section4-content-header flex">
                            <!-- <div class="s4-header-1 flex justify-content-between">
                                <div class="s4-header-1-left flex justify-content-center align-items-center">
                                    <div>
                                        <img :src="getImg('wismo-whatsapp')" />
                                    </div>
                                    <div>WhatsApp</div>
                                </div>
                                <div class="s4-header-1-right flex justify-content-end align-items-center">
                                    <div class="whatsapp-header-content flex justify-end">
                                        <span>
                                            <input type="number" class="w-4" />
                                            ₹{{TableData?.charges?.per_whatsapp_charges}}
                                        </span>
                                        &nbsp; + 18% GST
                                        <span class="font-bold">₹</span>
                                        <input type="number" class="w-2 px-1 border rounded-sm font-bold" />
                                        <span v-if="false">
                                            {{ TableData?.charges?.per_whatsapp_charges }}
                                        </span>&nbsp; + 18% GST

                                    </div>
                                </div>
                            </div> -->

                            <div class="s4-header-1 flex items-center justify-between">
                                <div class="s4-header-2-left flex items-center justify-between">
                                    <img :src="getImg('wismo-whatsapp')" />
                                    <div class="font-normal text-[16px]">WhatsApp</div>
                                </div>
                                <div class="s4-header-2-right flex justify-content-center align-items-center pt-[3px]">
                                    <div class="sms-header-content flex justify-end">
                                        <div
                                            v-if="!checkUserType('vendor') && (checkAccessRight('abandoned_cart') ? true : deepCheckAccessRight('connect_plus', 'notification_charges', 'edit_itl_connect_notification_charges_v3'))"
                                            class="flex items-center justify-end"
                                        >
                                            <span>₹</span>
                                            <input @input="isNumber($event, 'whatsapp')" v-model.number="whatsappCharges" type="number" class="w-[42px] px-1 ml-1" />
                                            &nbsp;+ 18% GST
                                        </div>
                                        <div v-else>
                                            <span>₹{{ TableData?.charges?.per_whatsapp_charges }}</span> &nbsp;+ 18% GST
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="s4-header-2 flex items-center justify-between">
                                <div class="s4-header-2-left flex items-center justify-between">
                                    <img :src="getImg('wismo-sms')" />
                                    <div class="font-normal text-[16px]">SMS</div>
                                </div>
                                <div class="s4-header-2-right flex justify-content-center align-items-center">
                                    <div class="sms-header-content flex justify-end">
                                        <div
                                            v-if="!checkUserType('vendor') && (checkAccessRight() ? true : deepCheckAccessRight('connect_plus', 'notification_charges', 'edit_itl_connect_notification_charges_v3'))"
                                            class="flex items-center justify-end"
                                        >
                                            <span>₹</span>
                                            <input @input="isNumber($event, 'sms')" v-model.number="smsCharges" type="number" class="w-[42px] px-1 ml-1" />
                                            &nbsp;+ 18% GST
                                        </div>
                                        <div v-else>
                                            <span>₹{{ TableData?.charges?.per_sms_charges }}</span> &nbsp;+ 18% GST
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="s4-header-2 flex justify-content-between">
                                <div class="s4-header-2-left flex justify-content-center align-items-center">
                                    <div>
                                        <img :src="getImg('wismo-sms')" />
                                    </div>
                                    <div>SMS</div>
                                </div>
                                <div class="s4-header-2-right flex justify-content-center align-items-center">
                                    <div class="sms-header-content">
                                        <span>₹{{ TableData?.charges?.per_sms_charges }}</span> &nbsp;+
                                        18% GST
                                    </div>
                                </div>
                            </div> -->
                        </div>
                        <div class="section4-content-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th style="text-align: left">Event</th>
                                        <th class="th-notification">Notification Channel</th>
                                        <th>Template</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Empty row for Select All CheckBoxs -->
                                    <tr>
                                        <td class="selectAll-td"></td>
                                        <td>
                                            <div v-if="ResetLoading" class="flex w-full justify-between">
                                                <div class="flex items-center">
                                                    <SkeletonView height="16px" weight="16px" borderRadius="0px" class="!max-w-[16px]" />
                                                    <span class="ml-1 w-[89px]"> Select All </span>
                                                </div>
                                                <div class="flex items-center ml-[15px]">
                                                    <SkeletonView height="16px" weight="16px" borderRadius="0px" class="!max-w-[16px]" />
                                                    <span class="ml-1 w-[89px]"> Select All </span>
                                                </div>
                                                <div class="flex items-center ml-[18px]">
                                                    <SkeletonView height="16px" weight="16px" borderRadius="0px" class="!max-w-[16px]" />
                                                    <span class="ml-1 w-[82px]"> Select All </span>
                                                </div>
                                            </div>
                                            <div class="notifications-div flex last:mr-[1px]" v-else>
                                                <div v-for="checkboxData in checkboxes" :key="checkboxData.id" class="selectAll-td">
                                                    <BaseCheckBox :data="checkboxData" @listenCheckboxChange="handleCheckboxChange" />
                                                </div>
                                            </div>
                                        </td>
                                        <td class="selectAll-td"></td>
                                    </tr>
                                    <!-- Empty row for Select All CheckBoxs Ends Here -->
                                    <tr v-for="(id, index) in TableData.notification" :key="index" class="data-td">
                                        <td class="event-div">{{ id.event }}</td>
                                        <td class="notification-data-td">
                                            <div class="notifications-div">
                                                <div
                                                    v-for="(channel, Channelindex) in id.channel"
                                                    :key="Channelindex"
                                                    :style="{ marginRight: Channelindex > 0 ? '31px' : '0' }"
                                                    class="flex md:align-items-center"
                                                    @click="updateSingle(channel.name, index)"
                                                >
                                                    <div class="flex flex-row align-items-center input-label" style="position: relative">
                                                        <input type="checkbox" :id="Channelindex" :name="channel.name" :checked="channel.value == '1'" />
                                                        <label class="input-labels" :class="{ uppercase: channel.name == 'sms', capitalize: channel.name !== 'sms' }" :for="channel.name">&nbsp;{{ channel.name }}</label>
                                                        <span v-if="channel.free" class="free-tag"> &nbsp;free</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="template-td">
                                            <button class="table-view-btn text-center" @click="viewTemplatebtn(id.event, id.whatsappImgName, id.smsImgName, id.emailImgName)">{{ id.btn_template }}</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="section4-table-footer flex align-items-center">
                            <div class="s4-footer-content-1">Estimated Amount Per Order</div>
                            <div class="s4-footer-content-2 flex justify-content-between align-items-center">
                                <div class="flex align-items-center">
                                    <img :src="getImg('wismo-whatsapp')" />
                                    <span class="s4-footer-c2-price"> ₹{{ totalAmount.whatsapp.toFixed(2) }} </span>
                                </div>
                                <span>+</span>
                                <div class="flex align-items-center">
                                    <img :src="getImg('wismo-sms')" />
                                    <span class="s4-footer-c2-price"> ₹{{ totalAmount.sms.toFixed(2) }} </span>
                                </div>
                            </div>
                            <div class="flex justify-content-between footer-email-section">
                                <div class="s4-footer-content-3">Email is FREE</div>
                                <div class="s4-footer-content-4">₹{{ (Number(totalAmount.whatsapp) + Number(totalAmount.sms)).toFixed(2) }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="checkAccessRight() ? true : deepCheckAccessRight('connect_plus', 'notification_charges', 'edit_itl_connect_notification_charges_v3')" class="section-4-footer flex">
                        <button class="s4-footer-save-btn flex items-center justify-center" @click="SendData()">
                            <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                            <div v-else>Save</div>
                        </button>
                        <button class="s4-footer-reset-btn" @click="reset()">Reset</button>
                    </div>
                </div>
            </div>

            <!-- Section 4 Ends Here  -->

            <!-- view Template start here -->
            <ViewTemplateModalVue
                v-if="viewTemplate.isShow"
                @close-modal="viewTemplate.isShow = false"
                :headerTitle="viewTemplate.headerTitle"
                :emailViewImg="viewTemplate.emailImg"
                :smsViewImg="viewTemplate.smsImg"
                :whatsAppViewImg="viewTemplate.whatsappImg"
            />
            <!-- view Template ends here -->
        </div>
        <ToastView />
        <!-- Sections Ends Here -->
    </div>
</template>

<style lang="scss">
@import './wismo.scss';

.p-link {
    border-radius: 50px !important;
    width: 10px !important;
    height: 10px !important;
}

.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
    background-color: black !important;
}

.p-carousel-item div img {
    max-width: 290px !important;
    max-height: 260px !important;
}

.p-carousel-container {
    button {
        display: none;
    }
}

.p-carousel-content {
    width: 100%;
}
</style>
