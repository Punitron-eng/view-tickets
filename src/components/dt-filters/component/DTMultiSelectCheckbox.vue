<template>
    <Dropdown v-model="modal[id.field]" filter :options="id.values" optionLabel="value" id="filter-modal" placeholder="Select One" class="w-[216px] md:w-[226px] font-normal dark:bg-[#414141] rounded-[4px] dropdown-radio" appendTo="self">
        <template #option="slotProps">
            <div class="flex items-center gap-2 p-[10px]" @click="ticketDepartmentApiCall(slotProps.option.id, modal)">
                <input type="radio" :id="slotProps.option.id" v-model="modal[id.field].id" :value="slotProps.option.id" :name="slotProps.option.value" />
                <label :for="slotProps.option.id" class="hover:cursor-pointer">
                    {{ slotProps.option.value }}
                </label>
            </div>
        </template>
    </Dropdown>
</template>

<script setup>
import { defineModel } from 'vue';
import { ticketDepartmentApiCall } from '@/api/domestic/view-ticket/viewTicketApi';
const modal = defineModel();
const { id } = defineProps(['id']);
</script>

<style>
.darkTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
    background: #4d4d4d !important;
}

.p-checkbox .p-checkbox-box {
    border-radius: 4px;
}

.p-checkbox .p-checkbox-box.p-highlight {
    background-color: #1579ff !important;
}

.p-checkbox .p-checkbox-box.p-highlight,
.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
    border-color: #1579ff !important;
    /* color: black; */
}

.darkTheme .p-checkbox .p-checkbox-box .p-checkbox-icon {
    color: #ffff;
}

.lightTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
    background: #f3f4f6 !important;
}

.darkTheme .p-dropdown .p-dropdown-panel {
    background-color: transparent;
}

#ticket_department .dropdown-radio .p-dropdown-header .p-dropdown-filter-container .p-inputtext {
    text-indent: 25px;
}

#filter-modal .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
    padding: 0px !important;
}
</style>
