<script setup>
import CloseIcon from '../../../assets/images/close-icon.svg';
import CopyIcon from '../../../assets/images/modal-copy.svg';
import CopyDarkIcon from '../../../assets/images/modal-copy-dark.svg';
import BasicIcon from '../../../assets/images/modal-basic.svg';
import CustomerIcon from '../../../assets/images/modal-customer.svg';
import ProductIcon from '../../../assets/images/modal-product.svg';
import NormalTablesVue from '../../../components/itl-dataTable-files/itl-table/NormalTables.vue';
import DownloadIcon from '../../../assets/images/modal-download.svg';
import LocationIcon from '../../../assets/images/modal-location.svg';
import { useToast } from 'primevue/usetoast';
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import { DARKMODE } from '../../../store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['close', 'data', 'type', 'storeModalData', 'productDetails']);
const toast = useToast();

const copyContent = () => {
    navigator.clipboard.writeText('props.storeModalData.customer_address');
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Copied successfully', life: 1500 });
};
</script>

<template>
    <div class="main-container">
        <div class="main-container-header flex justify-content-between md:align-items-center">
            <div class="flex align-items-center">
                <!-- <button class="header-close-button">
                    <img :src="CloseIcon" @click="props.close" />
                </button> -->
                <span class="header-title">Details</span>
            </div>
            <!-- <div class="header-buttons" v-if="type != 'store'">
                <button class="header-button-1">
                    <img :src="CopyIcon" />
                    Copy Link
                </button>
                <button class="header-button-2">
                    <img :src="DownloadIcon" />
                    Download
                </button>
            </div> -->
        </div>
        <div class="container-sections flex gap-3 pb-4">
            <div class="container-left-card flex gap-3 flex-column">
                <div class="container-section-card1 flex flex-column"
                    v-if="props.storeModalData.cart_id || props.storeModalData.order_id || props.storeModalData.order_date || props.storeModalData.amount || props.storeModalData.payment">
                    <div class="card1-title">
                        <img :src="BasicIcon" />
                        <span>Basic</span>
                    </div>
                    <div class="card1-content flex flex-column lg:flex-row">
                        <div class="card1-left-content flex">
                            <div class="flex flex-column gap-2 card1-left-content-labels">
                                <span v-if="props.storeModalData.cart_id || props.storeModalData.order_id">{{ type !=
                        'store' ? 'Cart Id' : 'Order Id' }}</span>
                                <span v-if="props.storeModalData.order_date">Order Date</span>
                                <span v-if="props.storeModalData.amount && type != 'store'">Amount</span>
                                <span v-if="type == 'store' && props.storeModalData.payment">Payment</span>
                            </div>
                            <div class="flex flex-column gap-2 card1-left-content-data">
                                <span v-if="props.storeModalData.cart_id || props.storeModalData.order_id"
                                    style="color: #006af4">{{ type == 'store' ? props.storeModalData.order_id :
                        props.storeModalData.cart_id }}</span>
                                <span v-if="props.storeModalData.order_date">{{ props.storeModalData.order_date
                                    }}</span>
                                <span v-if="props.storeModalData.amount && type != 'store'">{{
                        props.storeModalData.amount }}</span>
                                <span v-if="type == 'store' && props.storeModalData.payment"
                                    :class="props.storeModalData.payment == 'COD' ? 'cod-tag' : 'prepaid-tag'">{{
                        props.storeModalData.payment }}</span>
                            </div>
                        </div>
                        <div class="card1-right-content flex">
                            <div class="card1-right-labels flex flex-column gap-2">
                                <span v-if="props.storeModalData.time_iniated && type != 'store'">Time Initiated</span>
                                <span v-if="props.storeModalData.checkout_stage && type != 'store'">Checkout
                                    Stage</span>
                                <!-- <span v-if="props.data.StoreData.basic.transaction_id && type == 'store'">Transaction ID</span> -->
                                <span v-if="props.storeModalData.amount && type == 'store'">Amount</span>
                            </div>
                            <div class="card1-right-data flex flex-column gap-2">
                                <span v-if="props.storeModalData.time_iniated && type != 'store'">{{
                        props.storeModalData.time_iniated }}</span>
                                <span v-if="props.storeModalData.checkout_stage && type != 'store'">{{
                        props.storeModalData.checkout_stage }}</span>
                                <!-- <span v-if="props.data.StoreData.basic.transaction_id && type == 'store'">{{ props.data.StoreData.basic.transaction_id }}</span> -->
                                <span v-if="props.storeModalData.amount && type == 'store'">{{
                        props.storeModalData.amount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-section-card2 flex flex-column"
                    v-if="props.storeModalData.customer_full_name || props.storeModalData.customer_mobile || props.storeModalData.customer_address || props.storeModalData.customer_email">
                    <div class="card2-title">
                        <img :src="CustomerIcon" />
                        <span>Customer</span>
                    </div>
                    <div class="card2-content flex">
                        <div class="card2-left-content flex">
                            <div class="flex flex-column gap-2 card2-left-content-labels">
                                <span v-if="props.storeModalData.customer_full_name">Name</span>
                                <span v-if="props.storeModalData.customer_mobile">Phone</span>
                                <span
                                    v-if="props.storeModalData.customer_email && props.data.StoreData.type == 'store'">Email</span>
                            </div>
                            <div class="flex flex-column gap-2 card2-left-content-data">
                                <span v-if="props.storeModalData.customer_full_name"
                                    style="font-family: 'Inter-SemiBold'">{{ props.storeModalData.customer_full_name
                                    }}</span>
                                <span v-if="props.storeModalData.customer_mobile">{{
                        props.storeModalData.customer_mobile }}</span>
                                <span v-if="props.storeModalData.customer_email && props.data.StoreData.type == 'store'"
                                    style="color: #006af4">{{ props.storeModalData.customer_email }}</span>
                            </div>
                        </div>
                        <div v-if="props.storeModalData.customer_address && type == 'store'"
                            class="card2-right-content flex flex-column">
                            <div class="card2-right-title">
                                <span>Shipping Address</span>
                            </div>
                            <div class="card2-right-subcontent flex">
                                <div class="flex" style="gap: 8px">
                                    <div>
                                        <img v-if="!darkModeVal" :src="LocationIcon" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-modal-location.svg"
                                            alt="close-icon" />
                                    </div>
                                    <div style="max-width: 254px">{{ props.storeModalData.customer_address }}</div>
                                </div>

                                <div class="cursor-pointer">
                                    <img v-if="darkModeVal != true" :src="CopyDarkIcon" @click="copyContent()" />
                                    <img v-else src="../../../assets/images/dark-mode/dark-modal-copy.svg"
                                        alt="close-icon" @click="copyContent()" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contaienr-section-card3 flex flex-column">
                    <div class="card3-title">
                        <img :src="ProductIcon" />
                        <span>Product Details</span>
                    </div>
                    <div class="card3-data-table">
                        <NormalTablesVue :Datas="props.productDetails" :coloumData="props.data.StoreData.ColoumnKey" />
                    </div>
                </div>
            </div>
            <div class="section-card4" v-if="props.storeModalData.tags && props.storeModalData.tags.length > 0">
                <div class="card4-title">
                    <span>Other Details </span>
                </div>
                <div class="card4-content flex">
                    <div class="card4-labels flex flex-column gap-2">
                        <!-- <span v-if="props.data.StoreData.other_details.deliver_method && type != 'store'">Delivery Method</span> -->
                        <!-- <span v-if="props.data.StoreData.other_details.fulfilment && type != 'store'">Fulfilment</span> -->
                        <span v-if="props.storeModalData.tags && props.storeModalData.tags.length > 0">Tags</span>
                    </div>
                    <div v-if="props.storeModalData.tags && props.storeModalData.tags.length > 0"
                        class="flex gap-2 flex-wrap" style="max-width: 200px">
                        <div v-if="props.storeModalData.tags" class="flex gap-2 flex-wrap" style="max-width: 200px">
                            <span v-for="tag in props.storeModalData.tags" :key="tag" class="tags-modal">{{ tag
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import './StoreCartModal.scss';
</style>
