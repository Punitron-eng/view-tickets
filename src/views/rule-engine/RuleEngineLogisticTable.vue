<script setup lang="ts">
import { ref, watchEffect, watch, onBeforeMount } from 'vue';
import getImg from '../../util/getImg';
import SideComponent from './components/SideComponent.vue'; // component
import LogisticDataComponent from './components/LogisticDataComponent.vue'; // component
import { useStore } from 'vuex';
import { onMounted, onBeforeUnmount, computed } from 'vue';
import 'vue3-circle-progress/dist/circle-progress.css';
import { DARKMODE } from '../../store/dark-mode/constants';
import RuleEngineDropDown from './RuleEngineDropDown.vue';
import { checkUserType } from '../../util/commonHandlers';
import VendorModal from '../../components/common-modal-files/VendorModal.vue';
import { useToast } from 'primevue/usetoast';
import { RULEENGINE } from '../../store/rule-engine/constants'; // import constants
import BaseInput from '../../components/base/BaseInput.vue';
import { addRule } from '../../api/rule-engine/RuleEngineList';
import { useRouter, useRoute } from 'vue-router';
import ConfirmationModal from './modal/confirmationModal.vue';

const router = useRouter();
const route = useRoute();
const resetValue = ref(null);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const logisticData = computed(() => store.getters[`${RULEENGINE.NAME}/logisticsdata`]); // ruleLogisticsData from store
const dropdownDataComputed = computed(() => store.getters[`${RULEENGINE.NAME}/dropdowndata`]); // dropdownData from store
const ruleNameStore = computed(() => store.getters[`${RULEENGINE.NAME}/rulename`]); // rulename from store
const selectedVendorData = computed(() => store.getters[`${RULEENGINE.NAME}/showVendorID`]); // ruleListData from store
const cloneData = computed(() => store.getters[`${RULEENGINE.NAME}/showCloneData`]); // get clone data from store
const disabledDropdown = computed(() => store.getters[`${RULEENGINE.NAME}/disableddropdowndata`]); // get disabled dropdown data from store
let isFirstUpdate = true;
const clonedVendorId = ref();
const dropdownData = ref();
const vendorDataid = ref();
const store = useStore();
const toast = useToast();
const isLoading = ref<boolean>(false);
const showConfirmationModal = ref<boolean>(false);
const ruleName = ref(route.params.id ? cloneData.value[0]?.rule_name : ''); // user Input rule name
const activeBtn = ref([
    { Label: 'Best rated', active: false },
    { Label: 'Cheapest', active: false },
    { Label: 'Fastest', active: false },
    { Label: 'Custom', active: true },
]);

watchEffect(async () => {
    dropdownData.value = route.params.id ? cloneData?.value[0]?.rule : dropdownDataComputed.value;
    if (cloneData?.value.length == 0) {
        dropdownData.value = dropdownDataComputed.value;
    }
    // on reload ruleName 
    if (ruleName.value == undefined && route.params.id && dropdownDataComputed.value.length == 0) {
        ruleName.value = cloneData.value[0]?.rule_name;
        await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value);
    }
});

onMounted(async () => {
    document.body.classList.add('rule-engine-drop');
    if (route.params.id && cloneData.value.length !== 0) {
        ruleName.value = cloneData.value[0]?.rule_name;
        await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value);
    }
    if (cloneData.value.length == 0 && ruleName.value == '') {
        //empty the ruleName when new rule starts
        ruleName.value == '' && (await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value));
        console.log(ruleName.value, ruleNameStore.value, 'on munted enter when no rule name');
    }
});

onBeforeMount(async () => {
    // check vendor in localStorage
    if (route.params.vendorId) {
        if (localStorage.getItem('clonedVendorData') == null) {
            localStorage.setItem('clonedVendorData', selectedVendorData.value);
            console.log(selectedVendorData, 'seleted vendor data');
        } else {
            vendorDataid.value = localStorage.getItem('clonedVendorData')?.split(',');
            await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, vendorDataid.value);
        }
    }
    vendorDataid.value = selectedVendorData.value;
});
onBeforeUnmount(() => {
    document.body.classList.remove('rule-engine-drop');
});

//user input rule-name function
const inputRuleValue = async (event) => {
    if (event.target.value) {
        ruleName.value = event.target.value;
        await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value); // action call
    } else {
        ruleName.value = '';
        await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value);
    }
};
const dragchangesvalue = (e) => {
    // list.value.map((res, index) => res.id = index + 1)
};

// payload format data function
const formatData = (id: number, data: any) => {
    if (id == 10 && data) {
        // channel and store
        return [{ channel_id: data.channel.id }, { store_id: data.store.id }];
    } else if (id == 6 && data) {
        // customer pincode and filename
        const result: { pickup_from?: any; fileName?: any }[] = [];
        const pickup_form = data.pickup_from?.map((ele: any) => ele).join(',');
        pickup_form && result.push({ pickup_from: pickup_form });
        data.fileName?.fileNamePayload && result.push({ fileName: data.fileName.fileNamePayload });
        return result;
    } else if ((id == 5 || id == 7) && data) {
        // state and city
        return data.map((item: any) => {
            const { from, to } = item;
            return id === 5 ? { from_id: from.id, to_id: to.id } : { from_id: from.id, to_id: to.id };
        });
    } else if (id == 3 && data) {
        // zones
        return data.map((ele: any) => ele).join(',');
    } else if (id == 8 && data) {
        // assigned time
        // return data?.value;
        return id == 8 && data.fromValue ? { fromValue: data.fromValue, toValue: data.toValue } : data;
    } else if (id == 9 && data) {
        // product sku
        return data.fileNamePayload;
    } else if (id == 1 && data) {
        // payment
        return data.value;
    } else {
        return data;
    }
};

const buttonLoading = ref(false);
// on save
const save = async (isConfirm: boolean) => {
    const checked = logisticData.value.filter((res) => res.logistic_isChecked);
    const other = activeBtn.value.filter((ele) => ele.active);
    // on click reset in confirmation modal
    if(onResetClick.value){
        onResetClick.value = false;
        showConfirmationModal.value = false;
        resetRules();
        return
    }
    if (ruleNameStore.value == '' || ruleNameStore.value == undefined) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Rule Name cannot be empty', life: 3000 });
    } else if (other[0].Label == 'Custom' && checked?.length < 1) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Select the Logistics', life: 3000 });
    } else {
        buttonLoading.value = true;
        const payload: any = {
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
            is_confirmed: isConfirm ? 1 : 0,
            ruleName: ruleNameStore.value,
            ruleData: dropdownData.value.map((ele) => {
                return {
                    id: ele.id,
                    label: ele.value,
                    ...(ele.condition && { condition: `${ele.condition.id}` }),
                    value: formatData(ele.id, ele.inputValue),
                };
            }),
            priorityType: other[0].Label,
            rulePriorityData:
                other[0].Label == 'Custom'
                    ? [
                          {
                              logistic_id: logisticData.value
                                  .filter((ele) => ele.logistic_isChecked)
                                  .map((ele) => ele.logistic_id)
                                  .join(','),
                          },
                          {
                              logistic_id_blocked: logisticData.value
                                  .filter((ele) => !ele.logistic_isChecked)
                                  .map((ele) => ele.logistic_id)
                                  .join(','),
                          },
                      ]
                    : '',
        };
        const addRuleApi = await addRule(payload);
        if (addRuleApi.status == 'success') {
            if (addRuleApi?.is_show_modal == 1) {
                showConfirmationModal.value = true;
                buttonLoading.value = false;
            } else {
                toast.add({ severity: 'success', summary: 'Success', detail: addRuleApi.html_message, life: 3000 });
                buttonLoading.value = false;
                dropdownData.value.splice(0);
                await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, dropdownData.value); // action call
                logisticData.value.splice(0);
                await store.dispatch(`${RULEENGINE.NAME}/getlogisticsdata`, logisticData.value); // empty logistic priority store variable
                selectedVendorData.value.splice(0); // empty vendor data variable
                await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, selectedVendorData.value);
                router.push({ name: 'ruleEngine' });
            }
        } else {
            buttonLoading.value = false;
            toast.add({ severity: 'error', summary: 'Error', detail: addRuleApi.html_message, life: 3000 });
        }
        // console.log(payload,'payload')
    }
};

//checkbox values
const changesValue = async (val: boolean, index: number) => {
    logisticData.value[index].logistic_isChecked = val; // checked logistics value
};

const changeBtn = (index: number) => {
    activeBtn.value.map((res, id) => {
        if (id == index) {
            res.active = true;
        } else {
            res.active = false;
        }
    });
};

// show sidecontent mediaQueries
const showContent = ref(false);
if (window.matchMedia('(max-width: 1199px)').matches) {
    // mobile view
    showContent.value = false;
} else {
    // desktop view
    showContent.value = true;
}

// side content function
const showSideContent = () => {
    showContent.value = !showContent.value;
};

// toggle dropdown function
const toggleDropdown = (index: number) => {
    logisticData.value[index].logistic_dropdown = !logisticData.value[index].logistic_dropdown;
};

const check = () => {
    if (dropdownData.value.length < 1) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Select Atleast one rule', life: 3000 });
    } else if (dropdownData.value[0].condition && dropdownData.value[0]?.condition == undefined) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'This field is required', life: 3000 });
    } else if (dropdownData.value[0]?.inputValue == undefined) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'This field is required', life: 3000 });
    } else {
        showRuleEngineDropDown.value = false;
        // console.log(dropdownData.value?.inputValue);
    }
};

const showRuleEngineDropDown = ref(true);
const checkVendorAndProceed = () => {
    if (vendorData?.value[0] && !checkUserType('vendor')) {
        check();
    } else if (checkUserType('vendor')) {
        check();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select vendor', life: 3000 });
    }
};

const checkConditions = (response) => {
    // if (!response.inputValue.fromValue || !response.inputValue.toValue) {
    //     return false;
    // }
    // console.log(response)
    if ((response.id === 2 || response.id === 4) && response.inputValue.fromValue && response.inputValue.toValue) {
        return Number(response.inputValue.fromValue) < Number(response.inputValue.toValue);
    } else if (response.id === 8 && response.inputValue.fromValue && response.inputValue.toValue) {
        return response.inputValue.fromValue.hours <= response.inputValue.toValue.hours;
    } else if (route.params.id && response.id === 9 && response.inputValue == '') {
        return false;
    } else if (route.params.id && response.id === 6 && (response.inputValue?.fileName === '' || response.inputValue?.fileName === undefined) && (!Array.isArray(response.inputValue?.pickup_from) || response.inputValue.pickup_from.length === 0)) {
        return false;
    }
    return true;
};
const proccedbtn = () => {
    const ValidationCheck = dropdownData.value.every((response) => {
        if (checkConditions(response)) {
            return true;
        } else {
            if (response.id === 2 || response.id === 4) {
                toast.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: `From Value of ${response.id === 2 ? 'Weight' : 'Order'} should not be  ${response.inputValue.fromValue === response.inputValue.toValue ? 'equal' : 'greater'} than To Value!`,
                    life: 3000,
                });
            } else if (response.id === 9) {
                toast.add({ severity: 'error', summary: 'Error Message', detail: 'Upload Product Sku File', life: 3000 });
            } else if (response.id === 6) {
                toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill Customer Pincode Details', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error Message', detail: `From Value of ${response.id === 8 ? 'Time' : ''} should not be  greater than To Value!`, life: 3000 });
            }
            return false;
        }
    });
    ValidationCheck
        ? checkVendorAndProceed()
        : (() => {
              throw new Error('Something Went Wrong');
          })();
    isEmpty = false;
};

// back btn
const backBtn = async () => {
    showRuleEngineDropDown.value = true;
};

// reset btn
const onResetClick = ref(false)
const resetBtn = async () => {
    //check any rules created
    if(dropdownData.value.length !== 0){
        showConfirmationModal.value = true;
        onResetClick.value = true;
    }else{
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'No Rules to reset', life: 3000 });
    }
};

const resetRules = async () => {
    await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, []); // action call
    ruleName.value = '';
    await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value); // clear rule name
    resetValue.value.resetValue();
    // clear all the selected value
}

const updateShowConfirmationModal = () => {
    showConfirmationModal.value = false;
    buttonLoading.value = false;
    onResetClick.value = false;
};
// vendor model
const isAdmin = ref<Boolean>(false);
const vendorData = ref(selectedVendorData);
const showVendorModal = () => {
    isAdmin.value = true;
    document.body.classList.add('rule-engine-overflow-hidden');
};

const applyVendorFilter = async (vendorName: any) => {
    vendorName.forEach(async (element: any) => {
        const tempData = element.split(',');
        const payload = {
            vendorID: tempData[1],
        };
        vendorData.value = tempData;
        await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, tempData);
        isAdmin.value = false;
    });
};

const closeVendorModal = () => {
    isAdmin.value = false;
    document.body.classList.remove('rule-engine-overflow-hidden');
};

const resetVendorFilter = async () => {
    await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, []); // action call
    resetValue.value.resetValue();
    vendorData.value = [];
    await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, []);
    isAdmin.value = false;
    localStorage.removeItem('vendorData');
    document.body.classList.remove('rule-engine-overflow-hidden');
};
watch(
    () => vendorData.value,
    async (newValue) => {
        if (vendorData.value[0]) {
            if (route.params.id) {
                if (isFirstUpdate) {
                    clonedVendorId.value = localStorage.getItem('clonedVendorData')?.split(',')[1];
                    isFirstUpdate = false;
                }
                if (newValue[1] !== clonedVendorId.value) {
                    resetBtn();
                } else {
                    const payload = {
                        rule_id: route.params.id,
                        vendor_id: !checkUserType('vendor') ? clonedVendorId.value : '',
                    };
                    await store.dispatch(`${RULEENGINE.NAME}/getCloneData`, payload);
                    ruleName.value = cloneData.value[0]?.rule_name;
                    await store.dispatch(`${RULEENGINE.NAME}/getrulename`, ruleName.value);
                }
                const params = { ...router.currentRoute.value.params }; //get the current params
                params.vendorId = newValue[1]; // update new value -- new vendorID
                router.push({ params }); // update the url
            }
            document.body.classList.remove('rule-engine-overflow-hidden');
        } else {
            if (route.params.id) {
                if (newValue.length == 0) {
                    const params = { ...router.currentRoute.value.params }; //get the current params
                    params.vendorId = ''; // remove the vendor Id from url.
                    router.push({ params }); // update the url
                }
            }
            document.body.classList.add('rule-engine-overflow-hidden');
        }
    }
);

import { provide } from 'vue';
provide('vendorData', vendorData);
provide('showRuleEngineDropDown', showRuleEngineDropDown);
import { inject } from 'vue';
let isEmpty = inject<any>('isEmpty');
</script>
<template>
    <ToastView />
    <div class="flex gap-2 justify-between">
        <div class="flex flex-col z-[10] right-0 left-0 lg:static re-main-outer min-h-[90vh] absolute">
            <!-- header content -->
            <div
                class="flex items-center justify-between z-[20] dark:text-[#fff] md:mt-[28px] mb-[20px] md:mx-[24px] fixed top-[99px] left-0 right-0 py-[16px] px-[16px] md:py-[0px] md:px-[0px] md:static bg-[#fff] dark:bg-[#212121] md:dark:bg-[transparent] md:bg-[transparent] md:h-[auto]"
                :class="checkUserType('vendor') ? 'h-[auto]' : 'h-[8rem]'"
            >
                <div class="w-[100%]">
                    <!-- vendor model -->
                    <div v-if="!checkUserType('vendor') && showRuleEngineDropDown" class="align-items-center gap-2 text-[13px] md:mt-[0px] mb-[3px]" :class="vendorData[0] ? 'block md:flex' : 'flex'">
                        <span v-if="vendorData.length == 0" @click="showVendorModal()" class="text-[#4b5563] dark:text-white text-[13px] md:pl-[10px] mt-[2px] cursor-pointer block"> Select Vendor</span>
                        <span v-else class="mt-[2px] md:mt-[0px] pr-[7px] md:pr-[0]">
                            {{ vendorData[0] }}
                        </span>
                        <button @click="showVendorModal()" class="show-vendor-btn mt-[4px] md:mt-[0px] md:md-[4px]">
                            <img :src="getImg('vendor_v3', darkModeVal)" alt="Logo" />
                        </button>
                    </div>
                    <div class="flex justify-between" v-if="vendorData.length !== 0 || checkUserType('vendor')">
                        <!-- ruleName -->
                        <div class="flex md:w-[70%]">
                            <img :src="getImg('re-rule-logo', darkModeVal)" alt="Logo" class="pr-[8px] md:pr-[16px] rulename-icon" />
                            <BaseInput
                                inputType="text"
                                id="ruleName"
                                name="ruleName"
                                autofocus
                                :twClasses="'rule rounded-[6px] w-[100%] bg-transparent !border-[#afb0b2] font-inter text-[16px] text-[#374151] dark:text-[#fff] dark:bg-transparent pl-[0px] font-normal text-ellipsis !h-[40px] !w-[70%] !md:w-[50%]'"
                                v-model="ruleName"
                                @input.trim="inputRuleValue"
                                placeholder="Enter Rule Name"
                            ></BaseInput>
                        </div>
                        <!-- buttons -->
                        <div class="flex items-center">
                            {{ formatData() }}
                            <button
                                v-if="!showRuleEngineDropDown"
                                class="px-[16px] py-[7px] rounded-full text-[#374151] text-[13px] border-[#d1d5db] bg-[#ffffff] font-inter shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] mr-[8px] dark:bg-[#4d4d4d] dark:text-[#d1d5db] border-[1px] border-solid w-[72px] dark:border-[#474747]"
                                @click="backBtn"
                            >
                                Back
                            </button>
                            <button
                                v-else
                                class="px-[16px] py-[7px] rounded-full text-[#374151] text-[13px] border-[#d1d5db] bg-[#ffffff] font-inter shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] mr-[8px] dark:bg-[#4d4d4d] dark:text-[#d1d5db] border-[1px] border-solid w-[72px] dark:border-[#474747]"
                                @click="resetBtn"
                            >
                                Reset
                            </button>
                            <button v-if="!showRuleEngineDropDown" class="bg-[#0052cc] px-[16px] py-[7px] rounded-full text-[#ffffff] text-[13px] border-[#0049b0] border-[1px] border-solid w-[72px] font-inter dark:border-[#0049b0]" @click="save()">
                                <div v-if="buttonLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                                <div v-else>Save</div>
                            </button>
                            <button
                                v-else
                                v-tooltip.top="disabledDropdown ? 'Please Complete the Rule' : ''"
                                :class="[
                                    disabledDropdown ? 'bg-[#84a9e0] border-[#84a9e0] hover:cursor-not-allowed' : 'bg-[#0052cc] border-[#0049b0]',
                                    'px-[16px] py-[7px] rounded-full text-[#ffffff] text-[13px]  border-[1px] border-solid w-[83px] font-inter dark:border-[#0049b0]',
                                ]"
                                @click="proccedbtn()"
                                :disabled="disabledDropdown"
                            >
                                Proceed
                            </button>

                            <img :src="getImg('re-display-icon', darkModeVal)" alt="" class="fixed bottom-[20px] right-[20px] md:static md:block xl:hidden cursor-pointer pl-[8px]" @click="showSideContent" />
                        </div>
                    </div>
                </div>
            </div>
            <RuleEngineDropDown ref="resetValue" v-if="showRuleEngineDropDown" class="relative top-[90px] md:top-[0px]" :vendorData="vendorData" />
            <!-- main content Component -->
            <LogisticDataComponent
                v-if="!showRuleEngineDropDown"
                :activeBtn="activeBtn"
                :isLoading="isLoading"
                :vendorId="vendorData[1]"
                @sendNewValues="dragchangesvalue"
                @handleChangeBtn="changeBtn"
                @handleToggleDropdown="toggleDropdown"
                @handleChangesValue="changesValue"
                @handleSideContent="showSideContent"
            />
            <!-- confirmation Modal  -->
            <div v-if="showConfirmationModal">
                <ConfirmationModal :showModal="showConfirmationModal" @SaveConfimation="(isConfirm) => save(isConfirm)" @cancleConfimation="updateShowConfirmationModal" :text="onResetClick && `Resetting this rule will remove all the custom rules you've created. This action cannot be undone.`" :confirmBtnText="onResetClick ? 'Reset' : 'Yes, Confirm'"/>
            </div>
            <!-- confirmation Modal  -->
        </div>

        <!-- sidebar content Component -->
        <SideComponent @handleSideContent="showSideContent" :showContent="showContent" />
        <!-- sidebar content -->
    </div>
    <VendorModal v-if="!checkUserType('vendor')" v-show="isAdmin" @close-modal="closeVendorModal" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" :vendorId="vendorDataid" />
</template>

<style lang="scss">
@import './RuleEngine.scss';
</style>
