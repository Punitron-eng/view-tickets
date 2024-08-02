<script setup lang="ts">
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import getImg from '../../../util/getImg';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
import ReInput from '../ui/REInput.vue';
import ReInputFromTo from '../ui/REInputFromTo.vue';
import ReMultiSelect from '../ui/REMultiSelect.vue';
import ReFileUpload from '../ui/REFileUpload.vue';
import ReStateDropDown from '../ui/REStateDropDown.vue';
import ReTime from '../ui/RETime.vue';
import { checkUserType } from '../../../util/commonHandlers';
import { mainArray, subArray, thirdSubArray } from '../DropDown';
import { fetchStoreApi } from '../../../api/rule-engine/RuleEngineList'; //api call
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Skeleton from 'primevue/skeleton';
const store = useStore();
const toast = useToast();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const selectedFirstValue = ref('');
let { selectedOptionData } = defineProps(['selectedOptionData']);
const emits = defineEmits(['deleteSelectedOption']);
const dropdownDataComputed = computed(() => store.getters[`${RULEENGINE.NAME}/dropdowndata`]); // user input dropdownData from store
const showChannelData = computed(() => store.getters[`${RULEENGINE.NAME}/showchanneldata`]); // get channel api data from store
const showWarehouseData = computed(() => store.getters[`${RULEENGINE.NAME}/warehousedata`]); // get channel api data from store
const addStateCityArrayData = computed(() => store.getters[`${RULEENGINE.NAME}/addstatecitydata`]); // get  addStateCity Array data from store
const showStateCityData = computed(() => store.getters[`${RULEENGINE.NAME}/showstatecitydata`]); // get show addstatecity data from store
const showStoreData = computed(() => store.getters[`${RULEENGINE.NAME}/showstoredata`]); // get show store data from store
const cloneData = computed(() => store.getters[`${RULEENGINE.NAME}/showCloneData`]); // get clone data from store
const cityApiData = computed(() => store.getters[`${RULEENGINE.NAME}/cityapidata`]);
const stateApiData = computed(() => store.getters[`${RULEENGINE.NAME}/stateapidata`]);
import { inject } from 'vue';
const vendorData = inject<any>('vendorData');
const showRuleEngineDropDown = inject<any>('showRuleEngineDropDown');
const route = useRoute();
// const dropdownData = ref(route.params.id ? cloneData.value[0]?.rule : dropdownDataComputed);
const dropdownData = ref();

watchEffect(() => {
    dropdownData.value = route.params.id ? cloneData?.value[0]?.rule : dropdownDataComputed.value || dropdownDataComputed.value;
    if (cloneData?.value.length == 0) {
        dropdownData.value = dropdownDataComputed.value;
    }
});

watch(subArray.value, (newValue, oldValue) => {
    subArray.value = newValue;
});

// store second component value in data
const isEmpty = ref(false);
const secondDropdown = async (option: any, index: number, id: number) => {
    if (id == 2 || id == 4 || id == 8) {
        //weight, orderValue, Assigned time weight
        if (showRuleEngineDropDown && dropdownData.value[index]?.condition?.id != option.id) {
            isEmpty.value = true; // if the second dropdown value changed empty the inputValue
        }
        dropdownData.value[index].condition = { ...option };
        if (isEmpty.value == true) {
            dropdownData.value[index].inputValue = '';
        }
    } else {
        if (id == 10) {
            // channel
            if (dropdownData.value[index].inputValue) {
                if (dropdownData.value[index].inputValue.channel.id !== option.id) {
                    dropdownData.value[index].inputValue.store = '';
                }
            }
            dropdownData.value[index].inputValue = { ...dropdownData.value[index].inputValue, channel: option };
        } else if (id == 6) {
            // warehouse
            dropdownData.value[index].inputValue = { ...dropdownData.value[index].inputValue, pickup_from: option.value };
        } else {
            dropdownData.value[index].inputValue = option; // else
        }
    }
    if (id == 10) {
        // call store Api
        if (route.params?.id) {
            setTimeout(() => {
                storeApi(option.id);
            }, 1000);
        } else {
            storeApi(option.id);
        }
    }
    if (!route.params?.id) {
        await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, dropdownData.value); // action call
    }

    // second dropdown disabled condition
    checkData();
    isEmpty.value = false;
};

// store third component value in data
let stateCityData = [];
let tempStateArray = ref(dropdownData.value?.find((ele) => ele.id == 5)?.inputValue || []);
let tempCityArray = ref(dropdownData.value?.find((ele) => ele.id == 7)?.inputValue || []);
let stateLength = ref(false);
let cityLength = ref(false);

const thirdValue = async (value: any, index: number, type: number, stateIndex: number, inputId: number) => {
    if (type == 1) {
        dropdownData.value[index].inputValue = value; // input value
        checkData();
    } else if (type == 3) {
        dropdownData.value[index].inputValue = value; //time value
        checkData();
    } else if (type == 2) {
        // fromValue and toValue
        dropdownData.value[index].inputValue = { fromValue: value.inputFromValue, toValue: value.inputToValue };
        checkData();
    } else if (type == 4) {
        // from and to values - state and city
        if (value.inputFromValue && value.inputToValue) {
            if (inputId == 5) {
                const tempData = { from: value.inputFromValue, to: value.inputToValue };
                tempStateArray.value[stateIndex] = tempData;
                dropdownData.value[index].inputValue = tempStateArray.value;
            } else {
                const citytempData = { from: value.inputFromValue, to: value.inputToValue };
                tempCityArray.value[stateIndex] = citytempData;
                dropdownData.value[index].inputValue = tempCityArray.value;
            }
        }
        checkData();
    } else if (type == 5) {
        //store
        dropdownData.value[index].inputValue = { ...dropdownData.value[index].inputValue, store: value };
        checkValue(dropdownData.value[index].inputValue, 'store'); // enable or disable dropdown
    } else if (type == 6) {
        //pincode upload
        dropdownData.value[index].inputValue = { ...dropdownData.value[index].inputValue, fileName: value.value };
        checkValue(dropdownData.value[index].inputValue, 'fileName'); // enable or disable dropdown
    } else {
        dropdownData.value[index].inputValue = value.value;
    }
    if (!route.params?.id) {
        await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, dropdownData.value); // action call
    }
    // action call
};

// check thirdValue is Empty - disable or enable dropdown
const checkValue = async (inputValue, key) => {
    if (inputValue[key]) {
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    } else {
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    }
};

// add state and city
let i = 1;
const addStateCityArray = ref(addStateCityArrayData);
const addDropdown = async (value: any) => {
    // optimized code
    await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    const stateData = dropdownData.value.find((ele) => ele.id == 5);
    const cityData = dropdownData.value.find((ele) => ele.id == 7);
    const arrayToAdd = value === 'state' ? addStateCityArray.value.state : addStateCityArray.value.city;
    const isStateArray = value === 'state';
    if (arrayToAdd.length < 3) {
        if (isStateArray && stateData?.inputValue?.length === 0) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill State details', life: 3000 });
        } else if (!isStateArray && cityData.inputValue?.length === 0) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill City details', life: 3000 });
        } else {
            if (arrayToAdd.length !== (isStateArray ? stateData?.inputValue?.length : cityData?.inputValue?.length)) {
                toast.add({ severity: 'error', summary: 'Error Message', detail: 'Fill ' + (isStateArray ? 'State' : 'City') + ' details', life: 3000 });
            } else {
                i++;
                await store.dispatch(`${RULEENGINE.NAME}/getaddstatecity`, { id: value == 'state' ? 5 : 7, value: i }); // action call
                if (value === 'state') {
                    stateLength.value = true;
                } else if (value === 'city') {
                    cityLength.value = true;
                }
            }
        }
    }
    await store.dispatch(`${RULEENGINE.NAME}/getshowstatecitydata`, true);
};

// delete state and city
const deleteState = async (index: number, id: number) => {
    // optimized code
    const data = dropdownData.value.find((ele) => ele.id == id);
    if (data) {
        const arrayToDelete = data.value === 'State' ? addStateCityArray.value.state : addStateCityArray.value.city;
        if (arrayToDelete) {
            arrayToDelete.splice(index, 1);
            if (arrayToDelete.length > 1) {
                if (data.value === 'State') {
                    stateLength.value = true;
                } else if (data.value === 'City') {
                    cityLength.value = true;
                }
            } else {
                if (data.value === 'State') {
                    stateLength.value = false;
                } else if (data.value === 'City') {
                    cityLength.value = false;
                }
            }
        }
        if (data.inputValue) {
            data.inputValue.splice(index, 1);
        }

        // enable & disable dropdown - condition
        if (data.inputValue.length == 0) {
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
        } else {
            if (arrayToDelete.length == data.inputValue.length) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
            } else {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
            }
        }
    }
};

// // store api
const storeApi = async (val) => {
    // await store.dispatch(`${RULEENGINE.NAME}/getshowstoredata`, false);
    const payload = {
        vendor_id: !checkUserType('vendor') ? vendorData.value[1] : '',
        channel_id: val,
    };
    const storeData = await fetchStoreApi(payload);
    if (storeData.status == 'success') {
        subArray.value[10] = { ...subArray.value[10], store: storeData.store };
        // await store.dispatch(`${RULEENGINE.NAME}/getshowstoredata`, true);
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: storeData.html_message, life: 3000 });
        await store.dispatch(`${RULEENGINE.NAME}/getshowstoredata`, false);
    }
};

// emit the deleted id
const deleteOptionData = async (index: number, id: number) => {
    dropdownData.value.splice(index, 1);
    await store.dispatch(`${RULEENGINE.NAME}/getdropdowndata`, dropdownData.value); // action call
    id == 5 ? (addStateCityArray.value.state = []) : id == 7 ? (addStateCityArray.value.city = []) : null;
    if (id == 5 && addStateCityArray.value.state.length == 0) {
        stateLength.value = false;
        tempStateArray.value = [];
    }
    if (id == 7 && addStateCityArray.value.city.length == 0) {
        cityLength.value = false;
        tempCityArray.value = [];
    }
    emits('deleteSelectedOption', id);
    // on delete check if other details are filled or not to procced.
    checkData();
};

const checkData = () => {
    let flag = false;
    dropdownData.value.forEach(async ele => {
        if (showRuleEngineDropDown && !flag) {
            // weight / orderValue / Assigned Time 
            if ((ele.id === 2 || ele.id === 4 || ele.id === 8) && ele.condition && (ele.inputValue !== '' || (ele.inputValue.fromValue !== '' && ele.inputValue.toValue !== ''))) {
                if (ele.condition.id == 1) {
                    if (ele.inputValue !== '' && ele.inputValue !== null && ele.inputValue.fromValue !== '' && ele.inputValue.fromValue !== null && ele.inputValue.toValue !== '' && ele.inputValue.toValue !== undefined) {
                        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                        flag = false;
                    }
                    else {
                        flag = true;
                        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true)
                        return;
                    }
                } else if (ele.condition !== 1) {
                    if (ele.inputValue !== '' && ele.inputValue !== null) {
                        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                        flag = false;
                    }
                    else {
                        flag = true;
                        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true)
                        return;
                    }
                }
            }
            // customer pincode
            else if (ele.id === 6 && ele.inputValue && ((ele.inputValue?.pickup_from?.length !== 0 && ele.inputValue?.pickup_from?.length !== undefined) || ((ele.inputValue?.fileName !== '' && ele.inputValue?.fileName !== null && ele.inputValue?.fileName !== undefined) || (ele.inputValue?.fileName?.fileName !== '' && ele.inputValue?.fileName?.fileName !== undefined)))) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                flag = false;
            }
            // state and city
            else if ((ele.id === 5 || ele.id === 7) && ele.inputValue && (ele.inputValue.length == (addStateCityArray.value.state.length || addStateCityArray.value.city.length))) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                flag = false;
            }
            // zone
            else if ((ele.id === 3) && ele.inputValue && ele.inputValue?.length !== 0) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                flag = false;
            }
            // payment and productSku
            else if ((ele.id === 1 || ele.id === 9) && ele.inputValue) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                flag = false;
            }
            // channel and store
            else if ((ele.id === 10) && ele.inputValue && ele.inputValue.channel && ele.inputValue.store) {
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false)
                flag = false;
            }
            else {
                flag = true; 
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true)
                return;
            }
        } else {
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true)
            return;
        }
    });
}
// get array values of state and city
const getDropdownArray = (id) => {
    return id == 5 ? addStateCityArray.value.state : addStateCityArray.value.city;
};

// for notes
function notes(id: number) {
    if (id == 2) {
        return 'The minimum chargeable weight is 0.5 KG, not exceeding 100 KG.';
    } else if (id == 4) {
        return 'The minimum chargeable value is Rs.0.5';
    } else {
        return '';
    }
}
const updateAddStateCityArray = () => {
    if (route.params?.id) {
        addStateCityArray.value.state = dropdownData.value?.find((ele) => ele.id == 5)?.inputValue?.map((ele, i) => i + 1) || [];
        addStateCityArray.value.city = dropdownData.value?.find((ele) => ele.id == 7)?.inputValue?.map((ele, i) => i + 1) || [];

        tempStateArray.value = dropdownData.value?.find((ele) => ele.id == 5)?.inputValue || [];
        tempCityArray.value = dropdownData.value?.find((ele) => ele.id == 7)?.inputValue || [];
    }
};

// Calculate state and city length for the delete button
const stateCityLength = () => {
    stateLength.value = dropdownData.value?.find((ele) => ele.id == 5)?.inputValue?.length > 1;
    cityLength.value = dropdownData.value?.find((ele) => ele.id == 7)?.inputValue?.length > 1;
};

watch(
    () => cloneData.value,
    () => {
        console.log('enter clone ');
        updateAddStateCityArray();
        stateCityLength();
    }
);
// On component mounted, update addStateCityArray and state/city length
onMounted(async () => {
    updateAddStateCityArray();
    stateCityLength();
    if (route.params.id) {
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    }
});

const clearAll = async () => {
    dropdownData.value = [];
    tempStateArray.value = [];
    tempCityArray.value = [];
    stateCityLength();
};

defineExpose({ clearAll });
</script>

<template>
    <div v-for="(array, i) in dropdownData" :key="i" class="flex items-center flex-col w-[auto]">
        <div v-if="dropdownData.length"
            class="w-[100%] bg-[#fff] rounded-lg border-[1px] border-[#d1d5db] dark:bg-[#313131] dark:border-none">
            <div
                class="flex items-center justify-between px-[16px] lg:px-[31px] py-2 bg-[#f9fafb] rounded-lg text-[14px] text-[#6b7280] shadow-sm dark:bg-[#3d3d3d]">
                <div class="dark:text-[#d1d5db]">{{ i + 1 }}.</div>
                <div>
                    <img :src="getImg('rule-engine-delete', darkModeVal)" @click="deleteOptionData(i, array.id)"
                        class="hover:cursor-pointer" />
                </div>
            </div>
            <div class="px-[16px] lg:px-[32px] md:gap-4 lg:gap-4 pt-[24px] md:flex items-center lg:h-[112px] relative">
                <!-- first dropdown component -->
                <div class="lg:mb-4 md:w-[25%] lg:w-[30%] md:min-w-[203px] lg:min-w-[auto] cursor-not-allowed">
                    <label class="block font-medium mb-[8px] text-[13px] text-[#374151] dark:text-[#dfdfdf]"> Attribute
                    </label>
                    <BaseDropdown @listenDropdownChange="(val: any) => selectedFirstValue = val"
                        :options="selectedOptionData" :filter="false" :placeholder="array['value']" :twClasses="{
        'w-[100%] h-[40px]': [5, 6, 7, 9, 10].includes(array.id),
        'w-[80%] md:w-[100%] h-[40px]': [1, 2, 3, 4].includes(array.id),
        'w-[75%] md:w-[100%] h-[40px]': array.id == 8,
    }"
                        class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] flex w-[100%] h-[40px] rounded-[6px] dark:border-[#474747] cursor-not-allowed"
                        disabled />
                </div>

                <!-- Is and Must be tag -->
                <div v-if="array.id == 1 || array.id == 2 || array.id == 3 || array.id == 4"
                    class="flex items-center justify-center text-[#0049b0] p-[15px] bg-[#deebff] dark:bg-[#636465] dark:text-white rounded-lg md:w-[40px] w-[15%] h-[40px] mt-[5px] md:mt-[29px] lg:mt-[5px] md:static absolute top-[47px] right-[8px]">
                    Is
                </div>
                <div v-if="array.id == 8"
                    class="flex items-center justify-center text-[#0049b0] bg-[#deebff] dark:bg-[#636465] dark:text-white rounded-lg w-[68px] h-[40px] mt-[5px] md:mt-[29px] lg:mt-[5px] md:static absolute top-[47px] right-[8px]">
                    Must be
                </div>

                <!-- second dropdown -->
                <div v-if="array.id != 5 && array.id != 7"
                    class="lg:mb-4 pt-[16px] md:p-[0px] w-[100%] lg:min-w-[auto] md:w-[25%] lg:w-[30%]"
                    :class="array.id == 8 ? 'md:min-w-[auto] ' : 'md:min-w-[211px]'">
                    <label class="block font-medium text-[13px] mb-[8px] text-[#374151] dark:text-[#dfdfdf]"
                        :class="{ 'md:mb-5': [9, 10].includes(array.id) }">{{
        array.id == 1 || array.id == 3 ? 'Value' : array.id == 2 || array.id == 4 || array.id == 8 ?
            'Condition' : array.id == 6 ? 'Pickup From' : ''
    }}</label>

                    <!-- zone -->
                    <ReMultiSelect v-if="array.id == 3" :values="subArray[array['id']]" :id="array.id"
                        @change="(val) => secondDropdown(val, i, array.id)" :defaultValue="array.inputValue" />

                    <!-- customer pincode -->
                    <ReMultiSelect v-else-if="array.id == 6 && showWarehouseData && subArray[array['id']]"
                        :id="array.id" :showData="subArray[6] ? subArray[6] : false" :values="subArray[array['id']]"
                        @change="(val) => secondDropdown(val, i, array.id)"
                        :defaultValue="array.inputValue ? array.inputValue.pickup_from : ''" />

                    <!-- upload product sku -->
                    <ReFileUpload v-else-if="array.id == 9" :id="array.id" :sampleFileType="'product_sku'"
                        @fileUpload="(val) => secondDropdown(val, i)" :defaultValue="array.inputValue" />

                    <!-- <ReRadio v-else-if="array.type == 'radio'" @radioInputValues="(val) => secondDropdown(val, i)" /> -->
                    <BaseDropdown v-else-if="array.id == 10 && showChannelData && subArray[array['id']]?.channel"
                        @listenDropdownChange="(val: any) => secondDropdown(val, i, array.id)"
                        :options="subArray[array['id']].channel" :filter="false"
                        :defaultValue="array.inputValue?.channel?.id" placeholder="Select Value"
                        twClasses="w-[100%] h-[40px]"
                        class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] flex w-[100%] h-[40px] rounded-[6px] dark:border-[#474747]" />

                    <BaseDropdown v-else @listenDropdownChange="(val: any) => secondDropdown(val, i, array.id)"
                        :options="array.id == 10 && showChannelData ? subArray[array['id']].channel : array.value == 'channel' ? subArray[array['id']].store : subArray[array['id']]"
                        :filter="false" :defaultValue="array.condition ? array.condition?.id : array.inputValue?.id"
                        placeholder="Select Value" twClasses="w-[100%] h-[40px]"
                        class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] flex w-[100%] h-[40px] rounded-[6px] dark:border-[#474747]" />
                </div>

                <!-- third dropdown-->
                <div v-if="(array.id == 2 || array.id == 4 || array.id == 8) && array.condition"
                    class="lg:mb-4 pt-[16px] md:p-[0px] w-[100%] md:min-w-[auto] md:w-[30%]"
                    :class="{ 'md:w-[24%] lg:w-[30%]': array.id == 8 }">
                    <ReInputFromTo v-if="array.condition?.id == 1" @inputChange="(val) => thirdValue(val, i, 2)"
                        :type="2" :id="array.id" :defaultValue="array.inputValue" />

                    <ReTime v-else-if="array.id == 8 && array.condition.id != 1"
                        @inputChange="(val) => thirdValue(val, i, 3)" :defaultValue="array.inputValue" />

                    <ReInput v-else-if="array.condition?.id != 1" @inputChange="(val) => thirdValue(val, i, 1)"
                        :value="array.id" :type="1" :thirdSubArray="thirdSubArray"
                        :defaultValue="array.inputValue ? array.inputValue : ''" :condition="array.condition" />
                </div>

                <!-- pincode upload component -->
                <div v-if="array.id == 6"
                    class="lg:mb-4 flex items-center gap-4 w-[100%] md:min-w-[auto] md:w-[30%] pt-[16px] md:pt-[0px]">
                    <ReFileUpload :sampleFileType="'pincode'" :id="array.id" :defaultValue="array.inputValue?.fileName"
                        :pickupValue="array.inputValue?.pickup_from" @fileUpload="(val) => thirdValue(val, i, 6)" />
                </div>

                <!-- channel and store component -->
                <div v-if="array.id == 10 && showStoreData && array.inputValue?.channel"
                    class="pt-[16px] md:pt-[28px] lg:pt-[8px] flex items-center gap-4 w-[100%] md:min-w-[auto] md:w-[25%] lg:w-[30%]">
                    <div v-if="showStoreData && subArray[array['id']]?.store" class="w-[100%]">
                        <BaseDropdown @listenDropdownChange="(val: any) => thirdValue(val, i, 5)"
                            :options="subArray[array['id']].store" :defaultValue="array?.inputValue?.store?.id"
                            :filter="false" placeholder="Select store" twClasses="w-[100%]"
                            class="bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] flex w-[100%] h-[40px] rounded-[6px] dark:border-[#474747]" />
                    </div>
                    <div v-else class="w-[100%] h-[40px]">
                        <Skeleton height="40px" class="mb-2 md:w-[248px] rounded-[6px] w-[80%] lg:w-full"> </Skeleton>
                    </div>
                </div>
            </div>
            <!-- state and city component -->
            <div v-if="(array.id == 5 && stateApiData) || (array.id == 7 && cityApiData)"
                class="pt-[16px] lg:pt-[0px] px-[16px] lg:px-[32px] flex flex-col h-[auto] w-[100%]">
                <div v-for="(dropdown, index) in getDropdownArray(array.id)" :key="dropdown" class="pb-2">
                    <ReStateDropDown :id="array.id" :vendorData="vendorData" :stateCityData="addStateCityArray"
                        :lengthVal="array.id == 5 ? stateLength : cityLength"
                        @handleDelete="deleteState(index, array.id)"
                        @stateCityDropdown="(val) => thirdValue(val, i, 4, index, array.id)"
                        :defaultValue="array.inputValue" :index="index" />
                </div>
                <div class="mt-[8px] lg:mt-[24px] flex items-center gap-[8px] cursor-pointer"
                    v-if="array.id == 5 ? addStateCityArray.state?.length < 3 : addStateCityArray.city?.length < 3">
                    <img :src="getImg('re-addBtn', darkModeVal)" class="w-[16px]"
                        @click="addDropdown(array.id == 5 ? 'state' : 'city')" />
                    <div class="text-[#0052cc] text-[13px] font-inter dark:text-[#577ce4]"
                        @click="addDropdown(array.id == 5 ? 'state' : 'city')">Add{{ array.id == 5 ? ' State' : ' City'
                        }}</div>
                </div>
            </div>
            <!-- note -->
            <div class="px-[16px] lg:px-[32px] text-[11px] text-[#6b7280] dark:text-[#dfdfdf]"
                :class="array.id == 5 || array.id == 7 ? 'py-[8px]' : 'py-[16px] lg:pt-[4px]'">
                {{ notes(array.id) }}
            </div>
        </div>
        <div v-if="!(i >= 9)" class="w-[1px] h-[24px] bg-[#9ca3af]" />
    </div>
</template>

<style>
.p-dropdown {
    align-items: center;
}
</style>
