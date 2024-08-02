<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { WEIGHTDISCREPANCY } from '@/store/domestic/weight-discrepancy/constants';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
const store = useStore();
const toast = useToast();
const props = defineProps(['close', 'isReject', 'rowDataVal']);
const emit = defineEmits('closeRemark');
const isRejecModal = ref(props.isReject);
const isLoadingSubmit = ref(false);
const remarkInput = ref('');
const adminEnteredWeight = ref(props.rowDataVal.vendor_entered_weight.entered_kg);
const reviewModalSubmit = async (value) => {
    isLoadingSubmit.value = true;
    if (value == 'reject') {
        if (remarkInput.value === '') {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please add remark', life: 1000 });
            isLoadingSubmit.value = false;
            return;
        } else {
            const tempData = {
                rowId: props.rowDataVal.row_id,
                isAdminAccept: 0,
                rejectedReason: remarkInput.value,
            };
            await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getRejectModalData`, tempData);
            const result = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendRejectModalData`];
            if (result.status == 'Success') {
                isLoadingSubmit.value = false;
                toast.add({ severity: 'success', summary: 'Success Message', detail: result.html_message, life: 1000 });
                isRejecModal.value = false;
                emit('closeRemark');
            } else {
                isLoadingSubmit.value = false;
                toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 1000 });
            }
        }
    } else {
        const tempData = {
            rowId: props.rowDataVal.row_id,
            isAdminAccept: 1,
            adminEnteredWeight: adminEnteredWeight.value,
        };
        await store.dispatch(`${WEIGHTDISCREPANCY.NAME}/getRejectModalData`, tempData);
        const result = store.getters[`${WEIGHTDISCREPANCY.NAME}/sendRejectModalData`];
        if (result.status == 'Success') {
            isLoadingSubmit.value = false;
            toast.add({ severity: 'success', summary: 'Success Message', detail: result.html_message, life: 1000 });
            isRejecModal.value = false;
            emit('closeRemark');
        } else {
            isLoadingSubmit.value = false;
            toast.add({ severity: 'error', summary: 'Error Message', detail: result.html_message, life: 1000 });
        }
    }
};
const validateInput = () => {
    // Allowing only numbers with up to 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/; // Regex to match numbers with up to 2 decimal places
    if (!regex.test(adminEnteredWeight.value)) {
        // If the input doesn't match the pattern, remove invalid characters
        adminEnteredWeight.value = adminEnteredWeight.value.replace(/[^0-9.]/g, '').match(regex) || '';
    }
    if (adminEnteredWeight.value < 0) adminEnteredWeight.value = 0;
    if (adminEnteredWeight.value > 1000) adminEnteredWeight.value = '';
    var value = adminEnteredWeight.value;
    var idx = value.indexOf('.');
    if (idx >= 0) {
        if (value.length - idx > 3) {
            e.target.value = value.substring(0, value.length - 1);
            return false;
        }
    }
};
</script>
<template>
    <div v-if="isReject">
        <div class="remark-main-container">
            <div class="heading">Add Remark <span style="color: #ee596b">*</span></div>
            <textarea class="textarea" placeholder="Enter" v-model="remarkInput" cols="30" rows="5"></textarea>
        </div>
        <div class="container-footer">
            <button class="btn-submit" @click="reviewModalSubmit('reject')" :disabled="isLoadingSubmit">
                <div v-if="isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                <div v-else>Submit</div>
            </button>
            <button class="btn-cancel" @click="close()">Cancel</button>
        </div>
    </div>
    <div v-else class="weight-container">
        <div class="weight-main-container">
            <div class="heading">Add Weight <span style="color: #ee596b">*</span></div>
            <div class="flex flex-column input-bar">
                <label for="weight">Weight (KG)</label>
                <input @input="validateInput" type="text" v-model="adminEnteredWeight" name="weight" />
            </div>
        </div>
        <div class="container-footer">
            <button class="btn-submit" @click="reviewModalSubmit('approve')" :disabled="isLoadingSubmit">
                <div v-if="isLoadingSubmit"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                <div v-else>Submit</div>
            </button>
            <button class="btn-cancel" @click="close()">Cancel</button>
        </div>
    </div>
</template>

<style lang="scss">
@import './remarkDiscrepancy.scss';
</style>
