<script setup>
import { useStore } from 'vuex';
import getImg from '@/util/getImg';
import { ref, watch, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { checkUserType } from '@/util/commonHandlers';
import BaseButton from '@/components/base/BaseButton.vue';
import TicketRateModal from '../modal/TicketRateModal.vue';
import { viewTicketVariables as dataVariables } from '../viewTicketVariables';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import ConfirmationModal from '@/components/itl-common-features/ConfirmationModal.vue';
import { closeTicketApi, reopenTicketApi } from '@/api/domestic/view-ticket/viewTicketApi';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const { isLoading, ticketModalData, isActive } = defineProps(['isLoading', 'ticketModalData', 'isActive']);
const ticketModalComputed = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/sendChatTicketModalData`] || []);
const store = useStore();
const toast = useToast();
const isDisable = ref(false); // for disable button on api call
const isRateDone = ref(true);
const changesBtnState = ref({
    close: true,
    reopen: false,
});
const selectedAwbNo = ref('');

watch(
    () => ticketModalComputed.value,
    (newValue) => {
        const ticketStatus = newValue.ticketData.data;
        selectedAwbNo.value = newValue.ticketData.data.awb_no_logistics;
        if (ticketStatus.ticket_status == 'Closed') {
            changesBtnState.value.close = false;
            changesBtnState.value.reopen = true;
        } else {
            changesBtnState.value.close = true;
            changesBtnState.value.reopen = false;
        }
    }
);
watch(
    () => dataVariables.value.isTicketRateModalVisible,
    (newValue) => {
        if (!newValue) {
            isRateDone.value = false;
        }
    }
);
const addTicketRating = () => {
    dataVariables.value.isTicketRateModalVisible = true;
};

// fetching the logistic logo
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../../../assets/images/logistics/${logisticLogo}.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        return new URL(`../../../../../assets/images/default_logics_2.svg`, import.meta.url).href;
    } else {
        return imagePath;
    }
};
// for switchs in responsive view
const handleClick = (e) => {
    const isActiveValue = e.target.textContent.trim();
    // Set all values to false
    for (const key in isActive) {
        isActive[key] = false;
    }
    // Set the clicked value to true
    isActive[isActiveValue] = true;
};
// close ticket api
const closeTicket = async (selectedTicketId) => {
    isDisable.value = true;
    try {
        const result = await closeTicketApi(selectedTicketId);
        if (result.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: result.message, life: 1000 });
            ticketModalData.ticket_status = 'Closed';
            changesBtnState.value.close = false;
            changesBtnState.value.reopen = true;
            dataTableFncs.getDataTableData();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 1000 });
    } finally {
        confirmationLoading.value = false;
        isOpenConfirmation.value = false;
        isDisable.value = false;
    }
};
// reopen ticket api
const reopenTicket = async (selectedTicketId) => {
    try {
        const payload = {
            ticket_id: selectedTicketId,
            awb_no: selectedAwbNo.value,
        };
        const result = await reopenTicketApi(payload);
        if (result.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: result.message, life: 1000 });
            ticketModalData.ticket_status = 'Open';
            changesBtnState.value.close = true;
            changesBtnState.value.reopen = false;
            dataTableFncs.getDataTableData();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 1000 });
    } finally {
        confirmationLoading.value = false;
        isOpenConfirmation.value = false;
        isDisable.value = false;
    }
};
// for open confirmation modal
const isOpenConfirmation = ref(false);
const openConfirmationModal = () => {
    isOpenConfirmation.value = !isOpenConfirmation.value;
};
const confirmationLoading = ref(false);
const confirmPendingFnc = async () => {
    confirmationLoading.value = true;
    const selectedTicketId = ticketModalComputed.value.ticketData.data.ticket_id;
    if (changesBtnState.value.close) {
        closeTicket(selectedTicketId);
    } else {
        reopenTicket(selectedTicketId);
    }
};
</script>
<template>
    <div class="flex justify-between w-[100%] md:w-full items-center gap-[8px] md:gap-2 ml-1 md:!ml-10 flex-col-reverse md:flex-row">
        <div class="flex justify-between items-center gap-2 w-[100%]">
            <div v-if="isLoading" class="flex justify-between items-center gap-2 w-screen md:w-auto">
                <SkeletonView width="80px" height="16px" />
                <SkeletonView width="150px" height="16px" />
                <SkeletonView width="80px" height="16px" />
            </div>
            <div v-else class="flex w-[100%] md:w-full justify-between md:justify-normal flex-col md:flex-row md:items-center gap-[4px] ld:gap-2">
                <div class="text-[18px] font-bold mr-[27px] font-interSemiBold">{{ ticketModalData?.ticket_id }}</div>
                <div class="flex justify-between flex-wrap lg:flex-row md:justify-normal lg:!items-center w-fit gap-2">
                    <div class="flex items-center mr-[8px] text-[12px] leading-[16px]" v-if="ticketModalData?.awb_no_logistics !== ''">
                        <img :src="getLogisticIcon(ticketModalData?.logistic_logo || 'undefined')" class="mr-[8px]" />AWB:
                        <p class="font-interSemiBold text-[12px] leading-[16px] mx-[4px]">
                            {{ ticketModalData?.awb_no_logistics }}
                        </p>
                    </div>
                    <div class="text-[10px] uppercase px-2 font-interSemiBold rounded-sm md:mr-[8px] leading-[16px] w-fit" :class="ticketModalData?.ticket_due_details?.class">{{ ticketModalData?.ticket_due_details?.text }}</div>
                </div>
                <div class="flex md:hidden items-center gap-4 pt-[24px]">
                    <button @click="handleClick($event)" class="capitalize" :class="isActive.summary ? 'mb-[0px] font-interSemiBold' : 'mb-[5px]'">
                        summary
                        <div class="h-[5px] w-full bg-itl-primary rounded-t-itl-sm" :class="isActive.summary ? 'block ' : 'hidden '" />
                    </button>
                    <button @click="handleClick($event)" class="capitalize" :class="isActive.chat ? 'mb-[0px]  font-interSemiBold' : 'mb-[5px]'">
                        chat
                        <div class="h-[5px] w-full bg-itl-primary rounded-t-itl-sm" :class="isActive.chat ? 'block ' : 'hidden '" />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-end items-center gap-2">
            <div v-if="isLoading" class="flex justify-between items-center gap-2">
                <SkeletonView width="100px" height="16px" />
                <SkeletonView width="80px" height="32px" />
            </div>
            <div v-else class="flex justify-between items-center gap-2">
                <div v-if="ticketModalData.is_show_unactionable_by_itl === 1" class="text-[#bc3285] bg-[#ffedf7] uppercase rounded-sm font-interSemiBold leading-[16px] px-2 text-[10px]">Unactionble By ITL</div>
                <div v-if="ticketModalData.is_show_pending_from === 1" class="text-[#366CB8] bg-[#D9E9FF] border-[#0168ED] border uppercase rounded-sm font-interSemiBold leading-[16px] px-2 text-[10px]">Awaiting your Reply</div>
                <BaseButton
                    name="Rate Ticket"
                    @click="addTicketRating"
                    :isLoading="isLoading"
                    v-if="checkUserType('vendor') && ticketModalData.ticket_status == 'Closed' && ticketModalData.review_rating == 0 && isRateDone"
                    :isIcon="getImg('modal-rate-us', darkModeVal, 'modals')"
                />
                <TicketRateModal :dataVariables="dataVariables" />
                <div>
                    <!-- <button v-if="changesBtnState.close" @click="closeTicket(ticketModalData.ticket_id)"
                        class="danger px-[12px] py-[7px] rounded-md font-interSemiBold text-[12px]"
                        :disabled="isDisable">Close Ticket</button>
                    <button v-if="changesBtnState.reopen" @click="reopenTicket(ticketModalData.ticket_id)"
                        class="success px-[12px] py-[7px] rounded-md font-interSemiBold text-[12px]"
                        :class="isDisable ? 'hover:cursor-not-allowed' : ''" :disabled="isDisable">
                        Reopen Ticket
                    </button> -->
                    <button v-if="changesBtnState.close" @click="openConfirmationModal" class="danger px-[12px] py-[7px] rounded-md font-interSemiBold text-[12px]" :disabled="isDisable">Close Ticket</button>
                    <button v-if="changesBtnState.reopen" @click="openConfirmationModal" class="success px-[12px] py-[7px] rounded-md font-interSemiBold text-[12px]" :class="isDisable ? 'hover:cursor-not-allowed' : ''" :disabled="isDisable">
                        Reopen Ticket
                    </button>
                </div>
            </div>
        </div>
    </div>

    <ConfirmationModal :isVisible="isOpenConfirmation" @close-confirmation-modal="() => (isOpenConfirmation = false)">
        <template #header>
            <span class="font-interSemiBold">
                {{ changesBtnState.close ? 'Close Ticket' : 'Reopen Ticket' }}
            </span>
        </template>
        <template #body>
            <p>Are you sure you want to {{ changesBtnState.close ? 'close' : 'reopen' }} this ticket?</p>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <BaseButton type="secondary" size="small" name="No" :isLoading="false" @click="() => (isOpenConfirmation = false)" />
                <BaseButton type="primary" size="medium" name="Yes" :isLoading="confirmationLoading" @click="confirmPendingFnc" />
            </div>
        </template>
    </ConfirmationModal>
</template>
<style lang="scss">
.isActive {
    @apply font-interSemiBold;
}
</style>
