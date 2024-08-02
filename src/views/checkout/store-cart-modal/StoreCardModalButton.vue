<template>
    <ButtonView @click="visible = true">Open </ButtonView>

    <DialogView v-model:visible="visible" modal maximizable style="z-index: 9999; max-width: 100vw">
        <ModalComponent :close="closeModal" :store-modal-data="storeData" :data="Data" type="store" />
    </DialogView>
</template>

<script setup>
import { ref } from 'vue';
import ModalComponent from './StoreCartModal.vue';
import { Data } from './store-data';
const visible = ref(false);
const closeModal = () => {
    visible.value = false;
};

const storeData = {
    amount: '₹1091.20',
    customer_address: '123 Fake Street, Fakecity, Ontario K2P 1L4',
    customer_email: 'balram@depasserinfotech.in',
    customer_full_name: ' ',
    customer_mobile: '7777777777',
    order_date: '06-11-2023',
    order_id: '#3578',
    payment: 'COD',
    status: 'success',
    tags: ['checkout', ' test_by_balram'],
};
</script>

<style lang="scss">
.p-dialog-header-icons {
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    gap: 8px;
}

.p-dialog .p-dialog-header .p-dialog-header-icon:focus {
    box-shadow: none !important;
}
.p-dialog .p-dialog-header .p-dialog-header-icon:hover {
    background: transparent !important;
}

.p-column-title {
    font-size: 10px;
    color: #656f7d;
}
th {
    padding: 6px 16px !important;
}
.p-datatable-thead > tr {
    font-size: 10px !important;
    background-color: #ffffff;
    text-transform: uppercase;
    border-bottom: none !important;
}
.p-datatable-tbody > tr > td {
    padding: 0.5rem 0.5rem !important;
    color: #0c0c0d;
    border-top: none !important;
    border-bottom: 1px solid #e9ebef !important;
    text-align: center !important;
}
.p-dialog-content {
    border-radius: 0px !important;
}
.p-dialog-header {
    padding: 1.3rem 3px 3px 1.3rem !important;
    position: absolute !important;
    z-index: 99 !important;
}
.p-dialog-content {
    position: relative;
}
</style>
