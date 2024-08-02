<template>
    <BaseButton name="New Ticket" @click="addNewTicket" :isLoading="isLoading" />
    <CreateNewTicket />
    <BulkUploadModal v-if="topHeader['user_type'] != 3 || topHeader['user_id'] == 3000 || topHeader['user_id'] == 7214 || topHeader['user_id'] == 903" />
</template>

<script setup>
import { ref } from 'vue';
import BulkUploadModal from '../modal/BulkUploadModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { viewTicketVariables } from '../viewTicketVariables';
import CreateNewTicket from '../modal/CreateNewTicket.vue';
import { viewTicketVariables as dataVariables } from '../viewTicketVariables';
const topHeader = JSON.parse(localStorage.getItem('top_header'));

const isLoading = ref(false);

const addNewTicket = () => {
    viewTicketVariables.value.isCreateNewTicketModalVisible = true;
};
const addTicketRating = () => {
    dataVariables.value.isTicketRateModalVisible = true;
};
</script>
