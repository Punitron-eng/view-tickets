<script setup lang="ts">
import { watch, ref, watchEffect } from 'vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { useStore } from 'vuex';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
import { thirdSubArray } from '../DropDown';
const props = defineProps(['value', 'thirdSubArray', 'type', 'defaultValue', 'condition']);
const emits = defineEmits(['inputChange']);
// const userInput = ref( typeof props.defaultValue =='object'  ?  '' : props.defaultValue);
const userInput = ref()
const errorMsg = ref('');
const store = useStore(); 

watchEffect(() => {
    if (props.defaultValue) {
        userInput.value = props.defaultValue;
    }else{
        userInput.value = null
    }
});

watch(() => props.condition, newValue => {
  // Update errorMsg based on the new value of condition
  errorMsg.value = newValue ? '' : 'Your error message here';
});

const inputValue = async (event: any) => {
    let value = event.target.value;
    const weightRegex = /^(100(\.00?)?|\d{1,2}(?:\.\d{0,2})?)$/
    const amountRegex = /^\d{0,6}(\.\d{0,2})?$/;
    if (event instanceof Event && event.inputType === 'insertFromPaste') {
        formatNumber(userInput.value)
        return
    }
    if (userInput.value.trim() === '') {
        errorMsg.value = 'This field is required';
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else if (!weightRegex.test(value) && props.value == 2) {
        userInput.value = userInput.value.slice(0, -1);
        // await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else if (!amountRegex.test(value) && props.value == 4) {
        userInput.value =userInput.value.slice(0, -1) ;
        // await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    } else {
        userInput.value = value;
        if (value.length === 3) {
            value += '.00';
        }
        errorMsg.value = '';
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    }
    emits('inputChange', userInput.value);
};

const onPaste = (event) => {
  const pastedText = event.clipboardData.getData('text');
  console.log(!/^\d+(\.\d+)?$/.test(pastedText), 'check')
    if (!/^\d+(\.\d+)?$/.test(pastedText)) {
    event.preventDefault();
  }
};

const formatNumber = (number) => {
    // Clean the pasted text to allow only numbers and dots
    const cleanedNumber = number.replace(/[^0-9.]/g, '');
    
    let formattedNumber = parseFloat(cleanedNumber);
    let [integer, decimalNumber] = cleanedNumber.split('.');

    // Handle cases where input might not be a valid number
    if (isNaN(formattedNumber)) {
        formattedNumber = 0; // Default to 0 for invalid input
    }

    // Handle specific cases based on props.value
    if (props.value === 2) {
        integer = parseFloat(`0.${integer}`).toFixed(2).slice(2);
    } else if (props.value === 4) {
        integer = Math.min(integer || 0, 100000); // Limit integer part to 1 lakh
    }

    // Handle decimal part: round to 2 decimal places if it exists
    if (decimalNumber !== undefined) {
        decimalNumber = parseFloat(`0.${decimalNumber}`).toFixed(2).slice(2); // Round to 2 decimal places
        integer = `${integer}.${decimalNumber}`;
    }

    // Update input field with formatted number
    userInput.value = integer !== undefined ? integer : '';
    if(userInput.value){
        errorMsg.value = ''
    }else{
        errorMsg.value = 'This field is required';
    }
    
    // Emit input change event
    emits('inputChange', userInput.value);
};

</script>

<template>
    <div v-for="array in thirdSubArray">
        <div v-if="array.id == value && type == array.type">
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">{{
        array.label }}</label>
            <BaseInput inputType="text" id="userInput" name="userInput"
                :twClasses="'!h-[40px] rounded-[6px] w-[100%] dark:border-[#474747]'" v-model="userInput" @input="inputValue" @paste="onPaste" autoComplete="off">
            </BaseInput>
            <div v-if="errorMsg" class="text-[red] text-[11px] absolute">{{ errorMsg }}</div>
        </div>
    </div>
</template>

<style lang="scss"></style>