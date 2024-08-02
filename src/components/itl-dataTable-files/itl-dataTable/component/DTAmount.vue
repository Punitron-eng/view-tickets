<template>
    <div v-if="col.field === 'total_whatsapp_charges'" class="dropdown-div dropdown-div-outer"
        :class="data.total_whatsapp_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="data.total_whatsapp_charges.length > 1"
            @click="overlay.toggle($event), dataDropdownToggle($event, data.total_whatsapp_charges, index, col.field)">
            {{ data.total_whatsapp_charges.length > 0 ? data.total_whatsapp_charges[0].total_whatsapp_charge : '' }}
        </div>
        <div class="parent" v-else>
            {{ data.total_whatsapp_charges[0].total_whatsapp_charge }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">WhatsApp Charges</h6>
                <ul>
                    <li v-for="(item, index) in dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span>
                        <span>{{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ dataVariables.selectedCharge[0].total_whatsapp_charge }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'total_sms_charges'" class="sms-div dropdown-div-outer position-relative"
        :class="data.total_sms_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="data.total_sms_charges.length > 1"
            @click="overlay.toggle($event), dataDropdownToggle($event, data.total_sms_charges, index, col.field)">
            {{ data.total_sms_charges.length > 0 ? data.total_sms_charges[0].Total_SMS_Charges : '' }}
        </div>
        <div class="parent" v-else>
            {{ data.total_sms_charges[0].Total_SMS_Charges }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">SMS Charges</h6>
                <ul>
                    <li v-for="(item, index) in dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ dataVariables.selectedCharge[0].Total_SMS_Charges }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'total_email_charges'" class="email-div dropdown-div-outer position-relative"
        :class="data.total_email_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="data.total_email_charges.length > 1"
            @click="overlay.toggle($event), dataDropdownToggle($event, data.total_email_charges, index, fieldName)">
            {{ data.total_email_charges.length > 0 ? data.total_email_charges[0].Total_Email_Charges : '' }}
        </div>
        <div class="parent" v-else>
            {{ data.total_email_charges[0].Total_Email_Charges }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">Email Charges</h6>
                <ul>
                    <li v-for="(item, index) in dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ dataVariables.selectedCharge[0].Total_Email_Charges }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_amount'" class="dropdown-div dropdown-div-outer"
        :class="data.order_amount.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="data.order_amount.length > 1"
            @click="overlay.toggle($event), dataDropdownToggle($event, data.order_amount, index, col.field)">
            {{ data.order_amount.length > 0 ? data.order_amount[0].final_total_price : '' }}
        </div>
        <div class="parent" v-else>
            {{ data.order_amount[0].final_total_price }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">Amount</h6>
                <ul>
                    <li v-for="(item, index) in dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ dataVariables.selectedCharge[0].final_total_price }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_refund_amount'" class="removeDropdownArrow">
        <div class="parent">
            {{ data.order_refund_amount.final_total_price }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { dataTableVariables as dataVariables } from '../dataTable';
const { data, col, dataDropdownToggle } = defineProps(["data", "col", "dataDropdownToggle"])
const overlay = ref(null);
</script>