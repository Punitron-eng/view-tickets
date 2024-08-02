<template>
    <div class="flex gap-2 border border-[#dfe3e6] dark:border-[#4d4d4d] rounded-[4px] w-[216px] h-[32px] px-2">
        <img src="@/assets/images/store-order-search.svg" alt="Search" class="w-[12px]" />
        <InputText type="text" class="border-0 w-full dark:bg-transparent" @input="validateValue" v-model.trim="search[id.field]" :placeholder="placeHolder || 'Search..'" />
        <i v-if="search[id.field]" class="pi pi-times mt-[8px] hover:cursor-pointer" @click="clearBox(id.field)"></i>
    </div>
    <div v-if="validationResult[id.field] && validationResult[id.field] !== 'Valid'" class="text-itl-error dark:text-error-dark">{{ validationResult[id.field] }} {{ id.header }}</div>
</template>

<script setup>
import { defineModel, defineProps, ref, watch } from 'vue';
import * as validations from '@/util/commonValidations';
import { dataTableVariables as dataVariables } from '../../itl-dataTable-files/itl-dataTable/commonVariable';

const search = defineModel();
const { id, placeHolder } = defineProps(['id', 'placeHolder']);

const clearBox = (index) => {
    search.value[index] = '';
    dataVariables.value.searchFilterValidationResult[id.field] = true;
};

const validationResult = ref({});
const validationType = ref('');

watch(
    () => search.value[id.field],
    (newValue) => {
        if (newValue === '') {
            validationResult.value[id.field] = '';
            dataVariables.value.searchFilterValidationResult[id.field] = '';
        } else {
            validateValue();
        }
    }
);

const validateValue = () => {
    const matchingField = dataVariables.value.dataTableColumns.filter((res) => res.field === id.field);
    if (matchingField) {
        validationType.value = matchingField[0].validationType;
    } else {
        validationType.value = '';
    }

    switch (validationType.value) {
        case 'isNumber':
            validationResult.value[id.field] = validations.isNumber(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'isString':
            validationResult.value[id.field] = validations.isString(search.value[id.field], { strict: true }) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'isEmail':
            validationResult.value[id.field] = validations.isEmail(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkPassword':
            validationResult.value[id.field] = validations.checkPassword(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkMobileNumber':
            validationResult.value[id.field] = validations.checkMobileNumber(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkAmount':
            validationResult.value[id.field] = validations.checkAmount(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'isName':
            validationResult.value[id.field] = validations.isName(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkAadhar':
            validationResult.value[id.field] = validations.checkAadhar(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkPan':
            validationResult.value[id.field] = validations.checkPan(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'isValidIndianPinCode':
            validationResult.value[id.field] = validations.isValidIndianPinCode(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        case 'checkWeight':
            validationResult.value[id.field] = validations.checkWeight(search.value[id.field]) ? 'Valid' : 'Invalid';
            dataVariables.value.searchFilterValidationResult[id.field] = validationResult.value[id.field] === 'Valid' || validationResult.value[id.field] === '';
            break;
        default:
            validationResult.value[id.field] = '';
            dataVariables.value.searchFilterValidationResult[id.field] = true;
    }
};
</script>
<!-- <template>
    <div>
        <select v-model="selectedValidation">
            <option disabled value="">Please select a validation</option>
            <option>isNumber</option>
            <option>isString</option>
            <option>isEmail</option>
            <option>checkPassword</option>
            <option>checkMobileNumber</option>
            <option>checkAmount</option>
            <option>isName</option>
            <option>checkAadhar</option>
            <option>checkPan</option>
            <option>isValidIndianPinCode</option>
            <option>checkWeight</option>
        </select>
        <input v-model="valueToValidate" type="text" placeholder="Enter value to validate" @input="validateValue">
        <button @click="validateValue">Validate</button>
        <p v-if="validationResult">{{ validationResult }}</p>
    </div>
    <div v-if="validationResult !== '' && validationResult !== 'Valid'" class="text-itl-error dark:text-error-dark">{{
            validationResult }}</div>
</template>

<script setup>
import { ref } from 'vue';
import { isNumber, isString, isEmail, checkPassword, checkMobileNumber, checkAmount, isName, checkAadhar, checkPan, isValidIndianPinCode, checkWeight } from '@/util/commonValidations';

const selectedValidation = ref('');
const valueToValidate = ref('');
const validationResult = ref('');

const validateValue = () => {
    const validations = {
        isNumber,
        isString,
        isEmail,
        checkPassword,
        checkMobileNumber,
        checkAmount,
        isName,
        checkAadhar,
        checkPan,
        isValidIndianPinCode,
        checkWeight,
    };

    switch (selectedValidation.value) {
        case 'isNumber':
            validationResult.value = validations.isNumber(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'isString':
            validationResult.value = validations.isString(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'isEmail':
            validationResult.value = validations.isEmail(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkPassword':
            validationResult.value = validations.checkPassword(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkMobileNumber':
            validationResult.value = validations.checkMobileNumber(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkAmount':
            // Assuming default options for checkAmount, adjust as necessary
            validationResult.value = validations.checkAmount(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'isName':
            validationResult.value = validations.isName(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkAadhar':
            validationResult.value = validations.checkAadhar(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkPan':
            validationResult.value = validations.checkPan(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'isValidIndianPinCode':
            validationResult.value = validations.isValidIndianPinCode(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        case 'checkWeight':
            validationResult.value = validations.checkWeight(valueToValidate.value) ? 'Valid' : 'Invalid';
            break;
        default:
            validationResult.value = 'Please select a validation type.';
    }
};
</script> -->
