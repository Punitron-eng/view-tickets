<script setup>
import NormalTabels from '../../../components/itl-dataTable-files/itl-table/NormalTables.vue';
import WhatsappIcon from '../../../assets/images/modal-whatsapp.svg';
import GreenTickIcon from '../../../assets/images/modal-green-tick.svg';
import CloseIcon from '../../../assets/images/close-icon.svg';
import BlueDartIcon from '../../../assets/images/bluedart-v2.svg';
import FlagIcon from '../../../assets/images/modal-flag.svg';
import MessageIcon from '../../../assets/images/modal-message.svg';
import ArrowIcon from '../../../assets/images/modal-arrow.svg';
import DotIcon from '../../../assets/images/modal-3dot-icon.svg';
import BasicIcon from '../../../assets/images/modal-basic.svg';
import ShopifyIcon from '../../../assets/images/modal-shopify-icon.webp';
import LocationIcon from '../../../assets/images/modal-location.svg';
import CopyIcon from '../../../assets/images/modal-copy.svg';
import CustomerIcon from '../../../assets/images/modal-customer.svg';
import ProductIcon from '../../../assets/images/modal-product.svg';
import ParcelIcon from '../../../assets/images/modal-parcel.svg';
import ExtraIcon from '../../../assets/images/modal-extra.svg';
import EditIcon from '../../../assets/images/modal-edit.svg';
import OtherIcon from '../../../assets/images/modal-other.svg';
import BlueTickIcon from '../../../assets/images/modal-blue-tick.svg';
import { defineProps,computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import { DARKMODE } from '../../../store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['close']);
const products = [
    {
        product: {
            image: 'https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/placeholder-products.svg',
            value: 'Men Waterproof Sailing Jacket',
        },
        qty: '1',
        sku: 'HSDN7280',
        hsn_code: '6739100020',
        discount: '-₹40.00',
        tax_rate: '₹3.45',
        price: '₹1500.00',
    },
    {
        product: {
            image: 'https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/placeholder-products.svg',
            value: 'Blue Dail Analog Watch',
        },
        qty: '1',
        sku: 'HSDN7280',
        hsn_code: '6739100020',
        discount: '-₹40.00',
        tax_rate: '₹3.45',
        price: '₹3100.00',
    },
];
const ColoumnKey = [
    {
        field: 'product',
        header: 'Product',
    },
    {
        field: 'qty',
        header: 'QTY',
    },
    {
        field: 'sku',
        header: 'AKU',
    },
    {
        field: 'hsn_code',
        header: 'HSN CODE',
    },
    {
        field: 'discount',
        header: 'DISCOUNT',
    },
    {
        field: 'tax_rate',
        header: 'TAX RATE',
    },
    {
        field: 'price',
        header: 'PRICE',
    },
];
</script>
<template>
    <div class="main-container">
        <div class="main-container-header flex justify-content-between bg-white align-items-center">
            <div class="flex justify-content-center align-items-center ">
                <div class="flex align-items-center header-content-1" >
                    <button class="close-button" @click="props.close">
                        <img :src="CloseIcon" />
                    </button>
                    <span class="font-bold text-lg ml-4" style="color:#1d252b"> Details</span>
                </div>
                <div class="flex align-items-center header-content-2">
                    <img :src="BlueDartIcon" style="width: 1.5rem;" />
                    <span>AWB:<span class="font-semibold" style='margin-left:4px; color:#1d252b'>BU28934029</span></span>
                    
                </div>
                <div class="header-content-3">
                    <div class="line" />
                </div>
                <div class="flex header-content-4">
                    <span>Risk</span>
                    <img :src="FlagIcon" />
                </div>
                <div class="flex align-items-center header-content-5 ">
                    Buyer Intent
                    <div class="flex  ">
                        <span class="buyer-intent-yellow-color"></span>
                        <span class="buyer-intent-yellow-color "></span>
                        <span class="buyer-intent-yellow-color"></span>
                    </div>
                </div>
                <div class="flex align-items-center header-content-6">
                    <img :src="MessageIcon" />
                    <span>

                        Open Buyer Chat
                        <img :src="ArrowIcon" style="margin-left:4px" />
                    </span>
                </div>
                <div class="header-content-7">UNFULFILLED</div>
            </div>
            <div class="flex gap-2 mr-2rem ">
                <button class="header-button1">
                    <img :src="DotIcon"  />
                </button>
                <button class="header-button2 ">Refulfill</button>
            </div>
        </div>
        <div class="container-section-2 flex justify-content-center gap-3 ">
            <div class="flex flex-column gap-3 container-section-left-cards" >
                <div class="container-basic bg-white border-round-sm">
                    <div class="bottom-border container-basic-header">
                        <div class="flex align-items-center font-semibold gap-3  text-base font-semibold">
                            <img :src="BasicIcon" class="basic-icon" />
                            Basic
                        </div>
                    </div>
                    <div class="bottom-border p-4">
                        <div class="flex" style="gap: 163px">
                            <div class="flex justify-content-between" >
                                <div class="flex flex-column gap-2" style="color:#3c4249">
                                    <span>Order ID</span>
                                    <span>Order Date</span>
                                    <span>Amount</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left: 68px; color:#0c0c0d">
                                    <span style="color: #006af4">ITL00010</span>
                                    <span>2/3/2023</span>
                                    <span>₹ 800.00</span>
                                </div>
                            </div>
                            <div class="flex justify-content-between" >
                                <div class="flex flex-column gap-2"  style="color:#3c4249">
                                    <span>Payment</span>
                                    <span>Items</span>
                                    <span>Store</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left:106px; color:#0c0c0d">
                                    <span class="prepaid-tag w-6 text-center text-xs">Prepaid </span>
                                    <span>2</span>
                                    <span class="flex gap-2 align-items-center">
                                        <img :src="ShopifyIcon" class="ShopifyIcon" />
                                        DivineTrends</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="flex" >
                            <div class="flex " >
                                <div class="flex gap-2 flex-column" style="color:#3c4249">
                                    <span>Store Name</span>
                                    <span>Mobile No.</span>
                                </div>
                                <div class="flex gap-2 flex-column" style="margin-left:63px; color:#0c0c0d">
                                    <span>Surat Baba</span>
                                    <span>9037773225</span>
                                </div>
                            </div>
                            <div class="flex flex-column" style="margin-left: 144px;">
                                <div class="text-xs" style="color:#656f7d;">PICKUP ADDRESS</div>
                                <div class="flex gap-2 pt-2" style="color: #0c0c0d;">
                                    <div>
                                        <img v-if="!darkModeVal" :src="LocationIcon" />
                                        <img v-else src="../../../assets/images/dark-mode/dark-modal-location.svg" alt="close-icon" />
                                    </div>
                                    <div class="max-w-17rem">Gaurav palace, Acharya Nagar, kandivali Bhagat Colony Kandivali West, Bengaluru North, Karnataka 560076</div>
                                    <div>
                                        <button class="copy-button">
                                            <img v-if="darkModeVal != true" :src="CopyIcon" />
                                            <img v-else src="../../../assets/images/dark-mode/dark-modal-copy.svg" alt="close-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-customer bg-white border-round-sm">
                    <div class="bottom-border container-basic-header flex align-items-center gap-3 font-semibold text-base">
                        <img :src="CustomerIcon" />
                        <span class="font-semibold"> Customer</span>
                    </div>
                    <div class="p-4">
                        <div class="flex ">
                            <div class="flex justify-content-between">
                                <div class="flex gap-2 flex-column" style="color:#3c4249">
                                    <span>Full Name</span>
                                    <span>Company Name</span>
                                    <span>Mobile No.</span>
                                    <span>Alternative No.</span>
                                    <span>Email </span>
                                </div>
                                <div class="flex gap-2 flex-column" style="margin-left: 38px; color:#0c0c0d">
                                    <span class="font-bold">Vipul Yadav </span>
                                    <span>logistics Ltd.</span>
                                    <span>+91 9164508106</span>
                                    <span>+91 8019200390</span>
                                    <span class="text-blue-500">vipul@ithinklogistics.com</span>
                                </div>
                            </div>
                            <div class="flex flex-column gap-2" style="margin-left: 69px;">
                                <div class="text-xs" style="color:#656f7d">SHIPPING ADDRESS</div>
                                <div class="flex gap-2 pt-1" style="color:#0c0c0d">
                                    <div><img :src="LocationIcon" /></div>
                                    <div class="max-w-17rem">Gaurav palace, Acharya Nagar, kandivali Bhagat Colony Kandivali West, Bengaluru North, Karnataka 560076</div>
                                    <div>
                                        <button class="copy-button">
                                            <img :src="CopyIcon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-product-details bg-white border-round-sm">
                    <div class="p-4">
                        <div class="flex align-items-center gap-3 font-semibold text-base">
                            <img :src="ProductIcon" />
                            <span class="font-semibold"> Product Details</span>
                        </div>
                        <div class="pt-2">
                            <NormalTabels :Datas="products" :coloumData="ColoumnKey" />
                        </div>
                    </div>
                </div>
                <div class="container-pracel-extra-details border-round-sm flex gap-3">
                    <div class="bg-white">
                        <div class="bottom-border container-basic-header flex align-items-center gap-3 text-base font-semibold">
                            <img :src="ParcelIcon" />
                            <span class="font-semibold"> Parcel Size</span>
                        </div>
                        <div class="p-4">
                            <div class="flex" >
                                <div class="flex flex-column gap-2" style="color:#3c4249">
                                    <span>Box Size</span>
                                    <span>Length</span>
                                    <span>Width</span>
                                    <span>Height</span>
                                    <span>Weight</span>
                                    <span>Volumetric</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left:100px;margin-right: 8rem; color:#0c0c0d">
                                    <span>NA</span>
                                    <span>10 cm</span>
                                    <span>10 cm</span>
                                    <span>10 cm</span>
                                    <span>0.50 kg</span>
                                    <span>0.20 kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white">
                        <div class="bottom-border container-basic-header pr-4 flex align-items-center gap-2 justify-content-between">
                            <div class="flex align-items-center gap-3 font-semibold text-base">
                                <img :src="ExtraIcon" />
                                <span class="font-semibold"> Extra Chargers </span>
                            </div>
                            <div>
                                <button class="edit-button">
                                    <img :src="EditIcon" />
                                </button>
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="flex" >
                                <div class="flex flex-column gap-2" style="color:#3c4249">
                                    <span>Vat</span>
                                    <span>Fuel</span>
                                    <span>Reverse</span>
                                    <span>Handling</span>
                                    <span>Freight</span>
                                    <span>Other</span>
                                    <span>Insurance</span>
                                    <span>Export</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left:76px;margin-right: 8rem;color:#0c0c0d">
                                    <span>₹14.00</span>
                                    <span>₹14.00</span>
                                    <span>₹2.23</span>
                                    <span>₹10.20</span>
                                    <span>₹0.10</span>
                                    <span>₹14.00</span>
                                    <span>₹14.00</span>
                                    <span>₹2.23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-other-details md:mb-8 bg-white border-round-sm">
                    <div class="bottom-border container-basic-header flex align-items-center gap-3">
                        <img :src="OtherIcon" />
                        <span class="font-semibold text-base"> Other Icon</span>
                    </div>
                    <div class="p-4">
                        <div class="flex" >
                            <div class="flex" >
                                <div class="flex flex-column gap-2" style="color:#3c4249">
                                    <span>Reseller Name</span>
                                    <span>Reseller Mobile</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left: 42px; color: #0c0c0d;">
                                    <span>N/A</span>
                                    <span>N/A</span>
                                </div>
                            </div>
                            <div class="flex" style="margin-left: 200px;">
                                <div class="flex flex-column gap-2" style="color:#3c4249">
                                    <span>Eway Bill No.</span>
                                    <span>GST no.</span>
                                </div>
                                <div class="flex flex-column gap-2" style="margin-left: 81px; color:#0c0c0d">
                                    <span>N/A</span>
                                    <span>N/A</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-activity bg-white border-round-sm" >
                <div class="bottom-border container-basic-header text-base font-semibold">Activity</div>
                <div class="p-4" style="color:#3c4249">
                    <div class="flex gap-3 pb-2">
                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                            <img :src="WhatsappIcon" class="whatsapp-icon" />
                            <div class="line" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <span>Order Confirmation Sent</span>
                            <span class="text-sm"
                                >Today - 07:40 PM
                                <img :src="BlueTickIcon" />
                            </span>
                        </div>
                    </div>
                    <div class="activity-tag  border-round-sm flex align-items-center justify-content-between gap-5" style="padding: 12px 20px 12px 20px;">
                        <div class="flex align-items-center gap-2">
                            <img :src="GreenTickIcon" class="" />
                            <span class="font-semibold">Order Confirmed</span>
                        </div>
                        <span class="text-sm">Today - 07:40 PM</span>
                    </div>
                    <div class="flex gap-3 align-items-center pt-2 pb-2">
                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                            <div class="line" />

                            <img :src="WhatsappIcon" class="" />
                            <div class="line" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <span class="">Address Confirmation Sent</span>
                            <span class="text-sm">Today - 07:40 PM <img :src="BlueTickIcon" /></span>
                        </div>
                    </div>
                    <div class="activity-tag border-round-sm flex align-items-center justify-content-between gap-5" style="padding: 12px 20px 12px 20px;">
                        <div class="flex align-items-center gap-2">
                            <img :src="GreenTickIcon" class="" />
                            <span class="font-semibold">Address Confirmed</span>
                        </div>
                        <span class="text-sm">Today - 07:40 PM</span>
                    </div>
                    <div class="flex gap-3 align-items-center pt-2 pb-2">
                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                            <div class="line" />

                            <img :src="WhatsappIcon" class="" />
                            <div class="line" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <span>COD to Prepaid Coupon Sent</span>
                            <span class="text-sm">Today - 07:40 PM <img :src="BlueTickIcon" /></span>
                        </div>
                    </div>
                    <div class="flex gap-3 align-items-center pb-2">
                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                            <img :src="WhatsappIcon" class="" />
                            <div class="line" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <span>COD to Prepaid Requested</span>
                            <span class="text-sm">Today - 07:40 PM <img :src="BlueTickIcon" /></span>
                        </div>
                    </div>
                    <div class="flex gap-3 align-items-center pb-2">
                        <div class="flex flex-column justify-content-center align-items-center gap-2">
                            <img :src="WhatsappIcon" class="" />
                            <div class="line" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <span>COD to Prepaid Link Sent</span>
                            <span class="text-sm">Today - 07:40 PM <img :src="BlueTickIcon" /></span>
                        </div>
                    </div>
                    <div class="activity-tag border-round-sm flex align-items-center justify-content-between gap-5" style="padding: 12px 20px 12px 20px;">
                        <div class="flex align-items-center gap-2">
                            <img :src="GreenTickIcon" class="" />
                            <span class="font-semibold">Payment Success</span>
                        </div>
                        <span class="text-sm">Today - 07:40 PM</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import './CheckoutOpenModal.scss';
</style>
