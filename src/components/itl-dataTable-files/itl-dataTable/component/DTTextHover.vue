<script setup>
const { data, col, props, functions } = defineProps(['data', 'col', 'props', 'functions']);
</script>
<template>
    <!-- order ID -->
    <div v-if="col.field === 'order_id'" class="orderId-outer">
        <div v-if="!props.haveAccess && !props.haveAccessOrderDetail">{{ data.order_id }}</div>
        <div v-else @click="functions.openOrderIdModal(data.row_id)" class="hover:cursor-pointer text-[#0065FF] dark:text-[#78c7ff]">{{ data.order_id }}</div>
        <div v-if="data.is_order_retained == 1" class="order-retained">
            <img src="../../../../assets/images/order-retained.svg" alt="" />
        </div>
    </div>
    <!-- Invoice id -->
    <div v-if="col.field === 'invoice_id'" class="orderId-outer">
        <div v-if="!data.invoice_id.value">{{ data.invoice_id }}</div>
        <a v-else :href="data.invoice_id.link" class="hover:cursor-pointer text-[#0065FF] dark:text-[#78c7ff]">{{ data.invoice_id.value }}</a>
    </div>
    <!-- Ticket ID -->
    <div v-if="col.field === 'ticket_id'" class="orderId-outer">
        <div class="hover:cursor-pointer text-[#0065FF] dark:text-[#78c7ff]" @click="functions.openTicketModal(data.ticket_id)">
            {{ data.ticket_id }}
        </div>
    </div>
</template>
