<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { WEIGHTDISCREPANCY } from '@/store/domestic/weight-discrepancy/constants';
import { DARKMODE } from '@/store/dark-mode/constants';
const props = defineProps(['showProducts']);
const emit = defineEmits(['productDetails']);
const store = useStore();
const allProductData = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/sendProductDetails`]);
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const iskeleton = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/sendSkeleton`]);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const showProductDetailsFunc = (id) => {
    id.showMoreDetailProduct = !id.showMoreDetailProduct;
};

const tempIcon = (icon) => {
    if (icon) {
        if (darkModeVal.value != true) {
            return new URL(`../../../../../assets/images/${icon}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../../../assets/images/dark-mode/dark-${icon}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};
const getUpdatedProductPayload = () => {
    const payload = allProductData.value.all_product_data_array.map((item) => ({
        categoryValue: item.product_category,
        productUrl: item.product_urls,
        productRemark: item.product_remarks,
    }));
    emit('productDetails', payload);
};
</script>

<template>
    <div v-if="props.showProducts" class="Products-sections">
        <div class="main-section">
            <div class="main-info">
                <div class="header">
                    <div class="update-shipment-info">
                        <img class="product-logo" src="../../../../../assets/images/product.svg" />
                        <span class="header-name" v-if="allProductData != ''"> Products({{ allProductData.all_product_data_array.length }}) </span>
                    </div>
                </div>
            </div>
            <div v-if="props.showProducts" class="product-cards">
                <div class="prd-details" v-if="allProductData != ''">
                    <div v-for="(id, index) in allProductData.all_product_data_array" :key="index" class="right">
                        <div class="product-info">
                            <div class="product-description">
                                <div class="products_details" @click="showProductDetailsFunc(id)">
                                    <div class="productsdetails">
                                        <div class="select-cloths">
                                            <div class="quentity-img">{{ id.loop_product_quantity }}</div>
                                            <div class="select-cloths-image">
                                                <img src="../../../../../assets/images/shipment/card-two/card2.png" class="upload-img" />
                                            </div>
                                        </div>
                                        <div class="product-details" v-if="!iskeleton">
                                            <div class="product-name">{{ id.loop_product_title }}</div>
                                            <span class="product-price">₹{{ id.loop_product_price }}</span>
                                        </div>
                                        <div class="product-details" v-if="iskeleton">
                                            <div class="product-name">
                                                <skeletonView width="100px" height="8px"></skeletonView>
                                            </div>
                                            <span class="product-price">
                                                <skeletonView width="50px" height="8px"></skeletonView>
                                            </span>
                                        </div>
                                    </div>
                                    <img class="expand-img" :src="tempIcon(id.showMoreDetailProduct ? 'ic_uparrow' : 'ic_downarrow')" />
                                </div>
                            </div>
                            <!-- <div>:class="{ 'subadmin-product-outer': topHeader.user_type == '1' || topHeader.user_type == '2' }"</div> -->
                            <div class="main-product-section" v-if="id.showMoreDetailProduct">
                                <div class="product-section">
                                    <label class="product-section-label" for="productcategory">Product Category</label>
                                    <skeletonView v-if="iskeleton" width="100%" height="32px" style="border-radius: 4px"></skeletonView>
                                    <Dropdown
                                        v-if="!iskeleton"
                                        class="product-cat-dropdown"
                                        v-model="id.product_category"
                                        optionLabel="name"
                                        optionValue="value"
                                        placeholder="Select Category"
                                        appendTo="self"
                                        id="product-cat-dropdown"
                                        :options="allProductData.product_category_data.product_categories"
                                    >
                                        <template #value="slotProps">
                                            <div v-if="value" class="flex align-items-center">
                                                <div class="list-payment-op">{{ slotProps.value.value }}</div>
                                            </div>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="option-item">
                                                <div class="select-options">
                                                    <div class="option-name" @click="getUpdatedProductPayload()">{{ slotProps.option.name }}</div>
                                                </div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <!-- <input type="text" class="input-text" name="producturl" readonly :value="id.prd_catg" /> -->
                                </div>
                                <div class="product-section">
                                    <label class="product-section-label">Product URL</label>
                                    <skeletonView v-if="iskeleton" width="100%" height="32px" style="border-radius: 4px"></skeletonView>
                                    <input
                                        v-if="!iskeleton"
                                        type="text"
                                        name="producturl"
                                        :class="{ 'read-only-input hover:cursor-not-allowed': topHeader.user_type == '1' || topHeader.user_type == '2' }"
                                        class="border dark:!border-[#4d4d4d]"
                                        :readonly="topHeader.user_type == '1' || topHeader.user_type == '2'"
                                        v-model="id.product_urls"
                                        @change="getUpdatedProductPayload()"
                                    />
                                    <!-- <input type="text" name="producturl" readonly :value="id.prd_url" /> -->
                                </div>
                                <div class="product-section">
                                    <label class="product-section-label">Product Remark</label>
                                    <skeletonView v-if="iskeleton" width="100%" height="32px" style="border-radius: 4px"></skeletonView>
                                    <input
                                        v-if="!iskeleton"
                                        type="text"
                                        name="productremark"
                                        :readonly="topHeader.user_type == '1' || topHeader.user_type == '2'"
                                        :class="{ 'read-only-input hover:cursor-not-allowed': topHeader.user_type == '1' || topHeader.user_type == '2' }"
                                        class="border dark:!border-[#4d4d4d]"
                                        v-model="id.product_remarks"
                                        @change="getUpdatedProductPayload()"
                                    />
                                    <!-- <input type="text" name="productremark" readonly :value="id.prd_remark" /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* @import '../model/view-detail/viewDetail.scss'; */
/* @import '../model/raise-discrepancy/raiseDiscrepancy.scss'; */
@import './productTabel.scss';
</style>
