<script setup>
import { ref } from 'vue'
     const inputDynamic = ref({ 
        domainLabel:{
            forLabel:'domainurl',
            class: 'input-label',
            lableName: 'Domain URL'
        },
        domainInput: {
            type : 'text',
            id : 'domainurl',
            placeholder : '',
            name : 'domainurl',
            class : 'input-text'
        },
        storeLabel : {
                forLabel:'storename',
                class: 'input-label',
                lableName: 'Store Name'
        },
        storeInput: {
                type : 'text',
                id : 'storename',
                placeholder : 'Book My Cover',
                name : 'storename',
                class : 'input-text'
        },
        storfontAccessTokenLabel : {
                forLabel:'accesstoken',
                class: 'input-label',
                lableName: 'Storefront Access Token'
        },
        storfontAccessTokenText :{
                type : 'text',
                id : 'accesstoken',
                placeholder : 'Enter',
                name : 'accesstoken',
                class : 'input-text'
        },
        communicationBrandLabel :{
                forLabel:'communicationbrand',
                class: 'input-label',
                lableName: 'Communication Brand'
        },
        communicationBrandInput : {
                type : 'text',
                id : 'communicationbrand',
                placeholder : 'Enter',
                name : 'communicationbrand',
                class : 'input-text'
        },
        apiLabel: {
                forLabel:'apiLabel',
                class: 'input-label',
                lableName: 'Key UP'
        },
        apiTextInput :{
                type : 'text',
                id : 'communicationbrand',
                placeholder : 'Enter',
                name : 'communicationbrand',
                class : 'input-text'
        },
        sharedLabel: {
                forLabel:'apiLabel',
                class: 'input-label',
                lableName: 'Shared Secret'
        },
        sharedText :{
                type : 'text',
                id : 'communicationbrand',
                placeholder : 'Enter',
                name : 'communicationbrand',
                class : 'input-text'
        } 
    })
</script>
<template>
<section class="InputField">
    <div class="form">
      <div class="form-field">
        <div class="info">   
            <div class="main-input">
             <DynamicLable :lableValues="inputDynamic.domainLabel"/>
             <DynamicInput :inputValues="inputDynamic.domainInput"/>
            </div>  
            <div class="main-input">
             <DynamicLable :lableValues="inputDynamic.communicationBrandLabel"/>
             <DynamicInput :inputValues="inputDynamic.communicationBrandInput"/>
            </div>
        </div>
        <div class="info"> 
            <div class="main-input">   
             <DynamicLable :lableValues="inputDynamic.storeLabel"/>
             <DynamicInput :inputValues="inputDynamic.storeInput"/>
            </div>         
            <div class="main-input">
             <DynamicLable :lableValues="inputDynamic.apiLabel"/>
             <DynamicInput :inputValues="inputDynamic.apiTextInput"/>
            </div>            
        </div>
        <div class="info">
            <div class="main-input">
                                    <DynamicLable :lableValues="inputDynamicValue.paymentlistLabel"/>
                                        <div class="dropdown-list">
                                            <Dropdown
                                                v-model="selectedSetting"
                                                :options="dropdownStoreDetails"
                                                optionLabel="default_payment_type"
                                                optionValue="id"
                                                placeholder="RazorPay"
                                                class="setting-dropdown"
                                            >
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex align-items-center">
                                                        <div>{{ slotProps.value.default_payment_type }}</div>
                                                    </div>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="option-item">
                                                        <div class="select-options">
                                                            <div class="option-name" @click="getStoreId(slotProps.option.id)">{{ slotProps.option.store_name }}</div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                        </div>
            </div>
            <div class="main-input">
                <div class="select">
                <span class="payment-heading">Payment Modes:</span>
                <div class="select-option1">
                    <input type="checkbox" id="prepaed" name="prepaed" checked />
                    <label for="prepaed">Prepaed</label>
                </div>
                <div class="select-option2">
                    <input type="checkbox" id="cod" name="horns" />
                    <label for="cod">COD</label>
                </div>
            </div>
            </div> 
        </div>
      </div>
    </div> 
</section>
 
</template>
<style lang="scss" scoped>
    @import "./InputField.scss";
</style>

