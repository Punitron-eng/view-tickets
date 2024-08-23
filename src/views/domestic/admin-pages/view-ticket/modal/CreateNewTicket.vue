<script setup>
import { useStore } from 'vuex';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import getImg from '@/util/getImg';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import { viewTicketVariables } from '../viewTicketVariables';
import BaseInput from '../../../../../components/base/BaseInput.vue';
import BaseTextarea from '../../../../../components/base/BaseTextarea.vue';
import BaseFileUpload from '../../../../../components/base/BaseFileUpload.vue';
import BaseDropdown from '../../../../../components/base/BaseDropdown.vue';
import BaseLabel from '../../../../../components/base/BaseLabel.vue';
import BaseCheckBox from '../../../../../components/base/BaseCheckBox.vue';
import BaseButton from '../../../../../components/base/BaseButton.vue';
import SingleDatePicker from '../../../../../components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import VendorModal from '../../../../../components/common-modal-files/VendorModal.vue';
import { checkUserType } from '../../../../../util/commonHandlers';
import { useToast } from 'primevue/usetoast';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import { getairwayBillNoDetails, getDepartmentOptionsApi, getCategoryOptionsApi, getFileUploadApi, getRescheduleDateApi } from '../../../../../api/domestic/view-ticket/viewTicketApi';
import { isAlphanumeric } from '../../../../../util/commonValidations';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

import Skeleton from 'primevue/skeleton';
const toast = useToast();
const dataVariables = viewTicketVariables;
const data = ref([]);
const selectedDepartment = ref();
const selectedCategory = ref();
const airwayBillNo = ref();
const trayaTicketCreatedDate = ref();
const store = useStore();
import { useRouter } from 'vue-router';
const inputAddress = ref({
    address: '',
    landmark: '',
});
const router = useRouter();
const mobileNumber = ref();
const subject = ref('');
const description = ref('');
const selectedRescheduleDate = ref();
const fileUploadComponent = ref(); // upload file value
const file = ref(null);
const airwayBillNoDetails = ref(); // store airwayBillNo details
const showAirwayBillNoDetails = ref(false);
const isLoading = ref(false);
const errorMessage = ref({
    vendor: '',
    department: '',
    category: '',
    subject: '',
    airwayBillNo: '',
    fileUpload: '',
    ticketType: '',
    customerType: '',
    trayaTicketCreatedDate: '',
    inputAddress: '',
    inputLandMark: '',
    mobileNumber: '',
    rescheduleDate: '',
});
const categoryData = ref([]);
const departmentData = ref([]);
const showTurnaroundTime = ref(false);
const turnaroundTime = ref('');
const selectedTicketType = ref();
const selectedCustomerType = ref();
const isAwbValidDepartment = ref(false);
// const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const ticketTypesOptions = [
    { id: 1, value: 'Ticket' },
    { id: 2, value: 'NDR Calling' },
    { id: 3, value: 'Other Escalation' },
    { id: 4, value: 'NDR API Logs' },
];

const customerSelectOptions = [
    { id: 1, value: 'New' },
    { id: 2, value: 'Repeat' },
];

const rescheduleDates = ref([]);

const checkboxData = {
    id: 1,
    value: 'is show vendor',
    is_checked: false,
};

//Trya Ticket Date
const dateValue = (date) => {
    const tempDate = [date.toISOString().split('T')[0]];
    trayaTicketCreatedDate.value = tempDate[0];
};

const closeModal = () => {
    dataVariables.value.isCreateNewTicketModalVisible = false;
    clearData();
};

watch(
    () => dataVariables.value.isCreateNewTicketModalVisible,
    async (newVal) => {
        if (newVal == true) {
            showAirwayBillNoDetails.value = false;
            rescheduleDates.value = [];
            if (!topHeader.user_id == 3000 || !topHeader.user_id == 903) {
                categoryData.value = [];
            }
        }
    }
);

const getTomorrowDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);

    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    return `${day}-${month}-${year}`;
};

const awbRequiredDepartment = () => {
    const validDepartments = ['Billing', 'Operations', 'Pickup', 'ONDC IGM', 'Security', 'Special Operations', 'REV'];
    if (validDepartments.includes(selectedDepartment.value?.value)) {
        isAwbValidDepartment.value = true;
    } else {
        isAwbValidDepartment.value = false;
    }
};

//validate on submit
const validateDetails = () => {
    // Define the order of validation and error messages

    // { key: 'subject', check: (topHeader.user_id != 3000 || topHeader.user_id != 903) && subject.value, message: 'This field is required' },
    const validationOrder = [
        { key: 'vendor', check: checkUserType('vendor') ? false : vendorData.value.length === 0, message: 'This field is required' },
        { key: 'airwayBillNo', check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && !airwayBillNo.value, message: 'This field is required' },
        { key: 'department', check: !selectedDepartment.value, message: 'This field is required' },
        { key: 'category', check: categoryData.value.length ? !selectedCategory.value : selectedCategory.value, message: 'This field is required' },
        { key: 'airwayBillNo', check: airwayBillNo.value ? !showAirwayBillNoDetails.value : showAirwayBillNoDetails.value, message: '' },
        {
            key: 'fileUpload',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && (selectedCategory.value?.id == 210 || selectedCategory.value?.id == 211 || selectedCategory.value?.id == 212 || selectedCategory.value?.id == 227) && !file.value,
            message: 'This field is required',
        },
        {
            key: 'ticketType',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && !selectedTicketType.value,
            message: 'This field is required',
        },
        {
            key: 'customerType',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && !selectedCustomerType.value,
            message: 'This field is required',
        },
        {
            key: 'trayaTicketCreatedDate',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && !trayaTicketCreatedDate.value,
            message: 'This field is required',
        },
        {
            key: 'inputAddress',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && selectedCategory.value?.id == 197 && !inputAddress.value.address,
            message: 'This field is required',
        },
        {
            key: 'inputLandMark',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && selectedCategory.value?.id == 197 && !inputAddress.value.landmark,
            message: 'This field is required',
        },
        {
            key: 'mobileNumber',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && selectedCategory.value?.id == 197 && !mobileNumber.value,
            message: 'This field is required',
        },
        {
            key: 'rescheduleDate',
            check: (topHeader.user_id == 3000 || topHeader.user_id == 903) && (selectedCategory.value?.id == 197 || selectedCategory.value?.id == 206) && !selectedRescheduleDate.value,
            message: 'This field is required',
        },
    ];

    let hasError = false;

    // Clear all error messages initially
    Object.keys(errorMessage.value).forEach((key) => {
        errorMessage.value[key] = '';
    });

    // Iterate through validationOrder and update errorMessage accordingly
    for (const { key, check, message } of validationOrder) {
        if (check) {
            errorMessage.value[key] = message;
            hasError = true;
        }
    }

    return hasError;
};

const validateField = (key) => {
    errorMessage.value[key] = '';
};

// on airway bill No - api call
const airwayBillNoFunction = async (event) => {
    errorMessage.value = {
        vendor: '',
        department: '',
        category: '',
        subject: '',
        airwayBillNo: '',
        fileUpload: '',
        ticketType: '',
        customerType: '',
        trayaTicketCreatedDate: '',
    };
    if (event instanceof Event && event.type === 'blur' && showAirwayBillNoDetails.value) {
        return; //if paste event occurs the blur event is stop
    } else if (airwayBillNo.value == '' || airwayBillNo.value == undefined) {
        isLoading.value = false;
    } else {
        isLoading.value = true;
        errorMessage.value.airwayBillNo = '';
        errorMessage.value.vendor = '';
        const res = await getairwayBillNoDetails(airwayBillNo.value); // api function call
        if (res.status === 'success') {
            showAirwayBillNoDetails.value = true;
            airwayBillNoDetails.value = res.data;
            isLoading.value = false;
            showTurnaroundTime.value = false;
            subject.value = '';
            selectedCategory.value = '';
            // vendorData.value = [res.data.user_name, res.data.vendor_id];
            const vendor_user_name = res.data.user_name;
            const vendor_user_id = res.data.vendor_id;
            vendorData.value.push(vendor_user_name, vendor_user_id);

            if ((topHeader.user_id == 3000 || topHeader.user_id == 903) && dataVariables.value.isCreateNewTicketModalVisible == true) {
                const categoryPaylod = {
                    awb_no: airwayBillNo.value,
                    department_id: selectedDepartment.value.id,
                };
                const cataRes = await getCategoryOptionsApi(categoryPaylod);
                if (cataRes.status == 'success') {
                    categoryData.value = cataRes.data;
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: cataRes.message, life: 3000 });
                    showTurnaroundTime.value = false;
                }
            }
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
            // airwayBillNo.value = '';
            isLoading.value = false;
            showAirwayBillNoDetails.value = false;
            vendorData.value = [];
        }
    }
};

const handleAirwayBillNo = (event, value) => {
    if (event instanceof Event && ['insertFromPaste'].includes(event.inputType)) {
        airwayBillNoFunction();
        return;
    } else if (value == '') {
        showAirwayBillNoDetails.value = false;
        vendorData.value = [];
        isLoading.value = false;
        errorMessage.value.airwayBillNo = topHeader.user_id == 3000 || topHeader.user_id == 903 ? 'This field is required' : '';
    } else if (isAlphanumeric(value)) {
        errorMessage.value.airwayBillNo = (topHeader.user_id == 3000 || topHeader.user_id == 903) & !value ? 'This field is required' : '';
    } else {
        airwayBillNo.value = airwayBillNo.value.slice(0, -1);
    }
};

// validate inputs
const validateValue = (event) => {
    const { name, value } = event.target;
    switch (name) {
        case 'airwayBillNo':
            handleAirwayBillNo(event, value);
            break;
        case 'mobileNumber':
            if (!/^\d{1,10}$/.test(value)) {
                mobileNumber.value = mobileNumber.value.slice(0, -1);
            }
            break;
        // case 'subject':
        //     errorMessage.value.subject = value ? '' : 'This field is required';
        //     break;
        default:
            break;
    }
};

const isEnglishText = (event) => {
    const pastedText = event.clipboardData.getData('text/plain');
    if (!/^[a-zA-Z\s]*$/.test(pastedText)) {
        event.preventDefault();
    }
};

const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text/plain');
    if (event.target.name == 'mobileNumber' && !/^\d{1,10}$/.test(pastedText)) {
        event.preventDefault();
    }
    if (!isAlphanumeric(pastedText)) {
        event.preventDefault();
    }
};

// on select department
const checkDepartmentValue = async () => {
    awbRequiredDepartment();
    if (!isAwbValidDepartment.value) {
        errorMessage.value.airwayBillNo = '';
    }
    showTurnaroundTime.value = false;
    errorMessage.value.department = ''; // Clear department error message
    const categoryPaylod = {
        department_id: selectedDepartment.value.id,
    };
    const res = await getCategoryOptionsApi(categoryPaylod);
    if (res.status == 'success') {
        categoryData.value = res.data;
        selectedCategory.value = ''; // added this because if any user select the departemnt and the select the ctegory then change the department the value of category shows empty but inside it value doesnt get empty so the error message is not display and ticket is formed
        subject.value = ''; // added this due to the bug number 27 in tickets the screen shot is attached here https://paste.pics/RN6KM
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
    }
    showTurnaroundTime.value = false;
};

// get category data
const getCategory = async (categoryValue) => {
    if (categoryValue.id == 206 || categoryValue.id == 197) {
        const res = await getRescheduleDateApi(categoryValue.id);
        rescheduleDates.value = res.data.reschedule_dates;
    }

    selectedCategory.value = categoryValue;
    subject.value = categoryValue.value;
    showTurnaroundTime.value = true;
    categoryData.value.map((ele) => {
        if (ele.value === categoryValue.value) turnaroundTime.value = ele.tat_date;
    });
    errorMessage.value.category = '';
    errorMessage.value.fileUpload = '';
};

// on submit
const ticketSubmit = async () => {
    isLoadingSubmit.value = true;
    const validate = validateDetails();
    if (isAwbValidDepartment.value && !airwayBillNo.value) {
        errorMessage.value.airwayBillNo = 'This field is required';
        isLoadingSubmit.value = false;
        return;
    } else {
        errorMessage.value.airwayBillNo = '';
    }
    if (validate) {
        isLoadingSubmit.value = false;
        return;
    }

    data.value = {
        awb_no: airwayBillNo.value,
        ticket_date: topHeader.user_id != 3000 && topHeader.user_id != 903 ? '' : trayaTicketCreatedDate.value,
        department_id: selectedDepartment.value?.id,
        category_id: selectedCategory.value?.id,
        address: inputAddress.value.address,
        landmark: inputAddress.value.landmark,
        reschedule_date: selectedRescheduleDate.value?.value,
        mobile: mobileNumber.value,
        subject: subject.value,
        description: description.value,
        attachment: file.value,
        ticket_type: topHeader.user_id != 3000 && topHeader.user_id != 903 ? 0 : selectedTicketType.value?.id,
        customer_type: topHeader.user_id != 3000 && topHeader.user_id != 903 ? 0 : selectedCustomerType.value?.id,
    };
    if (checkUserType('admin') || checkUserType('subadmin')) {
        console.log(vendorData.value[1]);

        data.value.selected_vendor_id = vendorData.value[1];
        data.value.is_show_vendor = checkboxData.is_checked ? 1 : 0;
    }
    // store the filled values
    const filledValues = ref({});
    Object.keys(data.value).forEach((key) => {
        if (data.value[key] !== null && data.value[key] !== '' && data.value[key] !== undefined) {
            filledValues.value[key] = data.value[key];
        }
    });
    await store.dispatch(`${NEWVIEWTICKET.NAME}/getNewTicketData`, filledValues.value);
    const newTicketStatus = store.getters[`${NEWVIEWTICKET.NAME}/sendNewTicketStatus`];
    if (newTicketStatus.status === 'success') {
        toast.add({ severity: 'success', summary: 'Success', detail: newTicketStatus.message, life: 3000 });
        dataVariables.value.isCreateNewTicketModalVisible = false;
        router.push('/tickets/open');
        dataTableFncs.getDataTableData();
        clearData();
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: newTicketStatus.message, life: 3000 });
        // clearData();
    }
    isLoadingSubmit.value = false;
};

// clear data
const clearData = () => {
    ticketDepartmentApiCall();
    vendorData.value = [];
    checkboxData.is_checked = false;
    airwayBillNo.value = '';
    trayaTicketCreatedDate.value = null;
    inputAddress.value = {};
    mobileNumber.value = '';
    subject.value = '';
    description.value = '';
    selectedDepartment.value = '';
    selectedCategory.value = '';
    selectedTicketType.value = '';
    selectedCustomerType.value = '';

    // clear error values
    for (const key in errorMessage.value) {
        errorMessage.value[key] = '';
    }

    // clear airway bill details
    for (const key in airwayBillNoDetails.value) {
        airwayBillNoDetails.value[key] = '';
    }
    showAirwayBillNoDetails.value = false;
    showTurnaroundTime.value = false;
};

// vendor model
const isAdmin = ref(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        vendorData.value = tempData;
        isAdmin.value = false;
    });
    errorMessage.value.vendor = '';
    airwayBillNo.value = '';
    showAirwayBillNoDetails.value = false;
    if (airwayBillNoDetails.value) airwayBillNoDetails.value.user_name = '';
};

const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
    airwayBillNo.value = '';
    showAirwayBillNoDetails.value = false;
};

watch(vendorData, (newValue) => {
    vendorData.value = newValue;
});

//upload file
const listenFileUploadChange = async (val) => {
    const res = await getFileUploadApi(val);
    if (res.status == 'error') {
        if (fileUploadComponent.value) {
            fileUploadComponent.value.clearFile();
        }
        toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
        return;
    }
    file.value = res.file_name;
    errorMessage.value.fileUpload = '';
};

// department api
const ticketDepartmentApiCall = async () => {
    const res = await getDepartmentOptionsApi();
    if (res.status == 'success') {
        departmentData.value = res.data;
        if (topHeader.user_id == 3000 || topHeader.user_id == 903) {
            selectedDepartment.value = {
                id: 16,
            };
            checkDepartmentValue(selectedDepartment);
        }
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
    }
};

// formatted customer details
const formattedCustomerDetails = computed(() => {
    const details = [];
    if (airwayBillNoDetails.value.customer_name) {
        details.push(airwayBillNoDetails.value.customer_name);
    }
    if (airwayBillNoDetails.value.customer_mobile_no) {
        if (details.length > 0) {
            details.push(', ');
        }
        details.push(airwayBillNoDetails.value.customer_mobile_no);
    }
    if (airwayBillNoDetails.value.customer_email) {
        if (details.length > 0) {
            details.push(', ');
        }
        details.push(airwayBillNoDetails.value.customer_email);
    }
    return details.join('');
});

// formatted customer address
const formattedCustomerAddress = computed(() => {
    const address = [];
    if (airwayBillNoDetails.value.customer_address1) {
        address.push(airwayBillNoDetails.value.customer_address1);
    }
    if (airwayBillNoDetails.value.customer_address2 !== ' ') {
        if (address.length > 0) {
            address.push(', ');
        }
        address.push(airwayBillNoDetails.value.customer_address2);
    }
    if (airwayBillNoDetails.value.customer_city && airwayBillNoDetails.value.pincode) {
        if (address.length > 0) {
            address.push(', ');
        }
        address.push(`${airwayBillNoDetails.value.customer_city} - ${airwayBillNoDetails.value.pincode}`);
    }
    if (airwayBillNoDetails.value.customer_state) {
        if (address.length > 0) {
            address.push(', ');
        }
        address.push(airwayBillNoDetails.value.customer_state);
    }
    return address.join('');
});

onMounted(() => {
    document.body.classList.add('create-new-ticket-modal');
    if (checkAccessRight() || deepCheckAccessRight('domestic', 'support_ticket', 'add')) {
        ticketDepartmentApiCall();
    }

    showAirwayBillNoDetails.value = false;
});

onUnmounted(() => {
    document.body.classList.remove('create-new-ticket-modal');
});
const isLoadingSubmit = ref(false);
</script>
<template>
    <DialogView id="create-new-ticket-modal" v-model:visible="dataVariables.isCreateNewTicketModalVisible" :modal="true" :draggable="false" dismissableMask>
        <template #header>
            <div class="flex justify-between items-center gap-2 w-full">
                <div class="text-[18px] font-semibold tracking-normal">New Ticket</div>
                <div class="flex justify-between items-center gap-2">
                    <BaseButton :size="'small'" :name="'Cancel'" :type="'secondary'" @click="closeModal" />
                    <BaseButton :size="'small'" @click="ticketSubmit" :isLoading="isLoadingSubmit" />
                </div>
            </div>
        </template>
        <div class="w-[95vw] mx-auto bg-[#f1f3f5] dark:bg-[#212121] font-interRegular p-4 flex justify-center gap-4 rounded-[4px]">
            <div class="items-center block bg-[#fff] dark:bg-[#313131] rounded-[4px]">
                <div class="ticket max-w-[304px] md:min-w-[752px] xl:min-w-[752px] items-center w-full">
                    <!-- basic details -->
                    <div class="flex items-center py-[12px] px-[24px]">
                        <img :src="getImg('basic-details')" class="pr-[16px]" />
                        <div class="text-[14px] text-[#1d252b] font-semibold dark:text-[#fff]">Basic Details</div>
                    </div>
                    <hr class="m-[0] bg-[#f1f3f5] dark:bg-[#313131]" />
                    <div class="m-4 md:my-10 md:mx-24">
                        <!-- airway bill No -->
                        <div class="pb-[16px] relative">
                            <BaseLabel :labelText="'Airway Bill No'" :showAsterisk="isAwbValidDepartment || topHeader.user_id == 3000 || topHeader.user_id == 903 ? true : false" />
                            <BaseInput
                                v-model="airwayBillNo"
                                twClasses="!h-[32px] !rounded-[4px] !text-[13px] !text-[#1d252b] mb-2 border-[#dfe3e6] w-full dark:!bg-[#4d4d4d] dark:!text-[#fff] font-interRegular placeholder:font-interRegular"
                                placeholder="Enter Airway Bill No"
                                name="airwayBillNo"
                                @input="validateValue"
                                autoComplete="off"
                                @paste="handlePaste"
                                @focusout="airwayBillNoFunction"
                            />
                            <!-- @blur="airwayBillNoFunction"  // remove this because 2 times api is called if user have any acyion in awb and 2 error message occurs -->
                            <div class="text-[10px] text-[red] absolute left-1 bottom-2" v-if="errorMessage.airwayBillNo">{{ errorMessage.airwayBillNo }}</div>
                            <!-- details -->
                            <div v-if="showAirwayBillNoDetails && !isLoading" class="bg-[#f4f7f9] dark:bg-[#363636] p-2 rounded-lg">
                                <div class="flex flex-col md:flex-row items-center pb-[6px] md:gap-20">
                                    <div class="flex items-center w-full md:w-auto">
                                        <div class="text-[#3c4249] text-[11px] md:text-[12px] w-[50%] md:w-auto dark:text-[#DFDFDF]">Order Number :</div>
                                        <span class="text-[#0c0c0d] text-[11px] md:text-[12px] w-[50%] md:w-auto font-interMedium md:pl-1 dark:text-[#ffffff]">{{ airwayBillNoDetails.order_number }}</span>
                                    </div>
                                    <div class="flex items-center w-full md:w-auto">
                                        <div class="text-[#3c4249] text-[11px] md:text-[12px] w-[50%] md:w-auto dark:text-[#DFDFDF]">Courier :</div>
                                        <span class="text-[#0c0c0d] text-[11px] md:text-[12px] w-[50%] md:w-auto font-interMedium md:pl-1 dark:text-[#ffffff]">{{ airwayBillNoDetails.logistics }}</span>
                                    </div>
                                    <div class="flex items-center w-full md:w-auto">
                                        <div class="text-[#3c4249] text-[11px] md:text-[12px] w-[50%] md:w-auto dark:text-[#DFDFDF]">Tracking Status :</div>
                                        <span class="text-[#0c0c0d] text-[11px] md:text-[12px] w-[50%] md:w-auto font-interMedium md:pl-1 dark:text-[#ffffff]">{{ airwayBillNoDetails.tracking_status }}</span>
                                    </div>
                                </div>
                                <div class="flex w-full md:w-auto">
                                    <div class="text-[#3c4249] text-[11px] md:text-[12px] pb-[6px] w-[50%] md:w-auto dark:text-[#DFDFDF]">Customer Details :</div>
                                    <span class="text-[#0c0c0d] text-[11px] md:text-[12px] w-[50%] md:w-auto font-interMedium md:pl-1 break-words dark:text-[#ffffff] captilize">{{ formattedCustomerDetails }}</span>
                                </div>
                                <div class="flex w-full md:w-auto">
                                    <div class="text-[#3c4249] text-[11px] md:text-[12px] pb-[6px] w-[50%] md:max-w-[115px] md:w-[100%] font-interMedium dark:text-[#DFDFDF]">Customer Address :</div>
                                    <span class="text-[#0c0c0d] text-[11px] md:text-[12px] w-[50%] md:max-w-[120px] md:w-[100%] font-interMedium md:pl-1 break-words dark:text-[#ffffff]">{{ formattedCustomerAddress }}</span>
                                </div>
                            </div>
                            <div v-if="isLoading && !showAirwayBillNoDetails" class="bg-[#f4f7f9] dark:bg-[#363636] p-2 rounded-lg">
                                <Skeleton height="70px" width="100%"></Skeleton>
                            </div>
                        </div>

                        <!-- vendor -->
                        <div v-if="!checkUserType('vendor')" class="pb-[24px] relative">
                            <BaseLabel :labelText="'Select Vendor'" :showAsterisk="true" />
                            <div class="flex flex-col md:flex-row gap-2 md:gap-0">
                                <div class="w-[100%] md:w-[50%] border-[#dfe3e6] h-[32px] border px-3 py-[5px] rounded-[4px] dark:bg-[#4d4d4d] dark:border-[#383b40]">
                                    <div v-if="!checkUserType('vendor')" class="flex align-items-center gap-2">
                                        <button @click="showVendorModal()" class="show-vendor-btn w-full flex items-center gap-[6px]">
                                            <img :src="getImg('ticket-pending-vendor', darkModeVal)" class="" />
                                            <span v-if="vendorData.length == 0" @click="showVendorModal()" class="pointer text-[13px] text-[#1d252b] dark:text-[#dfdfdf]"> Select Vendor </span>
                                            <span v-else class="text-[13px] text-[#1d252b] text-ellipsis whitespace-nowrap overflow-hidden dark:text-[#dfdfdf]">
                                                {{ airwayBillNoDetails?.user_name ? airwayBillNoDetails.user_name : vendorData[0] }}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <BaseCheckBox :data="checkboxData" @listenCheckboxChange="isCheckedCheckbox" class="w-[100%] md:w-[50%] md:pl-4" />
                            </div>
                            <div v-if="errorMessage.vendor" class="text-[10px] text-[red] absolute left-1 bottom-2">{{ errorMessage.vendor }}</div>
                        </div>
                        <!-- traya ticket created Data -->
                        <div v-if="topHeader.user_id == 3000 || topHeader.user_id == 903" class="pb-[24px] relative">
                            <BaseLabel :labelText="'Traya Ticket Created Date'" :showAsterisk="true" />
                            <SingleDatePicker @date-value="dateValue" :max-date="getTomorrowDate()" placeholder="Select Date" />
                            <div class="text-[10px] text-[red] absolute" v-if="errorMessage.trayaTicketCreatedDate">{{ errorMessage.trayaTicketCreatedDate }}</div>
                        </div>
                        <!-- select Department & Category -->
                        <div class="pb-[24px]">
                            <div class="w-[100%] flex gap-4 flex-col md:flex-row">
                                <div class="w-[100%] md:w-[50%] relative">
                                    <BaseLabel :labelText="'Select Department'" :showAsterisk="true" />
                                    <BaseDropdown
                                        @listenDropdownChange="(val) => (selectedDepartment = val)"
                                        :disabled="topHeader.user_id == 3000 || topHeader.user_id == 903"
                                        :options="departmentData"
                                        filter
                                        :defaultValue="(topHeader.user_id == 3000 || topHeader.user_id == 903) && 16"
                                        twClasses="w-[100%]"
                                        :placeholder="'Select Department'"
                                        @change="checkDepartmentValue"
                                    />
                                    <div class="text-[10px] text-[red] absolute">{{ errorMessage.department }}</div>
                                </div>
                                <div class="w-[100%] md:w-[50%] relative">
                                    <BaseLabel :labelText="'Select Category'" :showAsterisk="true" />
                                    <BaseDropdown @listenDropdownChange="getCategory" :options="categoryData" twClasses="w-[100%]" :placeholder="'Select..'" />
                                    <div class="text-[10px] text-[red] absolute">{{ errorMessage.category }}</div>
                                </div>
                            </div>

                            <div v-if="showTurnaroundTime" class="text-[#366cb8] md:w-[30%] w-[80%] ml-auto mt-2 text-[13px] bg-[#d9e9ff] right-0 bottom-0 px-[8px] py-[6px] rounded-[4px]">Turnaround Time: {{ turnaroundTime }}</div>
                        </div>
                        <div>
                            <!-- Address and LandMark -->
                            <div v-if="selectedCategory?.id == 197 && (topHeader.user_id == 3000 || topHeader.user_id == 903)" class="flex flex-col md:flex-row w-full gap-4 mt-2 mb-4">
                                <div class="w-[100%] md:w-[50%]">
                                    <BaseLabel :labelText="'Address'" :showAsterisk="true" />
                                    <BaseInput
                                        v-model="inputAddress.address"
                                        twClasses="!h-[32px] !rounded-[4px] !text-[13px] !text-[#1d252b] border-[#dfe3e6] w-full dark:!bg-[#4d4d4d] dark:!text-[#fff] placeholder:font-interRegular"
                                        placeholder="Enter Address"
                                    />
                                    <div class="text-[10px] text-[red]" v-if="errorMessage.inputAddress">{{ errorMessage.inputAddress }}</div>
                                </div>
                                <div class="w-[100%] md:w-[50%]">
                                    <BaseLabel :labelText="'Landmark'" :showAsterisk="true" />
                                    <BaseInput
                                        v-model="inputAddress.landmark"
                                        twClasses="!h-[32px] !rounded-[4px] !text-[13px] !text-[#1d252b] border-[#dfe3e6] w-full dark:!bg-[#4d4d4d] dark:!text-[#fff] placeholder:font-interRegular"
                                        placeholder="Enter Landmark"
                                    />
                                    <div class="text-[10px] text-[red]" v-if="errorMessage.inputLandMark">{{ errorMessage.inputLandMark }}</div>
                                </div>
                            </div>
                            <!-- mobile number -->
                            <div v-show="selectedCategory?.id == 197 && (topHeader.user_id == 3000 || topHeader.user_id == 903)" class="mb-4">
                                <BaseLabel :labelText="'Mobile Number'" :showAsterisk="true" />
                                <BaseInput
                                    v-model="mobileNumber"
                                    name="mobileNumber"
                                    @input="validateValue"
                                    :type="number"
                                    twClasses="!h-[32px] !rounded-[4px] !text-[13px] !text-[#1d252b] border-[#dfe3e6] w-full dark:!bg-[#4d4d4d] dark:!text-[#fff] placeholder:font-interRegular"
                                    placeholder="Mobile Number"
                                    :maxLength="10"
                                    autocomplete="off"
                                    @paste="handlePaste"
                                />
                                <div class="text-[10px] text-[red]" v-if="errorMessage.mobileNumber">{{ errorMessage.mobileNumber }}</div>
                            </div>
                            <!-- reschedule date -->
                            <div v-if="(selectedCategory?.id == 197 || selectedCategory?.id == 206) && (topHeader.user_id == 3000 || topHeader.user_id == 903)" class="mb-4">
                                <BaseLabel :labelText="'Reschedule Date'" :showAsterisk="true" />
                                <BaseDropdown @listenDropdownChange="(val) => (selectedRescheduleDate = val)" :options="rescheduleDates" twClasses="w-[100%]" :placeholder="'Select...'" />
                                <div class="text-[10px] text-[red]" v-if="errorMessage.rescheduleDate">{{ errorMessage.rescheduleDate }}</div>
                            </div>
                            <!-- ticket type & customer type -->
                            <div v-if="topHeader.user_id == 3000 || topHeader.user_id == 903" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-1">
                                <div class="w-[100%] md:w-[50%] relative">
                                    <BaseLabel :labelText="'Select Ticket Type'" :showAsterisk="true" />
                                    <BaseDropdown
                                        @listenDropdownChange="
                                            (val) => {
                                                selectedTicketType = val;
                                                validateField('ticketType');
                                            }
                                        "
                                        :options="ticketTypesOptions"
                                        twClasses="w-[100%]"
                                        :placeholder="'Select...'"
                                    />
                                    <div class="text-[10px] text-[red] absolute" v-if="errorMessage.ticketType">{{ errorMessage.ticketType }}</div>
                                </div>
                                <div class="w-[100%] md:w-[50%] relative">
                                    <BaseLabel :labelText="'Select Customer Type'" :showAsterisk="true" />
                                    <BaseDropdown
                                        @listenDropdownChange="
                                            (val) => {
                                                selectedCustomerType = val;
                                                validateField('customerType');
                                            }
                                        "
                                        :options="customerSelectOptions"
                                        twClasses="w-[100%]"
                                        :placeholder="'Select...'"
                                    />
                                    <div class="text-[10px] text-[red] absolute" v-if="errorMessage.customerType">{{ errorMessage.customerType }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- subject -->
                        <div class="py-[24px] relative">
                            <BaseLabel :labelText="'Subject'" :showAsterisk="false" />
                            <BaseInput
                                v-model="subject"
                                twClasses="!h-[32px] !rounded-[4px] !text-[13px] !text-[#1d252b] w-full dark:!bg-[#4d4d4d] dark:!text-[#fff] placeholder:font-interRegular"
                                placeholder="Enter Your Subject"
                                name="subject"
                                @input="validateValue"
                                @paste.prevent="isEnglishText"
                            />
                            <div class="text-[10px] text-[red] absolute bottom-2">{{ errorMessage.subject }}</div>
                        </div>
                        <!-- description -->
                        <div class="pb-[24px] flex flex-col" :class="{ 'pt-[24px]': topHeader.user_id == 3000 || topHeader.user_id == 903 }">
                            <BaseLabel :labelText="'Description'" :showAsterisk="false" />
                            <BaseTextarea
                                v-model="description"
                                twClasses="border-[#dfe3e6] rounded-[4px] h-[80px] bg-[fff] dark:!bg-[#4d4d4d]"
                                placeholder="Enter Description"
                                name="description"
                                @input="validateValue"
                                @paste.prevent="isEnglishText"
                            />
                        </div>
                        <!-- upload -->
                        <BaseFileUpload
                            ref="fileUploadComponent"
                            fileID="file-upload"
                            file-type="*"
                            @listenFileUploadChange="(val) => listenFileUploadChange(val)"
                            @clearFile="(val) => (file = val)"
                            twClasses="w-full h-44 rounded-xl h-44 rounded-xl dark:bg-[#4d4d4d] border-2 dark:border-[#5d5d5d] border-dashed"
                        />
                        <div class="text-[10px] text-[red]">{{ errorMessage.fileUpload }}</div>
                    </div>
                </div>
            </div>
        </div>
    </DialogView>
    <VendorModal v-if="!checkUserType('vendor') && isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" :vendorId="vendorData" />
</template>
<style lang="scss">
@import '../../../../../assets/itl-common-css/common-css.scss';

#create-new-ticket-modal {
    font-family: $interRegular !important;

    .dp__input_icon_pad {
        padding: 4px 12px;

        &::placeholder {
            font-family: $interRegular !important;
            font-weight: normal;
        }
    }

    .p-dropdown .p-dropdown-label.p-placeholder {
        font-size: 13px;
    }

    .p-dropdown .truncate {
        font-size: 13px;
    }

    .p-dialog-header-icons {
        display: none !important;
    }

    .p-dialog-content {
        padding-bottom: 0px !important;
        padding: 0;
    }

    .p-dropdown-items-wrapper {
        width: 100% !important;
    }

    .p-icon {
        width: 13px;
        height: 13px;
    }

    .ticket {
        @media (min-width: 320px) and (max-width: 374px) {
            max-width: 280px !important;
        }
    }
}

.darkTheme #create-new-ticket-modal .dp__input {
    background-color: #4d4d4d;
    border: 1px solid #5d5d5d;
    color: #dfdfdf;
}

.darkTheme #create-new-ticket-modal .p-inputtext.p-placeholder {
    color: #dfdfdf;
}
</style>
