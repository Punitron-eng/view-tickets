<template>
    <ToastView />
    <div class="add-rule-engine flex justify-center items-center flex-col mt-[90px] md:mt-[0px] mx-[16px] md:mx-[26px] mb-[16px] pb-[16px] rounded-lg dark:bg-[#4d4d4d] bg-transparent" v-if="vendorData.length == 0 && !checkUserType('vendor')">
        <div class="flex justify-center gap-2 md:gap-4 max-w-[996px] mx-auto min-h-[50vh]">
            <div class="no-record-outer flex flex-col justify-center items-center gap-1">
                <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                <div class="head">No Rules Found</div>
            </div>
        </div>
    </div>
    <section class="add-rule-engine flex justify-center items-center flex-col mt-[112px] md:mt-[0px] mx-[16px] md:mx-[26px] mb-[16px] pb-[16px]" :class="checkUserType('vendor') ? 'mt-[90px]' : 'mt-[126px]'" v-else>
        <div class="w-[100%]">
            <!-- main -->
            <AddRuleEngineDropDown @deleteSelectedOption="deleteSelectedOption" :selectedOptionData="selectedOptionData" ref="clearAll"   />
        </div>
        <!-- on load dropdown -->
        <div v-if="filterData.length > 0" class="w-[100%] bg-[#fff] rounded-lg border-[1px] border-[#d1d5db] dark:bg-[#313131] dark:border-none">
            <div class="px-[16px] lg:px-[31px] py-2 bg-[#f9fafb] rounded-lg text-[14px] text-[#6b7280] shadow-sm h-[31px] dark:text-[#d1d5db] dark:bg-[#3d3d3d]">{{ dropdownData?.length + 1 }}.</div>
            <div class="px-[16px] lg:px-[32px] gap-4 py-[24px] flex items-center h-[112px] relative">
                <div class="lg:mb-4 md:w-[25%] lg:w-[30%] md:min-w-[203px] lg:min-w-[243px] w-[100%]">
                    <label class="block font-medium pb-[8px] text-[#374151] dark:text-[#fff]"> Attribute </label>
                    <DropdownView
                        id="primary-dropdown"
                        v-model="selectedOption"
                        :options="filterData"
                        :appendTo="'self'"
                        optionLabel="value"
                        placeholder="Select a Rule"
                        :autoOptionFocus="false"
                        class="rule-dropdown md:w-[100%] w-[80%]"
                        :loading="false"
                        @change="dropdown"
                        :disabled="disabledDropdown"
                    />
                    
                </div>
                <div class="flex items-center justify-center text-[#0049b0] p-[15px] bg-[#deebff] dark:bg-[#636465] dark:text-white rounded-lg md:w-[40px] w-[15%] h-[40px] mt-[5px] md:mt-[29px] lg:mt-[5px] md:static absolute top-[47px] right-[8px]">
                    Is
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { inject, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'; // router
import { mainArray, subArray } from './DropDown';
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import { checkUserType } from '../../util/commonHandlers';
import { RULEENGINE } from '../../store/rule-engine/constants'; // import constants
import AddRuleEngineDropDown from './components/AddRuleEngineDropDown.vue';
import { fetchChannelApi, fetchWarehouseApi, fetchStateCityApi } from '../../api/rule-engine/RuleEngineList'; //api call
import { useToast } from 'primevue/usetoast';
const cloneData = computed(() => store.getters[`${RULEENGINE.NAME}/showCloneData`]); // get clone data from store
const dropdownDataComputed = computed(() => store.getters[`${RULEENGINE.NAME}/dropdowndata`]); // dropdownData from store
const disabledDropdown = computed(() => store.getters[`${RULEENGINE.NAME}/disableddropdowndata`]); // get disabled dropdown data from store
const addStateCityArrayData = computed(() => store.getters[`${RULEENGINE.NAME}/addstatecitydata`]); // get  addStateCity Array data from store
const store = useStore();
const route = useRoute();
const toast = useToast();
const clearAll = ref(null);
const selectedOption = ref(null);
const data = ref<Array<any>>([]);
const vendorData = inject<any>('vendorData');
const selectedOptionData = ref(mainArray.value || []);
const filterData = ref<Array<object>>(mainArray.value || []);
const dropdownData = ref(route.params.id ? cloneData.value[0]?.rule : dropdownDataComputed);
const addStateCityArray = ref(addStateCityArrayData)

watchEffect(() => {
    dropdownData.value = route.params.id ? cloneData?.value[0]?.rule : dropdownDataComputed.value || dropdownDataComputed.value;
    if (cloneData?.value.length == 0) {
        dropdownData.value = dropdownDataComputed.value;
    }
});
const dropdown = async (option: any) => {
    if (option.value.id == 10) {
        await channelApi();
    }
    if (option.value.id == 6) {
        await pincodeApi();
    } else if (option.value.id == 5 || option.value.id == 7) {
        await stateCityApi(option.value.id);
    }

    // selected option in dropdown
    selectedOptionData.value = mainArray.value.filter((ele) => {
        return data.value.find((option) => option.id == ele.id);
    });
    option.value = removeObjectKey(option.value);
    dropdownData.value.push(option.value);
    await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, dropdownData.value); // action call
    // other than selected option in dropdown
    filterData.value = mainArray.value.filter((ele, index) => {
        return !dropdownData.value.some((option) => option.id == ele.id);
    });
    await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    await store.dispatch(`${RULEENGINE.NAME}/getaddstatecity`, { id: option.value.id, value: 1 }); // action call
};

// channel Api
const channelApi = async () => {
    try {
        const payload = {
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        };
        const channelData = await fetchChannelApi(payload);
        if ((channelData.status = 'success')) {
            await store.dispatch(`${RULEENGINE.NAME}/getshowchanneldata`, true);
            subArray.value[10] = { channel: channelData.channel };
            console.log(subArray.value);
            await store.dispatch(`${RULEENGINE.NAME}/getshowstoredata`, true);
        }
    } catch (error) {
        console.log(error);
    }
};

// pincode api
const pincodeApi = async () => {
    try {
        const payload = {
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        };
        const warehouseData = await fetchWarehouseApi(payload);
        if (warehouseData.status == 'success') {
            subArray.value[6] = warehouseData.warehouse;
            await store.dispatch(`${RULEENGINE.NAME}/getwarehousedata`, true);
        }
    } catch (error) {
        console.log(error);
    }
};

// store api data values
const stateApiData = ref({
    from_data: '',
    to_data: '',
});

const cityApiData = ref({
    from_data: '',
    to_data: '',
});

// state and city api
const stateCityApi = async (id: number) => {
    try {
        const payload = {
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
            data_type: id == 5 ? 'state' : 'city',
        };
        const data = await fetchStateCityApi(payload);
        if (data.status == 'success') {
            if (id == 5) {
                stateApiData.value.from_data = data.from_states;
                stateApiData.value.to_data = data.to_states;
                await store.dispatch(`${RULEENGINE.NAME}/getstateapidata`, stateApiData.value);
            } else {
                cityApiData.value.from_data = data.from_city;
                cityApiData.value.to_data = data.to_city;
                await store.dispatch(`${RULEENGINE.NAME}/getcityapidata`, cityApiData.value);
            }
            await store.dispatch(`${RULEENGINE.NAME}/getshowstatecitydata`, true);
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: data.html_message, life: 3000 });
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
        }
    } catch (error) {
        console.log(error);
    }
};

const removeObjectKey = (obj) => {
    // Destructure the object to extract the 'inputValue' key
    const { inputValue, ...rest } = obj;
    return rest; // Return the object without 'inputValue' key
};
const resetValue = async () => {
    filterData.value = mainArray.value;
    clearAll.value.clearAll();  // clear the values in AddRuleEngineDropDown - tempStateArray & tempCityArray
    dropdownData.value = [];
    addStateCityArray.value.state = []  // resets the addStateCityArray of state
    addStateCityArray.value.city = [];  // resets the addStateCityArray of state
    await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    await store.commit(`${RULEENGINE.NAME}/setCloneData`, []);
    selectedOption.value = null;
};

defineExpose({ resetValue });
//delete the selected option data
const deleteSelectedOption = async (id: number) => {
    const deletedValue = mainArray.value.find((element) => element.id == id); // get the deleted value
    const newObj = removeObjectKey(deletedValue); // remove the inputValue
    filterData.value = [...filterData.value, newObj]; // store the deleted data in filterData
    selectedOption.value = null;
    data.value = [];
    await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
};

onMounted(async () => {
    document.body.classList.add('add-rule-engine');
    if (route.params?.id && cloneData.value.length == 0 && dropdownDataComputed.value.length == 0) {
        console.log('call clone data');
        const payload = {
            rule_id: route.params.id,
            vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        };
        console.log(payload, 'this is the fetch data    ');
        await store.dispatch(`${RULEENGINE.NAME}/getCloneData`, payload);
    }
    filterData.value =
        dropdownData.value?.length == 0
            ? mainArray.value
            : mainArray.value.filter((ele, index) => {
                  return !dropdownData.value?.some((option) => option.id == ele.id);
              });

    if (route.params?.id) {
        console.log(route.params.id ? 'clone data' : 'dropwDown ');
        // on id clone the static data
        try {
            dropdownData.value.forEach(async (item) => {
                if (item.id == 10) {
                    await channelApi();
                }
                if (item.id == 5) {
                    await stateCityApi(item.id);
                }
                if (item.id == 7) {
                    await stateCityApi(item.id);
                }
                if (item.id == 6) {
                    await pincodeApi();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

onBeforeUnmount(async () => {
    document.body.classList.remove('add-rule-engine');
});
</script>

<style lang="scss">
@import './RuleEngine.scss';

#primary-dropdown_list .p-dropdown-item {
    padding: 8px !important;
}

#primary-dropdown_list .p-dropdown-item:hover {
    background: #dfe3e6 !important;
    color: rgb(97, 93, 93);
}

#primary-dropdown_list .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled).p-focus {
    color: #69707a;
    background: transparent !important;
}
.darkTheme #primary-dropdown_list .p-dropdown-item:hover {
    background: #6d6d6d !important;
    color: #ffff;
}
#primary-dropdown span{
    max-width: 100% !important;
}
</style>
