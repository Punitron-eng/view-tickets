<script setup>
const props = defineProps(['col', 'data', 'index', 'dataVariables', 'productDetails']);
</script>

<template>
    <div v-if="props.col.field === 'total_whatsapp_charges'" class="dropdown-div dropdown-div-outer" :class="props.data.total_whatsapp_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="props.data.total_whatsapp_charges.length > 1" @click="$refs[`dataOverlay_${props.index}`][0].toggle($event), dataDropdownToggle($event, props.data.total_whatsapp_charges, index, props.col.field)">
            {{ props.data.total_whatsapp_charges.length > 0 ? props.data.total_whatsapp_charges[0].total_whatsapp_charge : '' }}
        </div>
        <div class="parent" v-else>
            {{ props.data.total_whatsapp_charges[0].total_whatsapp_charge }}
        </div>
        <OverlayPanel :ref="'dataOverlay_' + props.index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">WhatsApp Charges</h6>
                <ul>
                    <li v-for="(item, index) in props.dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span>
                        <span>{{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ props.dataVariables.selectedCharge[0].total_whatsapp_charge }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'total_sms_charges'" class="sms-div dropdown-div-outer position-relative" :class="props.data.total_sms_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="props.data.total_sms_charges.length > 1" @click="$refs[`dataOverlay_${index}`][0].toggle($event), dataDropdownToggle($event, props.data.total_sms_charges, index, props.col.field)">
            {{ props.data.total_sms_charges.length > 0 ? props.data.total_sms_charges[0].Total_SMS_Charges : '' }}
        </div>
        <div class="parent" v-else>
            {{ props.data.total_sms_charges[0].Total_SMS_Charges }}
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">SMS Charges</h6>
                <ul>
                    <li v-for="(item, index) in props.dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span
                        ><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ props.dataVariables.selectedCharge[0].Total_SMS_Charges }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'total_email_charges'" class="email-div dropdown-div-outer position-relative" :class="props.data.total_email_charges.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="props.data.total_email_charges.length > 1" @click="$refs[`dataOverlay_${index}`][0].toggle($event), dataDropdownToggle($event, props.data.total_email_charges, index, fieldName)">
            {{ props.data.total_email_charges.length > 0 ? props.data.total_email_charges[0].Total_Email_Charges : '' }}
        </div>
        <div class="parent" v-else>
            {{ props.data.total_email_charges[0].Total_Email_Charges }}
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">Email Charges</h6>
                <ul>
                    <li v-for="(item, index) in props.dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span
                        ><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ props.dataVariables.selectedCharge[0].Total_Email_Charges }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'amount'" class="dropdown-div dropdown-div-outer" :class="props.data.amount.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" v-if="props.data.amount.length > 1" @click="$refs[`dataOverlay_${index}`][0].toggle($event), dataDropdownToggle($event, props.data.amount, index, props.col.field)">
            {{ props.data.amount.length > 0 ? props.data.amount[0].final_total_price : '' }}
        </div>
        <div class="parent" v-else>
            {{ props.data.amount[0].final_total_price }}
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">Amount</h6>
                <ul>
                    <li v-for="(item, index) in props.dataVariables.selectedCharge" :key="index">
                        <span>{{ item.name }}</span
                        ><span> {{ item.value }}</span>
                    </li>
                </ul>
            </div>
            <div class="whatsapp-count-footer">
                <span>Total Amount</span>
                <span class="total-amount">{{ props.dataVariables.selectedCharge[0].final_total_price }}</span>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'refund_amount'" class="removeDropdownArrow">
        <div class="parent">
            {{ props.data.refund_amount.final_total_price }}
        </div>
        <!-- <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
                                        <div class="whatsapp-count-outer">
                                            <h6 class="segoeui-semibold">Amount</h6>
                                            <ul>
                                                <li v-for="(item, index) in props.dataVariables.selectedCharge" :key="index">
                                                    <span>{{ item.name }}</span
                                                    ><span> {{ item.value }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="whatsapp-count-footer">
                                            <span>Total Amount</span>
                                            <span class="total-amount">{{ props.dataVariables.selectedCharge[0].final_total_price }}</span>
                                        </div>
                                    </OverlayPanel> -->
    </div>
    <div v-if="props.col.field === 'customer'" class="dropdown-div dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, props.data.customer, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <img src="../../../assets/images/customer.svg" alt="" />
            <div>{{ props.data.customer?.name || 'N/A' }}</div>
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <h6 class="segoeui-semibold">{{ props.dataVariables.selectedCharge.name }}</h6>

                <div class="customer-email">
                    {{ props.dataVariables.selectedCharge.email }}
                </div>
                <div class="customer-phone">
                    {{ props.dataVariables.selectedCharge.mobile }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'return_reason'" class="dropdown-div dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, props.data.return_reason, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <div>{{ props.data.return_reason?.return_reason || 'N/A' }}</div>
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <!-- <h6 class="segoeui-semibold">{{ props.dataVariables.selectedCharge.return_reason }}</h6> -->

                <div class="customer-phone"><span class="segoeui-semibold">Return Reason : </span> {{ props.dataVariables.selectedCharge.return_reason }}</div>
                <div class="customer-phone"><span class="segoeui-semibold">Return Remark : </span> {{ props.dataVariables.selectedCharge.return_remark }}</div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'pickup_address'" class="dropdown-div dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, props.data.pickup_address, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <!-- <img src="../../../assets/images/customer.svg" alt="" /> -->
            <div>{{ props.data.pickup_address?.full_address || 'N/A' }}</div>
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <!-- <h6 class="segoeui-semibold">{{ props.dataVariables.selectedCharge.name }}</h6> -->

                <!-- <div class="customer-email">
                                                {{ props.dataVariables.selectedCharge.email }}
                                            </div> -->
                <div class="customer-phone">
                    {{ props.dataVariables.selectedCharge.full_address }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'origin_warehouse'" class="dropdown-div dropdown-div-outer" :class="props.data.origin_warehouse == 'N/A' ? 'removeDropdownArrow' : ''">
        <div class="parent customer-outer" v-if="props.data.origin_warehouse != 'N/A'" @click="customerToggle($event, props.data.origin_warehouse, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <div>{{ props.data.origin_warehouse || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ props.data.origin_warehouse || 'N/A' }}</div>
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ props.dataVariables.selectedCharge }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'delivery_warehouse'" class="dropdown-div dropdown-div-outer" :class="props.data.delivery_warehouse == 'N/A' ? 'removeDropdownArrow' : ''">
        <div class="parent customer-outer" v-if="props.data.delivery_warehouse != 'N/A'" @click="customerToggle($event, props.data.delivery_warehouse, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <div>{{ props.data.delivery_warehouse || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ props.data.delivery_warehouse || 'N/A' }}</div>
        </div>
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <div class="customer-phone">
                    {{ props.dataVariables.selectedCharge }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'remark'" class="dropdown-div dropdown-div-outer" :class="props.data.remark.short_remark == 'N/A' ? 'removeDropdownArrow' : ''">
        <div class="parent customer-outer" v-if="props.data.remark.short_remark != 'N/A'" @click="customerToggle($event, props.data.remark, index, props.col.field, ''), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <div>{{ props.data.remark?.short_remark || 'N/A' }}</div>
        </div>
        <div class="parent customer-oute" v-else>
            <div>{{ props.data.remark?.short_remark || 'N/A' }}</div>
        </div>

        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <div class="whatsapp-count-outer">
                <!-- <h6 class="segoeui-semibold">{{ props.dataVariables.selectedCharge.name }}</h6> -->

                <!-- <div class="customer-email">
                                                {{ props.dataVariables.selectedCharge.email }}
                                            </div> -->
                <div class="customer-phone">
                    {{ props.dataVariables.selectedCharge.full_remark }}
                </div>
            </div>
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'dt_status'">
        <div class="parent customer-outer" v-if="typeof props.data.dt_status == 'object'">
            <div class="mr-[8px]">{{ props.data.dt_status?.name || 'N/A' }}</div>
            <img src="../../../assets/images/dt-exclam.svg" alt="" v-tooltip.bottom="props.data.dt_status.last_scan_date" />
        </div>
        <div v-else>
            <div class="mr-[8px]">{{ props.data.dt_status }}</div>
        </div>
    </div>
    <div v-if="props.col.field === 'items'" class="dropdown-div item-dropdown dropdown-div-outer">
        <div class="parent customer-outer" @click="customerToggle($event, props.data.row_id, index, props.col.field, 'apiAvail'), $refs[`dataOverlay_${index}`][0].toggle($event)">
            <div>{{ props.data.items }}</div>
        </div>

        <!-- <div class="parent" v-else>
                                        {{ props.data.customer.name }}
                                    </div> -->
        <OverlayPanel :ref="'dataOverlay_' + index" class="items-dropdown dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
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
    <div v-if="props.col.field === 'payment'" :class="props.data.payment">
        <div :class="props.data.payment == 'Prepaid' ? 'prepaid-content' : 'cod-content'">
            {{ props.data.payment }}
        </div>
    </div>

    <div v-if="props.col.field === 'status'" class="dt-status" :class="props.data.status.class">
        <!-- <div :class="props.data.status"> -->
        <!-- {{  props.data.status.name ? props.data.status.name : props.data.status}} -->
        {{ props.data.status?.name || props.data.status }}
        <!-- </div> -->
    </div>

    <div v-if="props.col.field === 'order_id'" class="orderId-outer">
        <div v-if="props.isOrderIdModalAvail" @click="openOrderIdModal(props.data.row_id)" class="hover:cursor-pointer text-[#0065FF] dark:text-[#78c7ff]">{{ props.data.order_id }}</div>
        <div v-else>{{ props.data.order_id }}</div>
        <div v-if="props.data.is_order_retained == 1" class="order-retained">
            <img src="../../../assets/images/order-retained.svg" alt="" />
        </div>
    </div>
    <div v-if="props.col.field === 'tags'" class="tags-flex">
        <div v-for="(tag, index) in props.data.tags" :key="index" :class="props.data.tags != '' ? 'tags-outer' : ''">
            <div :class="props.data.tags != '' ? 'tags-content' : ''">
                {{ tag }}
            </div>
        </div>
    </div>
    <div v-if="props.col.field === 'awb_no'">
        <div class="shipping-div">
            <div class="logistic-icon">
                <img :src="getLogisticIcon(props.data.logistic_logo)" alt="Logistic Image" />
            </div>
            <a v-if="data?.tracking_url" :href="data?.tracking_url" target="_blank" class="hover:text-[#0065FF] flex">
                {{ props.data.awb_no }}
                <img class="ml-3 awb-hover-icon" :src="getFilterIconSrc('awb-hover-icon')" />
            </a>
            <div class="awb-detail" v-else>
                {{ props.data.awb_no }}
            </div>
        </div>
    </div>

    <div v-if="props.col.field === 'entered_weight'" class="dropdown-div dropdown-div-outer" :class="props.data.entered_weight.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" @click="$refs[`dataOverlay_${index}`][0].toggle($event), dataDropdownToggle($event, props.data.entered_weight, index, props.col.field)">
            {{ `${props.data.entered_weight['entered_kg']} kg` }}
        </div>
        <!-- <div class="parent" v-else>
                                        {{ props.data.entered_weight['entered kg'] }}
                                    </div> -->
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <ITLWeight :weight-data="props.dataVariables.selectedCharge" :rowId="props.data.row_id" />
        </OverlayPanel>
    </div>
    <div v-if="props.col.field === 'weight'" class="dropdown-div dropdown-div-outer" :class="props.data.weight.length === 1 ? 'removeDropdownArrow' : ''">
        <div class="parent" @click="$refs[`dataOverlay_${index}`][0].toggle($event), dataDropdownToggle($event, props.data.weight, index, props.col.field)">
            {{ `${props.data.weight['entered_kg']} kg` }}
        </div>
        <!-- <div class="parent" v-else>
                                        {{ props.data.entered_weight['entered kg'] }}
                                    </div> -->
        <OverlayPanel :ref="'dataOverlay_' + index" class="dropdown-box" :appendTo="'body'" :showCloseIcon="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <ITLWeight :weight-data="props.dataVariables.selectedCharge" :rowId="props.data.row_id" />
        </OverlayPanel>
    </div>
</template>
