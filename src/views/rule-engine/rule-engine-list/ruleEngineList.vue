<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import 'primeicons/primeicons.css';
import * as Types from './types';
import SkeletonComponent from './components/SkeletonComponent.vue';
import RuleListData from './components/RuleListData.vue';
import { useStore } from 'vuex';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
import { DARKMODE } from '../../../store/dark-mode/constants';
import getImg from '../../../util/getImg';
import { useToast } from 'primevue/usetoast';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const store = useStore();
import { getRuleListData } from '../../../api/rule-engine/RuleEngineList'; // import api
import { checkUserType } from '../../../util/commonHandlers'; // checkusertype
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import config from '../../../util/config';
import BaseDropdown from '../../../components/base/BaseDropdown.vue'; //base dropdown
import { apiHandler } from '../../../api/common/api';
import { getUpdateStatus } from '../../../api/rule-engine/RuleEngineList';
import { updateRuleList } from '../../../api/rule-engine/RuleEngineList';
import { checkAccessRight, deepCheckAccessRight } from '../../../util/commonHandlers';
import ConfirmationModal from '../modal/confirmationModal.vue';
const selectedState = ref<Types.State>({ id: 2, value: 'All' });
const toast = useToast();
const router = useRouter();
const route = useRoute();
const tempList = ref([]);
const state = ref([
    { id: 0, value: 'Active' },
    { id: 1, value: 'Inactive' },
    { id: 2, value: 'All' },
]);
const isLoading = ref<boolean>(false);
const showNorecord = ref<boolean>(false);
const currentStatusVal = ref<string>('active');
const showListData = ref<boolean>(true);
const totalCountData = ref<string>('');
const ruleListData = computed(() => store.getters[`${RULEENGINE.NAME}/rulelistdata`]); // ruleListData from store
const array = ref(ruleListData.value.rule_data); // store api data
const cloneData = computed(() => store.getters[`${RULEENGINE.NAME}/showCloneData`]); // get clone data from store
const currentStatusId = ref<number>(0);
const selectedVendorData = computed(() => store.getters[`${RULEENGINE.NAME}/showVendorID`]); // ruleListData from store
const showConfirmationModal = ref<boolean>(false);
const updateShowConfirmationModal = () => {
    showConfirmationModal.value = false;
    isLoading.value= true
    setTimeout(()=>{
        isLoading.value = false
    },1000)
};
// active dropdown
const updateList = computed(() => {
    array.value = ruleListData.value.rule_data; // - after api uncomment
    if (selectedState.value.value == 'Active') {
        tempList.value = array.value.filter((state) => state.isActive === true);
    } else if (selectedState.value.value == 'Inactive') {
        tempList.value = array.value.filter((state) => state.isActive === false);
    } else {
        tempList.value = array.value;
    }
    return tempList.value;
});

//handle Switch toggle - api call
const handleSwitch = async (index: number, val: boolean) => {
    (tempList.value[index] as { isActive: boolean }).isActive = val;
    const payloadData = {
        vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        rule_id:tempList.value[index].rule_id,
        status: val ? 'active' : 'inactive',
    };
    const updateStatus: any = await getUpdateStatus(payloadData);
    if(updateStatus.status == 'success'){
        toast.add({ severity: 'success', summary: 'Success', detail: updateStatus.html_message, life: 1000 });
        isLoading.value = true;
        const payload = {
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
            status: currentStatusVal.value,
        };
        await store.dispatch(`${RULEENGINE.NAME}/getrulelistdata`, payload); 
        // console.log('handle switch update status success')
        if(ruleListData.value.status == 'success'){
            isLoading.value = false;
            array.value = ruleListData.value.rule_data;
            totalCountData.value = ruleListData.value.rule_data.length;
            showNorecord.value = false;
            isLoading.value = false;

            let tempList = updateList.value;
            let tempUpdatedList = [];
            tempList.forEach((item, index) => {
                tempUpdatedList.push(`${item.rule_id}`);
            });
            updatedlistseq.value = tempUpdatedList;
            const payload = {
                vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
            };

            for (let index = updatedlistseq.value.length - 1; index >= 0; index--) {
                const res = updatedlistseq.value[index];
                const descendingIndex = updatedlistseq.value.length - index;
                payload[`update_priority[${res}]`] = descendingIndex;
            }
            const updateData: any = await updateRuleList(payload);
            // console.log(updateData,'updateData')
            if(updateData.status == 'success'){
                const payload = {
                    vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
                    status: currentStatusVal.value,
                };
                await store.dispatch(`${RULEENGINE.NAME}/getrulelistdata`, payload); 
            }
        } else {
            showNorecord.value = true;
            isLoading.value = false;
        }
    }else{
        toast.add({ severity: 'error', summary: 'Error', detail: updateStatus.html_message, life: 1000 });
        (tempList.value[index] as { isActive: boolean }).isActive = false;
    }
};

// on yes confirm - confirmation modal
const tempvalue = ref();
const testConfirm = (data : any)=>{
    handleSwitch(tempvalue.value.index,tempvalue.value.val)
    showConfirmationModal.value = false;
}

// handle switch data here
const changeVal = (data:any)=>{
    showConfirmationModal.value = !showConfirmationModal.value
    tempvalue.value = {index:data.index,val:data.val,currentStatus:data.currentStatusValue};
}

const updatedlistseq = ref('');
const updateStatus = async (currentStatus: any) => {
    currentStatusId.value = currentStatus.id;
    currentStatusVal.value = currentStatus.value.toLowerCase();
    const payload = {
        vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        status: currentStatus.value.toLowerCase(),
    };
    await store.dispatch(`${RULEENGINE.NAME}/getrulelistdata`, payload);
    // console.log('handle switch update status')
    if (ruleListData.value.status == 'success') {
        array.value = ruleListData.value.rule_data;
        totalCountData.value = ruleListData.value.rule_data.length;
        isLoading.value = false;
        showNorecord.value = false;
    } else {
        showNorecord.value = true;
        isLoading.value = false;
        totalCountData.value = '0'
    }
};
// toggle function
const toggleDropdown = (index: number) => {
    (tempList.value[index] as { isShow: boolean }).isShow = !(tempList.value[index] as { isShow: boolean }).isShow;
};


// clone Api 

const fetchCloneData = async (ruleId: number) => {
    const payload = {
        rule_id: ruleId,
        vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
    }
    await store.dispatch(`${RULEENGINE.NAME}/getCloneData`, payload)
}

// copy contents function
const cloneContents = async (ruleId: number, index: number) => {
    const values = array.value[index].rule;
    const copiedData = [] as any;
    values.map((data: any) => copiedData.push(data.value));
    await navigator.clipboard.writeText(copiedData);
    await fetchCloneData(ruleId)
    router.push({name: 'addRuleEngine', params: { id: ruleId, vendorId: !checkUserType('vendor') ? selectedVendorData.value[1] : '', }});
    console.log(selectedVendorData.value,'selected vendor value in store')
    !checkUserType('vendor') && localStorage.setItem("clonedVendorData",selectedVendorData.value);
};

watch(selectedVendorData, (newValue) => {
    console.log(newValue, 'watch selected Vendor Data')
})

// vendor model
const isAdmin = ref<boolean>(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
    document.body.classList.add('rule-engine-overflow-hidden');
};

const applyVendorFilter = async (vendorName: any) => {
    vendorName.forEach(async (element: any) => {
        isAdmin.value = false;
        const tempData = element.split(',');
        const payload = {
            vendorID: tempData[1],
        };
        vendorData.value = tempData;
        showListData.value = true;
        await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, tempData)
        apiCall(payload.vendorID); //api call here
    });
};

const resetVendorFilter = async () => {
    vendorData.value = [];
    await store.dispatch(`${RULEENGINE.NAME}/getselectedvendorID`, [])
    isAdmin.value = false;
    showListData.value = false;
    document.body.classList.remove('rule-engine-overflow-hidden');
};

const closeVendorModal = () => {
    isAdmin.value = false;
    document.body.classList.remove('rule-engine-overflow-hidden');
};

// For user-type  (Api call onMounted)
const apiCall = async (value) => {
    isLoading.value = true;
    const payload = {
        vendor_id: !checkUserType('vendor') ? value : '',
        status: 'active',
    };
    await store.dispatch(`${RULEENGINE.NAME}/getrulelistdata`, payload); // action call
    if (ruleListData.value.status == 'success') {
        array.value = ruleListData.value.rule_data;
        totalCountData.value = ruleListData.value.rule_data.length;
        showNorecord.value = false;
        isLoading.value = false;
    } else {
        totalCountData.value = '0';
        showNorecord.value = true;
        isLoading.value = false;
    }

};

onMounted(async () => {
    checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'view');
    // document.body.classList.add('rule-engine');
    showListData.value = !checkUserType('vendor') ? false : true;
    checkUserType('vendor') ? await apiCall() : ''; 
    localStorage.removeItem('clonedVendorData');
});

onBeforeUnmount(async () => {
    // document.body.classList.remove('rule-engine');
});


const changeRoute = async () => {
    if(checkUserType('vendor')){
        changePath()
    }
    else if(!checkUserType('vendor') && vendorData.value.length > 0){
        changePath()
    }
    else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select vendor', life: 1000 }); 
    }
}

const changePath = async () => {
    router.push('/add-new-rule')
    await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, []);
    await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    cloneData.value.splice(0);
    let emptyArray = {reset:true}   // empty the addStateCityArray
    await store.dispatch(`${RULEENGINE.NAME}/getaddstatecity`, emptyArray);
}

watch(
    () => vendorData.value,
    () => {
        if(vendorData.value[0]){
            document.body.classList.remove('rule-engine-overflow-hidden');
        }else{
            document.body.classList.add('rule-engine-overflow-hidden');
        }
    }
);
</script>

<template>
    <ToastView />
    <div class="relative rule-engine">
        <div class="md:m-[30px] rounded-[12px] h-50 overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.06)]">
            <!-- header -->
            <header
                class="flex justify-between items-center py-4 border-b-[1px] border-[#e5e7eb] border-box bg-[#fff] dark:border-[#474747] dark:bg-[#313131]">
                <div class="header-dropdown md:flex items-center w-[100%] md:w-[75%] justify-between md:justify-start">
                    <h1 class="ml-[18px] md:ml-[56px] mb-0 text-[20px] font-bold text-[#1f2937] dark:text-[#f3f4f6]">
                        Rule Engine</h1>

                    <div class="bg-[#ffffff] dark:bg-[#313131] ml-[18px] w-[auto] flex items-center cursor-pointer">
                        <!-- vendor model here -->
                        <div v-if="!checkUserType('vendor')" style="font-size: 14px"
                            class="flex align-items-center pt-[3px]">
                            <button @click="showVendorModal()" class="show-vendor-btn">
                                <div v-if="!isLoading">
                                    <span v-if="vendorData.length == 0" @click="showVendorModal()"
                                        style="cursor: pointer"
                                        class="py-[8px] text-[13px] font-[500] font-inter dark:text-[#d1d5db]"> Select
                                        Vendor</span>
                                    <span v-else class="border-none inline-block">
                                        <div>{{ vendorData[0] }}</div>
                                    </span>
                                    <button @click="showVendorModal()" class="show-vendor-btn ml-[0.3rem]">
                                        <img :src="getImg('vendor_v3', darkModeVal)" alt="Logo" />
                                    </button>
                                </div>
                                <div v-else class="flex items-center">
                                    <Skeleton width="3rem" height="1rem"></Skeleton>
                                </div>
                            </button>
                            <VendorModal v-if="!checkUserType('vendor')" v-show="isAdmin" @close-modal="closeVendorModal"
                                @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
                        </div>
                    </div>
                </div>
                <button
                    class="rule-button mr-[1.25rem] md:mr-5 px-4 md:py-2 md:rounded-full bg-[#0052cc] text-[#ffffff] text-[13px] border-[1px] border-[solid] border-[#0049b0] fixed bottom-0 left-0 right-0 w-[100%] z-[20] md:w-auto rounded-[0] py-[14px] md:static"
                    v-if="checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'add')"
                    @click="changeRoute">
                    New Rule
                </button>
            </header>
            <!-- container here -->
            <!-- onmounted -->
            <div v-if="!isLoading">
                <!-- user==1 and user==2 on mounted no rules image -->
                <div v-if="!checkUserType('vendor') && !showListData"
                    class="pt-[48px] px-[0.5rem] md:pl-[72px] md:pr-[72px] pb-[88px] border-1 bg-[#fff] dark:bg-[#313131] dark:border-none">
                    <div class="flex flex-col justify-center items-center w-full m-auto">
                        <img :src="getImg('no-rule', darkModeVal)" alt="Logo" />
                        <h4 class="text-[20px] text-[#1f2937] dark:text-[#f3f4f6]">Rule Engine</h4>
                        <p class="text-[16px] text-[#4b5563] dark:text-[#f3f4f6]">Please create a new rule</p>
                    </div>
                </div>

                <!-- rulesList on selecting vendor -->
                <div v-if="showListData"
                    class="pt-[32px] md:pt-[48px] md:pl-[72px] md:pr-[72px] pb-[88px] bg-[#fff] dark:bg-[#313131]">
                    <div class="dropdown flex  items-center mb-[24px]" :class="totalCountData > 0 ? 'justify-between' : 'justify-end'">
                        <!-- count of rules in the list according to selected state -->
                        <div
                            class="pl-[16px] text-[16px] font-inter text-[left] text-[#1f2937] dark:text-[#f3f4f6] font-medium" v-if="totalCountData > 0">
                            Total Count :<span v-if="!isLoading"> {{ totalCountData }} </span><span v-else>
                                <Skeleton width="3rem" height="1rem"></Skeleton>
                            </span>
                        </div>

                        <!-- base dropdown  -->
                        <BaseDropdown @listenDropdownChange="(val) => updateStatus(val)" :options="state"
                            :filter="false" :defaultValue='currentStatusId' twClasses="w-[6rem]"
                            class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#4f4f50] flex justify-self-end"/>
                    </div>

                    <!-- If no rules present in Active and InActive state -->
                    <div class="flex justify-center gap-2 md:gap-4 max-w-[996px] mx-auto min-h-[50vh]"
                        v-if="showNorecord">
                        <div class="no-record-outer flex flex-col justify-center items-center gap-1">
                            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                            <div class="head">No Records Found</div>
                        </div>
                    </div>

                    <!-- RuleListData component -->
                    <RuleListData :statusValue="currentStatusVal" :updateList="updateList" :vendorData="vendorData" :changeValFnc="changeVal"
                        @handleToggleSwitch="handleSwitch" @handleToggleDropdown="toggleDropdown"
                        @handleCloneContent="cloneContents" />
                </div>
            </div>
            <!-- skeleton : on vendor model apply skeleton is true and on getting data from the api skeleton true -->
            <SkeletonComponent v-else :updateList="2" />
            <!-- container -->

            <!-- confirmation Modal  -->
            <div v-if="showConfirmationModal">
                <ConfirmationModal :showModal="showConfirmationModal" @SaveConfimation="testConfirm" @cancleConfimation="updateShowConfirmationModal" :text="tempvalue?.currentStatus == 'active' ? `Inactivating this rule means it will no longer Executed and won't apply to future actions` : `Activating this rule means it will be executed and will apply to future actions`"  :confirmBtnText="tempvalue?.currentStatus == 'active' ? 'Inactive' : 'Active'" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './ruleEngineList.scss';
</style>
