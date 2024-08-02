<script setup lang="ts">
import BaseInput from '../../../components/base/BaseInput.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
const store = useStore();
import TimePicker from '../../../components/itl-common-features/TimePicker.vue';
const props = defineProps(['type', 'id', 'defaultValue']);
const inputValues = ref({
    inputFromValue: props.defaultValue ? props.defaultValue?.fromValue : '',
    inputToValue: props.defaultValue ? props.defaultValue?.toValue : '',
});

const errorToMsg = ref('');
const errorFromMsg = ref('');
const emits = defineEmits(['inputChange']);

const weightRegex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/
const amountRegex = /^\d{0,6}(\.\d{0,2})?$/;
async function handleFromInput (event) {
        if (event instanceof Event && event.inputType === 'insertFromPaste') {
            formatNumber(inputValues.value.inputFromValue, 'fromInput')
            return
        }
        if (!inputValues.value.inputFromValue.trim()) {
            errorFromMsg.value = 'This field is required';
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        } else if (!weightRegex.test(inputValues.value.inputFromValue) && props.id==2) {
            inputValues.value.inputFromValue = inputValues.value.inputFromValue.slice(0, -1);
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        } else if (!amountRegex.test(inputValues.value.inputFromValue) && props.id==4) {
            inputValues.value.inputFromValue = inputValues.value.inputFromValue.slice(0, -1);
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        }else {
            errorFromMsg.value = '';
        }
        emits('inputChange', inputValues.value)
        if(inputValues.value.inputFromValue && inputValues.value.inputToValue){
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);  // enable dropdown
        }
    }
    async function handleToInput(event) {
        if (event instanceof Event && event.inputType === 'insertFromPaste') {
            formatNumber(inputValues.value.inputToValue, 'toInput')
            return
        }
        if (!inputValues.value.inputToValue.trim()) {
            errorToMsg.value = 'This field is required';
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        } else if (!weightRegex.test(inputValues.value.inputToValue) && props.id==2) {
            inputValues.value.inputToValue = inputValues.value.inputToValue.slice(0, -1);
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        } else if (!amountRegex.test(inputValues.value.inputToValue) && props.id==4) {
            inputValues.value.inputToValue = inputValues.value.inputToValue.slice(0, -1);
            await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);  // disbaled dropdown
        }else {
            errorToMsg.value = '';
            if(inputValues.value.inputFromValue && inputValues.value.inputToValue){
                await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);  // enable dropdown
            }
        }
        emits('inputChange', inputValues.value)
    }

const getLatestTime = async (data,label)=>{
    label =='from'?inputValues.value.inputFromValue = data :inputValues.value.inputToValue =data
    if(((inputValues.value.inputFromValue) && (inputValues.value.inputToValue))){
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);  // enable dropdown
    }else{
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    }
    emits('inputChange', inputValues.value)
}
const onPaste = (event) => {
  const pastedText = event.clipboardData.getData('text');
  console.log(!/^\d+(\.\d+)?$/.test(pastedText), 'check')
    if (!/^\d+(\.\d+)?$/.test(pastedText)) {
    event.preventDefault();
  }
};

const formatNumber = (number, value) => {
    // Clean the pasted text to allow only numbers and dots
    const cleanedNumber = number.replace(/[^0-9.]/g, '');
    
    let formattedNumber = parseFloat(cleanedNumber);
    let [integer, decimalNumber] = cleanedNumber.split('.');

    // Handle cases where input might not be a valid number
    if (isNaN(formattedNumber)) {
        formattedNumber = 0; // Default to 0 for invalid input
    }

    // Handle specific cases based on props.value
    if (props.id === 2) {
        integer = parseFloat(`0.${integer}`).toFixed(2).slice(2);
    } else if (props.id === 4) {
        integer = Math.min(integer || 0, 100000); // Limit integer part to 1 lakh
    }

    // Handle decimal part: round to 2 decimal places if it exists
    if (decimalNumber !== undefined) {
        decimalNumber = parseFloat(`0.${decimalNumber}`).toFixed(2).slice(2); // Round to 2 decimal places
        integer = `${integer}.${decimalNumber}`;
    }

    // Update input field with formatted number
    if(inputValues){
        if(inputValues.value.inputFromValue && value == 'fromInput'){
            inputValues.value.inputFromValue = integer !== undefined ? integer : '';
            errorFromMsg.value = '';
        }else if(inputValues.value.inputToValue && value == 'toInput'){
            inputValues.value.inputToValue = integer !== undefined ? integer : '';
            errorToMsg.value = '';
        }
    }
    // Emit input change event
    emits('inputChange', inputValues.value);
};
</script>

<template>
    <!-- input range -->
    <div class="flex gap-[16px]" v-if="type == 2 && (id == 2 || id == 4)">
        <div class="w-[100%] md:w-[auto]">
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">From</label>
            <BaseInput inputType="text" id="userinput" name="userinput" :twClasses="'!h-[40px] rounded-[6px] w-[100%] dark:border-[#474747]'" v-model="inputValues.inputFromValue" @input="handleFromInput" @paste="onPaste" autoComplete="off"></BaseInput>
            <div v-if="errorFromMsg" class="text-[red] text-[11px] absolute">{{ errorFromMsg }}</div>
        </div>
        <div class="w-[100%] md:w-[auto]">
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">To</label>
            <BaseInput inputType="text" id="userinput" name="userinput" :twClasses="'!h-[40px] rounded-[6px] w-[100%] dark:border-[#474747]'" v-model="inputValues.inputToValue" @input="handleToInput" @paste="onPaste" autoComplete="off"></BaseInput>
            <div v-if="errorToMsg" class="text-[red] text-[11px] absolute">{{ errorToMsg }}</div>
        </div>
    </div>
    <!-- time range -->
    <div class="flex gap-[16px]" v-if="type == 2 && id == 8">
        <div class="w-[100%] md:w-[auto]">
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">From</label>
        <TimePicker  @getTime="(e)=>getLatestTime(e,'from')" :defaultValue = "inputValues.inputFromValue"/>
        </div>
        <div class="w-[100%] md:w-[auto]">
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">To</label>
        <TimePicker @getTime="(e)=>getLatestTime(e,'to')" :defaultValue = "inputValues.inputToValue"/>
        </div>
    </div>
</template>

<style lang="scss"></style>
