<template>
    <div v-if="col.field === 'ticket_category'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
            <div ref="dtTextContent">{{ data.ticket_category || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <p>{{ data.ticket_category || 'N/A' }}</p>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'ticket_assign_to'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
            <div ref="dtTextContent">{{ data.ticket_assign_to || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <p>{{ data.ticket_assign_to || 'N/A' }}</p>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'ticket_ageing'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
            <div ref="dtTextContent">{{ data.ticket_ageing || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <p>{{ data.ticket_ageing || 'N/A' }}</p>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'ticket_subject'" class="dropdown-div dropdown-div-outer">
        <div v-if="data.ticket_subject">
            <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
                <div ref="dtTextContent">{{ data.ticket_subject }}</div>
            </div>
            <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
                <div class="whatsapp-count-outer">
                    <p>{{ data.ticket_subject }}</p>
                </div>
            </OverlayPanel>
        </div>
        <div v-else>
            <div class="cursor-text">N/A</div>
        </div>
    </div>
    <div v-if="col.field === 'ticket_description'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
            <div ref="dtTextContent">{{ data.ticket_description || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <p>{{ data.ticket_description || 'N/A' }}</p>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_customer_details'" class="dropdown-div dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, data.order_customer_details, index, col.field, ''), overlay.toggle($event)">
            <img v-if="!darkModeVal" src="@/assets/images/customer.svg" alt="" />
            <img v-else src="@/assets/images/dark-mode/dark-customer.svg" alt="" />
            <div>{{ data.order_customer_details?.name || 'N/A' }}</div>
            {{ console.log(data.order_customer_details?.name) }}
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">{{ dataVariables.selectedCharge.name }}</h6>
                <div class="customer-email">
                    {{ dataVariables.selectedCharge.email }}
                </div>
                <div class="customer-phone">
                    {{ dataVariables.selectedCharge.mobile }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_return_reason'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.order_return_reason, index, col.field, ''), overlay.toggle($event)">
            <div ref="dtTextContent">{{ data.order_return_reason?.return_reason || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone"><span class="segoeui-semibold">Return Reason : </span> {{ dataVariables.selectedCharge.return_reason }}</div>
                <div class="customer-phone max-h-[100px] overflow-auto"><span class="segoeui-semibold">Return Remark : </span> {{ dataVariables.selectedCharge.return_remark }}</div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'buyer_address'" class="dropdown-div dropdown-div-outer">
        <div :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]" class="customer-outer" @click="customerToggle($event, data.buyer_address, index, col.field, ''), overlay.toggle($event)">
            <!-- <img src="../../../assets/images/customer.svg" alt="" /> -->
            <div ref="dtTextContent">{{ data.buyer_address?.full_address || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ dataVariables.selectedCharge.full_address }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'origin_warehouse'" class="dropdown-div dropdown-div-outer" :class="data.origin_warehouse == 'N/A' ? 'removeDropdownArrow' : ''">
        <div
            :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]"
            class="customer-outer"
            v-if="data.origin_warehouse != 'N/A'"
            @click="customerToggle($event, data.origin_warehouse, index, col.field, ''), overlay.toggle($event)"
        >
            <div ref="dtTextContent">{{ data.origin_warehouse || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ data.origin_warehouse || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ dataVariables.selectedCharge }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'delivery_warehouse'" class="dropdown-div dropdown-div-outer" :class="data.delivery_warehouse == 'N/A' ? 'removeDropdownArrow' : ''">
        <div
            :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]"
            class="customer-outer"
            v-if="data.delivery_warehouse != 'N/A'"
            @click="customerToggle($event, data.delivery_warehouse, index, col.field, ''), overlay.toggle($event)"
        >
            <div ref="dtTextContent">{{ data.delivery_warehouse || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ data.delivery_warehouse || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ dataVariables.selectedCharge }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_remark'" class="dropdown-div dropdown-div-outer" :class="data.order_remark.full_remark == 'N/A' ? 'removeDropdownArrow' : ''">
        <div
            :class="[{ 'dt-full-content': !isTextOverflow }, { parent: isTextOverflow }]"
            class="customer-outer"
            v-if="data.order_remark.full_remark != 'N/A'"
            @click="customerToggle($event, data.order_remark, index, col.field, ''), overlay.toggle($event)"
        >
            <div ref="dtTextContent">{{ data.order_remark?.full_remark || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ data.order_remark?.full_remark || 'N/A' }}</div>
        </div>
        <OverlayPanel ref="overlay" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ dataVariables.selectedCharge.full_remark }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="col.field === 'order_product_quantity'" class="dropdown-div item-dropdown dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, data.row_id, index, col.field, 'apiAvail'), overlay.toggle($event)">
            <div>{{ data.order_product_quantity }}</div>
        </div>
        <OverlayPanel ref="overlay" class="items-dropdown dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer items-overflow">
                <h6 class="segoeui-semibold">Items</h6>
                <div v-if="props.productDetails.length == 0">
                    <div class="flex gap-3">
                        <SkeletonView width="50px" height="40px" class="rounded-[4px]" />
                        <div class="flex flex-col gap-3 w-[90%]">
                            <SkeletonView width="80%" class="rounded-[12px]" />
                            <SkeletonView class="rounded-[4px]" height="7px" />
                        </div>
                    </div>
                </div>
                <div v-else class="item-list-outer product-details-list" v-for="(product, index) in props.productDetails" :key="index">
                    <div class="item-outer">
                        <div class="item-image">
                            <img :src="getFilterIconSrc('placeholder-products')" alt="" class="min-w-[30px] min-h-[30px]" />
                        </div>
                        <div class="item-name helvetica-medium gray-700">
                            <div class="item-product-name">{{ product.loop_product_title ? product.loop_product_title : 'Product title' }}</div>
                            <span class="product-qty-price">{{ product.loop_product_price }} x {{ product.loop_product_quantity }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayPanel>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import { dataTableVariables as dataVariables } from '../dataTable';
const store = useStore();
const overlay = ref(null);
const { data, col, props, index, customerToggle } = defineProps(['data', 'col', 'props', 'index', 'customerToggle']);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const getFilterIconSrc = (iconName) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};
// added by bhavna 06.07.24 (remove overlay if full text shown)
const isTextOverflow = ref(false);
const dtTextContent = ref('');
const checkTextOverflow = () => {
    if (dtTextContent.value) {
        isTextOverflow.value = dtTextContent.value.scrollWidth > dtTextContent.value.clientWidth;
    }
};
onMounted(() => {
    checkTextOverflow();
});
// added by bhavna 06.07.24
</script>
